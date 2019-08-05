/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var ListTable = dokan_get_lib('ListTable');
var Switches = dokan_get_lib('Switches');

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Vendors',

    components: {
        ListTable: ListTable,
        Switches: Switches
    },

    data: function data() {
        return {
            showCb: true,

            counts: {
                pending: 0,
                approved: 0,
                all: 0
            },

            totalItems: 0,
            perPage: 20,
            totalPages: 1,
            loading: false,

            columns: {
                'store_name': {
                    label: this.__('Store', 'dokan'),
                    sortable: true
                },
                'email': {
                    label: this.__('E-mail', 'dokan')
                },
                'phone': {
                    label: this.__('Phone', 'dokan')
                },
                'registered': {
                    label: this.__('Registered', 'dokan'),
                    sortable: true
                },
                'enabled': {
                    label: this.__('Status', 'dokan')
                }
            },
            actionColumn: 'title',
            actions: [{
                key: 'edit',
                label: this.__('Edit', 'dokan')
            }, {
                key: 'products',
                label: this.__('Products', 'dokan')
            }, {
                key: 'orders',
                label: this.__('Orders', 'dokan')
            }],
            bulkActions: [{
                key: 'approved',
                label: this.__('Approve Vendors', 'dokan')
            }, {
                key: 'pending',
                label: this.__('Disable Selling', 'dokan')
            }],
            vendors: []
        };
    },


    watch: {
        '$route.query.status': function $routeQueryStatus() {
            this.fetchVendors();
        },
        '$route.query.page': function $routeQueryPage() {
            this.fetchVendors();
        },
        '$route.query.orderby': function $routeQueryOrderby() {
            this.fetchVendors();
        },
        '$route.query.order': function $routeQueryOrder() {
            this.fetchVendors();
        }
    },

    computed: {
        currentStatus: function currentStatus() {
            return this.$route.query.status || 'all';
        },
        currentPage: function currentPage() {
            var page = this.$route.query.page || 1;

            return parseInt(page);
        },
        sortBy: function sortBy() {
            return this.$route.query.orderby || 'registered';
        },
        sortOrder: function sortOrder() {
            return this.$route.query.order || 'desc';
        }
    },

    created: function created() {

        this.fetchVendors();
    },


    methods: {
        updatedCounts: function updatedCounts(xhr) {
            this.counts.pending = parseInt(xhr.getResponseHeader('X-Status-Pending'));
            this.counts.approved = parseInt(xhr.getResponseHeader('X-Status-Approved'));
            this.counts.all = parseInt(xhr.getResponseHeader('X-Status-All'));
        },
        updatePagination: function updatePagination(xhr) {
            this.totalPages = parseInt(xhr.getResponseHeader('X-WP-TotalPages'));
            this.totalItems = parseInt(xhr.getResponseHeader('X-WP-Total'));
        },
        fetchVendors: function fetchVendors() {
            var _this = this;

            var self = this;

            self.loading = true;

            // dokan.api.get('/stores?per_page=' + this.perPage + '&page=' + this.currentPage + '&status=' + this.currentStatus)
            dokan.api.get('/stores', {
                per_page: this.perPage,
                page: this.currentPage,
                status: this.currentStatus,
                orderby: this.sortBy,
                order: this.sortOrder
            }).done(function (response, status, xhr) {
                // console.log(response, status, xhr);
                self.vendors = response;
                self.loading = false;

                _this.updatedCounts(xhr);
                _this.updatePagination(xhr);
            });
        },
        onActionClick: function onActionClick(action, row) {
            if ('trash' === action) {
                if (confirm('Are you sure to delete?')) {
                    alert('deleted: ' + row.title);
                }
            }
        },
        onSwitch: function onSwitch(status, vendor_id) {
            var _this2 = this;

            var message = status === false ? this.__('The vendor has been disabled.', 'dokan') : this.__('Selling has been enabled', 'dokan');

            dokan.api.put('/stores/' + vendor_id + '/status', {
                status: status === false ? 'inactive' : 'active'
            }).done(function (response) {
                _this2.$notify({
                    title: _this2.__('Success!', 'dokan'),
                    type: 'success',
                    text: message
                });

                if (_this2.currentStatus !== 'all') {
                    _this2.fetchVendors();
                }
            });
        },
        moment: function (_moment) {
            function moment(_x) {
                return _moment.apply(this, arguments);
            }

            moment.toString = function () {
                return _moment.toString();
            };

            return moment;
        }(function (date) {
            return moment(date);
        }),
        goToPage: function goToPage(page) {
            this.$router.push({
                name: 'Vendors',
                query: {
                    status: this.currentStatus,
                    page: page
                }
            });
        },
        onBulkAction: function onBulkAction(action, items) {
            var _this3 = this;

            var jsonData = {};
            jsonData[action] = items;

            this.loading = true;

            dokan.api.put('/stores/batch', jsonData).done(function (response) {
                _this3.loading = false;
                _this3.fetchVendors();
            });
        },
        sortCallback: function sortCallback(column, order) {
            this.$router.push({
                name: 'Vendors',
                query: {
                    status: this.currentStatus,
                    page: 1,
                    orderby: column,
                    order: order
                }
            });
        },
        productUrl: function productUrl(id) {
            return dokan.urls.adminRoot + 'edit.php?post_type=product&author=' + id;
        },
        ordersUrl: function ordersUrl(id) {
            return dokan.urls.adminRoot + 'edit.php?post_type=shop_order&author=' + id;
        },
        editUrl: function editUrl(id) {
            return dokan.urls.adminRoot + 'user-edit.php?user_id=' + id;
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var ContentLoading = dokan_get_lib('ContentLoading');
var Modal = dokan_get_lib('Modal');

var VclFacebook = ContentLoading.VclFacebook;
var VclTwitch = ContentLoading.VclTwitch;

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'VendorSingle',

    components: {
        VclFacebook: VclFacebook,
        VclTwitch: VclTwitch,
        Modal: Modal
    },

    data: function data() {
        return {
            showDialog: false,
            store: {},
            stats: null,
            mail: {
                subject: '',
                body: ''
            }
        };
    },


    computed: {
        id: function id() {
            return this.$route.params.id;
        },
        mailTo: function mailTo() {
            return this.store.store_name + ' <' + this.store.email + '>';
        },
        hasBank: function hasBank() {
            if (this.store.payment.hasOwnProperty('bank') && !_.isEmpty(this.store.payment.bank)) {
                return true;
            }

            return false;
        }
    },

    watch: {
        '$route.params.id': function $routeParamsId() {
            this.fetch();
            this.fetchStats();
        }
    },

    created: function created() {
        this.fetch();
        this.fetchStats();
    },


    methods: {
        fetch: function fetch() {
            var _this = this;

            dokan.api.get('/stores/' + this.id).done(function (response) {
                return _this.store = response;
            });
        },
        fetchStats: function fetchStats() {
            var _this2 = this;

            dokan.api.get('/stores/' + this.id + '/stats').done(function (response) {
                return _this2.stats = response;
            });
        },
        isSocialActive: function isSocialActive(profile) {
            if (this.store.social.hasOwnProperty(profile) && this.store.social[profile] !== false) {
                return true;
            }

            return false;
        },
        hasPaymentEmail: function hasPaymentEmail(method) {
            if (this.store.payment.hasOwnProperty(method) && this.store.payment[method].email !== false) {
                return true;
            }

            return false;
        },
        messageDialog: function messageDialog() {
            this.showDialog = true;
        },
        sendEmail: function sendEmail() {
            var _this3 = this;

            this.showDialog = false;

            dokan.api.post('/stores/' + this.id + '/email', {
                subject: this.mail.subject,
                body: this.mail.body
            }).done(function (response) {
                _this3.$notify({
                    title: _this3.__('Success!', 'dokan'),
                    type: 'success',
                    text: _this3.__('Email has been sent successfully.', 'dokan')
                });
            });

            this.mail = {
                subject: '',
                body: ''
            };
        },
        moment: function (_moment) {
            function moment(_x) {
                return _moment.apply(this, arguments);
            }

            moment.toString = function () {
                return _moment.toString();
            };

            return moment;
        }(function (date) {
            return moment(date);
        }),
        productUrl: function productUrl() {
            return dokan.urls.adminRoot + 'edit.php?post_type=product&author=' + this.store.id;
        },
        ordersUrl: function ordersUrl() {
            return dokan.urls.adminRoot + 'edit.php?post_type=shop_order&author=' + this.store.id;
        },
        editUrl: function editUrl() {
            return dokan.urls.adminRoot + 'user-edit.php?user_id=' + this.store.id;
        }
    }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var ListTable = dokan_get_lib('ListTable');
var Loading = dokan_get_lib('Loading');
var Switches = dokan_get_lib('Switches');

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Modules',

    data: function data() {
        return {
            search: '',
            isLoaded: false,
            currentView: '',
            modules: [],
            count: {},
            column: {
                'name': {
                    label: 'Module Name',
                    sortable: true
                },
                'description': {
                    label: 'Description'
                },
                'active': {
                    label: 'Status'
                }
            },

            filterMenu: [{
                title: 'All',
                route: {
                    name: 'Modules',
                    params: {}
                }
            }, {
                title: 'Active',
                route: {
                    name: 'ModulesStatus',
                    params: {
                        status: 'active'
                    }
                }
            }, {
                title: 'Inactive',
                route: {
                    name: 'ModulesStatus',
                    params: {
                        status: 'inactive'
                    }
                }
            }]
        };
    },


    components: {
        Loading: Loading,
        Switches: Switches,
        ListTable: ListTable
    },

    computed: {
        currentStatus: function currentStatus() {
            return this.$route.params.status || 'all';
        },
        filteredModules: function filteredModules() {
            var self = this;

            var data = this.modules.filter(function (module) {
                return module.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
            });

            return data;
        },
        sortBy: function sortBy() {
            return this.$route.query.orderby || 'name';
        },
        sortOrder: function sortOrder() {
            return this.$route.query.order || 'desc';
        }
    },

    watch: {
        '$route.query.order': function $routeQueryOrder() {
            this.fetchModuels();
        },
        '$route.params.status': function $routeParamsStatus() {
            this.fetchModuels();
        }
    },

    methods: {
        changeView: function changeView(view) {
            var activetab = '';
            this.currentView = view;

            if (typeof localStorage != 'undefined') {
                localStorage.setItem("activeview", this.currentView);
            }
        },
        fetchModuels: function fetchModuels() {
            var _this = this;

            this.isLoaded = false;

            dokan.api.get('/admin/modules?status=' + this.currentStatus + '&orderby=' + this.sortBy + '&order=' + this.sortOrder).done(function (response, status, xhr) {
                _this.modules = response;
                _this.isLoaded = true;
            });
        },
        sortCallback: function sortCallback(column, order) {
            var currentRoute = this.$router.currentRoute;

            var route = {
                name: currentRoute.name,
                params: {},
                query: {
                    orderby: column,
                    order: order
                }
            };

            if (currentRoute.params.status) {
                route.params.status = currentRoute.params.status;
            }

            this.$router.push(route);
        },
        onSwitch: function onSwitch(status, moduleSlug) {
            var _this2 = this;

            var moduleData = _.findWhere(this.modules, { slug: moduleSlug });

            if (status) {
                // Need to activate
                var message = moduleData.name + this.__('is successfully activated', 'dokan');

                dokan.api.put('/admin/modules/activate', {
                    module: [moduleSlug]
                }).done(function (response) {
                    _this2.$notify({
                        title: 'Success!',
                        type: 'success',
                        text: message
                    });

                    _this2.toggleActivation = false;
                    location.reload();
                });
            } else {
                // Need to deactivate
                var message = moduleData.name + this.__('is successfully deactivated', 'dokan');

                dokan.api.put('/admin/modules/deactivate', {
                    module: [moduleSlug]
                }).done(function (response) {
                    _this2.$notify({
                        title: 'Success!',
                        type: 'success',
                        text: message
                    });

                    location.reload();
                });
            }
        },
        onBulkAction: function onBulkAction(action, items) {
            var _this3 = this;

            var message = 'activate' == action ? this.__('All selected modules are successfully activated', 'dokan') : this.__('All selected modules are successfully deactivated', 'dokan');

            dokan.api.put('/admin/modules/' + action, {
                module: items
            }).done(function (response) {
                _this3.fetchModuels();
                _this3.$notify({
                    title: 'Success!',
                    type: 'success',
                    text: message
                });
            });
        },
        filterMenuClass: function filterMenuClass(route) {
            var className = '';
            var currentRoute = this.$router.currentRoute;

            var routeParams = jQuery.extend(true, {}, route.params);
            var currentRouteParams = jQuery.extend(true, {}, currentRoute.params);

            if (route.name === currentRoute.name && _.isEqual(routeParams, currentRouteParams)) {
                className = 'active';
            }

            return className;
        }
    },

    created: function created() {
        if (typeof localStorage != 'undefined') {
            this.currentView = localStorage.getItem("activeview") ? localStorage.getItem("activeview") : 'grid';
        } else {
            this.currentView = 'grid';
        }

        this.fetchModuels();
    }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var ListTable = dokan_get_lib('ListTable');
var Modal = dokan_get_lib('Modal');

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'Announcement',

    components: {
        ListTable: ListTable,
        Modal: Modal
    },

    data: function data() {
        return {
            requests: [],
            loading: false,

            status: {
                'publish': this.__('Published', 'dokan'),
                'pending': this.__('Pending', 'dokan'),
                'draft': this.__('Draft', 'dokan'),
                'trash': this.__('Trash', 'dokan')
            },

            counts: {
                all: 0,
                publish: 0,
                draft: 0,
                pending: 0,
                trash: 0
            },
            notFound: this.__('No announcement found.', 'dokan'),
            totalPages: 1,
            perPage: 10,
            totalItems: 0,

            showCb: true,

            columns: {
                'title': { label: this.__('Title', 'dokan') },
                'content': { label: this.__('Content', 'dokan') },
                'send_to': { label: this.__('Sent To', 'dokan') },
                'status': { label: this.__('Status', 'dokan') },
                'created_at': { label: this.__('Created Date', 'dokan') }
            },

            actionColumn: 'title',
            actions: [{
                key: 'edit',
                label: this.__('Edit', 'dokan')
            }, {
                key: 'trash',
                label: this.__('Trash', 'dokan')
            }, {
                key: 'delete',
                label: this.__('Permanent Delete', 'dokan')
            }, {
                key: 'restore',
                label: this.__('Restore', 'dokan')
            }],
            showDialog: false,
            modalContent: '',
            modalTitle: ''
        };
    },


    watch: {
        '$route.query.status': function $routeQueryStatus() {
            this.fetchAll();
        },
        '$route.query.page': function $routeQueryPage() {
            this.fetchAll();
        }
    },

    computed: {
        currentStatus: function currentStatus() {
            return this.$route.query.status || 'all';
        },
        currentPage: function currentPage() {
            var page = this.$route.query.page || 1;
            return parseInt(page);
        },
        bulkActions: function bulkActions() {
            if ('trash' == this.$route.query.status) {
                return [{
                    key: 'delete',
                    label: this.__('Permanent Delete', 'dokan')
                }, {
                    key: 'restore',
                    label: this.__('Restore', 'dokan')
                }];
            } else {
                return [{
                    key: 'trash',
                    label: this.__('Move in Trash', 'dokan')
                }];
            }
        }
    },

    methods: {
        updatedCounts: function updatedCounts(xhr) {
            this.counts.all = parseInt(xhr.getResponseHeader('X-Status-All'));
            this.counts.publish = parseInt(xhr.getResponseHeader('X-Status-Publish'));
            this.counts.pending = parseInt(xhr.getResponseHeader('X-Status-Pending'));
            this.counts.draft = parseInt(xhr.getResponseHeader('X-Status-Draft'));
            this.counts.trash = parseInt(xhr.getResponseHeader('X-Status-Trash'));
        },
        updatePagination: function updatePagination(xhr) {
            this.totalPages = parseInt(xhr.getResponseHeader('X-WP-TotalPages'));
            this.totalItems = parseInt(xhr.getResponseHeader('X-WP-Total'));
        },
        fetchAll: function fetchAll() {
            var _this = this;

            this.loading = true;

            dokan.api.get('/announcement?per_page=' + this.perPage + '&page=' + this.currentPage + '&status=' + this.currentStatus).done(function (response, status, xhr) {
                _this.requests = response;
                _this.loading = false;

                _this.updatedCounts(xhr);
                _this.updatePagination(xhr);
            });
        },
        showContent: function showContent(row) {
            this.modalTitle = row.title;
            this.modalContent = row.content;
            this.showDialog = true;
        },
        moment: function (_moment) {
            function moment(_x) {
                return _moment.apply(this, arguments);
            }

            moment.toString = function () {
                return _moment.toString();
            };

            return moment;
        }(function (date) {
            return moment(date);
        }),
        editUrl: function editUrl(id) {
            return dokan.urls.adminRoot + 'admin.php?page=dokan#/announcement/' + id + '/edit';
        },
        goToPage: function goToPage(page) {
            this.$router.push({
                name: 'Announcement',
                query: {
                    status: this.currentStatus,
                    page: page
                }
            });
        },
        onActionClick: function onActionClick(action, row) {},
        rowAction: function rowAction(action, data) {
            var _this2 = this;

            if (!data.row.id) {
                alert(this.__('No data found', 'dokan'));
                return;
            }

            if ('trash' === action || 'delete' === action) {
                this.loading = true;

                var isPermanentDelete = 'delete' === action ? '?force=true' : '';

                dokan.api.delete('/announcement/' + data.row.id + isPermanentDelete).done(function (response, status, xhr) {
                    _this2.fetchAll();
                    _this2.loading = false;
                });
            }

            if ('restore' === action) {
                this.loading = true;
                var jsonData = {};

                dokan.api.put('/announcement/' + data.row.id + '/restore').done(function (response, status, xhr) {
                    _this2.fetchAll();
                    _this2.loading = false;
                }).error(function (response, status, xhr) {
                    console.log(response);
                });
            }
        },
        onBulkAction: function onBulkAction(action, items) {
            var _this3 = this;

            if ('trash' === action) {
                this.loading = true;

                var jsonData = {};
                jsonData.trash = items;

                dokan.api.put('/announcement/batch', jsonData).done(function (response, status, xhr) {
                    _this3.fetchAll();
                    _this3.loading = false;
                });
            }

            if ('delete' === action) {
                this.loading = true;

                var _jsonData = {};
                _jsonData.delete = items;

                dokan.api.put('/announcement/batch', _jsonData).done(function (response, status, xhr) {
                    _this3.fetchAll();
                    _this3.loading = false;
                });
            }

            if ('restore' === action) {
                this.loading = true;
                var _jsonData2 = {};
                _jsonData2.restore = items;

                dokan.api.put('/announcement/batch', _jsonData2).done(function (response, status, xhr) {
                    _this3.fetchAll();
                    _this3.loading = false;
                });
            }
        }
    },

    created: function created() {
        this.fetchAll();
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var TextEditor = dokan_get_lib('TextEditor');
var Postbox = dokan_get_lib('Postbox');

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'NewAnnouncement',

    components: {
        Postbox: Postbox,
        TextEditor: TextEditor
    },

    data: function data() {
        return {
            announcement: {
                title: '',
                content: '',
                status: 'publish',
                sender_type: 'all_seller',
                sender_ids: []
            },
            message: '',
            isSaved: false,
            loadSpinner: false,
            isLoading: false,
            draftBtnLabel: this.__('Save as Draft', 'dokan'),
            publishBtnLabel: this.__('Send', 'dokan'),
            vendors: []
        };
    },


    computed: {
        submitBtnLabel: function submitBtnLabel() {
            return this.statusesLabel[this.announcement.status];
        }
    },

    methods: {
        limitText: function limitText(count) {
            return 'and ' + count + ' other vendors';
        },
        asyncFind: function asyncFind(query) {
            var _this = this;

            this.isLoading = true;
            dokan.api.get('/stores' + '?search=' + query).done(function (response) {
                _this.isLoading = false;
                _this.vendors = _.map(response, function (item) {
                    return {
                        id: item.id,
                        name: item.store_name + '( ' + item.email + ' )'
                    };
                });
            });
        },
        clearAll: function clearAll() {
            this.announcement.sender_ids = [];
        },
        createAnnouncement: function createAnnouncement(status) {
            var _this2 = this;

            var self = this;
            this.loadSpinner = true;
            var jsonData = {};
            jsonData = jQuery.extend({}, this.announcement);

            jsonData.sender_ids = _.pluck(jsonData.sender_ids, 'id');
            jsonData.status = status;

            dokan.api.post('/announcement', jsonData).done(function (response) {
                _this2.isSaved = false;
                _this2.loadSpinner = false;

                if ('draft' == status) {
                    _this2.$router.push({
                        name: 'EditAnnouncement',
                        params: { id: response.id }
                    });
                } else {
                    _this2.$router.push({
                        name: 'Announcement'
                    });
                }
            }).error(function (response) {
                _this2.isSaved = false;
                alert(response.responseJSON.message);
            });
        }
    }

});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var TextEditor = dokan_get_lib('TextEditor');
var Postbox = dokan_get_lib('Postbox');

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'EditAnnouncement',

    components: {
        Postbox: Postbox,
        TextEditor: TextEditor
    },

    data: function data() {
        return {
            announcement: {},
            loadSpinner: false,
            isSaved: false,
            isUpdated: false,
            isLoading: false,
            draftBtnLabel: this.__('Save as Draft', 'dokan'),
            publishBtnLabel: this.__('Send', 'dokan'),
            message: '',
            vendors: []
        };
    },


    methods: {
        limitText: function limitText(count) {
            return 'and ' + count + ' other vendors';
        },
        asyncFind: function asyncFind(query) {
            var _this = this;

            this.isLoading = true;
            dokan.api.get('/stores' + '?search=' + query).done(function (response) {
                _this.isLoading = false;
                _this.vendors = _.map(response, function (item) {
                    return {
                        id: item.id,
                        name: item.store_name + '( ' + item.email + ' )'
                    };
                });
            });
        },
        clearAll: function clearAll() {
            this.announcement.sender_ids = [];
        },
        fetchAnnouncement: function fetchAnnouncement() {
            var _this2 = this;

            dokan.api.get('/announcement/' + this.$route.params.id).done(function (response) {
                _this2.announcement = response;
            }).error(function (response) {
                alert(response.responseJSON.message);
            });
        },
        updateAnnouncement: function updateAnnouncement(status) {
            var _this3 = this;

            this.loadSpinner = true;
            var jsonData = {};
            jsonData = jQuery.extend({}, this.announcement);

            jsonData.sender_ids = _.pluck(jsonData.sender_ids, 'id');
            jsonData.status = status;

            dokan.api.put('/announcement/' + this.$route.params.id, jsonData).done(function (response) {
                _this3.loadSpinner = false;
                _this3.isSaved = true;
                _this3.message = _this3.__('Announcement draft successfully', 'dokan');
                if ('draft' == status) {
                    _this3.$router.push({
                        name: 'EditAnnouncement',
                        params: { id: response.id }
                    });
                } else {
                    _this3.loadSpinner = false;
                    _this3.$router.push({
                        name: 'Announcement'
                    });
                }
            }).error(function (response) {
                _this3.loadSpinner = false;
                _this3.isSaved = true;
                _this3.message = response.responseJSON.message;
            });
        }
    },

    created: function created() {
        this.fetchAnnouncement();
    }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var ListTable = dokan_get_lib('ListTable');

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Refund',

    components: {
        ListTable: ListTable
    },

    data: function data() {
        return {
            requests: [],
            loading: false,

            counts: {
                pending: 0,
                approved: 0,
                cancelled: 0
            },
            totalPages: 1,
            perPage: 10,
            totalItems: 0,
            notFound: this.__('No request found.', 'dokan'),
            columns: {
                'order_id': { label: this.__('Order ID', 'dokan') },
                'vendor': { label: this.__('Vendor', 'dokan') },
                'amount': { label: this.__('Refund Amount', 'dokan') },
                'reason': { label: this.__('Refund Reason', 'dokan') },
                'method': { label: this.__('Payment Gateway', 'dokan') },
                'date': { label: this.__('Date', 'dokan') }
            },

            actionColumn: 'order_id',
            actions: [{
                key: 'approved',
                label: this.__('Approve Refund', 'dokan')
            }, {
                key: 'cancelled',
                label: this.__('Cancel', 'dokan')
            }, {
                key: 'delete',
                label: this.__('Delete', 'dokan')
            }]
        };
    },


    computed: {
        currentStatus: function currentStatus() {
            return this.$route.query.status || 'all';
        },
        currentPage: function currentPage() {
            var page = this.$route.query.page || 1;
            return parseInt(page);
        },
        bulkActions: function bulkActions() {
            if ('pending' == this.$route.query.status) {
                return [{
                    key: 'approved',
                    label: this.__('Approve Refund', 'dokan')
                }, {
                    key: 'cancelled',
                    label: this.__('Cancel', 'dokan')
                }];
            } else {
                return [{
                    key: 'delete',
                    label: this.__('Delete', 'dokan')
                }];
            }
        }
    },

    watch: {
        '$route.query.status': function $routeQueryStatus() {
            this.fetchRefunds();
        },
        '$route.query.page': function $routeQueryPage() {
            this.fetchRefunds();
        }
    },

    methods: {
        updatedCounts: function updatedCounts(xhr) {
            this.counts.pending = parseInt(xhr.getResponseHeader('X-Status-Pending'));
            this.counts.approved = parseInt(xhr.getResponseHeader('X-Status-Completed'));
            this.counts.cancelled = parseInt(xhr.getResponseHeader('X-Status-Cancelled'));
        },
        updatePagination: function updatePagination(xhr) {
            this.totalPages = parseInt(xhr.getResponseHeader('X-WP-TotalPages'));
            this.totalItems = parseInt(xhr.getResponseHeader('X-WP-Total'));
        },
        fetchRefunds: function fetchRefunds() {
            var _this = this;

            this.loading = true;

            dokan.api.get('/refund?per_page=' + this.perPage + '&page=' + this.currentPage + '&status=' + this.currentStatus).done(function (response, status, xhr) {
                _this.requests = response;
                _this.loading = false;

                _this.updatedCounts(xhr);
                _this.updatePagination(xhr);
            });
        },
        moment: function (_moment) {
            function moment(_x) {
                return _moment.apply(this, arguments);
            }

            moment.toString = function () {
                return _moment.toString();
            };

            return moment;
        }(function (date) {
            return moment(date);
        }),
        orderUrl: function orderUrl(id) {
            return dokan.urls.adminRoot + 'post.php?post=' + id + '&action=edit';
        },
        vendorUrl: function vendorUrl(id) {
            return dokan.urls.adminRoot + 'admin.php?page=dokan#/vendors/' + id;
        },
        goToPage: function goToPage(page) {
            this.$router.push({
                name: 'Refund',
                query: {
                    status: this.currentStatus,
                    page: page
                }
            });
        },
        onActionClick: function onActionClick(action, row) {
            console.log(action, row);
        },
        rowAction: function rowAction(action, data) {
            var _this2 = this;

            this.loading = true;
            var jsonData = {};
            jsonData.id = data.row.id;
            jsonData.order_id = data.row.order_id;

            if ('approved' === action) {
                jsonData.status = 'approved';
                dokan.api.put('/refund/' + data.row.id, jsonData).done(function (response, status, xhr) {
                    _this2.fetchRefunds();
                    _this2.loading = false;
                });
            } else if ('cancelled' == action) {
                jsonData.status = 'cancelled';
                dokan.api.put('/refund/' + data.row.id, jsonData).done(function (response, status, xhr) {
                    _this2.fetchRefunds();
                    _this2.loading = false;
                });
            } else if ('delete' == action) {
                dokan.api.delete('/refund/' + data.row.id).done(function (response, status, xhr) {
                    _this2.fetchRefunds();
                    _this2.loading = false;
                });
            }
        },
        onBulkAction: function onBulkAction(action, items) {
            var _this3 = this;

            this.loading = true;
            var jsonData = {};
            jsonData[action] = items;

            console.log(jsonData);

            dokan.api.put('/refund/batch', jsonData).done(function (response, status, xhr) {
                _this3.fetchRefunds();
                _this3.loading = false;
            });
        }
    },

    created: function created() {
        this.fetchRefunds();
    }
});

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Vendors = __webpack_require__(23);

var _Vendors2 = _interopRequireDefault(_Vendors);

var _VendorSingle = __webpack_require__(26);

var _VendorSingle2 = _interopRequireDefault(_VendorSingle);

var _Modules = __webpack_require__(29);

var _Modules2 = _interopRequireDefault(_Modules);

var _Announcement = __webpack_require__(32);

var _Announcement2 = _interopRequireDefault(_Announcement);

var _NewAnnouncement = __webpack_require__(35);

var _NewAnnouncement2 = _interopRequireDefault(_NewAnnouncement);

var _EditAnnouncement = __webpack_require__(38);

var _EditAnnouncement2 = _interopRequireDefault(_EditAnnouncement);

var _Refund = __webpack_require__(41);

var _Refund2 = _interopRequireDefault(_Refund);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dokan_add_route(_Vendors2.default);
dokan_add_route(_VendorSingle2.default);
dokan_add_route(_Modules2.default);
dokan_add_route(_Announcement2.default);
dokan_add_route(_NewAnnouncement2.default);
dokan_add_route(_EditAnnouncement2.default);
dokan_add_route(_Refund2.default);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Vendors_vue__ = __webpack_require__(4);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a477aab_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Vendors_vue__ = __webpack_require__(25);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(24)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Vendors_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a477aab_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Vendors_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin/components/Vendors.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a477aab", Component.options)
  } else {
    hotAPI.reload("data-v-7a477aab", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "vendor-list" },
    [
      _c("h1", { staticClass: "wp-heading-inline" }, [
        _vm._v(_vm._s(_vm.__("Vendors", "dokan")))
      ]),
      _vm._v(" "),
      _c("hr", { staticClass: "wp-header-end" }),
      _vm._v(" "),
      _c("ul", { staticClass: "subsubsub" }, [
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Vendors", query: { status: "all" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__("All <span class='count'>(%s)</span>", "dokan"),
                    _vm.counts.all
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Vendors", query: { status: "approved" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__("Approved <span class='count'>(%s)</span>", "dokan"),
                    _vm.counts.approved
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Vendors", query: { status: "pending" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__("Pending <span class='count'>(%s)</span>", "dokan"),
                    _vm.counts.pending
                  )
                )
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("list-table", {
        attrs: {
          columns: _vm.columns,
          loading: _vm.loading,
          rows: _vm.vendors,
          actions: _vm.actions,
          actionColumn: "store_name",
          "show-cb": _vm.showCb,
          "total-items": _vm.totalItems,
          "bulk-actions": _vm.bulkActions,
          "total-pages": _vm.totalPages,
          "per-page": _vm.perPage,
          "current-page": _vm.currentPage,
          "action-column": _vm.actionColumn,
          "not-found": "No vendors found.",
          "sort-by": _vm.sortBy,
          "sort-order": _vm.sortOrder
        },
        on: {
          sort: _vm.sortCallback,
          pagination: _vm.goToPage,
          "action:click": _vm.onActionClick,
          "bulk:click": _vm.onBulkAction
        },
        scopedSlots: _vm._u([
          {
            key: "store_name",
            fn: function(data) {
              return [
                _c("img", {
                  attrs: {
                    src: data.row.gravatar,
                    alt: data.row.store_name,
                    width: "50"
                  }
                }),
                _vm._v(" "),
                _c(
                  "strong",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/vendors/" + data.row.id } },
                      [
                        _vm._v(
                          _vm._s(
                            data.row.store_name
                              ? data.row.store_name
                              : _vm.__("(no name)", "dokan")
                          )
                        )
                      ]
                    )
                  ],
                  1
                )
              ]
            }
          },
          {
            key: "email",
            fn: function(data) {
              return [
                _c("a", { attrs: { href: "mailto:" + data.row.email } }, [
                  _vm._v(_vm._s(data.row.email))
                ])
              ]
            }
          },
          {
            key: "registered",
            fn: function(data) {
              return [
                _vm._v(
                  "\n            " +
                    _vm._s(
                      _vm.moment(data.row.registered).format("MMM D, YYYY")
                    ) +
                    "\n        "
                )
              ]
            }
          },
          {
            key: "enabled",
            fn: function(data) {
              return [
                _c("switches", {
                  attrs: { enabled: data.row.enabled, value: data.row.id },
                  on: { input: _vm.onSwitch }
                })
              ]
            }
          },
          {
            key: "row-actions",
            fn: function(data) {
              return _vm._l(_vm.actions, function(action, index) {
                return _c(
                  "span",
                  { class: action.key },
                  [
                    action.key == "edit"
                      ? _c("a", { attrs: { href: _vm.editUrl(data.row.id) } }, [
                          _vm._v(_vm._s(action.label))
                        ])
                      : action.key == "products"
                        ? _c(
                            "a",
                            { attrs: { href: _vm.productUrl(data.row.id) } },
                            [_vm._v(_vm._s(action.label))]
                          )
                        : action.key == "orders"
                          ? _c(
                              "a",
                              { attrs: { href: _vm.ordersUrl(data.row.id) } },
                              [_vm._v(_vm._s(action.label))]
                            )
                          : _c("a", { attrs: { href: "#" } }, [
                              _vm._v(_vm._s(action.label))
                            ]),
                    _vm._v(" "),
                    index !== _vm.actions.length - 1
                      ? [_vm._v(" | ")]
                      : _vm._e()
                  ],
                  2
                )
              })
            }
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7a477aab", esExports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VendorSingle_vue__ = __webpack_require__(5);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_849fac40_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VendorSingle_vue__ = __webpack_require__(28);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VendorSingle_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_849fac40_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VendorSingle_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin/components/VendorSingle.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-849fac40", Component.options)
  } else {
    hotAPI.reload("data-v-849fac40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "dokan-vendor-single" },
    [
      _c("div", { staticStyle: { "margin-bottom": "10px" } }, [
        _c(
          "a",
          {
            staticClass: "button",
            attrs: { href: "javascript:history.go(-1)" }
          },
          [_vm._v("← " + _vm._s(_vm.__("Go Back", "dokan")))]
        )
      ]),
      _vm._v(" "),
      _vm.showDialog
        ? _c(
            "modal",
            {
              attrs: { title: _vm.__("Send Email", "dokan") },
              on: {
                close: function($event) {
                  _vm.showDialog = false
                }
              }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { staticClass: "form-row" }, [
                  _c("label", { attrs: { for: "mailto" } }, [
                    _vm._v(_vm._s(_vm.__("To", "dokan")))
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    attrs: { type: "text", id: "mailto", disabled: "disabled" },
                    domProps: { value: _vm.mailTo }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-row" }, [
                  _c("label", { attrs: { for: "subject" } }, [
                    _vm._v(_vm._s(_vm.__("Subject", "dokan")))
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.mail.subject,
                        expression: "mail.subject"
                      }
                    ],
                    attrs: { type: "text", id: "subject" },
                    domProps: { value: _vm.mail.subject },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.mail, "subject", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-row" }, [
                  _c("label", { attrs: { for: "message" } }, [
                    _vm._v(_vm._s(_vm.__("Message", "dokan")))
                  ]),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.mail.body,
                        expression: "mail.body"
                      }
                    ],
                    attrs: { id: "message", rows: "5", cols: "60" },
                    domProps: { value: _vm.mail.body },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.mail, "body", $event.target.value)
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("template", { slot: "footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "button button-primary button-large",
                    on: {
                      click: function($event) {
                        _vm.sendEmail()
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.__("Send Email", "dokan")))]
                )
              ])
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.store.id
        ? _c("div", { staticClass: "vendor-profile" }, [
            _c("section", { staticClass: "vendor-header" }, [
              _c("div", { staticClass: "profile-info" }, [
                _vm.store.featured
                  ? _c("div", { staticClass: "featured-vendor" }, [
                      _c("span", {
                        staticClass: "dashicons dashicons-star-filled",
                        attrs: { title: "Featured Vendor" }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "profile-icon" }, [
                  _c("img", {
                    attrs: {
                      src: _vm.store.gravatar,
                      alt: _vm.store.store_name
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "store-info" }, [
                  _c("h2", { staticClass: "store-name" }, [
                    _vm._v(
                      _vm._s(
                        _vm.store.store_name
                          ? _vm.store.store_name
                          : _vm.__("(No Name)", "dokan")
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "star-rating" },
                    _vm._l(5, function(i) {
                      return _c("span", {
                        class: [
                          "dashicons",
                          i <= _vm.store.rating.rating ? "active" : ""
                        ]
                      })
                    })
                  ),
                  _vm._v(" "),
                  _c("ul", { staticClass: "store-details" }, [
                    _c("li", { staticClass: "address" }, [
                      _c("span", { staticClass: "street_1" }, [
                        _vm._v(_vm._s(_vm.store.address.street_1) + ", ")
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "city" }, [
                        _vm._v(_vm._s(_vm.store.address.city) + ", ")
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "state-zip" }, [
                        _vm._v(
                          _vm._s(_vm.store.address.state) +
                            " " +
                            _vm._s(_vm.store.address.zip)
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", { staticClass: "phone" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.store.phone ? _vm.store.phone : "—") +
                          "\n                        "
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "actions" }, [
                    _c(
                      "button",
                      {
                        staticClass: "button message",
                        on: {
                          click: function($event) {
                            _vm.messageDialog()
                          }
                        }
                      },
                      [
                        _c("span", {
                          staticClass: "dashicons dashicons-email"
                        }),
                        _vm._v(" " + _vm._s(_vm.__("Send Email", "dokan")))
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        class: [
                          "button",
                          "status",
                          _vm.store.enabled ? "enabled" : "disabled"
                        ]
                      },
                      [
                        _c("span", { staticClass: "dashicons" }),
                        _vm._v(
                          " " +
                            _vm._s(
                              _vm.store.enabled
                                ? _vm.__("Enabled", "dokan")
                                : _vm.__("Disabled", "dokan")
                            )
                        )
                      ]
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "profile-banner" }, [
                _c("div", { staticClass: "banner-wrap" }, [
                  _vm.store.banner
                    ? _c("img", {
                        attrs: {
                          src: _vm.store.banner,
                          alt: _vm.store.store_name
                        }
                      })
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "action-links" }, [
                  _c(
                    "a",
                    {
                      staticClass: "button visit-store",
                      attrs: { href: _vm.store.shop_url, target: "_blank" }
                    },
                    [
                      _vm._v(_vm._s(_vm.__("Visit Store", "dokan")) + " "),
                      _c("span", {
                        staticClass: "dashicons dashicons-arrow-right-alt"
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "button edit-store",
                      attrs: { href: _vm.editUrl() }
                    },
                    [_c("span", { staticClass: "dashicons dashicons-edit" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _vm.stats !== null
              ? _c("section", { staticClass: "vendor-summary" }, [
                  _c("div", { staticClass: "summary-wrap products-revenue" }, [
                    _c("div", { staticClass: "stat-summary products" }, [
                      _c("h3", [_vm._v(_vm._s(_vm.__("Products", "dokan")))]),
                      _vm._v(" "),
                      _c("ul", { staticClass: "counts" }, [
                        _c("li", { staticClass: "products" }, [
                          _c("span", { staticClass: "count" }, [
                            _c("a", { attrs: { href: _vm.productUrl() } }, [
                              _vm._v(_vm._s(_vm.stats.products.total))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Total Products", "dokan")))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "items" }, [
                          _c("span", { staticClass: "count" }, [
                            _vm._v(_vm._s(_vm.stats.products.sold))
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Items Sold", "dokan")))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "visitors" }, [
                          _c("span", { staticClass: "count" }, [
                            _vm._v(_vm._s(_vm.stats.products.visitor))
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Store Visitors", "dokan")))
                          ])
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "stat-summary revenue" }, [
                      _c("h3", [_vm._v(_vm._s(_vm.__("Revenue", "dokan")))]),
                      _vm._v(" "),
                      _c("ul", { staticClass: "counts" }, [
                        _c("li", { staticClass: "orders" }, [
                          _c("span", { staticClass: "count" }, [
                            _c("a", { attrs: { href: _vm.ordersUrl() } }, [
                              _vm._v(_vm._s(_vm.stats.revenue.orders))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Orders Processed", "dokan")))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "gross" }, [
                          _c("span", { staticClass: "count" }, [
                            _vm._v(
                              _vm._s(
                                _vm._f("currency")(_vm.stats.revenue.sales)
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Gross Sales", "dokan")))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "earning" }, [
                          _c("span", { staticClass: "count" }, [
                            _vm._v(
                              _vm._s(
                                _vm._f("currency")(_vm.stats.revenue.earning)
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Total Earning", "dokan")))
                          ])
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "stat-summary others" }, [
                      _c("h3", [_vm._v(_vm._s(_vm.__("Others", "dokan")))]),
                      _vm._v(" "),
                      _c("ul", { staticClass: "counts" }, [
                        _c("li", { staticClass: "commision" }, [
                          _c("span", { staticClass: "count" }, [
                            _vm._v(
                              _vm._s(_vm.stats.others.commision_rate) + "%"
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Earning Rate", "dokan")))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "balance" }, [
                          _c("span", { staticClass: "count" }, [
                            _vm._v(
                              _vm._s(
                                _vm._f("currency")(_vm.stats.others.balance)
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Current Balance", "dokan")))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "reviews" }, [
                          _c("span", { staticClass: "count" }, [
                            _vm._v(_vm._s(_vm.stats.others.reviews))
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subhead" }, [
                            _vm._v(_vm._s(_vm.__("Reviews", "dokan")))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "vendor-info" }, [
                    _c("ul", [
                      _c("li", { staticClass: "registered" }, [
                        _c("div", { staticClass: "subhead" }, [
                          _vm._v(_vm._s(_vm.__("Registered Since", "dokan")))
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "date" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(
                                _vm
                                  .moment(_vm.store.registered)
                                  .format("MMM D, YYYY")
                              ) +
                              "\n                            (" +
                              _vm._s(
                                _vm.moment(_vm.store.registered).toNow(true)
                              ) +
                              ")\n                        "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("li", { staticClass: "social-profiles" }, [
                        _c("div", { staticClass: "subhead" }, [
                          _vm._v(_vm._s(_vm.__("Social Profiles", "dokan")))
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "profiles" }, [
                          _c(
                            "a",
                            {
                              class: { active: _vm.isSocialActive("fb") },
                              attrs: {
                                href: _vm.store.social.fb,
                                target: "_blank"
                              }
                            },
                            [
                              _c("span", {
                                staticClass: "flaticon-facebook-logo"
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              class: { active: _vm.isSocialActive("flickr") },
                              attrs: {
                                href: _vm.store.social.flickr,
                                target: "_blank"
                              }
                            },
                            [
                              _c("span", {
                                staticClass:
                                  "flaticon-flickr-website-logo-silhouette"
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              class: { active: _vm.isSocialActive("twitter") },
                              attrs: {
                                href: _vm.store.social.twitter,
                                target: "_blank"
                              }
                            },
                            [
                              _c("span", {
                                staticClass: "flaticon-twitter-logo-silhouette"
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              class: { active: _vm.isSocialActive("gplus") },
                              attrs: {
                                href: _vm.store.social.gplus,
                                target: "_blank"
                              }
                            },
                            [
                              _c("span", {
                                staticClass: "flaticon-google-plus"
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              class: {
                                active: _vm.isSocialActive("instagram")
                              },
                              attrs: {
                                href: _vm.store.social.instagram,
                                target: "_blank"
                              }
                            },
                            [_c("span", { staticClass: "flaticon-instagram" })]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              class: { active: _vm.isSocialActive("youtube") },
                              attrs: {
                                href: _vm.store.social.youtube,
                                target: "_blank"
                              }
                            },
                            [_c("span", { staticClass: "flaticon-youtube" })]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              class: { active: _vm.isSocialActive("linkedin") },
                              attrs: {
                                href: _vm.store.social.linkedin,
                                target: "_blank"
                              }
                            },
                            [
                              _c("span", {
                                staticClass: "flaticon-linkedin-logo"
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              class: {
                                active: _vm.isSocialActive("pinterest")
                              },
                              attrs: {
                                href: _vm.store.social.pinterest,
                                target: "_blank"
                              }
                            },
                            [
                              _c("span", {
                                staticClass: "flaticon-pinterest-logo"
                              })
                            ]
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("li", { staticClass: "payments" }, [
                        _c("div", { staticClass: "subhead" }, [
                          _vm._v(_vm._s(_vm.__("Payment Methods", "dokan")))
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "payment-methods" }, [
                          _c("span", {
                            class: [
                              "flaticon-money",
                              _vm.hasPaymentEmail("paypal") ? "active" : ""
                            ],
                            attrs: { title: _vm.__("PayPal Payment", "dokan") }
                          }),
                          _vm._v(" "),
                          _c("span", {
                            staticClass: "flaticon-stripe-logo",
                            attrs: { title: _vm.__("Stripe Connect", "dokan") }
                          }),
                          _vm._v(" "),
                          _c("span", {
                            class: [
                              "flaticon-bank-building",
                              _vm.hasBank ? "active" : ""
                            ],
                            attrs: { title: _vm.__("Bank Payment", "dokan") }
                          }),
                          _vm._v(" "),
                          _c("span", {
                            class: [
                              "flaticon-skrill-pay-logo",
                              _vm.hasPaymentEmail("skrill") ? "active" : ""
                            ],
                            attrs: { title: _vm.__("Skrill", "dokan") }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("li", { staticClass: "publishing" }, [
                        _c("div", { staticClass: "subhead" }, [
                          _vm._v(_vm._s(_vm.__("Product Publishing", "dokan")))
                        ]),
                        _vm._v(" "),
                        _vm.store.trusted
                          ? _c("span", [
                              _c("span", {
                                staticClass: "dashicons dashicons-shield"
                              }),
                              _vm._v(" " + _vm._s(_vm.__("Direct", "dokan")))
                            ])
                          : _c("span", [
                              _c("span", {
                                staticClass: "dashicons dashicons-backup"
                              }),
                              _vm._v(
                                " " + _vm._s(_vm.__("Requires Review", "dokan"))
                              )
                            ])
                      ])
                    ])
                  ])
                ])
              : _vm._e()
          ])
        : _c("vcl-twitch", { attrs: { height: "300", primary: "#ffffff" } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-849fac40", esExports)
  }
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Modules_vue__ = __webpack_require__(6);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f819007_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Modules_vue__ = __webpack_require__(31);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(30)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Modules_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f819007_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Modules_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin/components/Modules.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f819007", Component.options)
  } else {
    hotAPI.reload("data-v-2f819007", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "dokan-modules-wrap" }, [
    _c("h1", [_vm._v(_vm._s(_vm.__("Modules", "dokan")))]),
    _vm._v(" "),
    _c("div", { staticClass: "wp-filter module-filter" }, [
      _c("div", { staticClass: "filter-items" }, [
        _c(
          "ul",
          _vm._l(_vm.filterMenu, function(menu, index) {
            return _c(
              "li",
              { key: index, class: [_vm.filterMenuClass(menu.route)] },
              [
                _c("router-link", { attrs: { to: menu.route } }, [
                  _vm._v(
                    "\n                           " +
                      _vm._s(menu.title) +
                      "\n                       "
                  )
                ])
              ],
              1
            )
          })
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "search-form" }, [
        _c("div", { staticClass: "view-switch" }, [
          _c(
            "a",
            {
              staticClass: "view-grid",
              class: { current: _vm.currentView == "grid" },
              attrs: { href: "#", id: "view-switch-grid" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.changeView("grid")
                }
              }
            },
            [
              _c("span", { staticClass: "screen-reader-text" }, [
                _vm._v("Grid View")
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "a",
            {
              staticClass: "view-list",
              class: { current: _vm.currentView == "list" },
              attrs: { href: "#", id: "view-switch-list" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.changeView("list")
                }
              }
            },
            [
              _c("span", { staticClass: "screen-reader-text" }, [
                _vm._v("List View")
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c(
          "label",
          {
            staticClass: "screen-reader-text",
            attrs: { for: "media-search-input" }
          },
          [_vm._v("Search Media")]
        ),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.search,
              expression: "search"
            }
          ],
          staticClass: "search",
          attrs: {
            type: "search",
            placeholder: "Search Module...",
            id: "media-search-input"
          },
          domProps: { value: _vm.search },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.search = $event.target.value
            }
          }
        })
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "module-content" },
      [
        _vm.isLoaded
          ? [
              _vm.currentView == "list"
                ? _c("list-table", {
                    attrs: {
                      columns: _vm.column,
                      loading: false,
                      rows: _vm.filteredModules,
                      actions: [],
                      "show-cb": true,
                      "not-found": "No module found.",
                      "bulk-actions": [
                        {
                          key: "activate",
                          label: "Activate"
                        },
                        {
                          key: "deactivate",
                          label: "Deactivate"
                        }
                      ],
                      "sort-by": _vm.sortBy,
                      "sort-order": _vm.sortOrder,
                      "action-column": "name"
                    },
                    on: {
                      sort: _vm.sortCallback,
                      "bulk:click": _vm.onBulkAction
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "name",
                        fn: function(data) {
                          return [
                            _c("img", {
                              attrs: {
                                src: data.row.thumbnail,
                                alt: data.row.name,
                                width: "50"
                              }
                            }),
                            _vm._v(" "),
                            _c("strong", [
                              _c("a", { attrs: { href: "#" } }, [
                                _vm._v(_vm._s(data.row.name))
                              ])
                            ])
                          ]
                        }
                      },
                      {
                        key: "active",
                        fn: function(data) {
                          return [
                            _c("switches", {
                              attrs: {
                                enabled: data.row.active,
                                value: data.row.slug
                              },
                              on: { input: _vm.onSwitch }
                            })
                          ]
                        }
                      }
                    ])
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.currentView == "grid"
                ? _c(
                    "div",
                    { staticClass: "wp-list-table widefat dokan-modules" },
                    [
                      _vm.filteredModules.length > 0
                        ? _vm._l(_vm.filteredModules, function(module) {
                            return _c("div", { staticClass: "plugin-card" }, [
                              _c("div", { staticClass: "plugin-card-top" }, [
                                _c("div", { staticClass: "name column-name" }, [
                                  _c("h3", [
                                    _c("span", { staticClass: "plugin-name" }, [
                                      _vm._v(_vm._s(module.name))
                                    ]),
                                    _vm._v(" "),
                                    _c("img", {
                                      staticClass: "plugin-icon",
                                      attrs: {
                                        src: module.thumbnail,
                                        alt: module.name
                                      }
                                    })
                                  ])
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "action-links" }, [
                                  _c(
                                    "ul",
                                    { staticClass: "plugin-action-buttons" },
                                    [
                                      _c(
                                        "li",
                                        {
                                          attrs: { "data-module": module.slug }
                                        },
                                        [
                                          _c("switches", {
                                            attrs: {
                                              enabled: module.active,
                                              value: module.slug
                                            },
                                            on: { input: _vm.onSwitch }
                                          })
                                        ],
                                        1
                                      )
                                    ]
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "desc column-description" },
                                  [
                                    _c("p", {
                                      domProps: {
                                        innerHTML: _vm._s(module.description)
                                      }
                                    })
                                  ]
                                )
                              ])
                            ])
                          })
                        : [
                            _c(
                              "div",
                              {
                                staticClass: "notice notice-info",
                                attrs: { id: "message" }
                              },
                              [
                                _c("p", [
                                  _c("strong", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("No modules found.", "dokan")
                                      )
                                    )
                                  ])
                                ])
                              ]
                            )
                          ]
                    ],
                    2
                  )
                : _vm._e()
            ]
          : _c("div", { staticClass: "loading" }, [_c("loading")], 1)
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2f819007", esExports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Announcement_vue__ = __webpack_require__(7);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b4865812_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Announcement_vue__ = __webpack_require__(34);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(33)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Announcement_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b4865812_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Announcement_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin/components/Announcement.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b4865812", Component.options)
  } else {
    hotAPI.reload("data-v-b4865812", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "dokan-announcement-wrapper" },
    [
      _c("h1", { staticClass: "wp-heading-inline" }, [
        _vm._v(_vm._s(_vm.__("Announcement", "dokan")))
      ]),
      _vm._v(" "),
      _c(
        "router-link",
        {
          staticClass: "page-title-action",
          attrs: { to: { name: "NewAnnouncement" } }
        },
        [_vm._v(_vm._s(_vm.__("Add Announcement", "dokan")))]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "help-block" }, [
        _c("span", { staticClass: "help-text" }, [
          _c(
            "a",
            {
              attrs: {
                href: "https://wedevs.com/docs/dokan/announcements/",
                target: "_blank"
              }
            },
            [_vm._v(_vm._s(_vm.__("Need Any Help ?", "dokan")))]
          )
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "dashicons dashicons-smiley" })
      ]),
      _vm._v(" "),
      _c("hr", { staticClass: "wp-header-end" }),
      _vm._v(" "),
      _c("ul", { staticClass: "subsubsub" }, [
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Announcement" },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__("All <span class='count'>(%s)</span>", "dokan"),
                    _vm.counts.all
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Announcement", query: { status: "publish" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__(
                      "Published <span class='count'>(%s)</span>",
                      "dokan-lite"
                    ),
                    _vm.counts.publish
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Announcement", query: { status: "pending" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__(
                      "Pending <span class='count'>(%s)</span>",
                      "dokan-lite"
                    ),
                    _vm.counts.pending
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Announcement", query: { status: "draft" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__(
                      "Draft <span class='count'>(%s)</span>",
                      "dokan-lite"
                    ),
                    _vm.counts.draft
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Announcement", query: { status: "trash" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__(
                      "Trash <span class='count'>(%s)</span>",
                      "dokan-lite"
                    ),
                    _vm.counts.trash
                  )
                )
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("list-table", {
        attrs: {
          columns: _vm.columns,
          rows: _vm.requests,
          loading: _vm.loading,
          "action-column": _vm.actionColumn,
          actions: _vm.actions,
          "show-cb": _vm.showCb,
          "bulk-actions": _vm.bulkActions,
          "not-found": _vm.notFound,
          "total-pages": _vm.totalPages,
          "total-items": _vm.totalItems,
          "per-page": _vm.perPage,
          "current-page": _vm.currentPage
        },
        on: {
          pagination: _vm.goToPage,
          "action:click": _vm.onActionClick,
          "bulk:click": _vm.onBulkAction
        },
        scopedSlots: _vm._u([
          {
            key: "title",
            fn: function(data) {
              return [
                "publish" == data.row.status
                  ? _c("strong", [_vm._v(_vm._s(data.row.title))])
                  : _c("strong", [
                      _c("a", { attrs: { href: _vm.editUrl(data.row.id) } }, [
                        _vm._v(_vm._s(data.row.title))
                      ])
                    ])
              ]
            }
          },
          {
            key: "status",
            fn: function(data) {
              return [
                _c("span", { class: data.row.status }, [
                  _vm._v(_vm._s(_vm.status[data.row.status]))
                ])
              ]
            }
          },
          {
            key: "content",
            fn: function(data) {
              return [
                _c("span", { class: data.row.status }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.showContent(data.row)
                        }
                      }
                    },
                    [
                      _c("span", {
                        staticClass: "dashicons dashicons-visibility"
                      })
                    ]
                  )
                ])
              ]
            }
          },
          {
            key: "created_at",
            fn: function(data) {
              return [
                _vm._v(
                  "\n            " +
                    _vm._s(
                      _vm.moment(data.row.created_at).format("MMM D, YYYY")
                    ) +
                    "\n        "
                )
              ]
            }
          },
          {
            key: "send_to",
            fn: function(data) {
              return [
                "all_seller" === data.row.sender_type
                  ? _c("span", [_vm._v(_vm._s(_vm.__("All Vendor", "dokan")))])
                  : _vm._e(),
                _vm._v(" "),
                "selected_seller" === data.row.sender_type
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.__("Selected Vendor", "dokan")))
                    ])
                  : _vm._e()
              ]
            }
          },
          {
            key: "row-actions",
            fn: function(data) {
              return [
                _vm._l(_vm.actions, function(action, index) {
                  return [
                    action.key == "edit" && "publish" != data.row.status
                      ? _c(
                          "span",
                          { class: action.key },
                          [
                            _c(
                              "a",
                              { attrs: { href: _vm.editUrl(data.row.id) } },
                              [_vm._v(_vm._s(action.label))]
                            ),
                            _vm._v(" "),
                            index !== _vm.actions.length - 1
                              ? [_vm._v(" | ")]
                              : _vm._e()
                          ],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    action.key == "trash" && _vm.currentStatus != "trash"
                      ? _c("span", { class: action.key }, [
                          _c(
                            "a",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.rowAction(action.key, data)
                                }
                              }
                            },
                            [_vm._v(_vm._s(action.label))]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    action.key == "delete" && _vm.currentStatus == "trash"
                      ? _c(
                          "span",
                          { class: action.key },
                          [
                            _c(
                              "a",
                              {
                                attrs: { href: "#" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    _vm.rowAction(action.key, data)
                                  }
                                }
                              },
                              [_vm._v(_vm._s(action.label))]
                            ),
                            _vm._v(" "),
                            index !== _vm.actions.length - 1
                              ? [_vm._v(" | ")]
                              : _vm._e()
                          ],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    action.key == "restore" && _vm.currentStatus == "trash"
                      ? _c(
                          "span",
                          { class: action.key },
                          [
                            _c(
                              "a",
                              {
                                attrs: { href: "#" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    _vm.rowAction(action.key, data)
                                  }
                                }
                              },
                              [_vm._v(_vm._s(action.label))]
                            ),
                            _vm._v(" "),
                            index !== _vm.actions.length - 1
                              ? [_vm._v(" | ")]
                              : _vm._e()
                          ],
                          2
                        )
                      : _vm._e()
                  ]
                })
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _vm.showDialog
        ? _c(
            "modal",
            {
              attrs: { title: _vm.modalTitle, footer: false },
              on: {
                close: function($event) {
                  _vm.showDialog = false
                }
              }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { domProps: { innerHTML: _vm._s(_vm.modalContent) } })
              ])
            ],
            2
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b4865812", esExports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewAnnouncement_vue__ = __webpack_require__(8);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a129b87_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewAnnouncement_vue__ = __webpack_require__(37);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(36)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NewAnnouncement_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a129b87_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NewAnnouncement_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin/components/NewAnnouncement.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a129b87", Component.options)
  } else {
    hotAPI.reload("data-v-0a129b87", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "dokan-announcement-form-wrapper" }, [
    _c("h1", { staticClass: "wp-heading-inline" }, [
      _vm._v(_vm._s(_vm.__("Add New Announcement", "dokan")))
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "help-block" }, [
      _c("span", { staticClass: "help-text" }, [
        _c(
          "a",
          {
            attrs: {
              href: "https://wedevs.com/docs/dokan/announcements/",
              target: "_blank"
            }
          },
          [_vm._v(_vm._s(_vm.__("Need Any Help ?", "dokan")))]
        )
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "dashicons dashicons-smiley" })
    ]),
    _vm._v(" "),
    _c("hr", { staticClass: "wp-header-end" }),
    _vm._v(" "),
    _c("form", { attrs: { action: "", method: "post", id: "post" } }, [
      _c("div", { attrs: { id: "poststuff" } }, [
        _c(
          "div",
          {
            staticClass: "metabox-holder columns-2",
            attrs: { id: "post-body" }
          },
          [
            _c("div", { staticClass: "post-body-content" }, [
              _c("div", { attrs: { id: "titlediv" } }, [
                _c("div", { attrs: { id: "titlewrap" } }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.announcement.title,
                        expression: "announcement.title"
                      }
                    ],
                    attrs: {
                      type: "text",
                      name: "post_title",
                      size: "30",
                      id: "title",
                      autocomplete: "off",
                      placeholder: "Enter announcement title"
                    },
                    domProps: { value: _vm.announcement.title },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.announcement, "title", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "inside" })
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "postarea wp-editor-expand",
                  attrs: { id: "postdivrich" }
                },
                [
                  _c("text-editor", {
                    model: {
                      value: _vm.announcement.content,
                      callback: function($$v) {
                        _vm.$set(_vm.announcement, "content", $$v)
                      },
                      expression: "announcement.content"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "postbox-container",
                attrs: { id: "postbox-container-1" }
              },
              [
                _c(
                  "postbox",
                  {
                    attrs: {
                      title: _vm.__("Publish", "dokan"),
                      extraClass: "announcement-actions"
                    }
                  },
                  [
                    _c("div", { staticClass: "action" }, [
                      _c("input", {
                        staticClass: "button button-default draft-btn",
                        attrs: { type: "submit", disabled: _vm.loadSpinner },
                        domProps: { value: _vm.draftBtnLabel },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.createAnnouncement("draft")
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm.loadSpinner
                        ? _c("span", { staticClass: "spinner" })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("input", {
                        staticClass: "button button-primary publish-btn",
                        attrs: { type: "submit", disabled: _vm.loadSpinner },
                        domProps: { value: _vm.publishBtnLabel },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.createAnnouncement("publish")
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "clear" })
                    ])
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "postbox-container",
                attrs: { id: "postbox-container-2" }
              },
              [
                _c(
                  "postbox",
                  {
                    attrs: {
                      title: _vm.__("Announcement Settings", "dokan"),
                      extraClass: "announcement-settings"
                    }
                  },
                  [
                    _c(
                      "table",
                      { staticClass: "form-table announcement-meta-options" },
                      [
                        _c("tbody", [
                          _c("tr", [
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.__("Send Announcement To", "dokan"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.announcement.sender_type,
                                      expression: "announcement.sender_type"
                                    }
                                  ],
                                  attrs: {
                                    name: "announcement_sender_type",
                                    id: "announcement_sender_type"
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call($event.target.options, function(
                                          o
                                        ) {
                                          return o.selected
                                        })
                                        .map(function(o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.announcement,
                                        "sender_type",
                                        $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      )
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "option",
                                    { attrs: { value: "all_seller" } },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.__("All Vendor", "dokan"))
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "selected_seller" } },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__("Selected Vendor", "dokan")
                                        )
                                      )
                                    ]
                                  )
                                ]
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          "selected_seller" === _vm.announcement.sender_type
                            ? _c("tr", [
                                _c("th", [
                                  _vm._v(
                                    _vm._s(_vm.__("Select Vendors", "dokan"))
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "td",
                                  [
                                    _c(
                                      "multiselect",
                                      {
                                        attrs: {
                                          id: "ajax",
                                          label: "name",
                                          "track-by": "id",
                                          placeholder: "Type to search",
                                          "open-direction": "bottom",
                                          options: _vm.vendors,
                                          multiple: true,
                                          searchable: true,
                                          loading: _vm.isLoading,
                                          "internal-search": false,
                                          "clear-on-select": true,
                                          "close-on-select": false,
                                          "options-limit": 300,
                                          limit: 3,
                                          "limit-text": _vm.limitText,
                                          "max-height": 700,
                                          "show-no-results": false,
                                          "hide-selected": true
                                        },
                                        on: { "search-change": _vm.asyncFind },
                                        scopedSlots: _vm._u([
                                          {
                                            key: "clear",
                                            fn: function(props) {
                                              return [
                                                _vm.announcement.sender_ids
                                                  .length
                                                  ? _c("div", {
                                                      staticClass:
                                                        "multiselect__clear",
                                                      on: {
                                                        mousedown: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          $event.stopPropagation()
                                                          _vm.clearAll(
                                                            props.search
                                                          )
                                                        }
                                                      }
                                                    })
                                                  : _vm._e()
                                              ]
                                            }
                                          }
                                        ]),
                                        model: {
                                          value: _vm.announcement.sender_ids,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.announcement,
                                              "sender_ids",
                                              $$v
                                            )
                                          },
                                          expression: "announcement.sender_ids"
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            attrs: { slot: "noResult" },
                                            slot: "noResult"
                                          },
                                          [
                                            _vm._v(
                                              "Oops! No elements found. Consider changing the search query."
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ])
                            : _vm._e()
                        ])
                      ]
                    )
                  ]
                )
              ],
              1
            )
          ]
        ),
        _vm._v(" "),
        _c("br", { staticClass: "clear" })
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0a129b87", esExports)
  }
}

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditAnnouncement_vue__ = __webpack_require__(9);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_34d4b3be_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditAnnouncement_vue__ = __webpack_require__(40);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(39)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditAnnouncement_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_34d4b3be_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditAnnouncement_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin/components/EditAnnouncement.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-34d4b3be", Component.options)
  } else {
    hotAPI.reload("data-v-34d4b3be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.announcement.id
    ? _c(
        "div",
        { staticClass: "dokan-announcement-form-wrapper" },
        [
          _c("h1", { staticClass: "wp-heading-inline" }, [
            _vm._v(_vm._s(_vm.__("Edit Announcement", "dokan")))
          ]),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "page-title-action",
              attrs: { to: { name: "NewAnnouncement" } }
            },
            [_vm._v(_vm._s(_vm.__("Add Announcement", "dokan")))]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "help-block" }, [
            _c("span", { staticClass: "help-text" }, [
              _c(
                "a",
                {
                  attrs: {
                    href: "https://wedevs.com/docs/dokan/announcements/",
                    target: "_blank"
                  }
                },
                [_vm._v(_vm._s(_vm.__("Need Any Help ?", "dokan")))]
              )
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "dashicons dashicons-smiley" })
          ]),
          _vm._v(" "),
          _vm.isSaved
            ? _c(
                "div",
                {
                  staticClass:
                    "announcement-error notice is-dismissible updated",
                  attrs: { id: "announcement-message_updated" }
                },
                [
                  _c("p", [
                    _c("strong", {
                      domProps: { innerHTML: _vm._s(_vm.message) }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "notice-dismiss",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.isSaved = false
                        }
                      }
                    },
                    [
                      _c("span", { staticClass: "screen-reader-text" }, [
                        _vm._v(
                          _vm._s(_vm.__("Dismiss this notice.", "dokan-lite"))
                        )
                      ])
                    ]
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("hr", { staticClass: "wp-header-end" }),
          _vm._v(" "),
          _c("form", { attrs: { action: "", method: "post", id: "post" } }, [
            _c("div", { attrs: { id: "poststuff" } }, [
              _c(
                "div",
                {
                  staticClass: "metabox-holder columns-2",
                  attrs: { id: "post-body" }
                },
                [
                  _c("div", { staticClass: "post-body-content" }, [
                    _c("div", { attrs: { id: "titlediv" } }, [
                      _c("div", { attrs: { id: "titlewrap" } }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.announcement.title,
                              expression: "announcement.title"
                            }
                          ],
                          attrs: {
                            type: "text",
                            name: "post_title",
                            size: "30",
                            id: "title",
                            autocomplete: "off",
                            placeholder: "Enter announcement title"
                          },
                          domProps: { value: _vm.announcement.title },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.announcement,
                                "title",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "inside" })
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "postarea wp-editor-expand",
                        attrs: { id: "postdivrich" }
                      },
                      [
                        _c("text-editor", {
                          model: {
                            value: _vm.announcement.content,
                            callback: function($$v) {
                              _vm.$set(_vm.announcement, "content", $$v)
                            },
                            expression: "announcement.content"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "postbox-container",
                      attrs: { id: "postbox-container-1" }
                    },
                    [
                      _c(
                        "postbox",
                        {
                          attrs: {
                            title: _vm.__("Publish", "dokan"),
                            extraClass: "announcement-actions"
                          }
                        },
                        [
                          _c("div", { staticClass: "action" }, [
                            _c("input", {
                              staticClass: "button button-default draft-btn",
                              attrs: { type: "submit" },
                              domProps: { value: _vm.draftBtnLabel },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.updateAnnouncement("draft")
                                }
                              }
                            }),
                            _vm._v(" "),
                            _vm.loadSpinner
                              ? _c("span", { staticClass: "spinner" })
                              : _vm._e(),
                            _vm._v(" "),
                            _c("input", {
                              staticClass: "button button-primary publish-btn",
                              attrs: { type: "submit" },
                              domProps: { value: _vm.publishBtnLabel },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.updateAnnouncement("publish")
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "clear" })
                          ])
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "postbox-container",
                      attrs: { id: "postbox-container-2" }
                    },
                    [
                      _c(
                        "postbox",
                        {
                          attrs: {
                            title: _vm.__("Announcement Settings", "dokan"),
                            extraClass: "announcement-settings"
                          }
                        },
                        [
                          _c(
                            "table",
                            {
                              staticClass:
                                "form-table announcement-meta-options"
                            },
                            [
                              _c("tbody", [
                                _c("tr", [
                                  _c("th", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("Send Announcement To", "dokan")
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.announcement.sender_type,
                                            expression:
                                              "announcement.sender_type"
                                          }
                                        ],
                                        attrs: {
                                          name: "announcement_sender_type",
                                          id: "announcement_sender_type"
                                        },
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              _vm.announcement,
                                              "sender_type",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "option",
                                          { attrs: { value: "all_seller" } },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__("All Vendor", "dokan")
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          {
                                            attrs: { value: "selected_seller" }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__(
                                                  "Selected Vendor",
                                                  "dokan"
                                                )
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ])
                                ]),
                                _vm._v(" "),
                                "selected_seller" ===
                                _vm.announcement.sender_type
                                  ? _c("tr", [
                                      _c("th", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.__("Select Vendors", "dokan")
                                          )
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "td",
                                        [
                                          _c(
                                            "multiselect",
                                            {
                                              attrs: {
                                                id: "ajax",
                                                label: "name",
                                                "track-by": "id",
                                                placeholder: "Type to search",
                                                "open-direction": "bottom",
                                                options: _vm.vendors,
                                                multiple: true,
                                                searchable: true,
                                                loading: _vm.isLoading,
                                                "internal-search": false,
                                                "clear-on-select": false,
                                                "close-on-select": false,
                                                "options-limit": 300,
                                                limit: 3,
                                                "limit-text": _vm.limitText,
                                                "max-height": 600,
                                                "show-no-results": false,
                                                "hide-selected": true
                                              },
                                              on: {
                                                "search-change": _vm.asyncFind
                                              },
                                              scopedSlots: _vm._u([
                                                {
                                                  key: "clear",
                                                  fn: function(props) {
                                                    return [
                                                      _vm.announcement
                                                        .sender_ids.length
                                                        ? _c("div", {
                                                            staticClass:
                                                              "multiselect__clear",
                                                            on: {
                                                              mousedown: function(
                                                                $event
                                                              ) {
                                                                $event.preventDefault()
                                                                $event.stopPropagation()
                                                                _vm.clearAll(
                                                                  props.search
                                                                )
                                                              }
                                                            }
                                                          })
                                                        : _vm._e()
                                                    ]
                                                  }
                                                }
                                              ]),
                                              model: {
                                                value:
                                                  _vm.announcement.sender_ids,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.announcement,
                                                    "sender_ids",
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "announcement.sender_ids"
                                              }
                                            },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  attrs: { slot: "noResult" },
                                                  slot: "noResult"
                                                },
                                                [
                                                  _vm._v(
                                                    "Oops! No elements found. Consider changing the search query."
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ],
                                        1
                                      )
                                    ])
                                  : _vm._e()
                              ])
                            ]
                          )
                        ]
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c("br", { staticClass: "clear" })
            ])
          ])
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-34d4b3be", esExports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refund_vue__ = __webpack_require__(10);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21df77a8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Refund_vue__ = __webpack_require__(43);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(42)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refund_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21df77a8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Refund_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin/components/Refund.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-21df77a8", Component.options)
  } else {
    hotAPI.reload("data-v-21df77a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "dokan-refund-wrapper" },
    [
      _c("h1", { staticClass: "wp-heading-inline" }, [
        _vm._v(_vm._s(_vm.__("Refund Requests", "dokan")))
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "help-block" }, [
        _c("span", { staticClass: "help-text" }, [
          _c(
            "a",
            {
              attrs: {
                href: "https://wedevs.com/docs/dokan/refund/",
                target: "_blank"
              }
            },
            [_vm._v(_vm._s(_vm.__("Need Any Help ?", "dokan")))]
          )
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "dashicons dashicons-smiley" })
      ]),
      _vm._v(" "),
      _c("hr", { staticClass: "wp-header-end" }),
      _vm._v(" "),
      _c("ul", { staticClass: "subsubsub" }, [
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Refund", query: { status: "pending" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__(
                      "Pending <span class='count'>(%s)</span>",
                      "dokan-lite"
                    ),
                    _vm.counts.pending
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Refund", query: { status: "approved" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__(
                      "Approved <span class='count'>(%s)</span>",
                      "dokan-lite"
                    ),
                    _vm.counts.approved
                  )
                )
              }
            }),
            _vm._v(" | ")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("router-link", {
              attrs: {
                to: { name: "Refund", query: { status: "cancelled" } },
                "active-class": "current",
                exact: ""
              },
              domProps: {
                innerHTML: _vm._s(
                  _vm.sprintf(
                    _vm.__(
                      "Cancelled <span class='count'>(%s)</span>",
                      "dokan-lite"
                    ),
                    _vm.counts.cancelled
                  )
                )
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("list-table", {
        attrs: {
          columns: _vm.columns,
          rows: _vm.requests,
          loading: _vm.loading,
          "action-column": _vm.actionColumn,
          actions: _vm.actions,
          "show-cb": true,
          "bulk-actions": _vm.bulkActions,
          "not-found": _vm.notFound,
          "total-pages": _vm.totalPages,
          "total-items": _vm.totalItems,
          "per-page": _vm.perPage,
          "current-page": _vm.currentPage
        },
        on: {
          pagination: _vm.goToPage,
          "action:click": _vm.onActionClick,
          "bulk:click": _vm.onBulkAction
        },
        scopedSlots: _vm._u([
          {
            key: "order_id",
            fn: function(data) {
              return [
                _c("a", { attrs: { href: _vm.orderUrl(data.row.order_id) } }, [
                  _c("strong", [_vm._v("#" + _vm._s(data.row.order_id))])
                ])
              ]
            }
          },
          {
            key: "amount",
            fn: function(data) {
              return [
                _vm._v(
                  "\n            " +
                    _vm._s(_vm._f("currency")(data.row.amount)) +
                    "\n        "
                )
              ]
            }
          },
          {
            key: "vendor",
            fn: function(data) {
              return [
                _c(
                  "a",
                  {
                    attrs: {
                      href: _vm.vendorUrl(data.row.vendor.id),
                      title: data.row.vendor.email
                    }
                  },
                  [_vm._v(_vm._s(data.row.vendor.store_name))]
                )
              ]
            }
          },
          {
            key: "date",
            fn: function(data) {
              return [
                _vm._v(
                  "\n            " +
                    _vm._s(_vm.moment(data.row.created).format("MMM D, YYYY")) +
                    "\n        "
                )
              ]
            }
          },
          {
            key: "row-actions",
            fn: function(data) {
              return [
                _vm._l(_vm.actions, function(action, index) {
                  return [
                    action.key == "approved" && _vm.currentStatus == "pending"
                      ? _c(
                          "span",
                          { class: action.key },
                          [
                            _c(
                              "a",
                              {
                                attrs: { href: "#" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    _vm.rowAction(action.key, data)
                                  }
                                }
                              },
                              [_vm._v(_vm._s(action.label))]
                            ),
                            _vm._v(" "),
                            index !== _vm.actions.length - 1
                              ? [_vm._v(" | ")]
                              : _vm._e()
                          ],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    action.key == "cancelled" && _vm.currentStatus == "pending"
                      ? _c("span", { class: action.key }, [
                          _c(
                            "a",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.rowAction(action.key, data)
                                }
                              }
                            },
                            [_vm._v(_vm._s(action.label))]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    action.key == "delete" && _vm.currentStatus != "pending"
                      ? _c(
                          "span",
                          { class: action.key },
                          [
                            _c(
                              "a",
                              {
                                attrs: { href: "#" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    _vm.rowAction(action.key, data)
                                  }
                                }
                              },
                              [_vm._v(_vm._s(action.label))]
                            ),
                            _vm._v(" "),
                            index !== _vm.actions.length - 1
                              ? [_vm._v(" | ")]
                              : _vm._e()
                          ],
                          2
                        )
                      : _vm._e()
                  ]
                })
              ]
            }
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-21df77a8", esExports)
  }
}

/***/ })
/******/ ]);