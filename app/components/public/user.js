"use strict";

angular.module('bmDemoConcorsiApp')
  .controller('UserCtrl', function ($scope, $state, User, UserService, MessageService) {
    $scope.user = User;

    $scope.login = function () {
      delete $scope.error;
      UserService.login($scope.user.email, $scope.user.password)
        .then(function (authData) {
          $scope.user = {};
          $state.go('app.welcome');
        });
    };
    
    $scope.register = function () {
      delete $scope.error;
      UserService.register($scope.user.email, $scope.user.password)
        .then(function(userData) {
          $scope.login();
        });
    };
    
    $scope.forgot = function () {
      delete $scope.error;
      UserService.forgot($scope.user.email)
        .then(function() {
          $scope.user = {};
          MessageService.info('PASSWORD_RESET_SUCCESS');
        });
    };
  });