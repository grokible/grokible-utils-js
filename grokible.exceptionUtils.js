
var Inherits = require ('grokible.inherits.js');
var Exception = require ('grokible.exception.js');

module.exports = {
    makeNewExceptionClass: function (newClassName, optParentClass) {
	if (optParentClass === undefined)
	    optParentClass = Exception;

	var newConstructor = function () {
            var obj = Inherits.superCreateNewIgnored (newConstructor,
                optParentClass, arguments);

            obj.name = newClassName;    // Set error class 'name' property
            return obj;
	}

	// N.B. There is no pre-ES6 way to set the function name dynamically,
	// so the name of the constructor is not defined.

        Inherits.setParentClass (newConstructor, optParentClass);

	return newConstructor;
    }	

};

