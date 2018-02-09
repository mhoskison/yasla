angular.module("ttt").service("UserService", function ($http, $q, localStorageService) {
    return {
        profile: function () {
            var q = $q.defer();

            if (localStorageService.get("user")) {
                q.resolve(localStorageService.get("user"));
            }
            else {
                $http.get(apiroot + "/user").then(function (response) {
                    localStorageService.set("user", response.data);
                    q.resolve(response.data);
                });
            }
            return q.promise;
        }
    };
});