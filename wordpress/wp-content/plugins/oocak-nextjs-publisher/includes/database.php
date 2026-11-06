<?php

if (!defined('ABSPATH')) {
    exit;
}

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
        PRIMARY KEY (id),
        UNIQUE KEY filename (filename)
    ) $charset_collate;";

    dbDelta($sql);
}