angular.module("diplomaApp")
    .factory('Faculties', function($firebaseArray, FirebaseUrl){
        var o = {};

        o.facultiesRef = new Firebase(FirebaseUrl+'faculties');
        o.faculties = $firebaseArray(o.facultiesRef);
        
        o.getFacultiesByUniversities = function(universities) {
            var faculties = [];
            if(!universities || universities.length == 0) { return; }
            for(var i = 0; i < universities.length; i++) {
                o.facultiesRef.orderByChild("university").equalTo(universities[i].$id).on("value", function (snapshot) {
                    var tmp = snapshot.val();
                    for (var property in tmp) {
                        if (tmp.hasOwnProperty(property)) {
                            tmp[property]["$id"] = property;
                            tmp[property]["university_name"] = universities[i].name;
                            faculties.push(tmp[property]);
                        }
                    }
                });
            }
            return faculties;
        };

        return o;
    }); 