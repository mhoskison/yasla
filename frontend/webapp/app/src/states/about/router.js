angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.about", {
            url:   "^/about",
            views: {
                "main@": {
                    template: "<yasla-about></yasla-about>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("About!!");
                    }
                }
            }
        });
});