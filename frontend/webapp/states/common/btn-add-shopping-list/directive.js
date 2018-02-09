angular.module("ttt").directive("tttBtnAddShoppingList", function () {
    return {
        templateUrl: "states/common/btn-add-shopping-list/template.html",
        controller:  function ($scope) {

        },
        link:        function ($scope) {
            $(".btn-add-shopping-list").detach().appendTo("body");
            $scope.$on("$destroy", function () {
                $(".btn-add-shopping-list").remove();
            });
        }
    };
});