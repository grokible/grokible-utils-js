'use strict';

var requirejs = require ('requirejs');
var expect = require ('chai').expect;

var Exception = require ('Local/Exception');
var TestExpect = require ('Local/TestExpect');

describe ("Exception class", function () {
    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new Exception ("hello");
            TestExpect.inherits (exc, Exception, Error,
                { name: "Exception", message: "hello" });
        });
    });
});

