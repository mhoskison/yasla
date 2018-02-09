angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.edit", {
            url:     "/edit/{id}",
            views:   {
                "main@": {
                    template:   "<ttt-lists-edit></ttt-lists-edit>",
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