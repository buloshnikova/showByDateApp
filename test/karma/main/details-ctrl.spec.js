'use strict';

describe('module: main, controller: DetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var DetailsCtrl;
  beforeEach(inject(function ($controller) {
    DetailsCtrl = $controller('DetailsCtrl');
  }));

  it('should do something', function () {
    expect(!!DetailsCtrl).toBe(true);
  });

});
