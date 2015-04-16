
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var TestSetup = require ('Local/TestSetup');

var libs = TestSetup.configRequireJsLibs
    (['CheckException', 'ProgrammingError', 'Check',
      'TestExpect', 'Exception', 'ArgException']);


// Eval to define libraries in scoped vars
for (k in libs) { var s = "var " + k + " = libs ['" + k + "'];"; eval (s); }

describe ("Check library", function () {
    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should not throw exc if args have same prototype", function () {
        });
    });
});

