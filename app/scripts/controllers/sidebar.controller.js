angular.module('diplomaApp')
    .controller('SidebarCtrl', function($scope, $mdSidenav, Companies, Positions, Universities, Faculties, Specialities){
        $scope.companies = Companies.companies;
        $scope.selectedCompanies = [];
        $scope.positionsForCompanies = [];
        $scope.selectedPositions = [];

        $scope.universities = Universities.universities;
        $scope.selectedUniversities = [];
        $scope.facultiesForUniversities = [];
        $scope.selectedFaculties = [];
        $scope.specialitiesForFaculties = [];
        $scope.selectedSpecialities = [];
        

        $scope.onCompaniesSelected = function() {
            angular.copy(Positions.getPositionsByCompanies($scope.selectedCompanies), $scope.positionsForCompanies);
        };

        $scope.onUniversitiesSelected = function () {
            angular.copy(Faculties.getFacultiesByUniversities($scope.selectedUniversities), $scope.facultiesForUniversities);
        };

        $scope.onFacultiesSelected = function () {
            angular.copy(Specialities.getSpecialitiesByFaculty($scope.selectedFaculties), $scope.specialitiesForFaculties);
        };

        $scope.convertSelectionToString = function (selection, placeholder) {
            var str = "";
            if(!selection.length) {
                return placeholder;
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
