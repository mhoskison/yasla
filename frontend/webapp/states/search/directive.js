angular.module("ttt").directive("tttSearch", function (SearchService, ListsDialogService, ListsService, $mdToast, $state, $timeout) {
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
                    SearchService.addToList($scope.data.list_id, product).then(
                        function (list_id) {
                            console.log("Got back from SearchService");
                            $timeout(function() {
                                $state.go("shopping.lists.edit", {id: list_id}, {reload: true});
                            }, 550);
                        });
                }
            };
        },
        link:        function ($scope) {
            $timeout(function () {
                $(".autofocus").focus();
            }, 100);
        }
    };
});