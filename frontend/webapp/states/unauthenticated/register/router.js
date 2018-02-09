angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.register", {
            unauthenticated: true,
            url:             "/register",
            views:           {
                "main@": {
                    template:   "<ttt-user-register></ttt-user-register>",
                    controller: function (ToolbarService) {
                        ToolbarService.title.set("Register");
                    }
                }
            }
        });
});