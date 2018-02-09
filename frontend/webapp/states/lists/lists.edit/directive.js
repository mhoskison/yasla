angular.module("ttt").directive("tttListsEdit", function ($mdToast) {
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
                    return;
                    $mdToast.show($mdToast.simple().textContent("Shopping list updated: New total £" + $scope.data.total).hideDelay(1000));
                },
                quantity:  {
                    up: function (item) {
                        var list_id = $scope.data.list.id;
                        item.quantity++;
                        $scope.ui.calculate(true);
                    },
                    dn: function (item) {
                        item.quantity--;
                        $scope.ui.calculate(true);
                    }
                }
            };
            $scope.ui.calculate();
        }
    };
});