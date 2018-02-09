angular.module("ttt").service("SearchService", function ($http, $q) {
    return {

        search: function (term) {
            var q = $q.defer();
            $http.post(apiroot + "/search", {term: term}).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        }
    };
});