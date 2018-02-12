angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.edit", {
            url:     "/edit/{id}",
            views:   {
                "main@": {
                    template:   "<yasla-lists-edit></yasla-lists-edit>",
                    controller: function ($scope, ToolbarService, $stateParams, $state, listinfo) {
                        var id = $stateParams.id;
                        if (!id) $state.go("shopping.lists");
                        ToolbarService.title.set("Edit shopping list");
                        $scope.data = listinfo;
                    }
                }
            },
            resolve: {
                listinfo: function (ListsService, $stateParams) {
                    return ListsService.info($stateParams.id);
                }
            }
        });
});