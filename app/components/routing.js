"use strict";

angular.module('bmDemoConcorsiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('public', {
        url: '/public',
        templateUrl: 'components/public.html',
        abstract: true,
        resolve: {
          User: function () {
            return {};
          }
        }
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
        templateUrl: 'components/app.html',
        abstract: true,
        resolve: {
          checkLogged: function ($state, UserService) {
            if (!(UserService.isLogged())) {
              $state.go('public.login');
            }
          }
        }
      })
      .state('app.welcome', {
        url: '/welcome',
        templateUrl: 'components/app/welcome.html',
        controller: 'WelcomeCtrl'
      });

      $urlRouterProvider.otherwise('/public/login');

  });
  