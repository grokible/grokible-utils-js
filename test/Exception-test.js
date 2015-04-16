
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var TestSetup = require ('Local/TestSetup');

// Setup requirejs and load libs

var libs = TestSetup.configRequireJsLibs (['Exception', 'TestExpect']);
for (k in libs) {
    var s = "var " + k + " = libs ['" + k + "'];";
    eval (s);
}

// Alternatively
// var Exception = libs ['Exception'];
// var TestExpect = libs ['TestExpect'];

describe ("Exception class", function () {
    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new Exception ("hello");
            TestExpect.inherits (exc, Exception, Error, { name: "Exception", message: "hello" });
        });
    });
});

