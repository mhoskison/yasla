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
// ---- REPLACE: API_URL
var apiroot = api_url + "/api";
var authroot = api_url;
