'use strict';
/*global main*/
/*eslint no-undef: "error"*/
main.controller('DetailsCtrl', function ($scope, $state, Services) {
  if ($state.params.eventId) {
    $scope.event = Services.getEventByID($state.params.eventId);
  }

});
