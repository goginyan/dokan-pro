<?php
/**
* Description of Pack_On_Registration
*
* Show dropdown of Subscription packs on Registration form
*
* @author WeDevs
*
* @since 1.0.2
*/
class DPS_Pack_On_Registration {

    public function __construct() {
        $this->init_hooks();
    }

    /**
     * Init hooks and filters
     *
     * @return void
     */
    function init_hooks() {

        add_action( 'dokan_seller_registration_field_after', array( $this, 'generate_form_fields' ) );
        add_action( 'dokan_after_seller_migration_fields', array( $this, 'generate_form_fields') );
        add_filter( 'woocommerce_registration_redirect', array( $this, 'redirect_to_checkout' ), 99, 1 );
        add_filter( 'dokan_ww_payment_redirect', array( $this, 'redirect_to_checkout_after_wizard' ), 10, 1);
        add_filter( 'dokan_customer_migration_required_fields', array( $this, 'add_subscription_to_dokan_customer_migration_required_fields' ) );
        add_filter( 'dokan_customer_migration_redirect', array( $this, 'redirect_after_migration' ) );
    }

    public static function init() {
        static $instance = false;

        if ( !$instance ) {
            $instance = new DPS_Pack_On_Registration();
        }
        return $instance;
    }

    /**
     * Generate select options and details for created subscription packs
     *
     * @since 1.0.2
     *
     */
    function generate_form_fields() {
        //get packs
        $query = $this->get_subscription_packs();
        $available_recurring_period = DPS_Manager::get_subscription_period_strings();

        $packs = $query->get_posts();

        //if packs not empty show dropdown
        if ( empty( $packs ) ) {
            return;
        }
        ?>
        <label for="dokan-subscription-pack"><?php _e( 'Choose Subscription Pack', 'dokan' ) ?><span class="required"> *</span></label>
        <div class="form-row form-group form-row-wide dps-pack-wrappper" style="border: 1px solid #D3CED2;">

            <select required="required" class="dokan-form-control" name="dokan-subscription-pack" id="dokan-subscription-pack">
                <?php
                while ( $query->have_posts() ) {
                    $query->the_post();
                    ?>
                    <option value="<?php echo get_the_ID() ?>"><?php echo the_title() ?></option>
                    <?php
                }
                ?>
            </select>
            <?php
            while ( $query->have_posts() ) {
                $query->the_post();
                $is_recurring       = ( get_post_meta( get_the_ID(), '_enable_recurring_payment', true ) == 'yes' ) ? true : false;
                $recurring_interval = (int) get_post_meta( get_the_ID(), '_subscription_period_interval', true );
                $recurring_period   = get_post_meta( get_the_ID(), '_subscription_period', true );
                ?>

                <div class="dps-pack dps-pack-<?php echo get_the_ID() ?>">
                    <div class="dps-pack-price">

                        <span class="dps-amount">
                            <i>
                                <?php _e( 'Price :', 'dokan' ) ?>
                                <?php if ( get_post_meta( get_the_ID(), '_regular_price', true ) == '0' ): ?>
                                    <?php _e( 'Free', 'dokan' ); ?>
                                <?php else: ?>
                                    <?php if ( get_post_meta( get_the_ID(), '_sale_price', true ) ): ?>
                                        <strike><?php echo get_woocommerce_currency_symbol() . get_post_meta( get_the_ID(), '_regular_price', true ); ?></strike> <?php echo get_woocommerce_currency_symbol() . get_post_meta( get_the_ID(), '_sale_price', true ); ?>
                                    <?php else: ?>
                                        <?php echo get_woocommerce_currency_symbol() . get_post_meta( get_the_ID(), '_regular_price', true ); ?>
                                    <?php endif ?>
                                <?php endif; ?>
                            </i>
                        </span>

                        <?php if ( $is_recurring && $recurring_interval === 1 ) { ?>
                            <span class="dps-rec-period">
                                <span class="sep">/</span><?php echo isset( $available_recurring_period[$recurring_period] ) ? $available_recurring_period[$recurring_period] : ''; ?>
                            </span>
                        <?php } ?>
                    </div><!-- .pack_price -->

                    <div class="pack_content">
                        <b><?php the_title(); ?></b>

                        <?php the_content(); ?>

                        <?php if ( $is_recurring && $recurring_interval > 1 ) { ?>
                            <span class="dps-rec-period">
                                <i>
                                    <?php printf( __( 'In every %d %s(s)', 'dokan' ), $recurring_interval, $recurring_period ); ?>
                                </i>
                            </span>
                        <?php } ?>
                    </div>
                </div>
                <?php
            }
            ?>

        </div>
            <?php
            wp_reset_query();
        }

    /**
     * Query subscription packs
     *
     * @return object subscription_query
     */
    private function get_subscription_packs() {

        $args = array(
            'post_type'      => 'product',
            'posts_per_page' => -1,
            'tax_query'      => array(
                array(
                    'taxonomy' => 'product_type',
                    'field'    => 'slug',
                    'terms'    => 'product_pack'
                )
            ),
            'orderby'        => 'menu_order title',
            'order'          => 'ASC'
        );

        $query = new WP_Query( apply_filters( 'dokan_sub_get_reg_sub_packs_args', $args ) );

        return $query;
    }

    /**
     * Redirect users to checkout directly with selected
     * subscription added in cart
     *
     * @since 1.0.2
     * @param string redirect_url
     * @return string redirect_url
     */
      function redirect_to_checkout( $redirect_url ) {

        if ( current_user_can( 'dokandar' ) && dokan_get_option('enable_subscription_pack_in_reg', 'dokan_product_subscription' ) == 'on' ) {
            if ( !isset( $_POST['dokan-subscription-pack'] ) ) {
                return $redirect_url;
            }
            return get_site_url() . '/?add-to-cart=' . $_POST['dokan-subscription-pack'];
        }

        return $redirect_url;
    }

    /**
     * Redirect users to checkout after wizard ready
     *
     * @since 1.1.4
     * @param string url
     * @return string url
     */
    function redirect_to_checkout_after_wizard( $url ) {
        if( isset( $_GET['subscription-pack'] ) ){
         $subscription_id = $_GET[ 'subscription-pack' ];
         if( !empty( $subscription_id ) ){
             $url = get_site_url() . '/?add-to-cart=' . $subscription_id;
            }
        }
        return $url;
    }
     /**
     * Check if subscriptin pack is selected
     * @since 1.1.5
     * @param array $fields
     * @return array $fields
     */
    public function add_subscription_to_dokan_customer_migration_required_fields( $fields ) {
        $fields['dokan-subscription-pack'] = __( 'Select subscription a pack', 'dokan' );

        return $fields;
    }

    /**
    * Redirect after migration
    * @since 1.1.5
    * @param string $url
    * @return string
    */
    public function redirect_after_migration( $url ) {
        if ( isset( $_POST['dokan-subscription-pack'] ) ) {
            return get_site_url() . '/?add-to-cart=' . $_POST['dokan-subscription-pack'];
        }

        return $url;
    }

}

$dps_enable = dokan_get_option( 'enable_pricing', 'dokan_product_subscription' );
$dps_enable_in_registration =  dokan_get_option('enable_subscription_pack_in_reg', 'dokan_product_subscription' );

if ( $dps_enable == 'on' && $dps_enable_in_registration == 'on' ) {
    $dps_on_reg = DPS_Pack_On_Registration::init();
}
