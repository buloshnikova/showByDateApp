'use strict';

describe('module: main, service: Services', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Services;
  beforeEach(inject(function (_Services_) {
    Services = _Services_;
  }));

  it('should do something', function () {
    expect(!!Services).toBe(true);
  });

});
