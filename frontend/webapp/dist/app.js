angular
    .module("ttt", [
        "ngMaterial", "ngMessages", "ngResource", "ngAnimate",
        "ui.router", "ui", "LocalStorageModule"
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        /**
         * Configure initial routing. All other routing is performed in a .config block per module
         */
        $urlRouterProvider.otherwise("/home");
        $stateProvider.state("shopping", {
            url:   "/shopping",
            views: {
                main:    {},
                sbLeft:  {
                    template: "<ttt-sidenav-left></ttt-sidenav-left>"
                },
                sbRight: {
                    template: "<ttt-sidenav-right></ttt-sidenav-right>"
                }
            }
        });
    })

    /**
     * Configure local storage
     */
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix("shopping");
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

    /**
     * Listen for state change events to ensure protected states remain protected
     */
    .run(function ($rootScope, $mdSidenav, $transitions, AuthService) {

        $transitions.onStart({}, function ($transitions$) {
            var toState = $transitions$.to();
            if (!toState.unauthenticated) AuthService.ensureAuthenticated();
        });

        // ---- Close the left and right sidebars on a route change
        //
        $transitions.onSuccess({}, function ($transitions$) {
            console.log("%cSTATE: [" + $transitions$.to().name + "]", "border:1px solid #000;background: #ccc;padding: 3px;color:#222");
            $mdSidenav("left").close();
            $mdSidenav("right").close();
        });
    });
var api_url="http://dev.api.yasla.co.uk";
var apiroot = api_url + "/api";
var authroot = api_url;

angular.module("ttt").directive("tttAbout", function (CordovaService) {
    return {
        templateUrl: "states/about/template.html",
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
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.about", {
            url:   "^/about",
            views: {
                "main@": {
                    template: "<ttt-about></ttt-about>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("About");
                    }
                }
            }
        });
});
angular.module("ttt").service("AuthService", function ($rootScope, $state, $q, $http, localStorageService, UserService) {
    var AuthService = {

        ping: function () {
            return $http.get(apiroot + "/ping");
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
                client_id:     "2",
                client_secret: "HhqX7ofnL7XWYW5ROIELXnL7BTSvZ5KB6RGQ7YUW",
                grant_type:    "password",
                username:      username,
                password:      password,
                scope:         "*"
            };

            var url = authroot + "/oauth/token";
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
            $http.post(apiroot + "/user/register", {data: data}).then(
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
            $http.post(apiroot + "/user/validate-email", {email: value}).then(
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
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth", {
            abstract: true
        });
});
angular.module("ttt").directive("tttHome", function () {
    return {
        templateUrl: "states/home/template.html"
    };
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.home", {
            url:   "^/home",
            auth:  true,
            views: {
                "main@": {
                    template: "<ttt-home></ttt-home>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("Home");
                    }
                }
            }
        });
});
angular.module("ttt").service("api", function ($http, $q) {
    return {
        misc: {
            ping: function () {
                $http.get(apiroot + "/ping").then(function (response) {
                });
            }
        }
    };
});
angular.module("ttt").service("CordovaService", function ($http, $q) {
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
angular.module("ttt").controller("SidenavCtrl", function ($scope, $timeout, $mdSidenav, $log) {
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

angular.module("ttt").service("ListsDialogService", function ($mdDialog, $http, $q) {
    var ListDialogService = {
        ShoppingListSelector: {
            show:       function () {
                var q = $q.defer();
                $mdDialog.show(
                    {
                        controller:          ListDialogService.ShoppingListSelector.controller,
                        templateUrl:         "states/lists/dialogShoppingListSelector.html",
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
angular.module("ttt").service("ListsService", function ($http, $q) {
    var ListsService = {
        get: function () {
            var q = $q.defer();
            $http.get(apiroot + "/lists/get").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },

        addProduct: function (list_id, product) {
            return $http.post(apiroot + "/product/add-to-list/" + list_id, {data:product});
        },

        basicInfo: function (list_id) {
            var q = $q.defer();

            $http.get(apiroot + "/lists/" + list_id + "/info").then(function (response) {
                q.resolve(response.data[0]);
            });
            return q.promise;
        },

        info:    function (list_id) {
            var q = $q.defer();

            $http.get(apiroot + "/lists/" + list_id + "/products").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        create:  function (data) {
            var q = $q.defer();
            $http.post(apiroot + "/lists/create", data).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        delete:  function (list_id) {
            return $http.post(apiroot + "/lists/" + list_id + "/delete");
        },
        product: {
            add: function (list_id, product_id) {

            }
        }
    };
    return ListsService;
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists", {
            url:   "^/lists",
            views: {
                "main@":    {
                    template:   "<ttt-lists></ttt-lists>",
                    controller: function ($scope, ListsService, ToolbarService) {
                        ListsService.get().then(function (data) {
                            ToolbarService.title.set("Shopping lists");
                            $scope.data = data;
                        });
                    }
                },
                "sbRight@": {
                    template: "<ttt-lists-sbright></ttt-lists-sbright>"
                }
            }
        });
});
angular.module("ttt").service("SearchService", function ($http, $q) {
    return {

        search: function (term) {
            var q = $q.defer();
            $http.post(apiroot + "/search", {term: term}).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        }
    };
});
angular.module("ttt").directive("tttSearch", function (SearchService, ListsDialogService, ListsService, $mdToast, $state) {
    return {
        templateUrl: "states/search/template.html",
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
                    if ($scope.data.list_id === null) {
                        ListsDialogService.ShoppingListSelector.show().then(
                            function (list) {
                                if (list.set_default) {
                                    $scope.data.list_id = list.list_id;
                                }
                            }
                        );
                    }
                    else {
                        ListsService.addProduct($scope.data.list_id, product).then(
                            function success() {
                                if ($scope.data.list_id) {
                                    $state.go("shopping.lists.edit", {id: $scope.data.list_id});
                                }
                                else {
                                    $mdToast.show($mdToast.simple().textContent("Added!").hideDelay(1000));
                                }
                            },
                            function failure() {
                                $mdToast.show($mdToast.simple().textContent("Something went wrong").hideDelay(1000));
                            }
                        );
                    }
                }
            };
        }
    };
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.search", {
            url:    "^/search",
            params: {
                list_id: null
            },
            views:  {
                "main@": {
                    template:   "<ttt-search></ttt-search>",
                    controller: function (ToolbarService, $stateParams, $scope) {
                        $scope.data = {
                            list_id:          $stateParams.list_id,
                            term:             null,
                            awaiting_results: false,
                            results:          []
                        };
                        ToolbarService.title.set("Search for products (" + $stateParams.list_id + ")");
                    }
                }
            }
        });
});
angular.module("ttt").service("UserService", function ($http, $q, localStorageService) {
    return {
        profile: function () {
            var q = $q.defer();

            if (localStorageService.get("user")) {
                q.resolve(localStorageService.get("user"));
            }
            else {
                $http.get(apiroot + "/user").then(function (response) {
                    localStorageService.set("user", response.data);
                    q.resolve(response.data);
                });
            }
            return q.promise;
        }
    };
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user", {
            url:      "^/user",
            abstract: true
        });
});
angular.module("ttt").directive("tttAuthLoggedOut", function () {
    return {
        templateUrl: "states/auth/loggedout/template.html"
    };
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.loggedout", {
            unauthenticated: true,
            url:             "^/auth/loggedout",
            views:           {
                "main@": {
                    template: "<ttt-auth-logged-out></ttt-auth-logged-out>"
                }
            }
        });
});
angular.module("ttt").directive("tttAuthLogout", function ($state, AuthService) {
    return {
        templateUrl: "states/auth/logout/template.html",
        controller:  function ($scope) {
            $scope.logout = function () {
                AuthService.logout();
                $state.go("shopping.auth.loggedout");
            };
        }
    };
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.logout", {
            url:   "^/auth/logout",
            views: {
                "main@": {
                    template:   "<ttt-auth-logout></ttt-auth-logout>",
                    controller: function ($scope) {
                    }
                }
            }
        });
});
angular.module("ttt").directive("tttMenu", function () {
    return {
        templateUrl: "states/common/menu/template.html",
        controller:  function ($scope) {

        }
    };
});
angular.module("ttt").directive("tttSidenavLeft", function (UserService) {
    return {
        templateUrl: "states/common/sidenav-left/template.html",
        controller: function($scope) {
            UserService.profile().then(function(user) {
                $scope.user = user;
            });

        }
    };
});
angular.module("ttt").directive("tttSidenavRight", function () {
    return {
        templateUrl: "states/common/sidenav-right/template.html"
    };
});
angular.module("ttt").service("ToolbarService", function ($rootScope) {
    return {
        title: {
            set: function (label) {
                $rootScope.title = label;
            }
        }
    };
});
angular.module("ttt").directive("tttToolbar", function (AuthService) {
    return {
        templateUrl: "states/common/toolbar/template.html",

        link: function ($scope) {
            $scope.isAuthenticated = function () {
                return AuthService.isAuthenticated();
            };
        }
    };
});
angular.module("ttt").directive("tttLists", function ($state) {
    return {
        templateUrl: "states/lists/lists.default/template.html",
        controller:  function ($scope) {
        }
    };
});
angular.module("ttt").directive("tttListsDelete", function ($state, ListsService) {
    return {
        templateUrl: "states/lists/lists.delete/template.html",
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
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.delete", {
            url:   "/delete/{id}",
            views: {
                "main@": {
                    template: "<ttt-lists-delete></ttt-lists-delete>",

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
angular.module("ttt").directive("tttListsEdit", function ($mdToast) {
    return {
        templateUrl: "states/lists/lists.edit/template.html",
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
                    return;
                    $mdToast.show($mdToast.simple().textContent("Shopping list updated: New total £" + $scope.data.total).hideDelay(1000));
                },
                quantity:  {
                    up: function (item) {
                        var list_id = $scope.data.list.id;
                        item.quantity++;
                        $scope.ui.calculate(true);
                    },
                    dn: function (item) {
                        item.quantity--;
                        $scope.ui.calculate(true);
                    }
                }
            };
            $scope.ui.calculate();
        }
    };
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.edit", {
            url:     "/edit/{id}",
            views:   {
                "main@": {
                    template:   "<ttt-lists-edit></ttt-lists-edit>",
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
angular.module("ttt").directive("tttListsNew", function (ListsService, $state, $timeout) {
    return {
        templateUrl: "states/lists/lists.new/template.html",
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
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.new", {
            url:   "/new",
            views: {
                "main@": {
                    template: "<ttt-lists-new></ttt-lists-new>",

                    controller: function ($scope, ListsService, ToolbarService, $stateParams, $state) {
                        ToolbarService.title.set("Create shopping list");
                    }
                }
            }
        });
});
angular.module("ttt").directive("tttListsSbright", function () {
    return {
        templateUrl: "states/lists/sb-right/template.html",
        controller:  function ($scope) {
        }
    };
});
angular.module("ttt").directive("tttAuthIntro", function (AuthService, $state, CordovaService, ToolbarService) {
    return {
        templateUrl: "states/unauthenticated/intro/template.html",
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
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.intro", {
            unauthenticated: true,
            url:             "^/auth/intro",
            views:           {
                "main@": {
                    template:   "<ttt-auth-intro></ttt-auth-intro>",
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
angular.module("ttt").directive("tttAuthLogin", function (AuthService, $state, CordovaService, ToolbarService, $timeout) {
    return {
        templateUrl: "states/unauthenticated/login/template.html",
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
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.login", {
            unauthenticated: true,
            url:             "^/auth/login",
            views:           {
                "main@": {
                    template:   "<ttt-auth-login></ttt-auth-login>",
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
angular.module("ttt").directive("tttUserRegister", function (AuthService, $state) {
    return {
        templateUrl: "states/unauthenticated/register/template.html",
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
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.register", {
            unauthenticated: true,
            url:             "/register",
            views:           {
                "main@": {
                    template:   "<ttt-user-register></ttt-user-register>",
                    controller: function (ToolbarService) {
                        ToolbarService.title.set("Register");
                    }
                }
            }
        });
});
angular.module("ttt").directive("tttUserProfile", function () {
    return {
        templateUrl: "states/user/profile/template.html",
        controller:  function ($scope) {

        }
    };
});
angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user.profile", {
            url:   "/profile",
            views: {
                "main@": {
                    template:   "<ttt-user-profile></ttt-user-profile>",
                    controller: function ($scope, UserService, ToolbarService) {
                        ToolbarService.title.set("Profile");
                        UserService.profile().then(function (data) {
                            $scope.user = data;
                        });
                    }
                }
            }
        });
});
angular.module("ttt").directive("tttDuplicateEmail", function (AuthService) {
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
angular.module("ttt").directive("tttMatchPassword", function () {
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
angular.module("ttt").directive("tttValidatePassword", function () {
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