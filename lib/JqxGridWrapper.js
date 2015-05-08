'use strict';

/**
 *  JqxGridWrapper encapsulates all of the jquery and jqwidget goop
 *  into a single object.
 *  columns [ { text: id, datafield: x, width 250 } ] - if omit text,
 *    use datafield
 *  config must have columnNames.
 */

var Check = require ('Check');
var Options = require ('Options');
var Params = require ('Params');
var ArgTypeException = require ('ArgTypeException');

var JqxGridWrapper = function (jquery, config) {
    var pm = new Params (config, this, false);

    // See jqwidget docs for column attributes.  TODO - we currently
    // don't use them all.

    pm.copy ('columnDefs', undefined, {
        checkFunction : Check.isMap,
        message : 'columnDefs config option is not a Map'
    });

    pm.copy ('source', null);

    pm.copy ('gridDef', {}, {
        checkFunction : Check.isMap,
        message : 'gridDef config option is not a Map'
    });

    this._jquery = jquery;
    this._columns = this._calcColumns ();
    this._dataFields = this._calcDataFieldsFromColumns ();
    this._initSource ();

    var $ = this._jquery;
    this._dataAdapter = new $.jqx.dataAdapter (this._source);
};

JqxGridWrapper.prototype._initSource = function () {
    this._source ['datafields'] = this._dataFields;
}

/**
 *  Using config values (columnDefs), initialize _columns and _dataFields
 *  which are used by JqxGrid to do the actual setup.  For column defs, here
 *  are some helpful URLs:
 * 
 *  1. http://www.trirand.com/jqgridwiki/doku.php?id=wiki:colmodel_options
 *  2. http://www.trirand.com/jqgridwiki/doku.php?id=wiki:predefined_formatter
 */
JqxGridWrapper.prototype._calcColumns = function () {

    var columns = [];

    var cssclass = 'jqx-widget-header';
    if (theme != '')
        cssclass += ' jqx-widget-header-' + theme;

    // Create a vertical number column on left (column 0)

    columns [columns.length] = {
        pinned: true,
        exportable: false,
        text: "",
        columntype: 'number',
        cellclassname: cssclass,
        cellsrenderer: this._renderNumberCell
    };

    var columnDefaults = {
        resizable: true,
        sortable: true,
        editable: false,

        text: text,
        datafield: text,
        label: text,
        index: text,
        width: 60,
        align: 'left'
    };


    // Iterate over this._columnDefs for data columns

    var keys = Object.keys (this._columnDefs),
        len = keys.length;

    for (var i = 0 ; i < len ; i++) {
        var k = keys [i];
        var def = this._columnDefs [k];
        
        Check.inMapAndNotEmpty ('name', def, {
            exception: ArgTypeException,
            message: "Empty or missing 'name' property on columnDef " +
                "element '" + k + "'."
        });

        var text = def ['name'];

        var columnDefaults = {
            resizable: true,
            sortable: true,
            editable: false,

            width: 60,
            align: 'left',

            text: text,
            datafield: text,
            label: text,
            index: text
        };

        var col = Options.mergeTo (def, columnDefaults);

        columns [columns.length] = col;
    }

    return columns;
}

JqxGridWrapper.prototype._calcDataFieldsFromColumns = function () {
    // N.B. skip first one since this is number column
    var dataFields = [];
    var len = this._columns.length;
    for (var i = 1; i < len; i++) {
        var text = this._columns [i].text;
        dataFields [dataFields.length] = { name: text };
    }
    return dataFields;
}

JqxGridWrapper.prototype.getColumns = function () { return this._columns }
JqxGridWrapper.prototype.getDataFields = function ()
    { return this._dataFields }
JqxGridWrapper.prototype.getSource = function () { return this._source }
JqxGridWrapper.prototype.getDataAdapter = function ()
    { return this._dataAdapter }

JqxGridWrapper.prototype.attachTo = function (jquerySelector) {

    // Combine saved gridDef options with defaults

    var gridDefaults = {
        width: 1000,
        editable: true,
        columnsresize: true,
        selectionmode: 'multiplecellsadvanced'
    };

    var gridOptions = Options.mergeTo (this._gridDef, gridDefaults);
    gridOptions ['columns'] = this._columns;
    gridOptions ['source'] = this._dataAdapter;

    var $ = this._jquery;
    $(jquerySelector).jqxGrid (gridOptions);
}

JqxGridWrapper.prototype._renderNumberCell = function (row, column, value) {
    return '<div style="text-align: center; margin-top: 5px;">' +
        (1 + value) + '</div>';
}


module.exports = JqxGridWrapper;
