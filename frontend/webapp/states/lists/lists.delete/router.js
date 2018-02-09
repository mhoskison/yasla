angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.delete", {
            url:   "/delete/{id}",
            views: {
                "main@": {
                    template: "<yasla-lists-delete></yasla-lists-delete>",

                    controller: function ($scope, ListsService, ToolbarService, $stateParams, $state) {
                        var id = $stateParams.id;
                        if (!id) $state.go("shopping.lists");

                        ToolbarService.title.set("Delete shopping list");
                        ListsService.basicInfo(id).then(function (data) {
                            $scope.data = data;
                        });
                    }
                }
            }
        });
});