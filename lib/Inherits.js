// Inherits.js
// A 'static' library

define ([], function () {

    var Inherits = {};

    /**
     * Follows the pattern that 'this' is ignored, that is, calling "new"
     * prior to the constructor is superfluous, and that the
     * parentConstructor is responsible for creating the object and returning
     * it.  Thus, either of these calling forms is correct.
     * 
     *     var x = new Whatever ();
     *     var x = Whatever ();
     *
     * The first works simply by ignoring the object created by 'this'
     * We then take this object and change it's proto so that it is
     * of class constructor.  This pattern of object inheritance is used, for
     * example in the standard 'Error' class.
     */
    Inherits.superCreateNewIgnored = function (constructor, parentConstructor, args) {
        var obj = parentConstructor.apply (undefined, args);
        Object.setPrototypeOf (obj, constructor.prototype);
        return obj;
    }

    /**
     * Call this after constructor definition to setup inheritance.
     * This sets up the prototype chain between this constructor and
     * the parentConstructor.
     */
    Inherits.setParentClass = function (constructor, parentConstructor) {
        constructor.prototype = Object.create (parentConstructor.prototype);
        constructor.prototype.constructor = constructor;
    }

    return Inherits;
});