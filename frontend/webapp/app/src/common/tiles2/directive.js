angular.module("yasla").directive("tiles2", function () {
    return {
        templateUrl: "src/common/tiles2/template.html",
        controller:  function ($scope) {
            $scope.cards = [
                {label: "Tile 01", rows: 1, cols: 2},
                {label: "Tile 02", rows: 1, cols: 1},
                {label: "Tile 03", rows: 1, cols: 1},
                {label: "Tile 04", rows: 1, cols: 1},
                {label: "Tile 05", rows: 2, cols: 1},
                {label: "Tile 06", rows: 1, cols: 1},
                {label: "Tile 07", rows: 1, cols: 1},
                {label: "Tile 08", rows: 1, cols: 1},
                {label: "Tile 09", rows: 1, cols: 1},
                {label: "Tile 10", rows: 1, cols: 1},
                {label: "Tile 11", rows: 1, cols: 1},
                {label: "Tile 12", rows: 1, cols: 1},
                {label: "Tile 13", rows: 1, cols: 1},
                {label: "Tile 14", rows: 1, cols: 1},
                {label: "Tile 15", rows: 1, cols: 1}
            ];
        },
        link:        function ($scope) {
        }
    };
});