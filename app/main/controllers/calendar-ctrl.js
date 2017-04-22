/**
 * Created by inna on 18/09/2016.
 */
'use strict';
/*global main*/
/*global moment*/
/*eslint no-use-before-define: ["error", { "functions": false }]*/
/*eslint no-undef: "error"*/

main.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl ($scope, ionicDatePicker, Services, $location) {

  this.$scope = $scope;
  this.Services = Services;

  var ctrl = this;
  this.$location = $location;
  this.path = this.$location.path();
  this.dateTodayText = 'Today';
  this.dateWeekText = 'This Week';

  this.dates = {
    dateFromValid: true,
    dateToValid: true
  };
  this.openDatePickerFrom = function () {
    ionicDatePicker.openDatePicker({
      callback: function (val) {  //Mandatory
        ctrl.dates.dateFromValid = true;
        ctrl.Services.setDateFrom(val);
        if (ctrl.dateToObj < val) {
          ctrl.Services.setDateTo(val);
        }

      },
      from: new Date(), //Optional
      //to: new Date(2016, 10, 30), //Optional
      inputDate: this.dateFromObj !== null ? new Date(this.dateFromObj) : new Date(),      //Optional
      mondayFirst: true,         //Optional
      closeOnSelect: true,       //Optional
      templateType: 'modal'       //Optional
    });
  };
  this.openDatePickerTo = function () {
    ionicDatePicker.openDatePicker({
      callback: function (val) {  //Mandatory
        //ctrl.Services.setDateTo(moment(val).valueOf());
        ctrl.Services.setDateTo(val);
        if (ctrl.path === '/intro') {
          ctrl.getEvents();
        }
      },
      from: this.dateFromObj !== null ? new Date(this.dateFromObj) : new Date(), //Optional
      inputDate: this.dateToObj !== null ? new Date(this.dateToObj) : new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'modal'       //Optional
    });
  };

  this.getEvents = function () {
    if (this.dateFromObj !== null) {
      if (this.path === '/intro') {
        this.$location.path('/');
      } else {
        this.Services.clearData();
        this.Services.getEventsListFromServer();
      }
    } else {
      this.dateFromValid = false;
    }
  };

  this.getTodaysEvents = function () {
    ctrl.Services.setDateFrom(new Date());
    ctrl.Services.setDateTo(new Date());
    this.Services.clearData();
    this.Services.getEventsListFromServer();
    ctrl.getEvents();
  };

  this.getWeekEvents = function () {
    var dateTo = moment().add(7,'d');
    ctrl.Services.setDateFrom(new Date());
    ctrl.Services.setDateTo(dateTo);
    this.Services.clearData();
    this.Services.getEventsListFromServer();
    ctrl.getEvents();
  };
}

Object.defineProperty(CalendarCtrl.prototype, 'dateFromObj', {
  'get': function () {
    return this.Services.getFromDate();
  }
});

Object.defineProperty(CalendarCtrl.prototype, 'dateToObj', {
  'get': function () {
    return this.Services.getToDate();
  }
});

Object.defineProperty(CalendarCtrl.prototype, 'dateFromText', {
  'get': function () {
    var from = '';
    if (this.dateFromObj !== null) {
      from = moment(this.dateFromObj).format('DD/MM/YYYY');
    } else {
      from = (this.path === '/') ? moment(new Date).format('DD/MM/YYYY') : 'From';
    }
    return from;
  }
});

Object.defineProperty(CalendarCtrl.prototype, 'dateToText', {
  'get': function () {
    var to = '';
    if (this.dateToObj !== null) {
      to = moment(this.dateToObj).format('DD/MM/YYYY');
    } else {
      to = (this.path === '/') ? moment(new Date).format('DD/MM/YYYY') : 'To';
    }
    return to;
  }
});
