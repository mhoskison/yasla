angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.home", {
            url:   "^/home",
            auth:  true,
            views: {
                "main@": {
                    template: "<yasla-home></yasla-home>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("Home");
                    }
                }
            }
        });
});