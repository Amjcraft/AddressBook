
addressBookAppControllers.controller('ContactCtrl', ['$scope', '$location', '$routeParams', '$http', 'defaultData',
  function ($scope, $location, $routeParams, $http, defaultData) {
      $scope.contactId = $routeParams.contactId;
       
      $scope.contact = _.find(defaultData.getData(), function (con) { return con.id == $scope.contactId; });
   
      $scope.toggleOptions = function ($event) {
          var currentOptions = $event.currentTarget.nextElementSibling;

          if (currentOptions.hidden == false) {
              return currentOptions.hidden = true
          }
          return currentOptions.hidden = false
      };

      $scope.editContact = function (contactId) {
          var path = '/update/' + contactId;
          $location.path(path);
      }

  }]);