angular.module("yasla").directive("yaslaAuthLogin", function (AuthService, $state, CordovaService, ToolbarService, $timeout) {
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