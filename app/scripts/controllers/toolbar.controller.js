angular.module('diplomaApp')
    .controller('ToolbarCtrl', function($scope, $mdMedia, $mdDialog){
        $scope.showAboutDialog = function(ev){

            console.log(ev);

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

        $scope.showLoginDialog = function(){
            console.log("login dialog");
        };

        $scope.showExportDialog = function(){
            console.log("export dialog");
        };
    });
function AboutDialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
}