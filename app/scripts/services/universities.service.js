angular.module("diplomaApp")
    .factory('Universities', function($firebaseArray, FirebaseUrl){
        var o = {};
        
        o.universitiesRef = new Firebase(FirebaseUrl+'universities');
        o.universities = $firebaseArray(o.universitiesRef);

        return o;
    }); 