<?php


class DPS_Manager {

    /**
     * Return an i18n'ified associative array of all possible subscription periods.
     *
     * @since 1.0
     */
    public function __construct() {
        add_filter( 'woocommerce_add_to_cart_validation', __CLASS__ . '::maybe_empty_cart', 10, 3 );
        add_filter( 'add_to_cart_redirect', __CLASS__ . '::add_to_cart_redirect' );
    }

    /**
     * Output a redirect URL when an item is added to the cart when a subscription was already in the cart.
     *
     * @since 1.0
     */
    public static function redirect_ajax_add_to_cart( $fragments ) {
        global $woocommerce;

        $data = array(
            'error'       => true,
            'product_url' => $woocommerce->cart->get_cart_url()
        );

        return $data;
    }

    /**
     * When a subscription is added to the cart, remove other products/subscriptions to
     * work with PayPal Standard, which only accept one subscription per checkout.
     *
     * @since 1.0
     */
    public static function maybe_empty_cart( $valid, $product_id, $quantity ) {
        global $woocommerce;

        if ( Dokan_Product_Subscription::is_subscription_product( $product_id ) ) {
            $woocommerce->cart->empty_cart();
        }

        return $valid;
    }

    /**
     * Removes all subscription products from the shopping cart.
     *
     * @since 1.0
     */
    public static function remove_subscriptions_from_cart() {
        global $woocommerce;

        foreach ( $woocommerce->cart->cart_contents as $cart_item_key => $cart_item ) {
            if ( Dokan_Product_Subscription::is_subscription_product( $cart_item['product_id'] ) ) {
                $woocommerce->cart->set_quantity( $cart_item_key, 0 );
            }
        }
    }

    /**
     * For a smoother sign up process, tell WooCommerce to redirect the shopper immediately to
     * the checkout page after she clicks the "Sign Up Now" button
     *
     * @param $url string The cart redirect $url WooCommerce determined.
     * @since 1.0
     */
    public static function add_to_cart_redirect( $url ) {
        global $woocommerce;

        // If product is of the subscription type
        if ( is_numeric( $_REQUEST['add-to-cart'] ) && Dokan_Product_Subscription::is_subscription_product( (int) $_REQUEST['add-to-cart'] ) ) {
            // Remove default cart message
            $woocommerce->clear_messages();

            // Redirect to checkout
            $url = $woocommerce->cart->get_checkout_url();
        }

        return $url;
    }

    public static function get_subscription_period_interval_strings() {
        $intervals = array();

        for ( $i = 1; $i <= 30; $i++ ) {
            $intervals[$i] = $i;
        }

        return $intervals;
    }


    /**
     * Return an i18n'ified associative array of all possible subscription periods.
     *
     * @since 1.1
     */
    public static function get_subscription_period_strings( $number = 1, $period = '' ) {

        $translated_periods = array(
            'day'   => sprintf( _n( 'day(s)', '%s days', $number, 'dokan' ), $number ),
            'week'  => sprintf( _n( 'week(s)', '%s weeks', $number, 'dokan' ), $number ),
            'month' => sprintf( _n( 'month(s)', '%s months', $number, 'dokan' ), $number ),
            'year'  => sprintf( _n( 'year(s)', '%s years', $number, 'dokan' ), $number )
        );

        return $translated_periods;
    }


    /**
     * Returns an array of subscription lengths.
     *
     * PayPal Standard Allowable Ranges
     * D – for days; allowable range is 1 to 90
     * W – for weeks; allowable range is 1 to 52
     * M – for months; allowable range is 1 to 24
     * Y – for years; allowable range is 1 to 5
     *
     * @param subscription_period string (optional) One of day, week, month or year. If empty, all subscription ranges are returned.
     * @since 1.0
     */
    public static function get_subscription_ranges( $subscription_period = '' ) {
        $subscription_ranges = array();
        $subscription_ranges[''] = __( 'Never', 'dokan' );

        for ( $i = 1; $i <= 30; $i++ ) {
            $subscription_ranges[$i] = $i;
        }

        return $subscription_ranges;
    }

}
