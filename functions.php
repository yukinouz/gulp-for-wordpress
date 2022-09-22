<?php

function my_styles()
{
  wp_enqueue_style(
    "style",
    get_template_directory_uri() . "/dist/css/style.css"
  );
}
add_action("wp_enqueue_scripts", "my_styles");

function my_scripts()
{
  wp_enqueue_script(
    "bundle",
    get_template_directory_uri() . "/dist/js/bundle.js",
    ["jquery"],
    "",
    true
  );
}
add_action("wp_enqueue_scripts", "my_scripts");