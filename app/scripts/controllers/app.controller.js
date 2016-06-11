angular.module('diplomaApp')
    .controller('AppCtrl', function($scope, $state, Auth, companies, $mdSidenav){
        console.log(companies);

        console.log("AppCtrl");

        $scope.openSidebar = function() {
            $mdSidenav('sidebar').toggle();
        };

        $scope.isSidebarOpened = function () {
            return $mdSidenav('sidebar').isOpen();
        }
    });
