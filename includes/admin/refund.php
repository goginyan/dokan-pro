<?php
$dokan_admin_refund = Dokan_Pro_Admin_refund::init();
$counts = dokan_get_refund_count();

$status = isset( $_GET['status'] ) ? $_GET['status'] : 'pending';
?>
<div class="wrap">
    <h2><?php _e( 'Refund Requests', 'dokan' ); ?></h2>
    <p><?php printf( __( 'Process all the refund requests of your marketplace from a single place. <a href="%s" target="_blank">Learn More<a/>','dokan' ), 'https://wedevs.com/docs/dokan/refund/' ) ?></p>

    <ul class="subsubsub" style="float: none;">
        <li>
            <a href="admin.php?page=dokan-refund&amp;status=pending" <?php if ( $status == 'pending' ) echo 'class="current"'; ?>>
                <?php _e( 'Pending', 'dokan' ); ?> <span class="count">(<?php echo $counts['pending'] ?>)</span>
            </a> |
        </li>
        <li>
            <a href="admin.php?page=dokan-refund&amp;status=completed" <?php if ( $status == 'completed' ) echo 'class="current"'; ?>>
                <?php _e( 'Approved', 'dokan' ); ?> <span class="count">(<?php echo $counts['completed'] ?>)</span>
            </a> |
        </li>
        <li>
            <a href="admin.php?page=dokan-refund&amp;status=cancelled" <?php if ( $status == 'cancelled' ) echo 'class="current"'; ?>>
                <?php _e( 'Cancelled', 'dokan' ); ?> <span class="count">(<?php echo $counts['cancelled'] ?>)</span>
            </a>
        </li>
    </ul>

    <?php

    $dokan_admin_refund->admin_refund_list( $status );
    ?>
</div>