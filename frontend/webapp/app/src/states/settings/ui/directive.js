angular.module("yasla").directive("yaslaSettingsUi", function ($rootScope, UserService) {
    return {
        templateUrl: "states/settings/ui/template.html",

        controller:  function ($scope) {
            $scope.data = {
                theme:  null,
                themes: [
                    {theme: "theme01", name: "Red"},
                    {theme: "theme02", name: "Pink"},
                    {theme: "theme03", name: "Purple"},
                    {theme: "theme04", name: "Deep purple"},
                    {theme: "theme05", name: "Indigo"},
                    {theme: "theme06", name: "Blue"},
                    {theme: "theme07", name: "Light blue"},
                    {theme: "theme08", name: "Cyan"},
                    {theme: "theme09", name: "Teal"},
                    {theme: "theme10", name: "Green"}
                ]
            };
            $scope.ui = {
                applyTheme: function () {
                    $rootScope.theme = $scope.data.theme;
                    UserService.settings.update("theme", $scope.data.theme);
                }
            };
        }
    };
});