angular.module("ttt").directive("tttListsNew", function (ListsService, $state, $timeout) {
    return {
        templateUrl: "states/lists/lists.new/template.html",
        controller:  function ($scope) {
            $scope.data = {
                list_name: ""
            };
            $scope.ui = {
                save: function () {
                    ListsService.create({data: $scope.data}).then(function () {
                        $state.go("shopping.lists");
                    });
                }
            };
        },
        link:        function ($scope) {
            $timeout(function () {
                $(".autofocus").focus();
            });
        }
    };
});