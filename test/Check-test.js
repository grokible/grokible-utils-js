
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var assert = require ('chai').assert;
var TestSetup = require ('Local/TestSetup');

var libs = TestSetup.configRequireJsLibs
    (['CheckException', 'ProgrammingError', 'Check',
      'TestExpect', 'Exception', 'ArgException']);


// Eval "var Lib = libs ['Lib'];" to define libraries in scoped vars

for (k in libs) {
    var s = "var " + k + " = libs ['" + k + "'];";
    eval (s);
}

describe ("Check library", function () {

    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should not throw exc if args have same prototype", function () {
            var exc = new Exception ("hello");

            Check.hasSamePrototype (exc, Exception);
            Check.hasSamePrototype ({}, Object);
        });
    });

    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should throw exc if obj does not have same prototype", function () {
           TestExpect.throws (function () { Check.hasSamePrototype ({}, Exception) }, CheckException);
        });
    });


    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should throw exc of type optExceptionConstructor if obj does not have same prototype", function () {
            TestExpect.throws (function () { Check.hasSamePrototype ({}, Exception, ArgException) }, CheckException);
        });
    });

    describe ("isInteger", function () {
        it ("should throw exception on non-integer", function () {
           TestExpect.throws (function () { Check.isInteger (1.1) }, CheckException);
        });
    });

    describe ("isInteger", function () {
        it ("should throw exception on non-number (e.g. string)", function () {
           TestExpect.throws (function () { Check.isInteger ("hello") }, CheckException);
        });
    });

    describe ("isInteger", function () {
        it ("should not throw exception on integer", function () {
            Check.isInteger (0);
        });
    });


});

