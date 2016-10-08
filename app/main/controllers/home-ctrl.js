'use strict';
/*global main*/
/*eslint no-undef: "error"*/
main.controller('HomeCtrl', HomeCtrl);
function HomeCtrl ($scope, Services, $rootScope) {

  //splash
  $scope.$on('$ionicView.loaded', function () {
    ionic.Platform.ready(function () {

      if (navigator && navigator.splashscreen) {
        window.setTimeout(function () {
          navigator.splashscreen.hide();
        }, 500);
      }
    });
  });

  this.Service = Services;
  this.$rootScope = $rootScope;
  this.eventTypes = [
    {
      name: 'Music',
      type: 'MusicEvent',
      selected: true
    },
    {
      name: 'Sport',
      type: 'SportEvent',
      selected: false
    }, {
      name: 'Theater',
      type: 'TheaterEvent',
      selected: false
    }
  ];

  this.switchType = function (type) {
    for (var i in this.eventTypes) {
      if (type.type === this.eventTypes[i].type) {
        this.eventTypes[i].selected = true;
      } else {
        this.eventTypes[i].selected = false;
      }
    }
    this.Service.setType(type.type);
  };

  this.loadMore = function () {
    this.Services.getEventsListFromServer();
  };

  this.doRefresh = function () {
    this.Services.getEventsListFromServer();
  };

  this.$scope = $scope;
  this.Services = Services;

}
Object.defineProperty(HomeCtrl.prototype, 'events', {
  'get': function () {
    return this.Services.getEventsList();
  }
});
Object.defineProperty(HomeCtrl.prototype, 'moreDataCanBeLoaded', {
  'get': function () {
    return this.Services.moreDataCanBeLoaded();
  }
});
