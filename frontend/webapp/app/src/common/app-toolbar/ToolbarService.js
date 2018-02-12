angular.module("yasla").service("ToolbarService", function ($rootScope) {
    return {
        title: {
            set: function (label) {
                $rootScope.title = label;
            }
        }
    };
});