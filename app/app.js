'use strict';

var addressBookApp = angular.module('addressBookApp', [
  'ngRoute',
  'addressBookAppControllers'
]);

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
        otherwise({
            redirectTo: '/'
        });
  }]);