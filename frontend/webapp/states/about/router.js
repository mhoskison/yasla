angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.about", {
            url:   "^/about",
            views: {
                "main@": {
                    template: "<ttt-about></ttt-about>",
                    controller: function(ToolbarService) {
                        ToolbarService.title.set("About");
                    }
                }
            }
        });
});