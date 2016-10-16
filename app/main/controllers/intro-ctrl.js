'use strict';
/*global main*/
/*eslint no-undef: "error"*/
main.controller('IntroCtrl', IntroCtrl);
function IntroCtrl ($scope, $rootScope, localStorageService, Services, $ionicViewService, typesObj) {
//splash
  $scope.$on('$ionicView.loaded', function () {
    if (localStorageService.isSupported) {
      localStorageService.set('notFirstTime', true);
    } else {
      localStorageService.cookie.set('notFirstTime', true);
    }
    ionic.Platform.ready(function () {
      if (navigator && navigator.splashscreen) {

        window.setTimeout(function () {
          navigator.splashscreen.hide();

        }, 500);
      }
    });
  });
  this.ionicViewService = $ionicViewService;
  this.$rootScope = $rootScope;
  this.Services = Services;
  this.typesObj = typesObj;

  //this.ionicViewService.nextViewOptions({
  //  disableBack: true
  //});
  // moved to types-obj-serv
  //this.eventTypes = [
  //  {
  //    name: 'Music',
  //    type: 'MusicEvent',
  //    selected: true,
  //    background: 'main/assets/svgs/category_bg_music.svg#bg_MUSIC'
  //  },
  //  {
  //    name: 'Sport',
  //    type: 'SportEvent',
  //    selected: false,
  //    background: 'main/assets/svgs/category_bg_sport.svg#bg_SPORT'
  //  }, {
  //    name: 'Theater',
  //    type: 'TheaterEvent',
  //    selected: false,
  //    background: 'main/assets/svgs/category_bg_theater.svg#bg_Theatre'
  //  }
  //];
  this.switchType = function (type) {
    //for (var i in this.eventTypes) {
    //if (type.type === this.eventTypes[i].type) {
    //  this.eventTypes[i].selected = true;
    //  this.templateTypeBGUrl = this.eventTypes[i].background;
    //  this.Services.setType(this.eventTypes[i].type, false);
    //} else {
    //  this.eventTypes[i].selected = false;
    //}
    this.typesObj.setCurrentType(type);
    this.Services.setType(type.type, true);
    //}

  };
  this.slideChanged = function (index) {
    var elem = document.getElementsByClassName('slider-pager')[0];
    console.log(index);
    if (index === 1) {
      elem.style.display = 'none';
    } else {
      elem.style.display = 'block';
    }
  };
  this.templateUrl = 'main/templates/intro_slide2.html';
  //this.templateTypeBGUrl = this.typesObj.getCurrentType().background;

  this.goToCalendar = function () {
    this.templateUrl = 'main/templates/intro_slide3.html';
  };

}

Object.defineProperty(IntroCtrl.prototype, 'eventTypes', {
  'get': function () {
    return this.typesObj.getTypes();
  }
});

Object.defineProperty(IntroCtrl.prototype, 'templateTypeBGUrl', {
  'get': function () {
    return  this.typesObj.getCurrentType().background;
  }
});
