angular.module('diplomaApp')
    .controller('AppCtrl', function($scope, $state, Auth, $mdSidenav, $stateParams){
        $scope.openSidebar = function() {
            $mdSidenav('sidebar').toggle();
        };

        $scope.isSidebarOpened = function () {
            return $mdSidenav('sidebar').isOpen();
        };


        console.log($stateParams);
    });
