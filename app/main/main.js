// Ionic Starter App
'use strict';
/*global cordova StatusBar*/
/*eslint no-undef: "error"*/

var main = angular.module('main', [
  'ionic',
  'main.services',
  'ionic-datepicker'
  //'blockUI'
]);

main.config(function (
  $stateProvider,
  $urlRouterProvider
  //blockUIConfig
) {

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'main/templates/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'ctrl'
  });

  $stateProvider.state('details', {
    url: '/details/:eventId',
    templateUrl: 'main/templates/details.html',
    controller: 'DetailsCtrl',
    controllerAs: 'ctrl'

  });

  $urlRouterProvider.otherwise('/');

  //blockUIConfig.message = 'Loading';


});

main.run(function ($ionicPlatform, Services) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    navigator.splashscreen.show();
    //window.setTimeout(function () {
    //  navigator.splashscreen.hide();
    //}, 10000);
  });
  Services.initApp();
});

