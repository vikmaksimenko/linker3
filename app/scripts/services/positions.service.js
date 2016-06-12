angular.module("diplomaApp")
    .factory('Positions', function($firebaseArray, FirebaseUrl){
        var o = {};
        
        o.positionsRef = new Firebase(FirebaseUrl+'positions');
        o.positions = $firebaseArray(o.positionsRef);

        o.getPositionsByCompanies = function(companies) {
            var positions = [];
            for(var i = 0; i < companies.length; i++) {
                o.positionsRef.orderByChild("company").equalTo(companies[i].$id).on("value", function (snapshot) {
                    tmp = snapshot.val();
                    for (var property in tmp) {
                        if (tmp.hasOwnProperty(property)) {
                            tmp[property]["company_name"] = companies[i].name;
                            positions.push(tmp[property]);
                        }
                    }
                });
            }
            return positions;
        };

        return o;
    }); 