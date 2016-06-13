angular.module("diplomaApp")
    .factory('Subjects', function($firebaseArray, FirebaseUrl){
        var o = {};
        
        o.subjectsRef = new Firebase(FirebaseUrl+'subjects');
        o.subjects = $firebaseArray(o.subjectsRef);

        return o;
    }); 