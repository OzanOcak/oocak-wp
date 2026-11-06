<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action(
    'admin_post_oocak_nx_save_article',
    'oocak_nx_save_article'
);

function oocak_nx_save_article() {
    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized.');
    }

    check_admin_referer('oocak_nx_save_article');

    global $wpdb;

    $table_name = $wpdb->prefix . 'oocak_articles';

    $article_id = isset($_POST['article_id'])
        ? absint($_POST['article_id'])
        : 0;

    $content = isset($_POST['content'])
        ? wp_unslash($_POST['content'])
        : '';

    if ($article_id) {
        // Update an existing article.
        $existing = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_name WHERE id = %d",
                $article_id
            )
        );

        if (!$existing) {
            wp_die('Article not found.');
        }

        $result = $wpdb->update(
            $table_name,
            [
                'content' => $content,
                'updated_at' => current_time('mysql'),
            ],
            ['id' => $article_id],
            ['%s', '%s'],
            ['%d']
        );

        $message = $result === false ? 'error' : 'updated';

    } else {
        // Create a new article.
        $filename = isset($_POST['filename'])
            ? sanitize_text_field(wp_unslash($_POST['filename']))
            : '';

        if (!preg_match('/^[a-z0-9][a-z0-9-]*\.md$/', $filename)) {
            wp_die(
                'Invalid filename. Use lowercase letters, numbers, and hyphens.'
            );
        }

        $now = current_time('mysql');

        $result = $wpdb->insert(
            $table_name,
            [
                'filename' => $filename,
                'content' => $content,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            ['%s', '%s', '%s', '%s']
        );

        if ($result === false) {
            if ($wpdb->last_error) {
                wp_die(
                    'Could not create article. The filename may already exist.'
                );
            }

            wp_die('Could not create article.');
        }

        $article_id = $wpdb->insert_id;
        $message = 'created';
    }

    $redirect_url = add_query_arg(
        [
            'page' => 'oocak-nextjs-publisher',
            'article_id' => $article_id,
            'message' => $message,
        ],
        admin_url('admin.php')
    );

    if (!headers_sent($file, $line)) {
    wp_safe_redirect($redirect_url);
    exit;
}

wp_die(
    'Headers already sent in ' . esc_html($file) .
    ' on line ' . esc_html($line)
);
}
