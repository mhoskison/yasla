"use strict";

angular.module("yasla", [
    "ngMaterial", "ngMessages", "ngAnimate", "ui.router", "LocalStorageModule"
])
/**
 * Configure constants
 */
    .value("APP_VERSION", "// ---- REPLACE: APP_VERSION")
    .value("API_URL", "// ---- REPLACE: API_URL")
    .value("AUTH_URL", "// ---- REPLACE: AUTH_URL")
    .value("OAUTH_CLIENT_ID", "// ---- REPLACE: OAUTH_CLIENT_ID")
    .value("OAUTH_CLIENT_SECRET", "// ---- REPLACE: OAUTH_CLIENT_SECRET")

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