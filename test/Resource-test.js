
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var TestSetup = require ('Local/TestSetup');

var libs = TestSetup.configRequireJsLibs
    (['Params', 'Check', 'Resource', 'TestExpect', 'CheckException']);

// Eval to define libraries in scoped vars
for (k in libs) { var s = "var " + k + " = libs ['" + k + "'];"; eval (s); }

describe ("Resource class", function () {

    describe ("constructor ()", function () {
        it ("should set internal config to defaults", function () {
            var r = new Resource ();

            expect (r.getScheme ()).to.equal ("http");
            expect (r.getHost ()).to.equal ("localhost");
            expect (r.getPath ()).to.equal ("");
            expect (r.getPort ()).to.equal (undefined);
            expect (r.getUrl ()).to.equal ("http://localhost/");
        });
    });

    describe ("constructor ()", function () {
        it ("should set internal config to defaults", function () {
            var r = new Resource ({ scheme : "https", host : "www.grokible.com" });

            expect (r.getScheme ()).to.equal ("https");
            expect (r.getHost ()).to.equal ("www.grokible.com");
            expect (r.getPath ()).to.equal ("");
            expect (r.getPort ()).to.equal (undefined);
            expect (r.getUrl ()).to.equal ("https://www.grokible.com/");
        });
    });


    describe ("constructor ({ port : <non-integer> })", function () {
        it ("should throw a CheckException due to non-integer port settting", function () {
            TestExpect.throws (function () { new Resource ({ port : "s" }) }, CheckException);
        });
    });

    describe ("setScheme ('https')", function () {
        it ("should set internal scheme to https, and have it affect URL", function () {
            var r = new Resource ();
            r.setScheme ("https");

            expect (r.getScheme ()).to.equal ("https");
            expect (r.getUrl ()).to.equal ("https://localhost/");
        });
    });

});

