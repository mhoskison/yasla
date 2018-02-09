angular.module("ttt").service("ListsService", function ($http, $q) {
    var ListsService = {
        get: function () {
            var q = $q.defer();
            $http.get(apiroot + "/lists/get").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },

        addProduct: function (list_id, product) {
            return $http.post(apiroot + "/product/add-to-list/" + list_id, {data:product});
        },

        basicInfo: function (list_id) {
            var q = $q.defer();

            $http.get(apiroot + "/lists/" + list_id + "/info").then(function (response) {
                q.resolve(response.data[0]);
            });
            return q.promise;
        },

        info:    function (list_id) {
            var q = $q.defer();

            $http.get(apiroot + "/lists/" + list_id + "/products").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        create:  function (data) {
            var q = $q.defer();
            $http.post(apiroot + "/lists/create", data).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        delete:  function (list_id) {
            return $http.post(apiroot + "/lists/" + list_id + "/delete");
        },
        product: {
            add: function (list_id, product_id) {

            }
        }
    };
    return ListsService;
});