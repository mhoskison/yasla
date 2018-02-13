angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.home", {
            url:   "^/home",
            auth:  true,
            views: {
                "main@": {
                    template:   "",
                    controller: function ($state) {
                        $state.go("shopping.lists");
                    }
                }
            }
        });
});