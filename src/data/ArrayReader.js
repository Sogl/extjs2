/*
 * Ext JS Library 2.3.0
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext2.data.ArrayReader
 * @extends Ext2.data.JsonReader
 * Data reader class to create an Array of {@link Ext2.data.Record} objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the <em>mapping</em> property
 * of the field definition if it exists, or the field's ordinal position in the definition.<br>
 * <p>
 * Example code:.
 * <pre><code>
var Employee = Ext2.data.Record.create([
    {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
    {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.
]);
var myReader = new Ext2.data.ArrayReader({
    id: 0                     // The subscript within row Array that provides an ID for the Record (optional)
}, Employee);
</code></pre>
 * <p>
 * This would consume an Array like this:
 * <pre><code>
[ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
  </code></pre>
 * @cfg {String} id (optional) The subscript within row Array that provides an ID for the Record
 * @constructor
 * Create a new ArrayReader
 * @param {Object} meta Metadata configuration options.
 * @param {Object} recordType Either an Array of field definition objects
 * as specified to {@link Ext2.data.Record#create},
 * or a {@link Ext2.data.Record Record} constructor
 * created using {@link Ext2.data.Record#create}.
 */
Ext2.data.ArrayReader = Ext2.extend(Ext2.data.JsonReader, {
    /**
     * @cfg {String} totalProperty
     * @hide
     */
    /**
     * @cfg {String} successProperty
     * @hide
     */
    /**
 	 * @cfg {String} root
     * @hide
     */
    /**
     * Create a data block containing Ext2.data.Records from an Array.
     * @param {Object} o An Array of row objects which represents the dataset.
     * @return {Object} data A data block which is used by an Ext2.data.Store object as
     * a cache of Ext2.data.Records.
     */
    readRecords : function(o){
        var sid = this.meta ? this.meta.id : null;
    	var recordType = this.recordType, fields = recordType.prototype.fields;
    	var records = [];
    	var root = o;
	    for(var i = 0; i < root.length; i++){
		    var n = root[i];
	        var values = {};
	        var id = ((sid || sid === 0) && n[sid] !== undefined && n[sid] !== "" ? n[sid] : null);
	        for(var j = 0, jlen = fields.length; j < jlen; j++){
                var f = fields.items[j];
                var k = f.mapping !== undefined && f.mapping !== null ? f.mapping : j;
                var v = n[k] !== undefined ? n[k] : f.defaultValue;
                v = f.convert(v, n);
                values[f.name] = v;
            }
	        var record = new recordType(values, id);
	        record.json = n;
	        records[records.length] = record;
	    }
	    return {
	        records : records,
	        totalRecords : records.length
	    };
    }
});