'use strict';

var ArgException = require ('ArgException');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var CheckException = require ('CheckException');

describe ("ArgException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new ArgException ("hello");

            TestExpect.inherits (exc, ArgException, CheckException,
                { name: "ArgException", message: "hello" });
        });
    });

    describe ("constructor without new", function () {
        it ("should set message and inherit from Error", function () {
            var exc = ArgException ("hello");

            TestExpect.inherits (exc, ArgException, CheckException,
                { name: "ArgException", message: "hello" });
        });
    });


});

