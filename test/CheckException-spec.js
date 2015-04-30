'use strict';

var CheckException = require ('CheckException');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var Exception = require ('Exception');

describe ("CheckException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new CheckException ("hello");

            TestExpect.inherits (exc, CheckException, Exception,
                { name: "CheckException", message: "hello" });
        });
    });

});

