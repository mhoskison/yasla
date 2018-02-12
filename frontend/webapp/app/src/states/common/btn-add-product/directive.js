angular.module("yasla").directive("yaslaBtnAddProduct", function ($stateParams) {
    return {
        templateUrl: "src/states/common/btn-add-product/template.html",
        controller:  function ($scope) {
        },
        link:        function ($scope) {
            $(".btn-add-product").detach().appendTo("body");
            $scope.$on("$destroy", function () {
                $(".btn-add-product").remove();
            });
        }
    };
});