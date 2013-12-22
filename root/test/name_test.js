'use strict';

var expect = require('chai').expect;
var {%= js_test_safe_name %} = require('../lib/{%= name %}.js');

describe('{%= name %}', function() {
  it('should be awesome', function() {
    expect({%= js_test_safe_name %}.awesome()).to.equal('awesome');
  });
});
