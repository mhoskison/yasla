angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.lists.new", {
            url:   "/new",
            views: {
                "main@": {
                    template: "<yasla-lists-new></yasla-lists-new>",

                    controller: function ($scope, ListsService, ToolbarService, $stateParams, $state) {
                        ToolbarService.title.set("Create shopping list");
                    }
                }
            }
        });
});