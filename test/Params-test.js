
var requirejs = require ('requirejs');
var expect = require ('chai').expect;

var baseUrl = process.cwd () + "/lib";

requirejs.config ({
    nodeRequire: require,
    baseUrl : baseUrl,
    paths : {
        Params : 'Params'
    }
});

var Params = requirejs ('Params');

describe ("Params class", function () {

    describe ("constructor (config)", function () {
        it ("should set internal config and leave targetObject undefined", function () {
            var pm = new Params ({ hello : "world" });
            var config = pm.getConfig ();
            expect (config).to.have.a.property ('hello', 'world');
            expect (Object.keys (config)).to.have.length (1);
            expect (pm.getTargetObject ()).to.equal (undefined);
        });
    });

    describe ("constructor (config, obj)", function () {
        it ("should set internal config and targetObject", function () {
            var obj = {};
            var pm = new Params ({ hello : "world" }, obj);
            var config = pm.getConfig ();
            expect (config).to.have.a.property ('hello', 'world');
            expect (Object.keys (config)).to.have.length (1);
            expect (pm.getTargetObject ()).to.equal (obj);
        });
    });

    describe ("copy (key)", function () {
        it ("case 1:  should set object property to same value in config, prefixed by '_'", function () {
            debugger;
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('hello');
            expect (obj).to.have.a.property ('_hello', 'world');
            expect (Object.keys (obj)).to.have.length (1);
            expect (x).to.equal ('world');
        });
    });

    describe ("copy (key)", function () {
        it ("case 2:  should not set object property if it isn't in config, and return undefined", function () {
            debugger;
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('missing');
            expect (Object.keys (obj)).to.have.length (0);
            expect (x).to.equal (undefined);
        });
    });


    describe ("copy (key, optDefault)", function () {
        it ("case 1:  should set object property to same value in config, prefixed by '_'", function () {
            debugger;
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('hello', 'why not');
            expect (obj).to.have.a.property ('_hello', 'world');
            expect (Object.keys (obj)).to.have.length (1);
            expect (x).to.equal ('world');
        });
    });


    describe ("copy (key, optDefault)", function () {
        it ("case 2:  should set object property to default if key/value not present", function () {
            debugger;
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('missing', 'why not');
            expect (obj).to.have.a.property ('_missing', 'why not');
            expect (Object.keys (obj)).to.have.length (1);
            expect (x).to.equal ('why not');
        });
    });

});

