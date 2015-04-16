
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var TestSetup = require ('Local/TestSetup');

var libs = TestSetup.configRequireJsLibs (['Exception', 'CheckException', 'TestExpect']);

// Eval to define libraries in scoped vars
for (k in libs) { var s = "var " + k + " = libs ['" + k + "'];"; eval (s); }


describe ("CheckException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new CheckException ("hello");

            TestExpect.inherits (exc, CheckException, Exception, { name: "CheckException", message: "hello" });
        });
    });

});

