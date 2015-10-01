var addressBookAppControllers = angular.module('addressBookAppControllers', ['ui.bootstrap']);


addressBookAppControllers.controller('ContactsListCtrl', ['$scope', '$routeParams', '$http', '$location', '$modal',
  function ($scope, $routeParams, $http, $location, $modal) {
      $http.get('app/components/contactsList/fillerData.json').success(function (data) {
          $scope.contacts = data;
      });

      $scope.toggleOptions = function ($event) {
          var currentOptions = $event.currentTarget.nextElementSibling;

          if (currentOptions.hidden == false) {
              return currentOptions.hidden = true
          }
          return currentOptions.hidden = false
      };

      $scope.toggleFavorite = function ($event, $index) {
          var currentItem = $scope.contacts[$index];
          $scope.$apply
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