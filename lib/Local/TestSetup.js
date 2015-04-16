/** TestSetup.js
 *  A nodejs 'static' helper library for loading requirejs style libraries in
 *  a node module.  This is slightly tricky as it requires using both the node
 *  loader and requirejs, and doing so in such a way that it works with node
 *  module style.  The example code below is setup for a test module.
 *
 *  @example:
 *
 *      var requirejs = require ('requirejs');        // load requirejs loader 
 *      var expect = require ('chai').expect;         // chai testing lib expect
 *      var TestSetup = require ('Local/TestSetup');  // currently a Local lib
 *
 *      // Setup requirejs config and load libs using requirejs loader
 *
 *      var libs = TestSetup.configRequireJsLibs (['Exception', 'TestInheritance']);
 *      var Exception = libs ['Exception'];
 *      var TestInheritance = libs ['TestInheritance'];
 */

var requirejs = require ('requirejs');

module.exports = {
    configRequireJsLibs : function (libNames) {

        var configObj = {};
        var len = libNames.length;
        for (var i = 0 ; i < len ; i++) {
            var name = libNames [i];
            configObj [name] = name;
        }

        // Loading is always based from where the process runs

        var baseUrl = process.cwd () + "/lib";

        requirejs.config ({
            nodeRequire: require,
            baseUrl : baseUrl,
            paths : configObj
        });

        // TODO - we should treat the input not as libNames but as paths,
        // and take the last path component (excluding .<ext>) for the name.

        var libs = {};
        for (var i = 0 ; i < len ; i++) {
            var name = libNames [i];
            var lib = requirejs (name);
            libs [name] = lib;
        }

        return libs;
    },
};
