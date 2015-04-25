'use strict';

var gulp = require ('gulp'),
    rename = require ('gulp-rename'),
    clean = require('gulp-clean'),
    uglify = require ('gulp-uglify'),
    watch = require ('gulp-watch'),
    notify = require ('gulp-notify'),
    browserify = require ('browserify'),
    source = require ('vinyl-source-stream'),
    buffer = require ('vinyl-buffer');

var paths = {
    scripts : [],
    testDir : 'test',
    tests : [
        'test/Describe2-spec.js'
    ],
    css : './css/**'
};

var DEST = 'build/';

/*
gulp.task ('watch', function () {
    gulp.watch ('test/Describe2-spec.js', ['test']);
});
*/

gulp.task ('clean', function () {
    return gulp.src (['build'], {read: false})
        .pipe(clean());
});

gulp.task ('test', function () {
    return gulp.src (paths.tests)
        //    .pipe (watch (paths.testDir))
    .pipe (uglify ())
    .pipe (rename ({ dirname: '.', extname: '.min.js' }))
    .pipe (gulp.dest (DEST))
    .pipe (notify ({ message: "another file minified" }));
});

 
gulp.task ('browserify', function () {
    return browserify ([__dirname + '/test/Describe2-spec.js']).bundle ()
        .pipe (source ('Describe2-spec.final.js'))
        .pipe (buffer ())
        // .pipe (uglify ())
        .pipe (gulp.dest (DEST));
});