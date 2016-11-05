/**
 * Created by inna on 18/09/2016.
 */
'use strict';
/*global main*/
/*global moment*/
/*eslint no-use-before-define: ["error", { "functions": false }]*/
/*eslint no-undef: "error"*/
/*global AdMob*/
main.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl ($scope, ionicDatePicker, Services, $location) {

  this.$scope = $scope;
  this.Services = Services;

  var ctrl = this;
  this.$location = $location;
  this.path = this.$location.path();

  //this.dateTo = {
  //  callback: function (val) {  //Mandatory
  //
  //    ctrl.Services.setDateTo(moment(val).valueOf());
  //  },
  //  from: new Date(), //Optional
  //  inputDate: new Date(),      //Optional
  //  mondayFirst: true,          //Optional
  //  closeOnSelect: true,       //Optional
  //  templateType: 'modal'       //Optional
  //};
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
        if (AdMob) {
          AdMob.showBanner(8);
        }

        this.$location.path('/');
      } else {
        this.Services.clearData();
        this.Services.getEventsListFromServer();
      }
    } else {
      this.dateFromValid = false;
    }
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
    var from = (this.dateFromObj !== null) ? moment(this.dateFromObj).format('DD/MM/YYYY') : 'From';
    return from;
  }
});

Object.defineProperty(CalendarCtrl.prototype, 'dateToText', {
  'get': function () {
    var to = (this.dateToObj !== null) ? moment(this.dateToObj).format('DD/MM/YYYY') : 'To';
    return to;
  }
});
