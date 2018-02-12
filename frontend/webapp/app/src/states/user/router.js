angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user", {
            url:      "^/user",
            abstract: true
        });
});