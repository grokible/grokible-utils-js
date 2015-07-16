'use strict';

var ParamSpec = require ('../grokible.paramSpec');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var Exception = require ('Exception');
var ArgException = require ('ArgException');
var QueryParamException = require ('QueryParamException');

describe ("ParamSpec", function () {

    describe ("constructor (args, spec)", function () {
        var args = { weight: 205.2 };
        var spec = { weight: { type: 'number', default: 10.2 } };

        it ("should set arg and spec", function () {
            var ps = ParamSpec (args, spec);

	    var args2 = ps.getArgs ();
	    expect ('weight' in args2).to.be.true;
	    expect (args2 ['weight']).to.equal (205.2);

	    var spec2 = ps.getSpec ();
	    expect ('weight' in spec2).to.be.true;
	    expect (spec2 ['weight']['type']).to.equal ('number');
	    expect (spec2 ['weight']['default']).to.equal (10.2);
        });
    });

    describe ("get ('weight'), number arg", function () {
        var args = { weight: 205.2 };
        var spec = { weight: { type: 'number', default: 10.2 } };

        it ("should get number weight if it exists, else default",
        function () {
            var ps = ParamSpec (args, spec);

	    var x = ps.get ('weight');
	    expect (x).to.equal (205.2);

	    ps.setArgs ({});
	    x = ps.get ('weight');
	    expect (x).to.equal (10.2);
        });
    });

    describe ("get ('weight'), string arg", function () {
        var args = { weight: '205.2' };
        var spec = { weight: { type: 'number', default: '10.2' } };

        it ("should get and convert string to num if exists, else default",
        function () {
            var ps = ParamSpec (args, spec);

	    var x = ps.get ('weight');
	    expect (x).to.equal (205.2);

	    ps.setArgs ({});
	    x = ps.get ('weight');
	    expect (x).to.equal (10.2);
        });
    });

    describe ("get ('weight'), string arg", function () {
        var args = { age: '10' };
        var spec = { age: { type: 'integer', default: 20 } };

        it ("should get and convert string to int if exists, else default",
        function () {
            var ps = ParamSpec (args, spec);

	    var x = ps.get ('age');
	    expect (x).to.equal (10);

	    ps.setArgs ({});
	    x = ps.get ('age');
	    expect (x).to.equal (20);
        });
    });

    describe ("get ('missing'), should throw an exception", function () {
        var args = { };
        var spec = { missing: { type: 'integer' } };

        it ("should throw exception if missing", function () {
            var ps = ParamSpec (args, spec);

            TestExpect.throws (function () {
                var x = ps.get ('missing');
            }, ArgException, /No argument found named/);
        });
    });

    describe ("get ('missing'), should throw opt:exception ", function () {
        var args = { };
        var spec = { missing: { type: 'integer' } };

        it ("should throw exception if missing", function () {
            var ps = ParamSpec (args, spec);

            TestExpect.throws (function () {
                var x = ps.get ('missing',
                    { exception: QueryParamException });
            }, QueryParamException, /No argument found named/);
        });
    });



});

