angular.module("diplomaApp")
    .factory('Specialities', function($firebaseArray, FirebaseUrl){
        var o = {};

        o.specialitiesRef = new Firebase(FirebaseUrl+'specialities');
        o.specialities = $firebaseArray(o.specialitiesRef);

        o.getSpecialitiesByFaculty = function(faculties) {
            var specialities = [];
            if(!faculties || faculties.length == 0) { return; }
            for(var i = 0; i < faculties.length; i++) {
                o.specialitiesRef.orderByChild("faculty").equalTo(faculties[i].$id).on("value", function (snapshot) {
                    var tmp = snapshot.val();
                    for (var property in tmp) {
                        if (tmp.hasOwnProperty(property)) {
                            tmp[property]["$id"] = property;
                            tmp[property]["faculty_name"] = faculties[i].name;
                            specialities.push(tmp[property]);
                        }
                    }
                });
            }
            return specialities;
        };

        return o;
    }); 