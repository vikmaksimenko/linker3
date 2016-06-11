angular.module('diplomaApp')
    .controller('SidebarCtrl', function($scope, $mdSidenav, Companies, Positions){
        $scope.companies = Companies.companies;
        $scope.positionsForCompanies = [];
        $scope.selectedCompanies = [];
        $scope.selectedPositions = [];

        $scope.onCompaniesSelected = function() {
            angular.copy(Positions.getPositionsByCompanies($scope.selectedCompanies), $scope.positionsForCompanies);
            console.log($scope.positionsForCompanies);
        };

        $scope.convertSelectionToString = function (selection) {
            var str = "";
            if(!selection.length) {
                return "Select Company";
            }

            for(var i = 0; i < selection.length - 1; i++) {
                str += selection[i].name + ", ";
            }
            str += selection[selection.length - 1].name;

            if(str.length > 25) {
                str = str.substring(0, 35) + "...";
            }
            return str;
        };
    });
