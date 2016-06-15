angular.module('diplomaApp')
    .controller('AuthCtrl', function($scope, $state, $mdToast, $mdDialog, Auth){
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.login = function () {
            Auth.$authWithPassword($scope.user).then(function (auth){
                drawToast("Logged ing");
            }, function (error){
                drawToast(error.toString());
            });
            $scope.hide();
        };

        $scope.register = function (){
            Auth.$createUser($scope.user).then(function (user){
                drawToast("Registered successfully");
            }, function (error){
                drawToast(error.toString());
            });
            $scope.hide();
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        function drawToast(text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position("top right")
                    .hideDelay(3000)
            );
        }
    });
