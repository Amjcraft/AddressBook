
addressBookAppControllers.controller('ContactUpdateFormCtrl', ['$scope', '$location', '$routeParams', '$http', 'addressStorage',
  function ($scope, $location, $routeParams, $http, addressStorage) {

      if ($routeParams.contactId) {
          $scope.contact = _.find(addressStorage.getData(), function (con) { return con.id == $routeParams.contactId; });
      }
    
      $scope.saveContact = function () {
          addressStorage.saveData($scope.contact)
          var path = '/contact/' + $scope.contact.id;
          $location.path(path);
      }
  }]);

addressBookAppControllers.controller('ContactAddFormCtrl', ['$scope', '$location', '$routeParams', '$http', 'addressStorage', 'utils',
  function ($scope, $location, $routeParams, $http, addressStorage, utiles) {

      $scope.contact = new Contact({ 'id': utiles.getUniqueID() });

      $scope.saveContact = function () {
          addressStorage.saveData($scope.contact)
          var path = '/contact/' + $scope.contact.id;
          $location.path(path);
      }
  }]);