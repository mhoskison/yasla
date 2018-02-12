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