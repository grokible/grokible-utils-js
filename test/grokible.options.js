
var expect = require ('chai').expect;
var Options = require ('../grokible.options');

describe ("Options class", function () {

    describe ("get ()", function () {
        it ("Should get keyed value or default (if provided)", function () {
            var obj = { hello : 'world' };
            expect (Options.get ('hello', obj)).to.equal ('world');
            expect (Options.get ('nope', obj, 'blah')).to.equal ('blah');
            expect (Options.get ('nope', obj)).to.equal (undefined);
        });
    });

    describe ("copy ()", function () {
        it ("Should make a shallow copy of a map", function () {
            var options = { hello : 'world', 'foo' : 5, 'x' : [ 'a', 'b' ] };
            var options2 = Options.copy (options);
            expect (Object.keys (options2)).to.have.length (3);
            expect (options2 ['hello']).to.equal ('world')
            expect (options2 ['foo']).to.equal (5);
            expect (options2 ['x']).to.have.length (2);
            expect (options2 ['x'][0]).to.equal ('a');
            expect (options2 ['x'][1]).to.equal ('b');

            // Let's see if anything is tied by a reference
            options ['hello'] = 'bar';
            expect (options2 ['hello']).to.equal ('world')

            options ['foo'] = 6;
            expect (options2 ['foo']).to.equal (5);
            
            // N.B. this WILL CHANGE since array is ref copied
            options ['x'][0] = 'z';
            expect (options2 ['x'][0]).to.equal ('z');
        });
    });

    describe ("mergeTo ()", function () {
        it ("Should calculate and return merge of two optionss", function () {
            var options1 = { hello : 'world', 'foo' : 'bar' };
            var options2 = { hello : 'goodbye', 'baz' : 5 };

            var options3 = Options.mergeTo (options1, options2);

            expect (Object.keys (options3)).to.have.length (3);
            expect (options3 ['hello']).to.equal ('world');
            expect (options3 ['foo']).to.equal ('bar');
            expect (options3 ['baz']).to.equal (5);
        });
    });

});

