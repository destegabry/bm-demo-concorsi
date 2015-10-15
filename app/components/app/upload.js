angular.module('bmDemoConcorsiApp')
  .controller('UploadCtrl', function($scope, $filter, $firebaseArray, FIREBASE_APP, UserService, MessageService) {
    $scope.uploadText = '';
    $scope.list = $firebaseArray(FIREBASE_APP);

    var currentUser = UserService.isLogged();

    $scope.upload = function () {
      $scope.list.$add({
        text: $scope.uploadText,
        type: 'upload-submit',
        email: currentUser.password.email,
        uid: currentUser.uid
      })
        .then(function() {
          $scope.uploadText = '';
          MessageService.info($filter('translate')('UPLOAD_SUCCESS'));
        }, function(error) {
          MessageService.error(error.code);
        });
    };
  });