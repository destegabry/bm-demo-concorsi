"use strict";

angular.module('bmDemoConcorsiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('public', {
        url: '/public',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('public.login', {
        url: '/login',
        templateUrl: 'components/public/login.html',
        controller: 'UserCtrl'
      })
      .state('public.forgot', {
        url: '/forgot',
        templateUrl: 'components/public/forgot.html',
        controller: 'UserCtrl'
      })
      .state('public.register', {
        url: '/register',
        templateUrl: 'components/public/register.html',
        controller: 'UserCtrl'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        resolve: {

        }
      });

      $urlRouterProvider.otherwise('/public/login');

  });
  