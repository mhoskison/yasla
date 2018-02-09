angular.module("ttt").directive("tttSearch", function (SearchService, ListsDialogService, ListsService, $mdToast, $state) {
    return {
        templateUrl: "states/search/template.html",
        controller:  function ($scope) {

            $scope.ui = {
                search: function () {
                    var term = $scope.data.term;
                    $scope.data.results = [];
                    $scope.data.awaiting_results = true;
                    SearchService.search(term).then(function (results) {
                        $scope.data.awaiting_results = false;
                        $(".search-card").addClass("rolledup");
                        $scope.data.results = results;
                    });
                },

                add: function (product) {
                    if ($scope.data.list_id === null) {
                        ListsDialogService.ShoppingListSelector.show().then(
                            function (list) {
                                if (list.set_default) {
                                    $scope.data.list_id = list.list_id;
                                }
                            }
                        );
                    }
                    else {
                        ListsService.addProduct($scope.data.list_id, product).then(
                            function success() {
                                if ($scope.data.list_id) {
                                    $state.go("shopping.lists.edit", {id: $scope.data.list_id});
                                }
                                else {
                                    $mdToast.show($mdToast.simple().textContent("Added!").hideDelay(1000));
                                }
                            },
                            function failure() {
                                $mdToast.show($mdToast.simple().textContent("Something went wrong").hideDelay(1000));
                            }
                        );
                    }
                }
            };
        }
    };
});