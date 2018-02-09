angular.module("yasla").directive("yaslaListsDelete", function ($state, ListsService) {
    return {
        templateUrl: "states/lists/lists.delete/template.html",
        controller:  function ($scope) {
            $scope.ui = {
                confirm: function() {
                    ListsService.delete($scope.data.id);
                    $state.go("shopping.lists");
                },
                cancel: function() {
                    $state.go("shopping.lists");
                }
            }
        }
    };
});