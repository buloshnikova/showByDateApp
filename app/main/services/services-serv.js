'use strict';
/*global moment*/
/*eslint no-unused-vars: 0*/
/*eslint no-use-before-define: 0*/
angular.module('main.services', [])
  .factory('Services', function ($http, $rootScope, typesObj, $ionicLoading) {
    //var apiUrl = 'http://localhost:9000';
    var apiUrl = 'https://showbydatelondon.herokuapp.com';
    var eventsList = [];
    var eventsTotal = -1;
    var currentEventType = typesObj.getCurrentType().type;
    var dateFrom = moment().valueOf();
    var dateTo = moment().add(1, 'week').valueOf();
    var perPage = 10;
    var dateFromText = null;
    var dateToText = null;

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
      if (eventsList.length < 1) {
        $ionicLoading.show({
          templateUrl: 'main/templates/block-ui-overlay.html',
          noBackdrop: true
        });
      }
      if (eventsList.length < eventsTotal || eventsTotal === -1) {
        $http.get(apiUrl +
            '/api/events/' +
            dateFrom + '/' +
            dateTo + '/' +
            currentEventType + '/' +
            perPage + '/' +
            eventsList.length)
          .then(function (response) {
            console.log(response.data.events);
            eventsList = eventsList.concat(response.data.events);
            eventsTotal = response.data.total;
            $rootScope.$broadcast('scroll.infiniteScrollComplete');
            $rootScope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
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

    var setType = function (type, getEvents) {
      currentEventType = type;
      if (getEvents) {
        clearData();
        getEventsListFromServer();
      }
    };

    // moved to types-obj-serv
    //var getType = function () {
    //  return currentEventType;
    //};

    var setDates = function (from, to) {
      dateFrom = from;
      dateTo = to;
      dateFromText = from;
      dateToText = to;
      clearData();
      getEventsListFromServer();
    };

    var setDateFrom = function (from) {
      dateFrom = from;
      dateFromText = from;
    };

    var setDateTo = function (to) {
      dateTo = to;
      dateToText = to;
    };

    var getFromDate = function () {
      return (dateFromText !== null) ? dateFromText : null;
    };

    var getToDate = function () {
      return (dateToText !== null) ? dateToText : null;
    };

    return {
      initApp: initApp,
      getEventsList: getEventsList,
      getEventByID: getEventByID,
      setType: setType,
      setDates: setDates,
      setDateFrom: setDateFrom,
      setDateTo: setDateTo,
      getFromDate: getFromDate,
      getToDate: getToDate,
      getSiblingEvent: getSiblingEvent,
      getEventsListFromServer: getEventsListFromServer,
      moreDataCanBeLoaded: moreDataCanBeLoaded

    };


  });
