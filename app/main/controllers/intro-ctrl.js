'use strict';
/*global main*/
/*eslint no-undef: "error"*/
main.controller('IntroCtrl', IntroCtrl);
function IntroCtrl ($scope, $rootScope, localStorageService) {
//splash
  $scope.$on('$ionicView.loaded', function () {
    if(localStorageService.isSupported) {
      localStorageService.set('notFirstTime', true);
    } else {
      localStorageService.cookie.set('notFirstTime',true);
    }
    ionic.Platform.ready(function () {
      if (navigator && navigator.splashscreen) {

        window.setTimeout(function () {
          navigator.splashscreen.hide()

        }, 500);
      }
    });
  });

  this.templateUrl = 'main/templates/intro_slide2.html';
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

  this.goToCalendar = function (){
    this.templateUrl = 'main/templates/intro_slide3.html';
  };

}
