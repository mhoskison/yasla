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