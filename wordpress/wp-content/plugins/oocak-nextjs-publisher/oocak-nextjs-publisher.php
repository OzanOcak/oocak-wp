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

define('OOCAK_NX_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Database
require_once OOCAK_NX_PLUGIN_DIR . 'includes/database.php';

// Admin
require_once OOCAK_NX_PLUGIN_DIR . 'includes/admin/menu.php';
require_once OOCAK_NX_PLUGIN_DIR . 'includes/admin/page.php';

// Articles
require_once OOCAK_NX_PLUGIN_DIR . 'includes/articles/save.php';
require_once OOCAK_NX_PLUGIN_DIR . 'includes/articles/publish.php';

// Activation
register_activation_hook(__FILE__, 'oocak_nx_activate');