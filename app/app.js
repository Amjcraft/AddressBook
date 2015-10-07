'use strict';
var defaultData;
var addressBookApp = angular.module('addressBookApp', [
  'ngRoute',
  'addressBookAppControllers'
]);

addressBookApp.controller('index', ['$scope', '$location', function ($scope, $location) {
    $scope.addContact = function () {
        var path = '/add';
        $location.path(path);
    }

    $scope.viewContacts = function () {
        var path = '/';
        $location.path(path);
    }
}]);

addressBookApp.factory('utils',['addressStorage', function (addressStorage) {
    function getUniqueID() {
        var data = addressStorage.getData();
        if (data != undefined) {
            var id = data.length;
            return processUniqueId(id, data);

        }
    };

    function processUniqueId(id, data) {
        if (_.findWhere(data, { id: id })) {
            id = id + 1;
            return processUniqueId(id, data)
        } else {
            return id;
        }
    };

    return {
        getUniqueID: getUniqueID
    }

}]);

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

    function deleteData(itemId) {
        if (_data.length == 1) {
            _data = [];
            localStorage.removeItem(_storageKey);
            return;
        }
        var itemIndex = _.findIndex(_data, function (con) { return con.id == itemId; });
        if (itemIndex != -1) {
            _data.splice(itemIndex, 1);
            localStorage.setItem(_storageKey, JSON.stringify(_data));
            return;
        }
    }

    return {
        getData: getData,
        loadData: loadData,
        saveData: saveData,
        deleteData: deleteData
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