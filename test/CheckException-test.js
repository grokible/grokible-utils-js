
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var assert = require ('chai').assert;

var baseUrl = process.cwd () + "/lib";

requirejs.config ({
    nodeRequire: require,
    baseUrl : baseUrl,
    paths : {
        Exception : 'Exception',
        CheckException : 'CheckException',
        TestExpect : 'TestExpect'
    }
});

var CheckException = requirejs ('CheckException');
var Exception = requirejs ('Exception');
var TestExpect = requirejs ('TestExpect');

describe ("CheckException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new CheckException ("hello");

            TestExpect.inherits (exc, CheckException, Exception, { name: "CheckException", message: "hello" });
        });
    });

});

