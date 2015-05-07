
var Url = require ('Url');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var CheckException = require ('CheckException');

var request = require ('superagent');

describe ("Url class", function () {

    describe ("constructor ()", function () {
        it ("should set internal config to defaults", function () {
            var r = new Url ();

            expect (r.getScheme ()).to.equal ("http");
            expect (r.getHost ()).to.equal ("localhost");
            expect (r.getPath ()).to.equal ("/");
            expect (r.getPort ()).to.equal (undefined);
            expect (r.getUrl ()).to.equal ("http://localhost/");
        });
    });

    describe ("constructor ()", function () {
        it ("should set internal config to defaults", function () {
            var r = new Url ({ scheme : "https", host : "www.grokible.com" });

            expect (r.getScheme ()).to.equal ("https");
            expect (r.getHost ()).to.equal ("www.grokible.com");
            expect (r.getPath ()).to.equal ("/");
            expect (r.getPort ()).to.equal (undefined);
            expect (r.getUrl ()).to.equal ("https://www.grokible.com/");
        });
    });


    describe ("constructor ({ port : <non-integer> })", function () {
        it ("should throw a CheckException due to non-integer port settting",
        function () {
            TestExpect.throws (function () {
                new Url ({ port : "s" })
            }, CheckException);
        });
    });

    describe ("setScheme ('https')", function () {
        it ("should set internal scheme to https, and have it affect URL",
        function () {
            var r = new Url ();
            r.setScheme ("https");

            expect (r.getScheme ()).to.equal ("https");
            expect (r.getUrl ()).to.equal ("https://localhost/");
        });
    });

    /**
     *   Can't properly test this in a browser without a local test server
     *   because of CORS XMLHttpRequest cannot load http://www.google.com/.
     *   Error = No 'Access-Control-Allow-Origin' header is present on the
     *   requested resource.
     *
     *   If this test is run in browser, and can turn off --web-security
     *   this will work.
     */

    describe ("use Url in request call", function (done) {
        it ("should pull from google (at least 100 chars)", function (done) {
            request
            .get ('https://www.google.com')
            .end (function (err, res) {
                expect (err).to.be.null;
                expect (res.statusCode).to.equal (200);
                expect(res.text.length).to.be.above (100);
                done ();
            });
        });
    });
});

