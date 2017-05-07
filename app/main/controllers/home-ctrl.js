'use strict';
/*global main*/
/*eslint no-undef: "error"*/

main.controller('HomeCtrl', HomeCtrl);
function HomeCtrl ($scope, Services, $rootScope, localStorageService, $ionicViewService, typesObj, $ionicScrollDelegate, $timeout) {
  var ctrl = this;
  this.$timeout = $timeout;
  this.iniLogoH = 0;
  this.get_favicon = 'https://www.google.com/s2/favicons?domain_url=';

  //splash
  $scope.$on('$ionicView.loaded', function () {
    document.getElementById('logoToolbar');
    ctrl.iniLogoH = 80;//document.getElementById('logoToolbar').clientHeight;
    ctrl.onScrollContent();
    ionic.Platform.ready(function () {
      if (navigator && navigator.splashscreen) {
        if (!Services.firstTime() === true) {
          window.setTimeout(function () {
            navigator.splashscreen.hide();
          }, 500);
        }
      }
    });

  });
  this.Services = Services;
  this.$rootScope = $rootScope;
  this.ionicViewService = $ionicViewService;
  this.typesObj = typesObj;
  this.fixToolbar = false;

  this.switchType = function (type) {
    //call set types
    this.typesObj.setCurrentType(type);
    this.Services.setType(type.type, true);
  };

  this.loadMore = function () {
    this.Services.getEventsListFromServer();
  };

  this.doRefresh = function () {
    this.Services.getEventsListFromServer();
  };
  this.scrolled = 0;
  this.$scope = $scope;
  this.Services = Services;
  this.$ionicScrollDelegate = $ionicScrollDelegate;

  this.onScrollContent = function () {
    var toolbarLogo = document.getElementById('logoToolbar');
    var content = document.getElementById('content');
    var searchMenu = document.getElementById('searchMenu');
    if (this.$ionicScrollDelegate.$getByHandle('handler').getScrollPosition().top === 0) {
      this.$timeout(function () {
        ctrl.scrolled = false;
        toolbarLogo.style.height = ctrl.iniLogoH + 'px';
        content.style.top = (searchMenu.clientHeight + ctrl.iniLogoH) + 'px';
      });
    } else {
      if (!ctrl.scrolled) {
        this.$timeout(function () {
          ctrl.scrolled = true;
          toolbarLogo.style.height = 0;
          content.style.top = (searchMenu.clientHeight) + 'px';
        });
      }
    }

  };

  //AdMob
  //try {
  //  if (AdMob) {
  //    AdMob.showBanner(8);
  //  }
  //} catch (error) {
  //  console.log(error);
  //}

  //swipe on page content to change an event type
  this.slideTab = function (whereToSlide) {
    var currentIndex = this.typesObj.getCurrentIndex();
    this.typesObj.switchType(whereToSlide);
    var nextIndex = this.typesObj.getCurrentIndex();
    if (currentIndex !== nextIndex) {
      this.Services.setType(this.typesObj.getCurrentType().type, true);
    }
  };

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

Object.defineProperty(HomeCtrl.prototype, 'eventTypes', {
  'get': function () {
    return this.typesObj.getTypes();
  }
});

Object.defineProperty(HomeCtrl.prototype, 'loadingIcon', {
  'get': function () {
    return this.Services.getLoadingIcon();
  }
});

Object.defineProperty(HomeCtrl.prototype, 'showNoData', {
  'get': function () {
    return this.Services.getShowNoData();
  }
});
