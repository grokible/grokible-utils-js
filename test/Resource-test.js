
var requirejs = require ('requirejs');
var expect = require ('chai').expect;

var baseUrl = process.cwd () + "/lib";

requirejs.config ({
    nodeRequire: require,
    baseUrl : baseUrl,
    paths : {
        Params : 'Params',
        Check : 'Check',
        Resource : 'Resource',
        TestExpect : 'TestExpect',
        CheckException : 'CheckException'
    }
});

var Resource = requirejs ('Resource');
var TestExpect = requirejs ('TestExpect');
var CheckException = requirejs ('CheckException');

describe ("Resource class", function () {

    describe ("constructor () should produce http to localhost", function () {
        it ("should set internal config and leave targetObject undefined", function () {
            var r = new Resource ();
            expect (r.getUrl ()).to.equal ("http://localhost/");
        });
    });

    describe ("constructor ({ port : <non-integer> })", function () {
        it ("should throw a CheckException", function () {
            TestExpect.throws (function () { new Resource ({ port : "s" }) }, CheckException);
        });
    });


});

