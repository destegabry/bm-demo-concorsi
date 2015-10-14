"use strict";

angular.module('bmDemoConcorsiApp')
  .service('UserService', function ($q, $firebaseAuth, FIREBASE_APP, LoadingCounter, MessageService) {
    var authObj = $firebaseAuth(FIREBASE_APP);
    var service = {
      login: function (email, password) {
        LoadingCounter.push('user-service-login');
        var deferred = $q.defer();
        authObj.$authWithPassword({
          email: email,
          password: password
        })
          .then(function (user) {
            deferred.resolve(user);
          })
          .catch(function(error) {
            MessageService.error(error.code);
            deferred.reject();
          })
          .finally(function () {
            LoadingCounter.pop('user-service-login');
          });
        return deferred.promise;
      },
      register: function (email, password) {
        LoadingCounter.push('user-service-register');
        var deferred = $q.defer();
        authObj.$createUser({
          email: email,
          password: password
        })
          .then(function (user) {
            deferred.resolve(user);
          })
          .catch(function(error) {
            MessageService.error(error.code);
            deferred.reject();
          })
          .finally(function () {
            LoadingCounter.pop('user-service-register');
          });
        return deferred.promise;
      },
      forgot: function (email) {
        LoadingCounter.push('user-service-forgot');
        var deferred = $q.defer();
        authObj.$resetPassword({
          email: email
        })
          .then(function () {
            deferred.resolve();
          })
          .catch(function(error) {
            MessageService.error(error.code);
            deferred.reject();
          })
          .finally(function () {
            LoadingCounter.pop('user-service-forgot');
          });
        return deferred.promise;
      },
      logout: function () {
        LoadingCounter.push('user-service-logout');
        var deferred = $q.defer();
        authObj.$unauth();
        authObj.$onAuth(function(authData) {
          if (!authData) {
            deferred.resolve();
          }
          LoadingCounter.pop('user-service-logout');
        });
        return deferred.promise;
      },
      isLogged: function () {
        return authObj.$getAuth();
      },
      changePassword: function (oldPassword, newPassword) {
        LoadingCounter.push('user-service-change-password');
        var deferred = $q.defer();

        var auth = authObj.$getAuth();
        if (auth) {
          var email = auth.password.email;
          authObj.$changePassword({
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
          }).then(function() {
            deferred.resolve()
          }).catch(function(error) {
            MessageService.error(error.code);
            deferred.reject();
          })
          .finally(function () {
            LoadingCounter.pop('user-service-change-password');
          });

        } else {
          deferred.reject();
        }

        return deferred.promise;
      }
    };

    return service;
  });