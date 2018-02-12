angular.module("yasla").service("ListsService", function (API_URL, $http, $q) {
    var ListsService = {

        product:   {
            add:            function (list_id, product) {
                return $http.post(API_URL + "/product/add-to-list/" + list_id, {data: product});
            },
            updateQuantity: function (list_id, product_id, quantity) {
                var url = API_URL + "/list/" + list_id + "/product/" + product_id + "/update-quantity/" + quantity;
                console.log(url);
                return $http.post(API_URL + "/list/" + list_id + "/product/" + product_id + "/update-quantity/" + quantity);
            }
        },
        get:       function () {
            var q = $q.defer();
            $http.get(API_URL + "/lists/get").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        basicInfo: function (list_id) {
            var q = $q.defer();

            $http.get(API_URL + "/lists/" + list_id + "/info").then(function (response) {
                q.resolve(response.data[0]);
            });
            return q.promise;
        },
        info:      function (list_id) {
            var q = $q.defer();

            $http.get(API_URL + "/lists/" + list_id + "/products").then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        create:    function (data) {
            var q = $q.defer();
            $http.post(API_URL + "/lists/create", data).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },
        delete:    function (list_id) {
            return $http.post(API_URL + "/lists/" + list_id + "/delete");
        }
    };
    return ListsService;
});