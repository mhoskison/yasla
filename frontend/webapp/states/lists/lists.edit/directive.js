angular.module("ttt").directive("tttListsEdit", function (ListsService) {
    return {
        templateUrl: "states/lists/lists.edit/template.html",
        controller:  function ($scope) {
        },
        link:        function ($scope) {
            $scope.ui = {
                calculate: function (do_toast) {
                    var total = 0;
                    angular.forEach($scope.data.products, function (item) {
                        total += item.price * item.quantity;
                    });
                    $scope.data.total = total;
                    if (do_toast) $scope.ui.toast();
                },
                toast:     function () {
                },
                quantity:  {
                    up: function (item) {
                        item.quantity++;
                        $scope.ui.calculate(true);
                        ListsService.product.updateQuantity($scope.data.list.id, item.id, item.quantity);
                    },
                    dn: function (item) {
                        item.quantity--;
                        $scope.ui.calculate(true);
                        ListsService.product.updateQuantity($scope.data.list.id, item.id, item.quantity);
                    }
                }
            };
            $scope.ui.calculate();
        }
    };
});