angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists", {
            url:   "^/lists",
            views: {
                "main@":    {
                    template:   "<ttt-lists></ttt-lists>",
                    controller: function ($scope, ListsService, ToolbarService) {
                        ListsService.get().then(function (data) {
                            ToolbarService.title.set("Shopping lists");
                            $scope.data = data;
                        });
                    }
                },
                "sbRight@": {
                    template: "<ttt-lists-sbright></ttt-lists-sbright>"
                }
            }
        });
});