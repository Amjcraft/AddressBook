var addressBookAppControllers = angular.module('addressBookAppControllers', ['ui.bootstrap']);


addressBookAppControllers.controller('ContactsListCtrl', ['$scope', '$routeParams', '$location', '$modal', 'addressStorage',
  function ($scope, $routeParams, $location, $modal, addressStorage) {
      console.log('Hit List Ctrl');
      $scope.contacts = addressStorage.getData();
    
      $scope.toggleOptions = function ($event) {
          var currentOptions = $event.currentTarget.nextElementSibling;

          if (currentOptions.hidden == false) {
              
              currentOptions.hidden = true;
              return;
          }
          currentOptions.hidden = false;

      };
     

      $scope.toggleFavorite = function ($event, contactId) {
          var currentItem = _.find($scope.contacts, function (con) { return con.id == contactId; });
          
          if (currentItem.favorite == false) {
              currentItem.favorite = true;
          } else {
              currentItem.favorite = false;
          }
      };

      $scope.viewContact = function (contactId) {
          var path = '/contact/' + contactId;
          $location.path(path);
      }

      
      
      $scope.delete = function (itemIndex, contact) {
          var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'ModalInstanceCtrl',
              resolve: {
                  itemIndex: function () {
                      return itemIndex;
                  },
                  itemID: function () {
                      return contact.id;
                  },
                  contactName: function () {
                      return contact.firstName + ' ' + contact.lastName;
                  }
              }

          });

          modalInstance.result.then(function (selectedItem) {
              $scope.contacts.splice(selectedItem, 0);
          }, function () {
             console.log('Errorish')
          });
      };

      $scope.toggleAnimation = function () {
          $scope.animationsEnabled = !$scope.animationsEnabled;
      };

  }]);


addressBookAppControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, addressStorage, itemIndex, itemID, contactName) {

    $scope.selected = {
        name: contactName
    };

    $scope.ok = function () {
        addressStorage.deleteData(itemID)
        $modalInstance.close(itemIndex);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});