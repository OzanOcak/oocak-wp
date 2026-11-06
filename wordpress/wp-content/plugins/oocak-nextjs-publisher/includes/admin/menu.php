<?php

if (!defined('ABSPATH')) {
    exit;
}

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