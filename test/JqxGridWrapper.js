
var JqxGridWrapper = require ('JqxGridWrapper');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var ArgTypeException = require ('ArgTypeException');

describe ("JqxGridWrapper object", function () {
    describe ("constructor", function () {
        it ("should Check for column array", function () {
            var jquery = undefined;
            TestExpect.throws (function () {
                new JqxGridWrapper (jquery, { columnNames : 1 });
            }, ArgTypeException, /The value is not an array.*number/);
        });
    });
});

