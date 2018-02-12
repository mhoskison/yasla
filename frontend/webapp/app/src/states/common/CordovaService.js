angular.module("yasla").service("CordovaService", function ($http, $q) {
    return {
        version: function () {
            var q = $q.defer();
            q.resolve("");
            return q.promise;
            if (typeof cordova !== "undefined") {
                cordova.getAppVersion.getVersionNumber().then(function (version) {
                    q.resolve(version);
                });
            }
            else {
                q.reject();
            }

            return q.promise;


        }
    };
});