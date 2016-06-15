angular.module('diplomaApp')
    .controller('AppCtrl', function($scope, $state, Auth, $mdSidenav, $stateParams, Graph){
        $scope.openSidebar = function() {
            $mdSidenav('sidebar').toggle();
        };

        $scope.isSidebarOpened = function () {
            return $mdSidenav('sidebar').isOpen();
        };


        if($stateParams.graphParams) {
            Graph.specialities = $stateParams.graphParams.specialities;
            Graph.positions = $stateParams.graphParams.positions;
        }
    });
