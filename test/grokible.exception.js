'use strict';

var Exception = require ('../grokible.exception');

var expect = require ('chai').expect;
var TestExpect = require ('../grokible.testExpect');

describe ("Exception", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = Exception ("hello");
            TestExpect.inherits (exc, Exception, Error,
                { name: "Exception", message: "hello" });
        });
    });

    describe ("constructor (message) with new keyword", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new Exception ("hello");
            TestExpect.inherits (exc, Exception, Error,
                { name: "Exception", message: "hello" });
        });
    });

    describe ("constructor (message, opt)", function () {
        it ("should set 2nd arg opt", function () {
            var exc = Exception ("hello", { somevar: "what" });
	    var opt = exc.getOpt ();
	    expect ('somevar' in opt).to.be.true;
	    expect (opt ['somevar']).to.equal ('what');
        });
    });

});

