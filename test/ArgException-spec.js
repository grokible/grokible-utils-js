
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var TestSetup = require ('Local/TestSetup');

var libs = TestSetup.configRequireJsLibs
    (['ArgException', 'CheckException',  'TestExpect']);

// Eval to define libraries in scoped vars
for (k in libs) { var s = "var " + k + " = libs ['" + k + "'];"; eval (s); }


describe ("ArgException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new ArgException ("hello");

            TestExpect.inherits (exc, ArgException, CheckException, { name: "ArgException", message: "hello" });
        });
    });

});

