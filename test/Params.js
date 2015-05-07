
var expect = require ('chai').expect;
var Params = require ('Params');
var TestExpect = require ('TestExpect');
var ArgTypeException = require ('ArgTypeException');

describe ("Params class", function () {

    describe ("constructor (config)", function () {
        it ("should set internal conf and target undefined", function () {
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
        it ("case 1:  should set obj prop to same value in conf, _ prefixed",
        function () {
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('hello');
            expect (obj).to.have.a.property ('_hello', 'world');
            expect (Object.keys (obj)).to.have.length (1);
            expect (x).to.equal ('world');
        });
    });

    describe ("copy (key)", function () {
        it ("case 2:  should not set obj prop if it isn't in conf, ret undef",
        function () {
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('missing');
            expect (Object.keys (obj)).to.have.length (0);
            expect (x).to.equal (undefined);
        });
    });

    describe ("copy (key, optDefault)", function () {
        it ("case 1:  should set obj prop to same value in conf, _ prefixed",
        function () {
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('hello', 'why not');
            expect (obj).to.have.a.property ('_hello', 'world');
            expect (Object.keys (obj)).to.have.length (1);
            expect (x).to.equal ('world');
        });
    });


    describe ("copy (key, optDefault)", function () {
        it ("case 2:  should set obj prop to default if key/value not there",
        function () {
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var x = pm.copy ('missing', 'why not');
            expect (obj).to.have.a.property ('_missing', 'why not');
            expect (Object.keys (obj)).to.have.length (1);
            expect (x).to.equal ('why not');
        });
    });

    describe ("copy", function () {
        it ("should throw if options is wrong type", function () {
            var obj = {};
            var pm = new Params ({ hello : "world", what : "else" }, obj);
            var badOptions = 1;
            TestExpect.throws (function () {
                pm.copy ('missing', 'why not', badOptions);
            }, ArgTypeException, /3rd arg [(]options[)] must be a map[.]/);
        });
    });

});

