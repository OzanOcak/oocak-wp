<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action(
    'admin_post_oocak_nx_publish_article',
    'oocak_nx_publish_article'
);

function oocak_nx_publish_article() {
    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized.');
    }

    check_admin_referer('oocak_nx_publish_article');

    global $wpdb;

    $table_name = $wpdb->prefix . 'oocak_articles';

    $article_id = isset($_POST['article_id'])
        ? absint($_POST['article_id'])
        : 0;

    if (!$article_id) {
        wp_die('Invalid article ID.');
    }

    // Load the saved article.
    $article = $wpdb->get_row(
        $wpdb->prepare(
            "SELECT id, filename, content
             FROM $table_name
             WHERE id = %d",
            $article_id
        )
    );

    if (!$article) {
        wp_die('Article not found.');
    }

    // Send Markdown to Next.js.
    $response = wp_remote_post(
        'http://host.docker.internal:3001/api/wordpress/articles',
        [
            'timeout' => 15,
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'body' => wp_json_encode([
                'filename' => $article->filename,
                'content' => $article->content,
            ]),
        ]
    );

    if (is_wp_error($response)) {
        wp_die(
            'Could not connect to Next.js: ' .
            esc_html($response->get_error_message())
        );
    }

    $status_code = wp_remote_retrieve_response_code($response);

    if ($status_code !== 201) {
        $body = json_decode(
            wp_remote_retrieve_body($response),
            true
        );

        $error = isset($body['error'])
            ? $body['error']
            : 'Unknown publishing error.';

        wp_die(
            'Publishing failed (' . esc_html($status_code) . '): ' .
            esc_html($error)
        );
    }

    // Redirect after successful publishing.
    $redirect_url = add_query_arg(
        [
            'page' => 'oocak-nextjs-publisher',
            'article_id' => $article_id,
            'message' => 'published',
        ],
        admin_url('admin.php')
    );

    wp_safe_redirect($redirect_url, 303);
    exit;
}
