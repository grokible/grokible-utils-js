'use strict';

var gulp = require ('gulp'),
    rename = require ('gulp-rename'),
    clean = require('gulp-clean'),
    uglify = require ('gulp-uglify'),
    watch = require ('gulp-watch'),
    notify = require ('gulp-notify'),
    browserify = require ('browserify'),
    source = require ('vinyl-source-stream2'),
    buffer = require ('vinyl-buffer'),
    karma = require ('gulp-karma'),
    changed = require ('gulp-changed'),
    mocha = require ('gulp-mocha');

// For iterating on files without gulp
var Glob = require ('glob');
var globArray = require ('glob-array');
var FileUtils = require ('Local/FileUtils');

var child = require ('child_process');


/**
 *  The build directory holds generated artifacts.  A single-level
 *  directory structure is below the build directory.
 */

var testDir = 'test';
var destDir = 'build';

var paths = {
    src : [],
    testDir : testDir,
    tests : [ testDir + '/*-spec.js' ],
    css : './css/**',
    karmaConfig : 'karma.conf.js',
    destDir : destDir,
    browserifiedTests : [ destDir + '/tests/*.js'],
    noBrowserify : [ testDir + '/FileUtils-spec.js' ]
};


/*
gulp.task ('watch', function () {
    gulp.watch ('test/Describe2-spec.js', ['test']);
});
*/

gulp.task ('clean', function () {
    return gulp.src ([ paths.destDir + "/*" ], { read: false })
        .pipe (clean ());
});


function doBrowserify (relPath, destDir, optRoot) {

    var fullSourcePath = FileUtils.getAbsolutePath (relPath, optRoot);
    var relDir = FileUtils.getDirectory (relPath);
 
    // N.B. source (vinyl-source-stream2) creates a 'fake file' which we
    // can't stat and therefore fails in a file compare (to determine
    // if we should regenerate the target from the source).  Thus
    // calls to doBrowserify should do the filtering.

    return browserify ([ fullSourcePath ]).bundle ()
        .pipe (source (relPath))
        .pipe (buffer ())
        .pipe (uglify ())
        .pipe (notify ({
            message : "Generated: <%= file.relative %> @ <%= options.date %>",
            templateOptions: {
                date: new Date ()
            }
        }))
        .pipe (gulp.dest (destDir + "/" + relDir));
}

/**
 * Currently the gulp-mocha plugin has stopped working, and so
 * we resort to this ugliness.
 */
gulp.task ('test', function () {
    child.exec ('mocha', ['test/*-spec.js'], function (err, out, code) {
        if (err instanceof Error)
            throw err;
        process.stderr.write (err);
        process.stdout.write (out);
        process.exit (code);
    });
});


/**
 *  Kind of a hack, this just iterates over files.  But this is the
 *  best we can currently do with browserify, as the plugin is deprecated,
 *  and the solutions being proferred are incomplete (e.g. vinyl-source-stream
 *  has no mtime so it can't be used to compare)
 */

gulp.task ('browserify', function () {
    var arrFiles = globArray.sync (paths.tests);
    var len = arrFiles.length;

    // Create destination paths if necessary, in preparation for build step.

    for (var i = 0 ; i < len ; i++) {
        var relPath = arrFiles [i];

        // Skip files that we are not supposed to browserify

        if (paths.noBrowserify.indexOf (relPath) >= 0)
            continue;

        var dir = FileUtils.getDirectory (relPath);
        if (dir != null)
            FileUtils.createDirectoryPathIfNecessary (dir, paths.destDir);
    }

    // Compare and browserify if necessary.

    for (var j = 0 ; j < len ; j++) {
        var relPath = arrFiles [j];

        // Skip files that we are not supposed to browserify

        if (paths.noBrowserify.indexOf (relPath) >= 0)
            continue;

        if (FileUtils.isFileChanged (relPath, paths.destDir))
            doBrowserify (relPath, paths.destDir);
    }
});

gulp.task ('test-in-browser', ['browserify'], function () {
    return gulp.src (paths.browserifiedTests)
        .pipe (karma ({ configFile: paths.karmaConfig, action: 'run' }))
        .on ('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero 
            throw err;
        });
});

gulp.task ('default', ['test', 'test-in-browser']);
