"use strict";

angular.module('bmDemoConcorsiApp')
  .controller('UserCtrl', function ($scope, $firebaseAuth, User, FIREBASE_APP) {
    $scope.user = User;
    var authObj = $firebaseAuth(FIREBASE_APP);

    $scope.login = function () {
      authObj.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function (authData) {
        $scope.user = {};
        // redirect su applicazione
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    
    $scope.register = function () {
      authObj.$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.login();
      }).catch(function(error) {
        $scope.error = error;
      });
    };
    
    $scope.forgot = function () {
      authObj.$resetPassword({
        email: $scope.user.email
      }).then(function() {
        $scope.user = {};
        $scope.message = 'PASSWORD_RESET_SUCCESS';
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  });