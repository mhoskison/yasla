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