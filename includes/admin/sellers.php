<?php
/**
 * Dokan Admin Dashboard Seller Log Template
 *
 * @since 2.4
 *
 * @package dokan
 */
?>

<div class="wrap">
    <h2 class="wp-heading-inline"><?php _e( 'Vendor Listing', 'dokan' ); ?></h2>
    <?php
    $counts = dokan_get_seller_status_count();
    $status = isset( $_GET['status'] ) ? $_GET['status'] : 'all';
    $sort_order = ( ! empty( $_GET[ 'order' ] ) && $_GET[ 'order' ] == 'desc' ) ? 'asc' : 'desc';
    if ( isset( $_GET['s'] ) && !empty( $_GET['s'] ) ) {
    ?>
        <span><?php echo __( 'Search results for : ' , 'dokan' ). $_GET['s'] ?></span>
    <?php
    }
    ?>
    <hr class="wp-header-end">
    <div style="margin: 15px 0px;">
        <ul class="subsubsub">
            <li class="all">
                <a href="admin.php?page=dokan-sellers&status=all" class="<?php echo 'all' == $status ? 'current' : ''  ?>">
                    <?php _e( 'All', 'dokan' ); ?>
                    <span class="count">(<?php echo $counts['total'] ?>)</span>
                </a>
                 |
            </li>
            <li class="approved">
                <a href="admin.php?page=dokan-sellers&status=approved" class="<?php echo 'approved' == $status ? 'current' : ''  ?>">
                    <?php _e( 'Approved', 'dokan' ); ?>
                    <span class="count">(<?php echo $counts['active'] ?>)</span>
                </a>
                 |
            </li>
            <li class="pending">
                <a href="admin.php?page=dokan-sellers&status=pending" class="<?php echo 'pending' == $status ? 'current' : ''  ?>">
                    <?php _e( 'Pending', 'dokan' ); ?>
                    <span class="count">(<?php echo $counts['inactive'] ?>)</span>
                </a>
            </li>
        </ul>
    </div>

    <form action="<?php echo 'admin.php?'; ?>" method="get" style="margin-top: 15px;">
        <input type="hidden" name="page" value="dokan-sellers">
        <p class="search-box" style="margin-bottom : 12px;">
            <input type="search" id="search-input" name="s" value="">
            <input type="submit" id="search-submit" class="button" value="<?php _e( 'Search Vendors', 'dokan' ); ?>">
        </p>

        <table class="widefat withdraw-table">
            <thead>
                <tr>
                    <td class="check-column">
                        <input type="checkbox" class="dokan-withdraw-allcheck">
                    </td>
                    <th><?php _e( 'Username', 'dokan' ); ?></th>
                    <th><?php _e( 'Name', 'dokan' ); ?></th>
                    <th><?php _e( 'Shop Name', 'dokan' ); ?></th>
                    <th><?php _e( 'E-mail', 'dokan' ); ?></th>
                    <th><?php _e( 'Products', 'dokan' ); ?></th>
                    <th><?php _e( 'Balance', 'dokan' ); ?></th>
                    <th><?php _e( 'Phone Number', 'dokan' ); ?></th>
                    <th class="manage-column column-regsitered_date sortable <?php echo $sort_order ?>">
                        <a href="<?php echo add_query_arg( array( 'page' => 'dokan-sellers', 'orderby' => 'user_registered', 'order' => $sort_order ), admin_url( 'admin.php' ) ); ?>">
                            <span><?php _e( 'Registered', 'dokan' ); ?></span>
                            <span class="sorting-indicator"></span>
                        </a>
                    </th>
                    <th><?php _e( 'Status', 'dokan' ); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php
                $paged       = isset( $_GET['pagenum'] ) ? absint( $_GET['pagenum'] ) : 1;
                $limit       = 20;
                $count       = 0;
                $offset      = ( $paged - 1 ) * $limit;
                $args        = array( 'role' => 'seller', 'number' => $limit, 'offset' => $offset );

                if ( $status != 'all' ) {
                    $args[ 'meta_key' ]   = 'dokan_enable_selling';
                    $args[ 'meta_value' ] = 'approved' == $status ? 'yes' : 'no';
                }

                if ( isset( $_GET['s'] ) ) {

                    $search_term = sanitize_text_field( $_GET['s'] );
                    $args[ 'search' ] = '*' . esc_attr( $search_term ) . '*';
                    $args[' meta_query' ] = array(
                        'relation' => 'OR',
                        array(
                            'key'     => 'dokan_store_name',
                            'value'   => $search_term ,
                            'compare' => 'LIKE'
                        ),
                        array(
                            'key'     => 'first_name',
                            'value'   => $search_term,
                            'compare' => 'LIKE'
                        ),
                        array(
                            'key'     => 'last_name',
                            'value'   => $search_term,
                            'compare' => 'LIKE'
                        ),
                        array(
                            'key'     => 'nickname',
                            'value'   => $search_term ,
                            'compare' => 'LIKE'
                        )
                    );
                }

                if ( ! empty( $_GET['orderby'] ) ) {
                    $args['orderby'] = $_GET['orderby'];
                }

                if ( ! empty( $_GET['order'] ) ) {
                    $args['order'] = $_GET['order'];
                }

                $user_search = new WP_User_Query( $args );
                $sellers     = (array) $user_search->get_results();
                $post_counts = count_many_users_posts( wp_list_pluck( $sellers, 'ID' ), 'product' );
                $make_active_txt = __( 'Make Active', 'dokan' );
                $make_inactive_txt = __( 'Make Inactive', 'dokan' );

                if ( $sellers ) {

                    foreach ($sellers as $user) {
                        $info = dokan_get_store_info( $user->ID );
                        $url = dokan_get_store_url($user->ID);
                        $seller_enable = dokan_is_seller_enabled( $user->ID );
                        $edit_link = esc_url( add_query_arg( 'wp_http_referer', urlencode( wp_unslash( $_SERVER['REQUEST_URI'] ) ), get_edit_user_link( $user->ID ) ) );
                        ?>
                        <tr class="<?php echo ($count % 2 == 0) ? 'alternate' : 'odd'; ?> ">
                            <th class="check-column">
                                <input type="checkbox" class="dokan-withdraw-allcheck" value="<?php echo $user->ID; ?>" name="users[]">
                            </th>
                            <td>
                                <strong><a href="<?php echo $edit_link ?>"><?php echo $user->user_login; ?></strong></a>
                                <div class="row-actions toggle-seller-status">
                                    <span class="products-link"><a href="<?php echo admin_url( 'edit.php?post_type=product&author=' . $user->ID ); ?>"><?php _e( 'Products', 'dokan' ); ?></a> | </span>
                                    <span class="orders-link"><a href="<?php echo admin_url( 'edit.php?post_type=shop_order&author=' . $user->ID ); ?>"><?php _e( 'Orders', 'dokan' ); ?></a></span>
                                </div>
                            </td>
                            <td><?php echo $user->display_name; ?></td>
                            <td><?php echo empty( $info['store_name'] ) ? '--' : '<a href= "' . $url . '" target="_BLANK" >' . $info['store_name'] . '</a>'; ?></td>
                            <td><?php echo $user->user_email; ?></td>
                            <td>
                                <a href="<?php echo admin_url( 'edit.php?post_type=product&author=' . $user->ID ); ?>">
                                    <?php echo isset( $post_counts[$user->ID] ) ? $post_counts[$user->ID] : 0; ?>
                                </a>
                            </td>
                            <td><?php echo dokan_get_seller_balance( $user->ID ); ?></td>
                            <td><?php echo empty( $info['phone'] ) ? '--' : $info['phone']; ?></td>
                            <td><?php echo dokan_date_time_format( $user->user_registered ); ?></td>
                            <td>
                                <label class="switch tips" title="<?php echo $seller_enable ? $make_inactive_txt : $make_active_txt; ?>">
                                    <input type="checkbox" <?php echo $seller_enable ? 'checked': '' ?> class="toogle-seller" data-id="<?php echo $user->ID; ?>">
                                    <span class="slider round"></span>
                                </label>
                            </td>
                        </tr>
                        <?php
                        $count++;
                    }
                } else {
                    echo '<tr><td colspan="9">' . __( 'No users found!', 'dokan' ) .'</td></tr>';
                }
                ?>
            </tbody>
            <tfoot>
                <tr>
                    <td class="check-column">
                        <input type="checkbox" class="dokan-withdraw-allcheck">
                    </td>
                    <th><?php _e( 'Username', 'dokan' ); ?></th>
                    <th><?php _e( 'Name', 'dokan' ); ?></th>
                    <th><?php _e( 'Shop Name', 'dokan' ); ?></th>
                    <th><?php _e( 'E-mail', 'dokan' ); ?></th>
                    <th><?php _e( 'Products', 'dokan' ); ?></th>
                    <th><?php _e( 'Balance', 'dokan' ); ?></th>
                    <th><?php _e( 'Phone Number', 'dokan' ); ?></th>
                    <th class="manage-column column-regsitered_date sortable <?php echo $sort_order ?>">
                        <a href="<?php echo add_query_arg( array( 'page' => 'dokan-sellers', 'orderby' => 'user_registered', 'order' => $sort_order ), admin_url( 'admin.php' ) ); ?>">
                            <span><?php _e( 'Registered', 'dokan' ); ?></span>
                            <span class="sorting-indicator"></span>
                        </a>
                    </th>
                    <th><?php _e( 'Status', 'dokan' ); ?></th>
                </tr>
            </tfoot>
        </table>

        <div class="tablenav bottom">
            <div class="alignleft actions bulkactions">
                <select name="action2">
                    <option value="-1" selected="selected"><?php _e( 'Bulk Actions', 'dokan' ); ?></option>
                    <option value="delete"><?php _e( 'Delete', 'dokan' ); ?></option>
                </select>

                <input type="submit" name="dokan-seller-bulk-action" id="doaction2" class="button button-primary" value="<?php esc_attr_e( 'Apply', 'dokan' ); ?>">
            </div>

            <?php
            $user_count = $user_search->total_users;
            $num_of_pages = ceil( $user_count / $limit );

            if ( $num_of_pages > 1 ) {
                $page_links = paginate_links( array(
                    'current' => $paged,
                    'total' => $num_of_pages,
                    // 'base' => admin_url( 'admin.php?page=dokan-sellers&amp;page=%#%' ),
                    'base' => add_query_arg( 'pagenum', '%#%' ),
                    'prev_text' => __( '&larr; Previous', 'dokan' ),
                    'next_text' => __( 'Next &rarr;', 'dokan' ),
                    'add_args'  => false,
                ) );

                if ( $page_links ) {
                    echo '<div class="tablenav-pages" style="margin: 1em 0"><span class="pagination-links">' . $page_links . '</span></div>';
                }
            }
            ?>
        </div>
    </form>
    <script type="text/javascript">
        jQuery(function($) {

            $('input.toogle-seller').on('change', function(e) {
                e.preventDefault();
                var self = $(this),
                    make_inactive_txt = '<?php echo $make_inactive_txt; ?>',
                    make_active_txt = '<?php echo $make_active_txt; ?>';

                if ( self.is( ':checked' ) ) {
                    var data = {
                        action : 'dokan_toggle_seller',
                        user_id : self.data('id'),
                        type : 'yes',
                        nonce: dokan_admin.nonce
                    };
                } else {
                    var data = {
                        action : 'dokan_toggle_seller',
                        user_id : self.data('id'),
                        type : 'no',
                        nonce: dokan_admin.nonce
                    };
                }

                $.post( ajaxurl, data, function(resp) {
                    if ( resp.success ) {
                        if ( 'yes' == data.type ) {
                            self.closest('label').attr( 'data-original-title', make_inactive_txt );
                        } else {
                            self.closest('label').attr( 'data-original-title', make_active_txt );
                        }

                        $( '.tips' ).tooltip();
                    }
                });
            });

        });
    </script>
</div>
