'use strict';
var defaultData;
var addressBookApp = angular.module('addressBookApp', [
  'ngRoute',
  'addressBookAppControllers'
]);

//addressBookApp.controller('DefaultData', ['$scope', '$routeParams', '$http', '$location',
//  function ($scope, $routeParams, $http, $location, $modal) {
//      $http.get('app/components/contactsList/fillerData.json').success(function (data) {
//          defaultData = data;
//      });
//  }]);

//addressBookApp.factory('defaultData', ['$http', function ($http) {
//    var _data;

//    function setData(data) {
//        _data = data;
//    };

//    function getData() {
//        if (_data != undefined) {
//            console.log('get it');
//            return _data;
//        }
//        console.log('NO Data Found');
//    };

//    function saveData(data) {
//        var itemIndex = _.findIndex(_data, function (con) { return con.id == data.id; });
//        if(itemIndex != -1) {
//         return _data[itemIndex] = data;
//        }
//        _data.push(data);
//    };

//    function loadData(callback) {
//        $http.get('app/components/contactsList/fillerData.json').success(function (data) {
//            setData(data);
//            console.log('Data Loaded')
//        });
//    }
//    return {
//        getData: getData,
//        loadData: loadData,
//        saveData: saveData
//    }
//}]);

addressBookApp.factory('addressStorage', ['$http', function ($http) {
    var _data = [],
        _storageKey = "MyAddressBook";

    function setData(data) {
        if(data != undefined) {
            _data = data;
        }
    };

    function getData() {
        if (_data != undefined) {
            return _data;
        }
        return _data = JSON.parse(localStorage.getItem(_storageKey));
    };

    function saveData(data) {
        var itemIndex = _.findIndex(_data, function (con) { return con.id == data.id; });
        if (itemIndex != -1) {
            _data[itemIndex] = data;
            localStorage.setItem(_storageKey, JSON.stringify(_data));
            return;
        }
        _data.push(data);
        localStorage.setItem(_storageKey, JSON.stringify(_data));
    };

    function loadData() {
        if (localStorage.getItem(_storageKey) == null) {
            $http.get('app/components/contactsList/fillerData.json').success(function (data) {
                setData(data);
            });
        }
        setData(JSON.parse(localStorage.getItem(_storageKey)));
    }

    return {
        getData: getData,
        loadData: loadData,
        saveData: saveData
    }
}]);

addressBookApp.config(['$routeProvider',
  function ($routeProvider) {
      console.log('Hit route Ctrl');
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


addressBookApp.run(['addressStorage',
  function (addressStorage) {
      console.log('Hit App Run');
      addressStorage.loadData();
  }]);