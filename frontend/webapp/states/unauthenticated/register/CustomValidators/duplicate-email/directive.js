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