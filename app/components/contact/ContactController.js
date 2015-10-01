
addressBookAppControllers.controller('ContactCtrl', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
      $scope.contactId = $routeParams.contactId;

      $http.get('app/components/contactsList/fillerData.json').success(function (data) {
          $scope.contact = _.find(data, function (con) { return con.id == $scope.contactId; });
      });
  }]);