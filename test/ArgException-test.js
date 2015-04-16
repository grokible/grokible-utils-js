
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var assert = require ('chai').assert;

var baseUrl = process.cwd () + "/lib";

requirejs.config ({
    nodeRequire: require,
    baseUrl : baseUrl,
    paths : {
        ArgException : 'ArgException',
        CheckException : 'CheckException',
        TestExpect : 'TestExpect'
    }
});

var ArgException = requirejs ('ArgException');
var CheckException = requirejs ('CheckException');
var TestExpect = requirejs ('TestExpect');

describe ("ArgException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new ArgException ("hello");

            TestExpect.inherits (exc, ArgException, CheckException, { name: "ArgException", message: "hello" });
        });
    });

});

