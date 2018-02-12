angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.settings.ui", {
            url:   "^/settings/ui",
            views: {
                "main@": {
                    template: "<yasla-settings-ui></yasla-settings-ui>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("User interface");
                    }
                }
            }
        });
});