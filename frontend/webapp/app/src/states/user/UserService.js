angular.module("yasla").service("UserService", function ($http, $q, localStorageService, API_URL, $rootScope) {
    return {
        settings: {
            update: function (setting_name, setting_value) {
                var args = {
                    name:  setting_name,
                    value: setting_value
                };
                return $http.post(API_URL + "/settings/update", args);
            }
        },
        profile:  function () {
            var q = $q.defer();

            $http.get(API_URL + "/settings").then(function (response) {
                var profile = response.data;
                var settings = profile.user_settings;
                delete profile.user_settings;
                localStorageService.set("user", profile);
                localStorageService.set("settings", settings);

                $rootScope.theme = settings.theme || "theme02";
                console.log("Setting theme to " + $rootScope.theme);
                q.resolve(response.data);
            });

            return q.promise;
        }
    };
});