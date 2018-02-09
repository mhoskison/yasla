angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.search", {
            url:    "^/search",
            params: {
                list_id: null
            },
            views:  {
                "main@": {
                    template:   "<ttt-search></ttt-search>",
                    controller: function (ToolbarService, $stateParams, $scope) {
                        $scope.data = {
                            list_id:          $stateParams.list_id,
                            term:             null,
                            awaiting_results: false,
                            results:          []
                        };
                        ToolbarService.title.set("Search for products (" + $stateParams.list_id + ")");
                    }
                }
            }
        });
});