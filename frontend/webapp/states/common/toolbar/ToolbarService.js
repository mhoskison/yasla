angular.module("ttt").service("ToolbarService", function ($rootScope) {
    return {
        title: {
            set: function (label) {
                $rootScope.title = label;
            }
        }
    };
});