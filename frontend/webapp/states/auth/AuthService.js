angular.module("ttt").service("AuthService", function ($rootScope, $state, $q, $http, localStorageService, UserService) {
    var AuthService = {

        ping: function () {
            return $http.get(apiroot + "/ping");
        },

        /**
         * Ensure the user is authenticated, redirect to login otherwise
         */
        ensureAuthenticated: function () {
            if (AuthService.isAuthenticated()) return;
            $state.go("shopping.auth.intro");
        },

        /**
         * Check if the user is authenticated
         *
         * @returns {boolean}
         */
        isAuthenticated: function () {
            var ret = false;
            var token = localStorageService.get("access_token");

            if (token) ret = true;
            return ret;
        },

        logout: function () {
            localStorageService.remove("access_token");
            localStorageService.remove("refresh_token");
            localStorageService.remove("user");
        },

        /**
         * Attempt to authenticate the user
         */
        login: function (username, password) {
            var q = $q.defer();

            var args = {
                client_id:     "// ---- REPLACE: OAUTH_CLIENT_ID",
                client_secret: "// ---- REPLACE: OAUTH_CLIENT_SECRET",
                grant_type:    "password",
                username:      username,
                password:      password,
                scope:         "*"
            };

            var url = authroot + "/oauth/token";
            $http.post(url, args).then(
                function success(response) {
                    console.log("Doing it here");
                    var access_token = response.data.access_token;
                    var refresh_token = response.data.refresh_token;
                    localStorageService.set("access_token", access_token);
                    localStorageService.set("refresh_token", refresh_token);
                    UserService.profile();
                    q.resolve();
                },
                function error(a) {
                    q.reject();
                });

            return q.promise;
        },

        register: function (data) {
            var q = $q.defer();
            $http.post(apiroot + "/user/register", {data: data}).then(
                function success(response) {
                    q.resolve(response.data);
                },
                function failure(error) {
                    q.reject(error);
                });
            return q.promise;
        },

        validateEmail: function (value) {
            var q = $q.defer();
            $http.post(apiroot + "/user/validate-email", {email: value}).then(
                function success(response) {
                    if (response.data === 0) q.resolve();
                    else q.reject();
                },
                function failure(error) {
                    q.reject(error);
                });
            return q.promise;
        }
    };

    return AuthService;
});