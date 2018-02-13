"use strict";

angular.module("yasla", [
    "ngMaterial", "ngMessages", "ngAnimate", "ui.router", "LocalStorageModule"
])
/**
 * Configure constants
 */
    .value("APP_VERSION", "0.2.2-83")
    .value("API_URL", "http://dev.api.yasla.co.uk/api")
    .value("AUTH_URL", "http://dev.api.yasla.co.uk")
    .value("OAUTH_CLIENT_ID", "2")
    .value("OAUTH_CLIENT_SECRET", "HhqX7ofnL7XWYW5ROIELXnL7BTSvZ5KB6RGQ7YUW")

    /**
     * Configure initial routing
     */
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider.state("shopping", {
            url:   "/abstract",
            views: {
                main: {
                    template:   "<yasla-lists></yasla-lists>",
                    controller: function ($scope) {
                    }
                }
            }
        });
    })

    /**
     * Configure local storage
     */
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix("yasla");
    })

    /**
     * Configure HTTP interceptors to add OAuth tokens to each API request
     */
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function (localStorageService) {
            var requestInterceptor = {
                request: function (config) {
                    var token = localStorageService.get("access_token");
                    config.headers["Authorization"] = "Bearer " + token;
                    return config;
                }
            };
            return requestInterceptor;
        });
    })

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme("theme01").primaryPalette("red");
        $mdThemingProvider.theme("theme02").primaryPalette("pink");
        $mdThemingProvider.theme("theme03").primaryPalette("purple");
        $mdThemingProvider.theme("theme04").primaryPalette("deep-purple");
        $mdThemingProvider.theme("theme05").primaryPalette("indigo");
        $mdThemingProvider.theme("theme06").primaryPalette("blue");
        $mdThemingProvider.theme("theme07").primaryPalette("light-blue");
        $mdThemingProvider.theme("theme08").primaryPalette("cyan");
        $mdThemingProvider.theme("theme09").primaryPalette("teal");
        $mdThemingProvider.theme("theme10").primaryPalette("green");
        $mdThemingProvider.alwaysWatchTheme(true);
    })
    .run(function($rootScope) {
        $rootScope.theme = "theme10";
    })

    /**
     * Listen for state change events to ensure protected states remain protected
     */
    .run(function ($transitions, AuthService) {
        $transitions.onStart({}, function ($transitions$) {
            var toState = $transitions$.to();
            if (!toState.unauthenticated) AuthService.ensureAuthenticated();
        });

    })

    /**
     * Log state changes to the console
     */
    .run(function ($transitions) {

        $transitions.onSuccess({}, function ($transitions$) {
            console.log("%cSTATE: [" + $transitions$.to().name + "]", "border:1px solid #000;background: #ccc;padding: 3px;color:#222");
        });
    })

    .controller("AppCtrl", function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleLeft = buildDelayedToggler("left");
        $scope.toggleRight = buildToggler("right");
        $scope.isOpenRight = function () {
            return $mdSidenav("right").isOpen();
        };

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args    = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }
    })
    .controller("LeftCtrl", function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav("left").close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
    })
    .controller("RightCtrl", function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav("right").close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });
angular.module("yasla").directive("appMainMenu", function ($mdSidenav, APP_VERSION, $state, localStorageService) {
    return {
        templateUrl: "src/common/app-main-menu/template.html",
        controller:  function ($scope) {
            $scope.state = {
                mode:    0,
                version: APP_VERSION,
                user:    localStorageService.get("user")
            };
            $scope.sidenav = {

                goto: function (state) {
                    $scope.sidenav.closeMenu();
                    $state.go(state);
                },

                closeMenu:  function () {
                    $mdSidenav("left").close();
                },
                switchMode: function () {

                    if ($scope.state.mode === 0) {
                        $scope.state.mode = 1;
                        $(".state-btn").addClass("rotated");
                    }
                    else {
                        $scope.state.mode = 0;
                        $(".state-btn").removeClass("rotated");
                    }
                }
            };
        },
        link:        function ($scope) {

        }
    };
});
angular.module("yasla").service("ToolbarService", function ($rootScope) {
    return {
        title: {
            set: function (label) {
                $rootScope.title = label;
            }
        }
    };
});
angular.module("yasla").directive("appToolbar", function ($mdSidenav, AuthService) {

    return {
        templateUrl: "src/common/app-toolbar/template.html",
        scope:       {},
        link:        function ($scope) {
            $scope.sidenav = {
                authenticated: AuthService.isAuthenticated(),
                openMenu:      function () {
                    $mdSidenav("left").open();
                }
            };
        },
        controller:  function ($scope) {
            $scope.isAuthenticated = function () {
                return AuthService.isAuthenticated();
            };
        }
    };
});
angular.module("yasla").directive("fabBottomRight", function () {
    return {
        link: function ($scope, $element) {
            $($element)
                .addClass("md-fab md-mini md-primary btn-fab-bottom-right")
                .detach()
                .appendTo("body");

            $scope.$on("$destroy", function () {
                $($element).remove();
            });
        }
    };
});
angular.module("yasla").directive("infoMediaSize", function ($mdMedia) {
    return {
        templateUrl: "src/common/info-media-size/template.html",
        controller:  function ($scope) {
        },
        link:        function ($scope) {
            $scope.$watch(function () {
                return $mdMedia("lg");
            }, function (d) {
                $scope.lg = d;
            });

            $scope.$watch(function () {
                return $mdMedia("md");
            }, function (d) {
                $scope.md = d;
            });

            $scope.$watch(function () {
                return $mdMedia("sm");
            }, function (d) {
                $scope.sm = d;
            });

            $scope.$watch(function () {
                return $mdMedia("xs");
            }, function (d) {
                $scope.xs = d;
            });

            $scope.$watch(function () {
                return $mdMedia("xl");
            }, function (d) {
                $scope.xl = d;
            });
        }
    };
});
angular.module("yasla").directive("sticky", function ($mdSticky) {
    return {
        restrict: "A",
        link:     function ($scope, $element) {
            $mdSticky($scope, $element);
        }
    };
});
angular.module("yasla").directive("yaslaAbout", function (CordovaService) {
    return {
        templateUrl: "src/states/about/template.html",
        controller:  function ($scope) {
            $scope.data = {
                version: null
            };

            CordovaService.version().then(function (version) {
                $scope.data.version = version;
            });
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.about", {
            url:   "^/about",
            views: {
                "main@": {
                    template: "<yasla-about></yasla-about>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("About");
                    }
                }
            }
        });
});
angular.module("yasla").service("AuthService", function (API_URL, AUTH_URL, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, $rootScope, $state, $q, $http, localStorageService, UserService) {
    var AuthService = {

        ping: function () {
            return $http.get(API_URL + "/ping");
        },

        /**
         * Ensure the user is authenticated, redirect to login otherwise
         */
        ensureAuthenticated: function () {
            if (AuthService.isAuthenticated()) return;
            $state.go("shopping.auth.intro");
        },

        /**
         * Check if the user is authenticated
         *
         * @returns {boolean}
         */
        isAuthenticated: function () {
            var ret = false;
            var token = localStorageService.get("access_token");
            if (token) ret = true;
            return ret;
        },

        logout: function () {
            localStorageService.remove("access_token");
            localStorageService.remove("refresh_token");
            localStorageService.remove("user");
        },

        /**
         * Attempt to authenticate the user
         */
        login: function (username, password) {
            var q = $q.defer();

            var args = {
                client_id:     OAUTH_CLIENT_ID,
                client_secret: OAUTH_CLIENT_SECRET,
                grant_type:    "password",
                username:      username,
                password:      password,
                scope:         "*"
            };

            var url = AUTH_URL + "/oauth/token";
            $http.post(url, args).then(
                function success(response) {
                    var access_token = response.data.access_token;
                    var refresh_token = response.data.refresh_token;
                    localStorageService.set("access_token", access_token);
                    localStorageService.set("refresh_token", refresh_token);
                    UserService.profile();
                    q.resolve();
                },
                function error(a) {
                    q.reject();
                });

            return q.promise;
        },

        register: function (data) {
            var q = $q.defer();
            $http.post(API_URL + "/user/register", {data: data}).then(
                function success(response) {
                    q.resolve(response.data);
                },
                function failure(error) {
                    q.reject(error);
                });
            return q.promise;
        },

        validateEmail: function (value) {
            var q = $q.defer();
            $http.post(API_URL + "/user/validate-email", {email: value}).then(
                function success(response) {
                    if (response.data === 0) q.resolve();
                    else q.reject();
                },
                function failure(error) {
                    q.reject(error);
                });
            return q.promise;
        }
    };

    return AuthService;
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth", {
            abstract: true
        });
});
angular.module("yasla").service("api", function (API_URL, $http, $q) {
    return {
        misc: {
            ping: function () {
                $http.get(API_URL + "/ping").then(function (response) {
                });
            }
        }
    };
});
angular.module("yasla").service("CordovaService", function ($http, $q) {
    return {
        version: function () {
            var q = $q.defer();
            q.resolve("");
            return q.promise;
            if (typeof cordova !== "undefined") {
                cordova.getAppVersion.getVersionNumber().then(function (version) {
                    q.resolve(version);
                });
            }
            else {
                q.reject();
            }

            return q.promise;


        }
    };
});
angular.module("yasla").controller("SidenavCtrl", function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildToggler("left");
    $scope.toggleRight = buildToggler("right");
    $scope.isOpenRight = function () {
        return $mdSidenav("right").isOpen();
    };

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }
})
    .controller("LeftCtrl", function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav("left").close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
    })
    .controller("RightCtrl", function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav("right").close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });

angular.module("yasla").directive("yaslaHome", function () {
    return {
        templateUrl: "src/states/home/template.html"
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.home", {
            url:   "^/home",
            auth:  true,
            views: {
                "main@": {
                    template:   "",
                    controller: function ($state) {
                        $state.go("shopping.lists");
                    }
                }
            }
        });
});
angular.module("yasla").service("ListsDialogService", function ($mdDialog, $http, $q) {
    var ListDialogService = {
        ShoppingListSelector: {
            show:       function () {
                var q = $q.defer();
                $mdDialog.show(
                    {
                        controller:          ListDialogService.ShoppingListSelector.controller,
                        templateUrl:         "src/states/lists/dialogShoppingListSelector.html",
                        parent:              angular.element(document.body),
                        targetEvent:         null,
                        clickOutsideToClose: true,
                        fullscreen:          true
                    })
                    .then(
                        function save(list) {
                            q.resolve(list);
                        },
                        function cancel() {
                            q.reject();
                        });
                return q.promise;
            },
            controller: function ($scope, ListsService) {
                $scope.ui = {
                    close: function () {
                        $mdDialog.cancel();
                    },
                    save:  function () {
                        var ret = {
                            list_id:     $scope.data.list_id,
                            set_default: $scope.data.set_default
                        };
                        $mdDialog.hide(ret);
                    }
                };
                $scope.data = {
                    list_id:     null,
                    set_default: 0
                };

                ListsService.get().then(function (list) {
                    $scope.list = list;
                });
            }
        }

    };
    return ListDialogService;
});
angular.module("yasla").service("ListsService", function (API_URL, $http, $q) {
    var ListsService = {

        product:   {
            add:            function (list_id, product) {
                return $http.post(API_URL + "/product/add-to-list/" + list_id, {data: product});
            },
            updateQuantity: function (list_id, product_id, quantity) {
                var url = API_URL + "/list/" + list_id + "/product/" + product_id + "/update-quantity/" + quantity;
                console.log(url);
                return $http.post(API_URL + "/list/" + list_id + "/product/" + product_id + "/update-quantity/" + quantity);
            }
        },
        get:       function () {
            var q = $q.defer();
            $http.get(API_URL + "/lists/get").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        basicInfo: function (list_id) {
            var q = $q.defer();

            $http.get(API_URL + "/lists/" + list_id + "/info").then(function (response) {
                q.resolve(response.data[0]);
            });
            return q.promise;
        },
        info:      function (list_id) {
            var q = $q.defer();

            $http.get(API_URL + "/lists/" + list_id + "/products").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        create:    function (data) {
            var q = $q.defer();
            $http.post(API_URL + "/lists/create", data).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        delete:    function (list_id) {
            return $http.post(API_URL + "/lists/" + list_id + "/delete");
        }
    };
    return ListsService;
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists", {
            url:   "^/lists",
            views: {
                "main@":    {
                    template:   "<yasla-lists></yasla-lists>",
                    controller: function ($scope, ListsService, ToolbarService) {
                        ListsService.get().then(function (data) {
                            ToolbarService.title.set("Shopping lists");
                            $scope.data = data;
                        });
                    }
                },
                "sbRight@": {
                    template: "<yasla-lists-sbright></yasla-lists-sbright>"
                }
            }
        });
});
angular.module("yasla").service("SearchService", function (API_URL, $http, $q, ListsService, ListsDialogService) {
    return {

        search: function (term) {
            var q = $q.defer();
            $http.post(API_URL + "/search", {term: term}).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },

        addToList: function (list_id, product) {
            var q = $q.defer();

            // ---- If no list_id, we need to determine which shopping list to add the product to.
            //      If there's only one list, add it to that
            //          otherwise, show the list selection dialog and let the use choose
            //
            if (!list_id) {
                ListsService.get().then(function (lists) {
                    if (lists.length === 1) {
                        list_id = lists[0].id;
                        console.log("Only one list, so using list ID [%s]", list_id);
                        ListsService.product.add(list_id, product);
                        q.resolve(list_id);
                        console.log("Got here 1");
                    }
                    else {
                        ListsDialogService.ShoppingListSelector.show().then(function (foo) {
                            var list_id = foo.list_id;
                            var set_default = foo.set_default;
                            console.log("Going to use list ID [%s] from the dialog", list_id);
                            ListsService.product.add(list_id, product);
                            q.resolve(list_id);
                            console.log("Got here 2");
                        });
                    }
                });
            }
            else {
                console.log("Using user specified list [%s]", list_id);
                ListsService.product.add(list_id, product);
                q.resolve(list_id);
                console.log("Got here 3");
            }

            return q.promise;

        }
    };
});
angular.module("yasla").directive("yaslaSearch", function (SearchService, ListsDialogService, ListsService, $mdToast, $state, $timeout) {
    return {
        templateUrl: "src/states/search/template.html",
        controller:  function ($scope) {

            $scope.ui = {
                search: function () {
                    var term = $scope.data.term;
                    $scope.data.results = [];
                    $scope.data.awaiting_results = true;
                    SearchService.search(term).then(function (results) {
                        $scope.data.awaiting_results = false;
                        $(".search-card").addClass("rolledup");
                        $scope.data.results = results;
                    });
                },

                add: function (product) {
                    SearchService.addToList($scope.data.list_id, product).then(
                        function (list_id) {
                            console.log("Got back from SearchService");
                            $timeout(function() {
                                $state.go("shopping.lists.edit", {id: list_id}, {reload: true});
                            }, 550);
                        });
                }
            };
        },
        link:        function ($scope) {
            $timeout(function () {
                $(".autofocus").focus();
            }, 100);
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.search", {
            url:    "^/search",
            params: {
                list_id: null
            },
            views:  {
                "main@": {
                    template:   "<yasla-search></yasla-search>",
                    controller: function (ToolbarService, $stateParams, $scope) {
                        $scope.data = {
                            list_id:          $stateParams.list_id,
                            term:             null,
                            awaiting_results: false,
                            results:          []
                        };
                        ToolbarService.title.set("Search for products");
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaSettings", function () {
    return {
        templateUrl: "src/states/settings/template.html"
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.settings", {
            url:   "^/settings",
            views: {
                "main@": {
                    template: "<yasla-settings></yasla-settings>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("Settings");
                    }
                }
            }
        });
});
angular.module("yasla").service("UserService", function ($http, $q, localStorageService, API_URL, $rootScope) {
    return {
        settings: {
            update: function (setting_name, setting_value) {
                var args = {
                    name:  setting_name,
                    value: setting_value
                };
                return $http.post(API_URL + "/settings/update", args);
            }
        },
        profile:  function () {
            var q = $q.defer();

            $http.get(API_URL + "/settings").then(function (response) {
                var profile = response.data;
                var settings = profile.user_settings;
                delete profile.user_settings;
                localStorageService.set("user", profile);
                localStorageService.set("settings", settings);

                $rootScope.theme = settings.theme || "theme02";
                console.log("Setting theme to " + $rootScope.theme);
                q.resolve(response.data);
            });

            return q.promise;
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user", {
            url:      "^/user",
            abstract: true
        });
});
angular.module("yasla").directive("yaslaAuthLogout", function ($state, AuthService) {
    return {
        templateUrl: "src/states/auth/logout/template.html",
        controller:  function ($scope) {
            $scope.logout = function () {
                AuthService.logout();
                $state.go("shopping.auth.loggedout");
            };
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.logout", {
            url:   "^/auth/logout",
            views: {
                "main@": {
                    template:   "<yasla-auth-logout></yasla-auth-logout>",
                    controller: function ($scope) {
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaAuthLoggedOut", function () {
    return {
        templateUrl: "src/states/auth/loggedout/template.html"
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.loggedout", {
            unauthenticated: true,
            url:             "^/auth/loggedout",
            views:           {
                "main@": {
                    template: "<yasla-auth-logged-out></yasla-auth-logged-out>"
                }
            }
        });
});
angular.module("yasla").directive("yaslaBtnAddProduct", function ($stateParams) {
    return {
        templateUrl: "src/states/common/btn-add-product/template.html"
    };
});
angular.module("yasla").directive("yaslaBtnAddShoppingList", function () {
    return {
        templateUrl: "src/states/common/btn-add-shopping-list/template.html"
    };
});
angular.module("yasla").directive("yaslaLists", function () {
    return {
        templateUrl: "src/states/lists/lists.default/template.html"
    };
});
angular.module("yasla").directive("yaslaListsDelete", function ($state, ListsService) {
    return {
        templateUrl: "src/states/lists/lists.delete/template.html",
        controller:  function ($scope) {
            $scope.ui = {
                confirm: function() {
                    ListsService.delete($scope.data.id);
                    $state.go("shopping.lists");
                },
                cancel: function() {
                    $state.go("shopping.lists");
                }
            }
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.delete", {
            url:   "/delete/{id}",
            views: {
                "main@": {
                    template: "<yasla-lists-delete></yasla-lists-delete>",

                    controller: function ($scope, ListsService, ToolbarService, $stateParams, $state) {
                        var id = $stateParams.id;
                        if (!id) $state.go("shopping.lists");

                        ToolbarService.title.set("Delete shopping list");
                        ListsService.basicInfo(id).then(function (data) {
                            $scope.data = data;
                        });
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaListsEdit", function (ListsService) {
    return {
        templateUrl: "src/states/lists/lists.edit/template.html",
        controller:  function ($scope) {
        },
        link:        function ($scope) {
            $scope.ui = {
                calculate: function (do_toast) {
                    var total = 0;
                    angular.forEach($scope.data.products, function (item) {
                        total += item.price * item.quantity;
                    });
                    $scope.data.total = total;
                    if (do_toast) $scope.ui.toast();
                },
                toast:     function () {
                },
                quantity:  {
                    up: function (item) {
                        item.quantity++;
                        $scope.ui.calculate(true);
                        ListsService.product.updateQuantity($scope.data.list.id, item.id, item.quantity);
                    },
                    dn: function (item) {
                        item.quantity--;
                        $scope.ui.calculate(true);
                        ListsService.product.updateQuantity($scope.data.list.id, item.id, item.quantity);
                    }
                }
            };
            $scope.ui.calculate();
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.edit", {
            url:     "/edit/{id}",
            views:   {
                "main@": {
                    template:   "<yasla-lists-edit></yasla-lists-edit>",
                    controller: function ($scope, ToolbarService, $stateParams, $state, listinfo) {
                        var id = $stateParams.id;
                        if (!id) $state.go("shopping.lists");
                        ToolbarService.title.set("Edit shopping list");
                        $scope.data = listinfo;
                    }
                }
            },
            resolve: {
                listinfo: function (ListsService, $stateParams) {
                    return ListsService.info($stateParams.id);
                }
            }
        });
});
angular.module("yasla").directive("yaslaListsSbright", function () {
    return {
        templateUrl: "src/states/lists/sb-right/template.html",
        controller:  function ($scope) {
        }
    };
});
angular.module("yasla").directive("yaslaListsNew", function (ListsService, $state, $timeout) {
    return {
        templateUrl: "src/states/lists/lists.new/template.html",
        controller:  function ($scope) {
            $scope.data = {
                list_name: ""
            };
            $scope.ui = {
                save: function () {
                    ListsService.create({data: $scope.data}).then(function () {
                        $state.go("shopping.lists");
                    });
                }
            };
        },
        link:        function ($scope) {
            $timeout(function () {
                $(".autofocus").focus();
            });
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.new", {
            url:   "/new",
            views: {
                "main@": {
                    template: "<yasla-lists-new></yasla-lists-new>",

                    controller: function ($scope, ListsService, ToolbarService, $stateParams, $state) {
                        ToolbarService.title.set("Create shopping list");
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaSettingsUi", function ($rootScope, UserService) {
    return {
        templateUrl: "src/states/settings/ui/template.html",

        controller:  function ($scope) {
            $scope.data = {
                theme:  null,
                themes: [
                    {theme: "theme01", name: "Red"},
                    {theme: "theme02", name: "Pink"},
                    {theme: "theme03", name: "Purple"},
                    {theme: "theme04", name: "Deep purple"},
                    {theme: "theme05", name: "Indigo"},
                    {theme: "theme06", name: "Blue"},
                    {theme: "theme07", name: "Light blue"},
                    {theme: "theme08", name: "Cyan"},
                    {theme: "theme09", name: "Teal"},
                    {theme: "theme10", name: "Green"}
                ]
            };
            $scope.ui = {
                applyTheme: function () {
                    $rootScope.theme = $scope.data.theme;
                    UserService.settings.update("theme", $scope.data.theme);
                }
            };
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.settings.ui", {
            url:   "^/settings/ui",
            views: {
                "main@": {
                    template: "<yasla-settings-ui></yasla-settings-ui>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("User interface");
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaAuthIntro", function (AuthService, $state, CordovaService, ToolbarService) {
    return {
        templateUrl: "src/states/unauthenticated/intro/template.html",
        controller:  function ($scope) {
            $scope.data = {
                state:    0,
                username: "",
                password: "",
                error:    0
            };
            $scope.ui = {
                goto:  {
                    intro:    function () {
                        ToolbarService.title.set("YASLA");
                        $scope.data.state = 0;
                    },
                    login:    function () {
                        ToolbarService.title.set("Login");
                        $scope.data.state = 1;
                    },
                    register: function () {
                        ToolbarService.title.set("Register");
                        $scope.data.state = 2;
                    }
                },
                reset: function () {
                    if ($scope.data.error) {
                        $scope.data.password = null;
                        $scope.data.error = 0;
                    }
                },
                login: function () {
                    AuthService.login($scope.data.username, $scope.data.password).then(
                        function success() {
                            $state.go("shopping.home");
                        },
                        function error() {
                            $scope.data.error = 1;
                        }
                    );
                }
            };


            // ---- Get the Cordova version number
            //
            CordovaService.version().then(function (version) {
                $scope.data.version = version;
            });
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.intro", {
            unauthenticated: true,
            url:             "^/auth/intro",
            views:           {
                "main@": {
                    template:   "<yasla-auth-intro></yasla-auth-intro>",
                    controller: function ($scope, ToolbarService, AuthService, $state) {

                        // ---- Ensure the API is talking to us
                        //
                        AuthService.ping().then(
                            function () {
                            },
                            function () {
                                $scope.data.error = 2;
                            }
                        );

                        // ---- Check if the user is already authenticated
                        //
                        if (AuthService.isAuthenticated()) {
                            $state.go("shopping.home");
                        }
                        else {
                            ToolbarService.title.set("YASLA");
                        }
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaAuthLogin", function (AuthService, $state, CordovaService, ToolbarService, $timeout) {
    return {
        templateUrl: "src/states/unauthenticated/login/template.html",
        controller:  function ($scope) {
            $scope.data = {
                state:    0,
                username: "",
                password: "",
                error:    0
            };
            $scope.ui = {
                goto:  {
                    intro:    function () {
                        ToolbarService.title.set("YASLA");
                        $scope.data.state = 0;
                    },
                    login:    function () {
                        ToolbarService.title.set("Login");
                        $scope.data.state = 1;
                    },
                    register: function () {
                        ToolbarService.title.set("Register");
                        $scope.data.state = 2;
                    }
                },
                reset: function () {
                    if ($scope.data.error) {
                        $scope.data.password = null;
                        $scope.data.error = 0;
                    }
                },
                login: function () {
                    $scope.data.waiting = true;
                    AuthService.login($scope.data.username, $scope.data.password).then(
                        function success() {
                            $scope.data.waiting = false;
                            $state.go("shopping.home");
                        },
                        function error() {
                            $scope.data.error = 1;
                        }
                    );
                }
            };

            // ---- Ensure the API is talking to us
            //
            AuthService.ping().then(
                function () {
                },
                function () {
                    $scope.data.error = 2;
                }
            );

            // ---- Get the Cordova version number
            //
            CordovaService.version().then(function (version) {
                $scope.data.version = version;
            });
        },
        link:        function ($scope) {
            $timeout(function () {
                $(".autofocus").focus();
            }, 100);
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.login", {
            unauthenticated: true,
            url:             "^/auth/login",
            views:           {
                "main@": {
                    template:   "<yasla-auth-login></yasla-auth-login>",
                    controller: function (ToolbarService, AuthService, $state) {

                        // ---- Check if the user is already authenticated
                        //
                        if (AuthService.isAuthenticated()) {
                            $state.go("shopping.home");
                        }
                        else {
                            ToolbarService.title.set("Login");
                        }
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaUserRegister", function (AuthService, $state) {
    return {
        templateUrl: "src/states/unauthenticated/register/template.html",
        controller:  function ($scope) {

            $scope.data = {
                firstname: "",
                lastname:  "",
                username:  "",
                password1: "",
                password2: ""
            };
            $scope.ui = {

                register: function () {
                    AuthService.register($scope.data).then(
                        function success(id) {
                            if (id > 0) {
                                $state.go("shopping.auth.login");
                            }
                            switch (id) {
                                case -1: // Duplicate email
                                    $scope.data.error = 1;
                                    break;
                            }
                        },
                        function failure(e) {
                        }
                    );
                }
            };

        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.register", {
            unauthenticated: true,
            url:             "/register",
            views:           {
                "main@": {
                    template:   "<yasla-user-register></yasla-user-register>",
                    controller: function (ToolbarService) {
                        ToolbarService.title.set("Register");
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaUserProfile", function (localStorageService) {
    return {
        templateUrl: "src/states/user/profile/template.html",
        controller:  function ($scope) {
            $scope.state = {
                user: localStorageService.get("user")
            };
        }
    };
});
angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user.profile", {
            url:   "/profile",
            views: {
                "main@": {
                    template:   "<yasla-user-profile></yasla-user-profile>",
                    controller: function ($scope, UserService, ToolbarService) {
                        console.log("shopping.user.profile::router");
                        ToolbarService.title.set("Profile");
                        UserService.profile().then(function (data) {
                            $scope.user = data;
                        });
                    }
                }
            }
        });
});
angular.module("yasla").directive("yaslaDuplicateEmail", function (AuthService) {
    /**
     * Custom validator to ensure the user's email address is unique
     *
     * @todo Add a debounce delay
     */
    return {
        require: "ngModel",
        link:    function ($scope, $element, $attrs, $ctrl) {
            $ctrl.$parsers.push(function (ngModelValue) {
                AuthService.validateEmail(ngModelValue).then(
                    function is_unique() {
                        $ctrl.$setValidity("duplicateEmail", true);
                    }, function is_not_unique() {
                        $ctrl.$setValidity("duplicateEmail", false);
                    });
                return ngModelValue;
            });
        }
    };
});
angular.module("yasla").directive("yaslaMatchPassword", function () {
    /**
     * Custom validator to ensure the user's password meets a minimum complexity standard
     */
    return {
        require: "ngModel",
        link:    function ($scope, $element, $attrs, $ctrl) {
            $ctrl.$parsers.push(function (ngModelValue) {
                var pw1 = $scope.data.password1;
                if (pw1 == ngModelValue) {
                    $ctrl.$setValidity("passwordMismatch", true);
                }
                else {
                    $ctrl.$setValidity("passwordMismatch", false);
                }
                return ngModelValue;
            });
        }
    };
});
angular.module("yasla").directive("yaslaValidatePassword", function () {
    /**
     * Custom validator to ensure the user's password meets a minimum complexity standard
     */
    return {
        require: "ngModel",
        link:    function ($scope, $element, $attrs, $ctrl) {
            $ctrl.$parsers.push(function (ngModelValue) {
                var strength = zxcvbn(ngModelValue);
                $(".bar-0").removeClass("bar-green").removeClass("bar-red").addClass("bar-grey").removeClass("bar-outline-green").addClass("bar-outline-red");
                $(".bar-1").removeClass("bar-green").removeClass("bar-red").addClass("bar-grey").removeClass("bar-outline-green").addClass("bar-outline-red");
                $(".bar-2").removeClass("bar-green").removeClass("bar-red").addClass("bar-grey").removeClass("bar-outline-green").addClass("bar-outline-red");
                $(".bar-3").removeClass("bar-green").removeClass("bar-red").addClass("bar-grey").removeClass("bar-outline-red");
                $(".bar-4").removeClass("bar-green").removeClass("bar-red").addClass("bar-grey").removeClass("bar-outline-red");

                switch (strength.score) {
                    case 0:
                        $ctrl.$setValidity("strongEnough", false);
                        $(".bar-0").addClass("bar-red");
                        break;
                    case 1:
                        $ctrl.$setValidity("strongEnough", false);
                        $(".bar-0").addClass("bar-red");
                        $(".bar-1").addClass("bar-red");
                        break;
                    case 2:
                        $ctrl.$setValidity("strongEnough", false);
                        $(".bar-0").addClass("bar-red");
                        $(".bar-1").addClass("bar-red");
                        $(".bar-2").addClass("bar-red");
                        break;
                    case 3:
                        $ctrl.$setValidity("strongEnough", true);
                        $(".bar-0").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        $(".bar-1").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        $(".bar-2").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        $(".bar-3").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        break;
                    case 4:
                        $ctrl.$setValidity("strongEnough", true);
                        $(".bar-0").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        $(".bar-1").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        $(".bar-2").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        $(".bar-3").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        $(".bar-4").addClass("bar-green").addClass("bar-outline-green").removeClass("bar-outline-red");
                        break;
                }

                return ngModelValue;
            });
        }
    };
});