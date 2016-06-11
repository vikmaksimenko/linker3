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
        'ui.router',
        'ngMaterial'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-green')
            .accentPalette('orange');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
                controller: 'AppCtrl as appCtrl'
                // resolve: {
                //     companies: function (Companies) {
                //         return Companies.$loaded();
                //     }
                // }
            })
            .state('login', {
                url: '/login',
                templateUrl: '../views/login.html',
                controller: 'AuthCtrl as authCtrl',
                resolve: {
                    requireNoAuth: function($state, Auth){
                        return Auth.$requireAuth().then(function(auth){
                            $state.go('home');
                        }, function(error){
                            return;
                        });
                    }
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: '../views/register.html',
                controller: 'AuthCtrl as authCtrl',
                resolve: {
                    requireNoAuth: function($state, Auth){
                        return Auth.$requireAuth().then(function(auth){
                            $state.go('home');
                        }, function(error){
                            return;
                        });
                    }
                }
            });
            // .state('profile', {
            //     url: '/profile',
            //     resolve: {
            //         auth: function($state, Users, Auth){
            //             return Auth.$requireAuth().catch(function(){
            //                 $state.go('home');
            //             });
            //         },
            //         profile: function(Users, Auth){
            //             return Auth.$requireAuth().then(function(auth){
            //                 return Users.getProfile(auth.uid).$loaded();
            //             });
            //         }
            //     }
            // });

        $urlRouterProvider.otherwise('/');
    })
    .constant('FirebaseUrl', 'https://linker3.firebaseio.com/');
