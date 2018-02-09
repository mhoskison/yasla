angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.home", {
            url:   "^/home",
            auth:  true,
            views: {
                "main@": {
                    template: "<ttt-home></ttt-home>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("Home");
                    }
                }
            }
        });
});