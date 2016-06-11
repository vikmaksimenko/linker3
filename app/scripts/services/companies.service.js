angular.module("diplomaApp")
    .factory('Companies', function($firebaseArray, $firebaseObject, FirebaseUrl){
        var companiesRef = new Firebase(FirebaseUrl+'companies');
        var companies = $firebaseArray(companiesRef);

        console.log("in factory");

        return companies;
    });