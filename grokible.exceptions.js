var ExceptionUtils = require ('./grokible.exceptionUtils');

var HttpException = ExceptionUtils.makeNewExceptionClass ('HttpException');
var ArgTypeException =
    ExceptionUtils.makeNewExceptionClass ('ArgTypeException');
var CheckException = ExceptionUtils.makeNewExceptionClass ('CheckException');

module.exports = {
    HttpException: HttpException,
    ArgTypeException: ArgTypeException,
    CheckException: CheckException,

    ArgException:
        ExceptionUtils.makeNewExceptionClass
            ('ArgException', CheckException),

    QueryParamException:
        ExceptionUtils.makeNewExceptionClass
            ('QueryParamException', HttpException),
};

