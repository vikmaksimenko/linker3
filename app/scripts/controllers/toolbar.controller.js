angular.module('diplomaApp')
    .controller('ToolbarCtrl', function($scope, $mdMedia, $mdDialog){
        $scope.showAboutDialog = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: AboutDialogController,
                templateUrl: 'views/_about_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        $scope.showExportDialog = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: ExportDialogCtrl,
                templateUrl: 'views/_export_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        $scope.showAuthDialog = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                templateUrl: 'views/_auth_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        }
    });
function AboutDialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
}
function ExportDialogCtrl($scope, $mdDialog) {
    $scope.formats = ['PNG', 'JPG', 'JSON'];

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.save = function() {
        if($scope.selectedFormat == 'JSON') {
            var blob = new Blob([JSON.stringify(cy.json())], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "graph.json");
        } else {
            var link = document.createElement("a");
            if($scope.selectedFormat == 'PNG') {
                link.setAttribute("href", cy.png());
                link.setAttribute("download", "graph.png");
            } else if($scope.selectedFormat == 'JPG') {
                link.setAttribute("href", cy.jpg());
                link.setAttribute("download", "graph.jpg");
            }
            link.click();
        }
        $mdDialog.hide();
    };
}