'use strict';

var Exception = require ('Exception');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');

describe ("Exception class", function () {
    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new Exception ("hello");
            TestExpect.inherits (exc, Exception, Error,
                { name: "Exception", message: "hello" });
        });
    });
});

