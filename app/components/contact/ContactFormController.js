
addressBookAppControllers.controller('ContactUpdateFormCtrl', ['$scope', '$location', '$routeParams', '$http', 'defaultData',
  function ($scope, $location, $routeParams, $http, defaultData) {

      if ($routeParams.contactId) {
          $scope.contact = _.find(defaultData.getData(), function (con) { return con.id == $routeParams.contactId; });
      }
    
      $scope.viewContact = function (contactId) {
          var path = '/contact/' + contactId;
          $location.path(path);
      }
  }]);

addressBookAppControllers.controller('ContactAddFormCtrl', ['$scope', '$location', '$routeParams', '$http', 'defaultData',
  function ($scope, $location, $routeParams, $http, defaultData) {

      $scope.contact = new Contact();

      $scope.saveContact = function () {
          defaultData.saveData($scope.contact)
          var path = '/contact/' + $scope.contact.id;
          $location.path(path);
      }
  }]);