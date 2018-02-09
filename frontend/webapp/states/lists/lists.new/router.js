angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.new", {
            url:   "/new",
            views: {
                "main@": {
                    template: "<ttt-lists-new></ttt-lists-new>",

                    controller: function ($scope, ListsService, ToolbarService, $stateParams, $state) {
                        ToolbarService.title.set("Create shopping list");
                    }
                }
            }
        });
});