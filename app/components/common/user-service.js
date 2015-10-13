"use strict";

angular.module('bmDemoConcorsiApp')
  .service('UserService', function ($firebaseAuth, FIREBASE_APP, LoadingCounter) {
    var authObj = $firebaseAuth(FIREBASE_APP);
    var service = {
      login: function (email, password) {
        LoadingCounter.push('user-service-login');
        return authObj.$authWithPassword({
          email: email,
          password: password
        })
          .finally(function () {
            LoadingCounter.pop('user-service-login');
          });
      },
      register: function (email, password) {
        LoadingCounter.push('user-service-register');
        return authObj.$createUser({
          email: email,
          password: password
        })
          .finally(function () {
            LoadingCounter.pop('user-service-register');
          });
      },
      forgot: function (email) {
        LoadingCounter.push('user-service-forgot');
        return authObj.$resetPassword({
          email: email
        })
          .finally(function () {
            LoadingCounter.pop('user-service-forgot');
          });
      },
      logout: function () {
        LoadingCounter.push('user-service-logout');
        return authObj.$unauth()
          .finally(function () {
            LoadingCounter.pop('user-service-logout');
          });
      }
    };

    return service;
  });