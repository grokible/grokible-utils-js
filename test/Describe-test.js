
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var assert = require ('chai').assert;

var baseUrl = process.cwd () + "/lib";

requirejs.config ({
    nodeRequire: require,
    baseUrl : baseUrl,
    paths : {
        Describe : 'Describe',
        Exception : 'Exception'
    }
});

var Describe = requirejs ('Describe');
var Exception = requirejs ('Exception');

// TODO pass an object with no constructor through, and an object with a nameless constructor through

describe ("Describe library", function () {

    describe ("describe (thing)", function () {

        it ("should return 'undefined' for an omitted argument in a function", function () {
            expect (Describe.getDescription ()).to.equal ("undefined");
        });

        it ("should return 'undefined' for an undefined variable", function () {
            var myvar;
            expect (Describe.getDescription (myvar)).to.equal ("undefined");
        });

        it ("should return 'string' for a literal string", function () {
            expect (Describe.getDescription ("hello")).to.equal ("string");
        });

        it ("should return 'number' for a literal floating point number", function () {
            expect (Describe.getDescription (1.1)).to.equal ("number");
        });

        it ("should return 'Object' for a literal (empty) object", function () {
            expect (Describe.getDescription ({})).to.equal ("Object");
        });

        it ("should return 'Array' for a literal (empty) Array", function () {
            expect (Describe.getDescription ([])).to.equal ("Array");
        });

        it ("should return 'null' for a literal null", function () {
            expect (Describe.getDescription (null)).to.equal ("null");
        });

        it ("should return 'Exception' for a new Exception () object", function () {
           expect (Describe.getDescription (new Exception ())).to.equal ("Exception");
        });

    });

});

