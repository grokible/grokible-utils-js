'use strict';

var Helpers = require ('../grokible.helpers');

Array.prototype.forEach = Helpers.arrayForEach;
var arraysAreIdentical = Helpers.arraysAreIdentical;
var dictsAreIdentical = Helpers.dictsAreIdentical;
var select = Helpers.select;


var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var Exception = require ('Exception');

/**
 * Note this tests HttpException which is defined using ExceptionUtils
 * makeNewExceptionClass () function, and was used to "prove" parity
 * for this function, compared to a hand tuned implementation.
 */
describe ("Helpers", function () {

    describe ("Array.forEach", function () {
        it ("should iterate over array and call it's function", function () {
            var arr = [5, 2, 3];
            var arr2 = [];
            arr.forEach (function (v) {
                arr2.push (v);
            });

       	    expect (arraysAreIdentical (arr, arr2)).to.be.true;
        });
    });

    describe ("Array.forEach", function () {
        it ("set's this == thisArg", function () {
            var arr = [5, 2, 3];
            var thisArg = {}
            arr.forEach (function (v) {
                expect (this).to.equal (thisArg);
            }, thisArg);
        });
    });


    describe ("dictsAreIdentical", function () {
        it ("should return false if not identical", function () {
            var dict = { hello: "world", what: "now", not: "chosen" };
            var dict2 ={ hello: "world", what: "now" };
      	    expect (dictsAreIdentical (dict2, dict)).to.be.false;
      	    expect (dictsAreIdentical ({}, { a: 1 })).to.be.false;
        });
    });

    describe ("dictsAreIdentical", function () {
        it ("should return true if identical", function () {
            var dict = { hello: "world", what: "now" };
            var dict2 = { hello: "world", what: "now" };
            var dict3 = {};
      	    expect (dictsAreIdentical (dict, dict2)).to.be.true;
      	    expect (dictsAreIdentical ({}, dict3)).to.be.true;
        });
    });


    describe ("select", function () {
        it ("should select items listed in the array", function () {
            var dict = { hello: "world", what: "now", not: "chosen" };
            var dict2 = select (dict, ['hello', 'what']);
            var dict3 = { what: "now", hello: "world", };
      	    expect (dictsAreIdentical (dict2, dict3)).to.be.true;
        });
    });

    describe ("select", function () {
        it ("if item is not listed, and no cbError, don't include item",
        function () {
            var dict = { hello: "world", what: "now", not: "chosen" };
            var dict2 = select (dict, ['hello', 'there']);
            var dict3 = { hello: "world", };
      	    expect (dictsAreIdentical (dict2, dict3)).to.be.true;
        });
    });


    describe ("select", function () {
        it ("if item is not listed, and cbError, call and return undefined",
        function () {
            var errorCalled = false;
            var dict = { hello: "world", what: "now", not: "chosen" };
            var dict2 = select (dict, ['hello', 'there'], function (err) {
                errorCalled = true;
            });
      	    expect (dict2).to.equal (undefined);
        });
    });


});

