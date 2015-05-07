'use strict';

/**
 * Used to pull in and expose external libraries we want pulled in
 * during browserify.
 */

var ExternalInclude = {};

ExternalInclude.request = require ('superagent');

module.exports = ExternalInclude;