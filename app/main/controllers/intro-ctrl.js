'use strict';
/*global main*/
/*eslint no-undef: "error"*/
main.controller('IntroCtrl', IntroCtrl);
function IntroCtrl ($scope, $rootScope, localStorageService) {
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
  this.$rootScope = $rootScope;
  this.eventTypes = [
    {
      name: 'Music',
      type: 'MusicEvent',
      selected: true,
      background: 'main/assets/svgs/category_bg_music.svg#bg_MUSIC'
    },
    {
      name: 'Sport',
      type: 'SportEvent',
      selected: false,
      background: 'main/assets/svgs/category_bg_sport.svg#bg_SPORT'
    }, {
      name: 'Theater',
      type: 'TheaterEvent',
      selected: false,
      background: 'main/assets/svgs/category_bg_theater.svg#bg_Theatre'
    }
  ];
  this.switchType = function (type) {
    for (var i in this.eventTypes) {
      if (type.type === this.eventTypes[i].type) {
        this.eventTypes[i].selected = true;
        this.templateTypeBGUrl = this.eventTypes[i].background;
      } else {
        this.eventTypes[i].selected = false;
      }
    }

  };
  this.slideChanged = function (index) {
    var elem = document.getElementsByClassName('slider-pager')[0];
    console.log(index);
    if (index === 1) {
      elem.style.display = 'none';
      //$(".slider-pager").css('display', 'none')
    } else {
      elem.style.display = 'block';
      //$(".slider-pager").css('display', 'block')
    }
  };
  this.templateUrl = 'main/templates/intro_slide2.html';
  this.templateTypeBGUrl = this.eventTypes[0].background;
  this.choosenType = this.eventTypes[0].name;

  this.goToCalendar = function () {
    this.templateUrl = 'main/templates/intro_slide3.html';
  };

}
