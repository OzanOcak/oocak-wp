
<?php

if (!defined('ABSPATH')) {
    exit;
}

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
