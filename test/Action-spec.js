'use strict';

var Action = require ('Action');

var expect = require ('chai').expect;
var Url = require ('Url');

describe ("Action Class", function () {
    describe ("constructor ()", function () {
        it ("should set object properties to defaults", function () {
            var url = new Url ();
            var action = new Action ({ url: url });
            expect (action.getMethod ()).to.equal ('get');
        });
    });
});

