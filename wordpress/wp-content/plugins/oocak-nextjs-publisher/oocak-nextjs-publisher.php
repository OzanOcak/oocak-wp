<?php
/**
 * Plugin Name: Oocak Next.js Publisher
 * Description: Manage Markdown articles for your Next.js website.
 * Version: 1.0.0
 * Author: Ozan Ocak
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Database setup
 */
function oocak_nx_activate() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'oocak_articles';

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        filename varchar(255) NOT NULL,
        content longtext NOT NULL,
        created_at datetime NOT NULL,
        updated_at datetime NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY filename (filename)
    ) $charset_collate;";

    dbDelta($sql);
}

register_activation_hook(__FILE__, 'oocak_nx_activate');


/**
 * Admin menu
 */
add_action('admin_menu', function () {
    add_menu_page(
        'Next.js Publisher',
        'Next.js Publisher',
        'manage_options',
        'oocak-nextjs-publisher',
        'oocak_nx_render_admin_page',
        'dashicons-edit-page',
        25
    );
});


/**
 * Save article handler
 */
add_action('admin_post_oocak_nx_save_article', 'oocak_nx_save_article');

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

        // Only allow lowercase Markdown filenames.
        if (!preg_match('/^[a-z0-9][a-z0-9-]*\.md$/', $filename)) {
            wp_die('Invalid filename. Use lowercase letters, numbers, and hyphens.');
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
                wp_die('Could not create article. The filename may already exist.');
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

wp_safe_redirect($redirect_url, 303);
exit;
}


/**
 * Admin page
 */
function oocak_nx_render_admin_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    global $wpdb;

    $table_name = $wpdb->prefix . 'oocak_articles';

    $articles = $wpdb->get_results(
        "SELECT id, filename, updated_at
         FROM $table_name
         ORDER BY updated_at DESC"
    );

    $article_id = isset($_GET['article_id'])
        ? absint($_GET['article_id'])
        : 0;

    $article = null;

    if ($article_id) {
        $article = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE id = %d",
                $article_id
            )
        );
    }

    $is_new = !$article;

    $message = isset($_GET['message'])
        ? sanitize_key($_GET['message'])
        : '';

    ?>

    <div class="wrap">

        <h1>Next.js Publisher</h1>

        <?php if ($message === 'created') : ?>
            <div class="notice notice-success is-dismissible">
                <p>Article created successfully.</p>
            </div>
        <?php elseif ($message === 'updated') : ?>
            <div class="notice notice-success is-dismissible">
                <p>Article saved successfully.</p>
            </div>
        <?php elseif ($message === 'error') : ?>
            <div class="notice notice-error is-dismissible">
                <p>Could not save the article.</p>
            </div>
        <?php endif; ?>

        <div style="display:flex; gap:24px; margin-top:20px;">

            <!-- Article sidebar -->
            <aside style="width:260px; flex-shrink:0;">

                <a
                    href="<?php echo esc_url(
                        admin_url('admin.php?page=oocak-nextjs-publisher')
                    ); ?>"
                    class="button button-primary"
                >
                    + New Article
                </a>

                <h3>Articles</h3>

                <ul style="margin-top:12px;">

                    <?php foreach ($articles as $item) : ?>

                        <li style="margin-bottom:12px;">

                            <a
                                href="<?php echo esc_url(
                                    add_query_arg(
                                        [
                                            'page' => 'oocak-nextjs-publisher',
                                            'article_id' => $item->id,
                                        ],
                                        admin_url('admin.php')
                                    )
                                ); ?>"
                                style="<?php echo (
                                    $article_id === (int) $item->id
                                ) ? 'font-weight:bold;' : ''; ?>"
                            >
                                <?php echo esc_html($item->filename); ?>
                            </a>

                        </li>

                    <?php endforeach; ?>

                </ul>

                <?php if (empty($articles)) : ?>
                    <p>No articles yet.</p>
                <?php endif; ?>

            </aside>


            <!-- Markdown editor -->
            <main style="flex:1; min-width:0;">

                <form
                    method="post"
                    action="<?php echo esc_url(admin_url('admin-post.php')); ?>"
                >

                    <input
                        type="hidden"
                        name="action"
                        value="oocak_nx_save_article"
                    />

                    <?php wp_nonce_field('oocak_nx_save_article'); ?>

                    <input
                        type="hidden"
                        name="article_id"
                        value="<?php echo esc_attr(
                            $article ? $article->id : 0
                        ); ?>"
                    />

                    <?php if ($is_new) : ?>

                        <label for="oocak-filename">
                            <strong>Article filename</strong>
                        </label>

                        <input
                            id="oocak-filename"
                            type="text"
                            name="filename"
                            placeholder="beyond-the-biometric-prompt.md"
                            required
                            pattern="[a-z0-9][a-z0-9-]*\.md"
                            style="width:100%; margin:10px 0 16px;"
                        />

                    <?php else : ?>

                        <h2>
                            <?php echo esc_html($article->filename); ?>
                        </h2>

                    <?php endif; ?>

                    <textarea
                        name="content"
                        placeholder="Write your Markdown here..."
                        spellcheck="false"
                        style="
                            width:100%;
                            min-height:600px;
                            font-family:monospace;
                            font-size:14px;
                            line-height:1.6;
                            padding:16px;
                        "
                    ><?php echo esc_textarea(
                        $article ? $article->content : ''
                    ); ?></textarea>

                    <p>
                        <button
                            type="submit"
                            class="button button-primary"
                        >
                            Save Article
                        </button>
                    </p>

                </form>

            </main>

        </div>

    </div>

    <?php
}
