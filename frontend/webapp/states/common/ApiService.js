angular.module("ttt").service("api", function ($http, $q) {
    return {
        misc: {
            ping: function () {
                $http.get(apiroot + "/ping").then(function (response) {
                });
            }
        }
    };
});