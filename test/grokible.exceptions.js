'use strict';

var Exceptions = require ('../grokible.exceptions');
var HttpException = Exceptions.HttpException;
var QueryParamException = Exceptions.QueryParamException;

var expect = require ('chai').expect;
var TestExpect = require ('../grokible.testExpect');
var Exception = require ('../grokible.exception');

/**
 * Note this tests HttpException which is defined using ExceptionUtils
 * makeNewExceptionClass () function, and was used to "prove" parity
 * for this function, compared to a hand tuned implementation.
 */
describe ("HttpException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new HttpException ("hello");

            TestExpect.inherits (exc, HttpException, Exception,
                { name: "HttpException", message: "hello" });
        });
    });

    describe ("constructor without new", function () {
        it ("should set message, inherit from Exception, and have name",
        function () {
            var exc = HttpException ("hello");

            TestExpect.inherits (exc, HttpException, Exception,
                { name: "HttpException", message: "hello" });

            expect (exc.name).to.equal ("HttpException");

	    expect (exc instanceof HttpException).to.be.true;
	    expect (exc instanceof Exception).to.be.true;
	    expect (exc.message).to.equal ("hello");
        });
    });

    describe ("constructor", function () {
        it ("UNFORTUNATELY there is no pre-ES6 way to dynamically name ctor",
        function () {
            var exc = HttpException ("hello");
	    expect (exc.constructor.name).to.equal ("");
        });
    });

    describe ("constructor without new", function () {
        it ("should inherit from Exception and set message (2)", function () {
            var exc = HttpException ("hello");

	    // we test more manually here:
	    expect (exc instanceof HttpException).to.be.true;
	    expect (exc instanceof Exception).to.be.true;
	    expect (exc.message).to.equal ("hello");
        });
    });
});


describe ("QueryParamException class", function () {

    describe ("constructor (message)", function () {
        it ("should set message and inherit from Error", function () {
            var exc = new QueryParamException ("hello");

            TestExpect.inherits (exc, QueryParamException, HttpException,
                { name: "QueryParamException", message: "hello" });
        });
    });

    describe ("constructor without new", function () {
        it ("should set message, inherit from Exception, and have name",
        function () {
            var exc = QueryParamException ("hello");

            TestExpect.inherits (exc, QueryParamException, HttpException,
                { name: "QueryParamException", message: "hello" });

            expect (exc.name).to.equal ("QueryParamException");
	    expect (exc instanceof QueryParamException).to.be.true;
	    expect (exc instanceof HttpException).to.be.true;
	    expect (exc instanceof Exception).to.be.true;
	    expect (exc.message).to.equal ("hello");            
        });
    });
});


