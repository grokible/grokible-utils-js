'use strict';

var FileUtils = require ('FileUtils');

var expect = require ('chai').expect;
var assert = require ('chai').assert;

describe ("FileUtils library", function () {

    describe ("isAbsolutePath (path)", function () {
        it ("should return true, if path starts with '/'", function () {
            expect (FileUtils.isAbsolutePath ("/usr/lib")).to.equal (true);
            expect (FileUtils.isAbsolutePath ("my/lib")).to.equal (false);
            expect (FileUtils.isAbsolutePath ("/")).to.equal (true);
            expect (FileUtils.isAbsolutePath (".")).to.equal (false);
        });
    });

    describe ("createDirectoryPathIfNecessary (relDestDir)", function () {
        it ("if path doesn't exist, create it", function () {
            var relDestDir = "__path_ensure_test/foo/bar/baz";
            var rootDir = FileUtils.getAbsolutePath ('build');
            var fullpath = rootDir + "/" + relDestDir;

            // Pre-condition - none of them exists
            FileUtils.destroyDirectoryPathIfExists (relDestDir, rootDir);
            expect (FileUtils.directoryExists (fullpath)).to.equal (false);
            
            // Create and test
            FileUtils.createDirectoryPathIfNecessary (relDestDir, rootDir);
            expect (FileUtils.directoryExists (fullpath)).to.equal (true);

            // Post-test cleanup
            FileUtils.destroyDirectoryPathIfExists (relDestDir, rootDir);
        });
    });


});

