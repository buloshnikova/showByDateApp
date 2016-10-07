'use strict';
/*global moment*/
/*eslint no-unused-vars: 0*/
/*eslint no-use-before-define: 0*/
angular.module('main.services', [])
  .factory('Services', function ($http, $rootScope) {
    //var apiUrl = 'http://localhost:9000';
    var apiUrl = 'http://10.100.102.3:9000';
    var eventsList = [];
    var eventsTotal = -1;
    var currentEventType = 'MusicEvent';
    var dateFrom = moment().valueOf();
    var dateTo = moment().add(1, 'week').valueOf();
    var perPage = 10;

    var clearData = function () {
      eventsList = [];
      eventsTotal = -1;
    };

    var getEventByID = function (id) {
      var evArr = eventsList.filter(function (item) {
        return item._id === id;
      });
      return evArr[0];
    };
    var initApp = function () {
      console.log('tryINIT');
      getEventsListFromServer();
    };

    var getSiblingEvent = function (eventID, next) {

      var index = eventsList.findIndex(function (n) {
        return n._id === eventID;
      });
      if (next) {
        return ((index + 1) >= eventsList.length) ? -1 : eventsList[index + 1]._id;
      } else {
        return (index <= 0) ? -1 : eventsList[index - 1]._id;
      }

    };

    var getEventsListFromServer = function () {
      console.log('getEventsListFromServer');
      if (eventsList.length < eventsTotal || eventsTotal === -1) {
        $http.get(apiUrl +
            '/api/events/' +
            dateFrom + '/' +
            dateTo + '/' +
            currentEventType + '/' +
            perPage + '/' +
            eventsList.length)
          .then(function (response) {
            eventsList = eventsList.concat(response.data.events);
            eventsTotal = response.data.total;
            $rootScope.$broadcast('scroll.infiniteScrollComplete');
            $rootScope.$broadcast('scroll.refreshComplete');
          });
      } else {
        return;
      }

      //error
    };
    var moreDataCanBeLoaded = function () {
      return (eventsList.length < eventsTotal || eventsTotal === -1) ? true : false;
    };

    var getEventsList = function () {
      return eventsList;
    };

    var setType = function (type) {
      currentEventType = type;
      clearData();
      getEventsListFromServer();
    };
    var setDates = function (from, to) {
      dateFrom = from;
      dateTo = to;
      clearData();
      getEventsListFromServer();
    };
    return {
      initApp: initApp,
      getEventsList: getEventsList,
      getEventByID: getEventByID,
      setType: setType,
      setDates: setDates,
      getSiblingEvent: getSiblingEvent,
      getEventsListFromServer: getEventsListFromServer,
      moreDataCanBeLoaded: moreDataCanBeLoaded


      //events: function () {
      //  return $http.get(apiUrl + '/api/events/')
      //    .then(function (response) {
      //      eventsList = response.data;
      //      return response.data;
      //    });
      //},
      //
      //getEvent: function (eventId) {
      //  return $http.get(apiUrl + '/' + eventId)
      //    .then(function (response) {
      //      return response.data;
      //    });
      //}

    };


  });
