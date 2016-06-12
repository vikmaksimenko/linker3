angular.module("diplomaApp")
    .factory('Companies', function($firebaseArray, FirebaseUrl){
        var o = {};
        
        o.companiesRef = new Firebase(FirebaseUrl+'companies');
        o.companies = $firebaseArray(o.companiesRef);

        return o;
    }); 