/**
 * Created by inna on 18/09/2016.
 */
'use strict';
/*global main*/
/*global moment*/
/*eslint no-use-before-define: ["error", { "functions": false }]*/
/*eslint no-undef: "error"*/

main.controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl ($scope, ionicDatePicker, Services) {
  var ctrl = this;
  this.from = 'From';
  this.to = 'To';
  this.dates = {
    dateFrom: {
      date: null,
      valid: true
    },
    dateTo: {
      date: null,
      valid: true
    }
  };

  this.dateFrom = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      ctrl.from = moment(val).format('DD-MM-YYYY');
      ctrl.dateFrom.inputDate = new Date(val);
      ctrl.dateTo.from = new Date(val);
      ctrl.dateTo.inputDate = new Date(val);
      ctrl.dates.dateFrom.date = moment(val);
      ctrl.dates.dateFrom.valid = true;
    },

    from: new Date(), //Optional
    //to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: true,       //Optional
    templateType: 'modal'       //Optional
  };

  this.dateTo = {
    callback: function (val) {  //Mandatory
      ctrl.to = moment(val).format('DD-MM-YYYY');
      ctrl.dates.dateTo.date = moment(val);
    },
    //],
    from: new Date(), //Optional
    //to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: true,       //Optional
    templateType: 'modal'       //Optional
  };

  this.openDatePickerFrom = function () {
    ionicDatePicker.openDatePicker(ctrl.dateFrom);
  };
  this.openDatePickerTo = function () {
    ionicDatePicker.openDatePicker(ctrl.dateTo);
  };

  this.getEvents = function () {
    if (this.dates.dateFrom.date !== null) {
      this.Services.setDates(moment(this.dates.dateFrom.date).valueOf(),
        this.dates.dateTo.date !== null ? moment(this.dates.dateTo.date).valueOf() : null);
    } else {
      this.dates.dateFrom.valid = false;
    }
  };

  this.$scope = $scope;
  this.Services = Services;
}
