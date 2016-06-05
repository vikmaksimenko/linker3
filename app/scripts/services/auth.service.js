/**
 * Created by vnaksimenko on 05.06.16.
 */

angular.module('diplomaApp')
  .factory('Auth', function($firebaseAuth, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);
    return auth;
  });
