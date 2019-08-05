<?php
/**
 * Dokan Notice Class
 *
 * @since  2.4.3
 *
 * @author weDevs  <info@wedevs.com>
 */
class Dokan_Pro_Store {

    /**
     * Load autometically when class initiate
     *
     * @since 2.4.3
     *
     * @uses action hook
     * @uses filter hook
     */
    function __construct() {
        add_action( 'dokan_rewrite_rules_loaded', array( $this, 'load_rewrite_rules' ) );
        add_action( 'dokan_store_profile_frame_after', array( $this, 'show_store_coupons' ), 10, 2 );

        add_filter( 'dokan_query_var_filter', array( $this, 'load_store_review_query_var' ), 10, 2 );
        add_filter( 'dokan_store_tabs', array( $this, 'add_review_tab_in_store' ), 10, 2 );
        add_filter( 'template_include', array( $this, 'store_review_template' ), 99 );
    }

    /**
     * Initializes the Dokan_Pro_Store() class
     *
     * Checks for an existing Dokan_Pro_Store() instance
     * and if it doesn't find one, creates it.
     */
    public static function init() {
        static $instance = false;

        if ( !$instance ) {
            $instance = new Dokan_Pro_Store();
        }

        return $instance;
    }

    /**
     * Load Store Review query vars for store page
     *
     * @since 2.4.3
     *
     * @param  array $vars
     *
     * @return array
     */
    public function load_store_review_query_var( $vars ) {
        $vars[] = 'store_review';
        $vars[] = 'support';
        $vars[] = 'support-tickets';
        $vars[] = 'booking';

        return $vars;
    }

    /**
     * Load Rewrite Rules for store page
     *
     * @since 2.4.3
     *
     * @param  string $custom_store_url
     *
     * @return void
     */
    public function load_rewrite_rules( $custom_store_url ) {
        add_rewrite_rule( $custom_store_url.'/([^/]+)/reviews?$', 'index.php?'.$custom_store_url.'=$matches[1]&store_review=true', 'top' );
        add_rewrite_rule( $custom_store_url.'/([^/]+)/reviews/page/?([0-9]{1,})/?$', 'index.php?'.$custom_store_url.'=$matches[1]&paged=$matches[2]&store_review=true', 'top' );
    }

    /**
     * Add Review Tab in Store Page
     *
     * @since 2.4.3
     *
     * @param array $tabs
     * @param integer $store_id
     *
     * @return array
     */
    public function add_review_tab_in_store( $tabs, $store_id ) {
        $tabs['reviews'] = array(
            'title' => __( 'Reviews', 'dokan' ),
            'url'   => dokan_get_review_url( $store_id )
        );

        return $tabs;
    }

    /**
     * Returns the store review template
     *
     * @since 2.4.3
     *
     * @param string  $template
     *
     * @return string
     */
    public function store_review_template( $template ) {

        if ( ! function_exists( 'WC' ) ) {
            return $template;
        }

        if ( get_query_var( 'store_review' ) ) {
            return dokan_locate_template( 'store-reviews.php', '', DOKAN_PRO_DIR. '/templates/', true );
        }

        return $template;
    }

    /**
     * Show seller coupons in the store page
     *
     * @param  WP_User  $store_user
     * @param  array    $store_info
     *
     * @since 2.4.12
     *
     * @return void
     */
    public function show_store_coupons( $store_user, $store_info ) {
        $seller_coupons = dokan_get_seller_coupon( $store_user->ID, true );

        // var_dump( $seller_coupons );
        if ( ! $seller_coupons ) {
            return;
        }
        // WC 3.0 compatibility
        if ( class_exists( 'WC_DateTime' ) ) {
            $current_time = new WC_DateTime();
            $current_time = $current_time->getTimestamp();
        } else {
            $current_time = current_time( 'timestamp' );
        }

        echo '<div class="store-coupon-wrap">';

        foreach ( $seller_coupons as $coupon ) {
            $coup = new WC_Coupon( $coupon->ID );

            $expiry_date = dokan_get_prop( $coup, 'expiry_date', 'get_date_expires' );
            $coup_exists = dokan_get_prop( $coup, 'exists', 'is_valid' );

            if ( class_exists( 'WC_DateTime' ) && $expiry_date ) {
                $expiry_date = new WC_DateTime( $expiry_date );
                $expiry_date = $expiry_date->getTimestamp();
            }

            if ( $expiry_date && ( $current_time > $expiry_date ) )  {
                continue;
            }

            $coupon_type = version_compare( WC_VERSION, '2.7', '>' ) ? 'percent' : 'percent_product';

            if ( $coupon_type == dokan_get_prop( $coup, 'type', 'get_discount_type' ) ) {
                $coupon_amount_formated = dokan_get_prop( $coup, 'amount' ) . '%';
            } else {
                $coupon_amount_formated = wc_price( dokan_get_prop( $coup, 'amount' ) );
            }
            ?>
                <div class="code">
                    <span class="outside">
                        <span class="inside">
                            <div class="coupon-title"><?php printf( __( '%s Discount', 'dokan' ), $coupon_amount_formated ); ?></div>
                            <div class="coupon-body">
                                <?php if ( !empty( $coupon->post_content ) ) { ?>
                                    <span class="coupon-details"><?php echo esc_html( $coupon->post_content ); ?></span>
                                <?php } ?>
                                <span class="coupon-code"><?php printf( __( 'Coupon Code: <strong>%s</strong>', 'dokan' ), $coupon->post_title ); ?></span>

                                <?php if ( $expiry_date ) {
                                    $expiry_date = is_object( $expiry_date ) ? $expiry_date->getTimestamp() : $expiry_date; ?>
                                    <span class="expiring-in">(<?php printf( __( 'Expiring in %s', 'dokan' ), human_time_diff( $current_time, $expiry_date ) ); ?>)</span>
                                <?php } ?>
                            </div>
                        </span>
                    </span>
                </div>
            <?php
        }

        echo '</div>';
    }

}