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