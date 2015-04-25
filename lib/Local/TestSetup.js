/** TestSetup.js
 *
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
 *    
 *  N.B. that the argument to configRequireJsLibs is an array of libSpecifiers.
 *  Here are the current valid forms of libSpecifier:
 *  
 *      'Name' - a simple name, which is passed to requirejs.  This will be
 *               looked up using requirejs, and is typically 'Name.js' in
 *               baseUrl.
 *      'Name=path' - a name associated with a path, which will be looked
 *               up using requirejs from baseUrl.
 */

var requirejs = require ('requirejs');

module.exports = {
    configRequireJsLibs : function (libSpecifiers) {

        var map = this.parseSpecifiers (libSpecifiers);

        // Loading is always based from where the process runs

        var baseUrl = process.cwd () + "/lib";

        requirejs.config ({
            nodeRequire: require,
            baseUrl : baseUrl,
            paths : map
        });


        var libs = {};
        for (var libName in map) {
            var path = map [libName];
            libs [libName] = requirejs (path);
        }
        
        return libs;
    },

    /**
     *  Returns a map of name (library string id) to path mappings suitable for
     *  use in requirejs config.
     */
    parseSpecifiers : function (libSpecifiers) {
        // Specifiers may be "Name" or "Name=path"

        var map = {};

        var len = libSpecifiers.length;
        for (var i = 0 ; i < len ; i++) {
            var spec = libSpecifiers [i];

            // name and path are generally simple (the same thing)
            var name = spec;
            var path = spec;

            var arr = spec.split ("=");

            // TODO - see if we can include ArgException here

            if (arr.length > 2) {
                throw new Error ("Too many '=' in library specifier '" + spec +
                    "'.  Valid format is 'Name=path'.");
            } else if (arr.length == 2) {
                name = arr [0];
                path = arr [1];
            }

            map [name] = path;
        }

        return map;
    },
};
