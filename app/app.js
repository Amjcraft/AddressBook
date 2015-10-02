'use strict';
var defaultData;
var addressBookApp = angular.module('addressBookApp', [
  'ngRoute',
  'addressBookAppControllers'
]);

addressBookApp.controller('DefaultData', ['$scope', '$routeParams', '$http', '$location',
  function ($scope, $routeParams, $http, $location, $modal) {
      $http.get('app/components/contactsList/fillerData.json').success(function (data) {
          defaultData = data;
      });
  }]);

addressBookApp.factory('defaultData', ['$http', function ($http) {
    var _data;
    function setData(data) {
        _data = data;
    };
    function getData() {
        if (_data != undefined) {
            console.log('get it');
            return _data;
        }
        console.log('NO Data Found');
    };
    function saveData(data) {
        var itemIndex = _.findIndex(_data, function (con) { return con.id == data.id; });
        if(itemIndex != -1) {
         return _data[itemIndex] = data;
        }
        _data.push(data);
    };
    function loadData (callback) {
        $http.get('app/components/contactsList/fillerData.json').success(function (data) {
            setData(data);
            console.log('Data Loaded')
        });
    }
    return {
        getData: getData,
        loadData: loadData,
        saveData: saveData
    }
}]);

addressBookApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'app/components/contactsList/ContactsListView.html',
            controller: 'ContactsListCtrl'
        }).
        when('/contact/:contactId', {
            templateUrl: 'app/components/contact/ContactView.html',
            controller: 'ContactCtrl'
        }).
        when('/update/:contactId', {
            templateUrl: 'app/components/contact/ContactFormView.html',
            controller: 'ContactUpdateFormCtrl'
        }).
           when('/add', {
               templateUrl: 'app/components/contact/ContactFormView.html',
               controller: 'ContactAddFormCtrl'
           }).
        otherwise({
            redirectTo: '/'
        });

      
  }]);


addressBookApp.run(['defaultData',
  function (defaultData) {
      defaultData.loadData();
  }]);