
var JqxGridWrapper = require ('JqxGridWrapper');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var ArgTypeException = require ('ArgTypeException');

describe ("JqxGridWrapper object", function () {
    describe ("constructor", function () {
        var jquery = undefined;
        it ("should throw on wrong option columnDefs type", function () {
            TestExpect.throws (function () {
                new JqxGridWrapper (jquery, { columnDefs : 1 });
            }, ArgTypeException, /columnDefs config option is not a Map/);
        });

        // TODO - this test is wrong, it fails...
        it ("should throw on columnDef that omits name", function () {
            TestExpect.throws (function () {
                new JqxGridWrapper (jquery, { columnDefs : { width : 1 } });
            }, ArgTypeException, /columnDefs config option is not a Map/);
        });
    });
});

