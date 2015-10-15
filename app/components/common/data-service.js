"use strict";

angular.module('bmDemoConcorsiApp')
  .service('DataService', function ($q, $firebaseArray, FIREBASE_APP, LoadingCounter, MessageService) {
    var usersRef = new Firebase("https://bm-demo-concorsi.firebaseio.com/users");
    var users = $firebaseArray(usersRef);

    var service = {
      user: {
        create: function(data) {
          return users.$add(data)
            .catch(function (error) {
              MessageService.error(error.code);
            });
        },
        edit: function(uid, data) {
          var user = service.users.get(uid);
          angular.forEach(data, function (value, key) {
            user[key] = value;
          });
          user.$save()
            .catch(function (error) {
              MessageService.error(error.code);
            });
        },
        get: function(uid) {
          return users.$indexFor(uid);
        }
      }
    };

    return service;
  });