angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.settings", {
            url:   "^/settings",
            views: {
                "main@": {
                    template: "<yasla-settings></yasla-settings>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("Settings");
                    }
                }
            }
        });
});