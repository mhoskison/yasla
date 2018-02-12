angular.module("yasla").directive("yaslaLists", function ($state) {
    return {
        templateUrl: "src/states/lists/lists.default/template.html",
        controller:  function ($scope) {
            console.log("In directive controller");
        },
        link:        function ($scope) {
        }
    };
});