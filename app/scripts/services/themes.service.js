angular.module("diplomaApp")
    .factory('Themes', function($firebaseArray, FirebaseUrl){
        var o = {};
        
        o.themesRef = new Firebase(FirebaseUrl+'themes');
        o.themes = $firebaseArray(o.themesRef);

        return o;
    }); 