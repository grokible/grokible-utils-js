'use strict';

var ParamSpec = require ('../grokible.paramSpec');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var Exception = require ('Exception');
var ArgException = require ('ArgException');
var QueryParamException = require ('../grokible.queryParamException');

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

    describe ("get (number)", function () {
        var args = { weight: 205.2 };
        var spec = { weight: { type: 'number', default: 10.2 } };

        it ("should get number weight if it exists, else default",
        function () {
            var ps = ParamSpec (args, spec);

	    var x = ps.get ('weight');
	    expect (x).to.equal (205.2);

	    ps.setArgsUsingArgsOrContext ({});
	    x = ps.get ('weight');
	    expect (x).to.equal (10.2);
        });
    });

    describe ("get (string) for number spec", function () {
        var args = { weight: '205.2' };
        var spec = { weight: { type: 'number', default: '10.2' } };

        it ("should get and convert string to num if exists, else default",
        function () {
            var ps = ParamSpec (args, spec);

	    var x = ps.get ('weight');
	    expect (x).to.equal (205.2);

	    ps.setArgsUsingArgsOrContext ({});
	    x = ps.get ('weight');
	    expect (x).to.equal (10.2);
        });
    });

    describe ("get (string), for integer spec", function () {
        var args = { age: '10' };
        var spec = { age: { type: 'integer', default: 20 } };

        it ("should get and convert string to int if exists, else default",
        function () {
            var ps = ParamSpec (args, spec);

	    var x = ps.get ('age');
	    expect (x).to.equal (10);

	    ps.setArgsUsingArgsOrContext ({});
	    x = ps.get ('age');
	    expect (x).to.equal (20);
        });
    });

    describe ("get (missing-arg)", function () {
        var args = { };
        var spec = { missing: { type: 'integer' } };

        it ("should throw exception if missing arg", function () {
            var ps = ParamSpec (args, spec);

            TestExpect.throws (function () {
                var x = ps.get ('missing');
            }, ArgException, /No arg found named/);
        });
    });

    describe ("get (missing-arg)", function () {
        var args = { };
        var spec = { missing: { type: 'integer' } };

        it ("should throw passed exception type if missing arg", function () {
	    var opt = { exception: QueryParamException };
            var ps = ParamSpec (args, spec, opt);

            TestExpect.throws (function () {
                var x = ps.get ('missing')
            }, QueryParamException, /No arg found named/);
        });
    });

    describe ("get (missing-spec)", function () {
        var args = { othermissing: 'foobar' };
        var spec = { missing: { type: 'integer' } };

        it ("should throw exception if missing spec", function () {
            var ps = ParamSpec (args, spec);

            TestExpect.throws (function () {
                var x = ps.get ('othermissing');
            }, ArgException, /No spec 'othermissing'/);
        });
    });



    describe ("get (flag)", function () {
        var args = { debug: "" };  // this.query will bring flag in as ""
        var spec = { debug: { type: 'flag' } };

        it ("should return true if present", function () {
            var ps = ParamSpec (args, spec);
	    var x = ps.get ('debug');
	    expect (x).to.be.true;
        });

        it ("should return false if not present", function () {
            var args = {};
            var ps = ParamSpec (args, spec);
	    var x = ps.get ('debug');
	    expect (x).to.be.false;
        });

    });

});

