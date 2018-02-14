angular.module("yasla").directive("yaslaUserRegister", function (AuthService, $state) {
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