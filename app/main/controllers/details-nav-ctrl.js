'use strict';
/*global main*/
/*eslint no-undef: "error"*/
main.controller('DetailsNavCtrl', function ($scope, $state, Services, $rootScope, $ionicHistory) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams) {
      $scope.nextEventId = Services.getSiblingEvent(toParams.eventId, true);
      $scope.prevEventId = Services.getSiblingEvent(toParams.eventId, false);
    });

  $scope.goHome = function () {
    var backView = $ionicHistory.backView().index + 1;

    $ionicHistory.goBack(-backView);
  };
});
