angular.module("yasla").service("SearchService", function ($http, $q, ListsService, ListsDialogService) {
    return {

        search: function (term) {
            var q = $q.defer();
            $http.post(apiroot + "/search", {term: term}).then(function (response) {
                q.resolve(response.data);
            });
            return q.promise;
        },

        addToList: function (list_id, product) {
            var q = $q.defer();

            // ---- If no list_id, we need to determine which shopping list to add the product to.
            //      If there's only one list, add it to that
            //          otherwise, show the list selection dialog and let the use choose
            //
            if (!list_id) {
                ListsService.get().then(function (lists) {
                    if (lists.length === 1) {
                        list_id = lists[0].id;
                        console.log("Only one list, so using list ID [%s]", list_id);
                        ListsService.product.add(list_id, product);
                        q.resolve(list_id);
                        console.log("Got here 1");
                    }
                    else {
                        ListsDialogService.ShoppingListSelector.show().then(function (foo) {
                            var list_id = foo.list_id;
                            var set_default = foo.set_default;
                            console.log("Going to use list ID [%s] from the dialog", list_id);
                            ListsService.product.add(list_id, product);
                            q.resolve(list_id);
                            console.log("Got here 2");
                        });
                    }
                });
            }
            else {
                console.log("Using user specified list [%s]", list_id);
                ListsService.product.add(list_id, product);
                q.resolve(list_id);
                console.log("Got here 3");
            }

            return q.promise;

        }
    };
});