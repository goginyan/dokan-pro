<?php
/*
Plugin Name: Product Enquiry
Plugin URI: http://wedevs.com/
Description: Enquiry for a specific product to a seller
Version: 1.0.0
Author: Tareq Hasan
Author URI: http://tareq.wedevs.com/
Thumbnail Name: product-enquiry.png
License: GPL2
*/

/**
 * Copyright (c) 2014 Tareq Hasan (email: tareq@wedevs.com). All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Dokan_Product_Enquiry class
 *
 * @class Dokan_Product_Enquiry The class that holds the entire Dokan_Product_Enquiry plugin
 */
class Dokan_Product_Enquiry {

    /**
     * Constructor for the Dokan_Product_Enquiry class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     *
     * @uses register_activation_hook()
     * @uses register_deactivation_hook()
     * @uses is_admin()
     * @uses add_action()
     */
    public function __construct() {
        add_action( 'wp_ajax_dokan_product_enquiry', array( $this, 'send_email' ) );
        add_action( 'wp_ajax_nopriv_dokan_product_enquiry', array( $this, 'send_email' ) );

        add_filter( 'woocommerce_product_tabs', array( $this, 'register_tab' ), 99 );
        add_filter( 'dokan_settings_fields', array( $this, 'guest_user_settings' ), 10 );

        // Loads frontend scripts and styles
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    }

    /**
     * Initializes the Dokan_Product_Enquiry() class
     *
     * Checks for an existing Dokan_Product_Enquiry() instance
     * and if it doesn't find one, creates it.
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new Dokan_Product_Enquiry();
        }

        return $instance;
    }

    /**
     * Enqueue admin scripts
     *
     * Allows plugin assets to be loaded.
     *
     * @uses wp_enqueue_script()
     * @uses wp_localize_script()
     * @uses wp_enqueue_style
     */
    public function enqueue_scripts() {
        wp_enqueue_script( 'dpe-scripts', plugins_url( 'assets/js/enquiry.js', __FILE__ ), array( 'jquery' ), false, true );
        wp_localize_script( 'dpe-scripts', 'DokanEnquiry', array(
            'ajaxurl' => admin_url( 'admin-ajax.php' )
        ) );

    }

    /**
     * Get user agent string
     *
     * @return string
     */
    function get_user_agent() {
        return substr( $_SERVER['HTTP_USER_AGENT'], 0, 150 );
    }

    /**
     * Get from name for email.
     *
     * @access public
     * @return string
     */
    function get_from_name() {
        return wp_specialchars_decode( esc_html( get_option( 'woocommerce_email_from_name' ) ), ENT_QUOTES );
    }

    /**
     * Get from email address.
     *
     * @access public
     * @return string
     */
    function get_from_address() {
        return sanitize_email( get_option( 'woocommerce_email_from_address' ) );
    }

    /**
     * Send email
     *
     * @since  0.1
     *
     * @return void
     */
    function send_email() {
        check_ajax_referer( 'dokan_product_enquiry' );

        $posted = $_POST;

        $url = isset( $_POST['url'] ) ? $_POST['url'] : '';

        if ( !empty( $url ) ) {
            wp_send_json_error( __( 'Boo ya!', 'dokan' ) );
        }

        if ( is_user_logged_in() ) {
            $sender = wp_get_current_user();

            $from_name = $sender->display_name;
            $from_email = $sender->user_email;

        } else {

            $from_name = trim( strip_tags( $posted['author'] ) );
            $from_email = trim( strip_tags( $posted['email'] ) );
        }

        $message = esc_attr( trim( $posted['enq_message'] ) );

        if ( $message == '' ) {
            wp_send_json_error( 'oops' );
        }

        $product_id = (int) $posted['enquiry_id'];
        $seller_id = (int) $posted['seller_id'];
        $seller = get_user_by( 'id', $seller_id );

        // no seller found
        if ( !$seller || is_wp_error( $seller ) ) {
            $message = sprintf( '<div class="alert alert-success">%s</div>', __( 'Something went wrong!', 'dokan' ) );
            wp_send_json_error( $message );
        }

        // no product found
        $product = get_post( $product_id );
        if ( !$product ) {
            $message = sprintf( '<div class="alert alert-success">%s</div>', __( 'Something went wrong!', 'dokan' ) );
            wp_send_json_error( $message );
        }

        $template = dirname( __FILE__ ) . '/includes/email.php';
        ob_start();
        include $template;
        $body = ob_get_clean();

        $find = array(
            '%from_name%',
            '%from_email%',
            '%user_ip%',
            '%user_agent%',
            '%message%',
            '%site_name%',
            '%site_url%',
            '%product_name%',
            '%product_url%',
            '%seller_name%'
        );

        $replace = array(
            $from_name,
            $from_email,
            dokan_get_client_ip(),
            $this->get_user_agent(),
            $message,
            $this->get_from_name(),
            home_url(),
            $product->post_title,
            get_permalink( $product_id ),
            $seller->display_name
        );

        $subject = sprintf( __( '"%s" sent you a message from your "%s" store', 'dokan' ), $from_name, $this->get_from_name() );
        $body    = str_replace( $find, $replace, $body);
        $headers = array( "Reply-To: {$from_name}<{$from_email}>" );

        $this->send( $seller->user_email, $subject, $body, $headers );

        do_action( 'dokan_enquiry_email_sent', array(
            'to'           => $seller->user_email,
            'subject'      => $subject,
            'message'      => $message,
            'sender_email' => $from_email,
            'sender_name'  => $from_name,
            'headers'      => $headers,
        ) );

        $success = sprintf( '<div class="alert alert-success">%s</div>', __( 'Email sent successfully!', 'dokan' ) );
        wp_send_json_success( $success );
    }

    /**
     * Send the email.
     *
     * @since 0.1
     *
     * @access public
     *
     * @param mixed $to
     * @param mixed $subject
     * @param mixed $message
     * @param string $headers
     * @param string $attachments
     *
     * @return void
     */
    function send( $to, $subject, $message, $headers = array() ) {
        add_filter( 'wp_mail_from', array( $this, 'get_from_address' ) );
        add_filter( 'wp_mail_from_name', array( $this, 'get_from_name' ) );

        wp_mail( $to, $subject, $message, $headers );

        remove_filter( 'wp_mail_from', array( $this, 'get_from_address' ) );
        remove_filter( 'wp_mail_from_name', array( $this, 'get_from_name' ) );
    }

    /**
     * Register product enquiry tab
     *
     * @since  0.1
     *
     * @param  array $tabs
     *
     * @return array
     */
    function register_tab( $tabs ) {
        global $product, $post;

        $tabs['seller_enquiry_form'] = array(
            'title'    => __( 'Product Enquiry', 'dokan' ),
            'priority' => 29,
            'callback' => array( $this, 'show_form' )
        );

        return $tabs;
    }

    /**
    * Settings for guest users
    *
    * @since 0.2
    *
    * @return void
    **/
    public function guest_user_settings( $settings_fields ) {
        $settings_fields['dokan_selling']['enable_guest_user_enquiry'] = array(
            'name'    => 'enable_guest_user_enquiry',
            'label'   => __( 'Guest Product Enquiry', 'dokan' ),
            'desc'    => __( 'Enable/Disable product enquiry for guest user', 'dokan' ),
            'type'    => 'checkbox',
            'default' => 'on'
        );

        return $settings_fields;
    }

    /**
     * Show enquiry form in single product page tab
     *
     * @since  0.1
     *
     * @return void
     */
    function show_form() {
        global $post;
        $guest_enquiry = dokan_get_option( 'enable_guest_user_enquiry', 'dokan_selling', 'on' );
        ?>

        <h3 style="margin-bottom: 25px;"><?php _e( 'Product Enquiry', 'dokan' ); ?></h3>

        <div class="row">
            <div class="col-md-10">
                <form id="dokan-product-enquiry" method="post" class="form" role="form">
                    <?php if ( ! is_user_logged_in() ) { ?>
                        <div class="row">
                            <?php if ( $guest_enquiry == 'off' ): ?>
                                <div class="col-xs-12 col-md-12 form-group">
                                    <?php _e( 'Please Login to make enquiry about this product', 'dokan' ); ?>
                                </div>
                                <div class="col-xs-12 col-md-12 form-group">
                                    <a class="btn btn-success btn-green btn-flat btn-lg " href="<?php echo add_query_arg( array( 'redirect_to' => get_permalink( $post->ID ) ), wc_get_page_permalink( 'myaccount' ) ); ?>"><?php _e( 'Login', 'dokan' ); ?></a>
                                </div>
                            <?php else: ?>
                                <div class="col-xs-6 col-md-6 form-group">
                                    <input class="form-control" id="name" name="author" placeholder="<?php _e( 'Your Name', 'dokan' ); ?>" type="text" required/>
                                </div>

                                <div class="col-xs-6 col-md-6 form-group">
                                    <input class="form-control" id="email" name="email" placeholder="you@example.com" type="email" required />
                                </div>

                                <input type="url" name="url" value="" style="display:none">
                            <?php endif ?>
                        </div>
                    <?php } ?>
                    <?php if ( $guest_enquiry == 'on' || is_user_logged_in() ): ?>
                        <div class="form-group">
                            <textarea class="form-control" id="dokan-enq-message" name="enq_message" placeholder="<?php _e( 'Details about your enquiry...', 'dokan' ); ?>" rows="5" required></textarea>
                        </div>

                        <?php do_action( 'dokan_product_enquiry_after_form' ); ?>

                        <?php wp_nonce_field( 'dokan_product_enquiry' ); ?>
                        <input type="hidden" name="enquiry_id" value="<?php echo esc_attr( $post->ID ); ?>">
                        <input type="hidden" name="seller_id" value="<?php echo esc_attr( $post->post_author ); ?>">
                        <input type="hidden" name="action" value="dokan_product_enquiry">

                        <input class="dokan-btn dokan-btn-theme" type="submit" value="<?php _e( 'Submit Enquiry', 'dokan' ); ?>">
                    <?php endif ?>
                </form>
            </div>
        </div>
        <?php
    }

} // Dokan_Product_Enquiry

Dokan_Product_Enquiry::init();
