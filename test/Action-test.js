
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var TestSetup = require ('Local/TestSetup');

var libs = TestSetup.configRequireJsLibs
    (['jquery=Local/jquery', 'Action', 'Url', 'CheckException', 'ProgrammingError', 'Check',
      'TestExpect', 'Exception', 'ArgException']);


// Eval to define libraries in scoped vars
for (k in libs) { var s = "var " + k + " = libs ['" + k + "'];"; eval (s); }

describe ("Action Class", function () {
    describe ("constructor ()", function () {
        it ("should set object properties to defaults", function () {
            var url = new Url ();
            var action = new Action ({ url: url });
            expect (action.getMethod ()).to.equal ('get');
        });
    });
});

