
addressBookAppControllers.controller('ContactCtrl', ['$scope', '$location', '$routeParams', '$http', 'addressStorage',
  function ($scope, $location, $routeParams, $http, addressStorage) {
      $scope.contactId = $routeParams.contactId;
       
      $scope.contact = _.find(addressStorage.getData(), function (con) { return con.id == $scope.contactId; });
   
      $scope.toggleOptions = function ($event) {
          var currentOptions = $event.currentTarget.nextElementSibling;

          if (currentOptions.hidden == false) {
              return currentOptions.hidden = true
          }
          return currentOptions.hidden = false
      };

      $scope.toggleFavorite = function ($event) {
          var currentItem = $scope.contact

          if (currentItem.favorite == false) {
              currentItem.favorite = true;
          } else {
              currentItem.favorite = false;
          }
      };

      $scope.editContact = function (contactId) {
          var path = '/update/' + contactId;
          $location.path(path);
      }

      $scope.viewContactList = function () {
          var path = '/';
          $location.path(path);
      }

  }]);