<?php

/**
 * Plugin Name: OnDemand
 * Plugin URI: https://www.stoitit.nl/
 * Description: Opnames van de dienst weergeven op de site
 * Version: 1.0
 * Author: Rick Stoit
 * Author URI: https://rickstoit.nl
 **/

add_action('admin_menu', 'showOnDemandMenu');

function showOnDemandMenu()
{
    add_menu_page('OnDemand', 'OnDemand Stoit IT', 'administrator', __FILE__, 'OnDemandSettings');
}

function OnDemandSettings()
{
    if (isset($_POST['send'])) {
        update_option('StoitIT_username', $_POST['StoitIT_username']);
    }
    echo '<div class="wrap">
        <form action="" method="POST">
        <table class="form-table">

        <tr valign="top">
        <th scope="row">Stoit IT gebruikersnaam</th>
        <td><input type="text" name="StoitIT_username" value="' . esc_attr(get_option('StoitIT_username')) . '" /></td>
        </tr>
        <tr>
            <td><input name="send" type="submit" value="submit"/></td><td></td>
        </tr>
        </form>
    </table>
    
    <p>Gebruik <b>[OnDemand]</b> voor het plaatsen op een pagina.</p>
    </div>';
}

function showOnDemand($atts)
{
    wp_enqueue_style('showOnDemand');
    //wp_enqueue_script("jquery");
    $username = get_option('StoitIT_username');
    if ($username)
        include __DIR__ . '/gemist.snippet.php';
}

add_shortcode('OnDemand', 'showOnDemand');

