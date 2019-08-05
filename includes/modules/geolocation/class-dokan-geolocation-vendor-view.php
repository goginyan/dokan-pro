<?php

/**
 * Shows location maps for Dokan Vendors/Sellers
 *
 * @since 1.0.0
 */
class Dokan_Geolocation_Vendor_View {

    /**
     * Map location
     *
     * Possible values: top, left, right
     *
     * @since 1.0.0
     *
     * @var string
     */
    private $map_location = 'top';

    /**
     * Class constructor
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function __construct() {
        $this->map_location = dokan_get_option( 'show_locations_map', 'dokan_geolocation', 'top' );

        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        add_action( 'dokan_before_seller_listing_loop', array( $this, 'before_seller_listing_loop' ) );
        add_action( 'dokan_after_seller_listing_loop', array( $this, 'after_seller_listing_loop' ) );
        add_action( 'dokan_seller_listing_footer_content', array( $this, 'seller_listing_footer_content' ) );

        add_filter( 'dokan_show_seller_search', '__return_false' );
    }

    /**
     * Enqueue locations map scripts in store listing page
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_scripts() {
        global $post;

        if ( empty( $post ) ) {
            return;
        }

        $dokan_pages = get_option( 'dokan_pages' );

        if ( isset( $dokan_pages['store_listing'] ) && absint( $dokan_pages['store_listing'] ) === absint( $post->ID ) ) {
            dokan_geo_enqueue_locations_map();
        }
    }

    /**
     * Include locations map template in store listing page
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function before_seller_listing_loop() {
        $show_filters = dokan_get_option( 'show_filters_before_locations_map', 'dokan_geolocation', 'on' );

        switch ( $this->map_location ) {
            case 'right':
                echo '<div class="dokan-geolocation-row dokan-geolocation-map-right"><div class="dokan-geolocation-col-7">';

                if ( 'on' === $show_filters ) {
                    dokan_geo_filter_form( 'vendor' );
                }
                break;

            case 'left':
                echo '<div class="dokan-geolocation-row dokan-geolocation-map-left"><div class="dokan-geolocation-col-5">';
                dokan_geo_get_template( 'map', [ 'layout' => 'left' ] );
                echo '</div><div class="dokan-geolocation-col-7">';

                if ( 'on' === $show_filters ) {
                    dokan_geo_filter_form( 'vendor' );
                }
                break;

            case 'top':
            default:
                if ( 'on' === $show_filters ) {
                    dokan_geo_filter_form( 'vendor' );
                }

                dokan_geo_get_template( 'map', [ 'layout' => 'top' ] );
                break;
        }
    }

    /**
     * Include locations map template in store listing page
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function after_seller_listing_loop() {
        switch ( $this->map_location ) {
            case 'right':
                echo '</div><div class="dokan-geolocation-col-5">';
                dokan_geo_get_template( 'map', [ 'layout' => 'right' ] );
                echo '</div></div>';
                break;

            case 'left':
                echo '</div></div>';
                break;

            default:
                break;
        }
    }

    /**
     * Include geolocation data for every vendor
     *
     * @since 1.0.0
     *
     * @param WP_User $seller
     *
     * @return void
     */
    public function seller_listing_footer_content( $seller ) {
        if ( empty( $seller->dokan_geo_latitude ) || empty( $seller->dokan_geo_longitude ) ) {
            return;
        }

        $vendor = new Dokan_Vendor( $seller );

        $info_window_data = array(
            'title'   => $vendor->get_shop_name(),
            'link'    => dokan_get_store_url( $seller->ID ),
            'image'   => $vendor->get_avatar(),
            'address' => $vendor->data->data->dokan_geo_address,
        );

        /**
         * Filter to modify vendor data for map marker info window
         *
         * @since 1.0.0
         *
         * @param array        $info_window_data
         * @param Dokan_Vendor $vendor
         */
        $info = apply_filters( 'dokan_geolocation_info_vendor', $info_window_data, $vendor );

        $args = array(
            'id'                  => $seller->ID,
            'dokan_geo_latitude'  => $vendor->data->data->dokan_geo_latitude,
            'dokan_geo_longitude' => $vendor->data->data->dokan_geo_longitude,
            'dokan_geo_address'   => $vendor->data->data->dokan_geo_address,
            'info'                => json_encode( $info ),
        );

        dokan_geo_get_template( 'item-geolocation-data', $args );
    }
}
