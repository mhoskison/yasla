angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists", {
            url:   "^/lists",
            views: {
                "main@":    {
                    template:   "<yasla-lists></yasla-lists>",
                    controller: function ($scope, ListsService, ToolbarService) {
                        ListsService.get().then(function (data) {
                            ToolbarService.title.set("Shopping lists");
                            $scope.data = data;
                        });
                    }
                },
                "sbRight@": {
                    template: "<yasla-lists-sbright></yasla-lists-sbright>"
                }
            }
        });
});