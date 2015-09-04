
/**
 * An Exception object that inherits from Error.
 */

var Inherits = require ('./grokible.inherits');

/**
 * constructor:  Exception ([message [, opt]])
 * opt is carried on.
 * e.g.:
 *     throw Exception ("an error", { some_name: some_data });
 */
var Exception = function Exception () {
    // arg [0] is message.  We don't, Error parent class takes args =
    // message, filename, linenumber (we ignore the last two).

    // pass message (arguments [0]) and ignore the rest.
    var args = [];
    if (arguments.length >= 1)
	args.push (arguments [0]);

    // get opt (arguments [1]) and use locally
    var opt = arguments.length >= 2 ? arguments [1] : {};

    var obj = Inherits.superCreateNewIgnored (Exception, Error, args);
    obj.name = obj.constructor.name;    // Set error class 'name' property
    obj._opt = opt;

    return obj;
};

Inherits.setParentClass (Exception, Error);

Exception.prototype.getOpt = function () { return this._opt }
Exception.prototype.setOpt = function (opt) { this._opt = opt }

module.exports = Exception;
