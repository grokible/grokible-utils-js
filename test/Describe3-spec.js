
var expect = require ('chai').expect;
var assert = require ('chai').assert;

var baseUrl = process.cwd () + "/lib";

var Describe = require ('Local/Describe2');

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

    });

});

