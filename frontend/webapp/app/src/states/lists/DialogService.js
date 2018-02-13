angular.module("yasla").service("ListsDialogService", function ($mdDialog, $http, $q) {
    var ListDialogService = {
        ShoppingListSelector: {
            show:       function () {
                var q = $q.defer();
                $mdDialog.show(
                    {
                        controller:          ListDialogService.ShoppingListSelector.controller,
                        templateUrl:         "src/states/lists/dialogShoppingListSelector.html",
                        parent:              angular.element(document.body),
                        targetEvent:         null,
                        clickOutsideToClose: true,
                        fullscreen:          true
                    })
                    .then(
                        function save(list) {
                            q.resolve(list);
                        },
                        function cancel() {
                            q.reject();
                        });
                return q.promise;
            },
            controller: function ($scope, ListsService) {
                $scope.ui = {
                    close: function () {
                        $mdDialog.cancel();
                    },
                    save:  function () {
                        var ret = {
                            list_id:     $scope.data.list_id,
                            set_default: $scope.data.set_default
                        };
                        $mdDialog.hide(ret);
                    }
                };
                $scope.data = {
                    list_id:     null,
                    set_default: 0
                };

                ListsService.get().then(function (list) {
                    $scope.list = list;
                });
            }
        }

    };
    return ListDialogService;
});