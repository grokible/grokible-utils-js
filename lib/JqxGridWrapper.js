'use strict';

var Check = require ('Check');
var Params = require ('Params');
var ArgTypeException = require ('ArgTypeException');

/**
 *  JqxGridWrapper encapsulates all of the jquery and jqwidget goop
 *  into a single object.
 *  columns [ { text: id, datafield: x, width 250 } ] - if omit text,
 *    use datafield
 *  config must have columnNames.
 */

var JqxGridWrapper = function (jquery, config) {
    var pm = new Params (config, this, false);
    pm.copy ('columnNames', undefined, { checkFunction : Check.isArray });
    pm.copy ('source', null);

    this._jquery = jquery;
    this._columns = this._calcColumns ();
    this._dataFields = this._calcDataFieldsFromColumns ();

    this._initSource ();

    var $ = this._jquery;
    this._dataAdapter = new $.jqx.dataAdapter (this._source);
};

JqxGridWrapper.prototype._initSource = function () {

    // If source not set in constructor config, make one, else set dataFields.
    // Setting dataFields assumes it is initialized.

    if (this._source === null) {
        this._source = {
            unboundmode: true,
            totalrecords: 100,
            datafields: this._dataFields,
            updaterow: function (rowid, rowdata) {
                // synchronize with the server - send update command   
            }
        };
    } else {
        this._source ['datafields'] = this._dataFields;
    }
}

/**
 *  Using config values (columnNames), initialize _columns and _dataFields
 *  which are used by JqxGrid to do the actual setup.
 */
JqxGridWrapper.prototype._calcColumns = function () {

    var columns = [];

    // Create a vertical number column on left
        
    var cssclass = 'jqx-widget-header';
    if (theme != '')
        cssclass += ' jqx-widget-header-' + theme;

    columns [columns.length] = {
        pinned: true,
        exportable: false,
        text: "",
        columntype: 'number',
        cellclassname: cssclass,
        cellsrenderer: this._renderNumberCell
    };


    // Iterate over this._columnNames for data columns

    var len = this._columnNames.length;
    for (var i = 0; i < len; i++) {
        var text = this._columnNames [i];

        columns [columns.length] = {
            text: text,
            datafield: text,
            width: 60,
            align: 'center'
        };
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
    var $ = this._jquery;
    $(jquerySelector).jqxGrid ({
        columns: this._columns,
        source: this._dataAdapter,

        width: 850,
        editable: true,
        columnsresize: true,
        selectionmode: 'multiplecellsadvanced'
    });
}

JqxGridWrapper.prototype._renderNumberCell = function (row, column, value) {
    return '<div style="text-align: center; margin-top: 5px;">' +
        (1 + value) + '</div>';
}


module.exports = JqxGridWrapper;
