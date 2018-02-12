angular.module("yasla").service("UserService",
function ($http, $q, localStorageService, API_URL) {
    return {
        profile: function () {
            var q = $q.defer();

            console.log("UserService::profile");
            console.log("API: [%s]", API_URL);

            if (localStorageService.get("user")) {
                q.resolve(localStorageService.get("user"));
            }
            else {
                var url = API_URL + "/user";
                console.log(url);
                $http.get(API_URL + "/user").then(function (response) {
                    localStorageService.set("user", response.data);
                    q.resolve(response.data);
                });
            }
            return q.promise;
        }
    };
});