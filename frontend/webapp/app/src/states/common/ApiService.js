angular.module("yasla").service("api", function (API_URL, $http, $q) {
    return {
        misc: {
            ping: function () {
                $http.get(API_URL + "/ping").then(function (response) {
                });
            }
        }
    };
});