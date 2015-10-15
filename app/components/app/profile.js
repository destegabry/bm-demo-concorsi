angular.module('bmDemoConcorsiApp')
  .controller('ProfileCtrl', function ($scope, DataService, UserService, MessageService) {
    var uid = UserService.isLogged().uid;
    $scope.user = DataService.user.get(uid);
    
    if ($scope.user !== -1) {
      
      DataService.user.create({
        $id: uid
      }).then(function (user) {
        $scope.user = user;
      });
    }
  });