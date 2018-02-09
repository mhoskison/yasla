angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user", {
            url:      "^/user",
            abstract: true
        });
});