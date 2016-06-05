'use strict';

/**
 * @ngdoc overview
 * @name diplomaApp
 * @description
 * # diplomaApp
 *
 * Main module of the application.
 */
angular
  .module('diplomaApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '../views/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: '../views/login.html',
        controller: 'AuthCtrl as authCtrl',
        // resolve: {
        //   requireNoAuth: function($state, Auth){
        //     return Auth.$requireAuth().then(function(auth){
        //       $state.go('home');
        //     }, function(error){
        //       return;
        //     });
        //   }
        // }
      })
      .state('register', {
        url: '/register',
        templateUrl: '../views/register.html',
        controller: 'AuthCtrl as authCtrl',
        // resolve: {
        //   requireNoAuth: function($state, Auth){
        //     return Auth.$requireAuth().then(function(auth){
        //       $state.go('home');
        //     }, function(error){
        //       return;
        //     });
        //   }
        // }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://glaring-heat-8347.firebaseio.com');
