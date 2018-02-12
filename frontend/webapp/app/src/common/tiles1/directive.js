angular.module("yasla").directive("tiles1", function () {
    return {
        templateUrl: "src/common/tiles1/template.html",
        controller:  function ($scope) {
            console.log("Here!");
            $scope.cards = [
                {label: "Tile 01", rows: 1, cols: 2},
                {label: "Tile 02", rows: 1, cols: 1},
                {label: "Tile 03", rows: 1, cols: 1},
                {label: "Tile 04", rows: 1, cols: 1},
                {label: "Tile 05", rows: 2, cols: 1},
                {label: "Tile 06", rows: 1, cols: 1},

            ];
        },
        link:        function ($scope) {
        }
    };
});