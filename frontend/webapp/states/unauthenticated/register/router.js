angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.register", {
            unauthenticated: true,
            url:             "/register",
            views:           {
                "main@": {
                    template:   "<yasla-user-register></yasla-user-register>",
                    controller: function (ToolbarService) {
                        ToolbarService.title.set("Register");
                    }
                }
            }
        });
});