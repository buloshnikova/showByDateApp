'use strict';
/*global main*/
/*eslint no-undef: "error"*/
/*e/*eslint space-before-function-paren: ["error", "never"]*/
/*global AdMob*/

main.controller('IntroCtrl', IntroCtrl);
function IntroCtrl ($scope, $rootScope, localStorageService, Services, $ionicHistory, typesObj, $ionicLoading) {
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
  $ionicLoading.hide();

  this.$rootScope = $rootScope;
  this.Services = Services;
  this.typesObj = typesObj;
  this.ionicHistory = $ionicHistory;
  this.ionicHistory.clearHistory();

  //try {
  //  if (AdMob) {
  //    AdMob.showBanner(8);
  //  }
  //} catch (error) {
  //  console.log(error);
  //}
  try {
    if (AdMob) {
      AdMob.hideBanner();
    }
  } catch (error) {
    console.log(error);
  }

  this.switchType = function (type) {

    this.typesObj.setCurrentType(type);
    this.Services.setType(type.type, false);

  };
  this.slideChanged = function (index) {
    var elem = document.getElementsByClassName('slider-pager')[0];
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
