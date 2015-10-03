var addressBookAppControllers = angular.module('addressBookAppControllers', ['ui.bootstrap']);


addressBookAppControllers.controller('ContactsListCtrl', ['$scope', '$routeParams', '$location', '$modal', 'addressStorage',
  function ($scope, $routeParams, $location, $modal, addressStorage) {
      console.log('Hit List Ctrl');
      $scope.contacts = addressStorage.getData();
    
      $scope.toggleOptions = function ($event) {
          var currentOptions = $event.currentTarget.nextElementSibling;

          if (currentOptions.hidden == false) {
              return currentOptions.hidden = true
          }
          return currentOptions.hidden = false
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
      
      $scope.open = function (itemIndex) {
          var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'ModalInstanceCtrl',
              resolve: {
                  itemIndex: function () {
                      return itemIndex;
                  }
              }
          });

          modalInstance.result.then(function (selectedItem) {
              $scope.contacts.splice(selectedItem, selectedItem + 1);
          }, function () {
             console.log('Errorish')
          });
      };

      $scope.toggleAnimation = function () {
          $scope.animationsEnabled = !$scope.animationsEnabled;
      };

  }]);


addressBookAppControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance, itemIndex) {

    $scope.selected = {
        item: itemIndex
    };

    $scope.ok = function () {
        $modalInstance.close(itemIndex);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});