/*
 * Ext JS Library 2.3.0
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext2.menu.ColorMenu
 * @extends Ext2.menu.Menu
 * A menu containing a {@link Ext2.menu.ColorItem} component (which provides a basic color picker).
 * @constructor
 * Creates a new ColorMenu
 * @param {Object} config Configuration options
 */
Ext2.menu.ColorMenu = function(config){
    Ext2.menu.ColorMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var ci = new Ext2.menu.ColorItem(config);
    this.add(ci);
    /**
     * The {@link Ext2.ColorPalette} instance for this ColorMenu
     * @type ColorPalette
     */
    this.palette = ci.palette;
    /**
     * @event select
     * @param {ColorPalette} palette
     * @param {String} color
     */
    this.relayEvents(ci, ["select"]);
};
Ext2.extend(Ext2.menu.ColorMenu, Ext2.menu.Menu, {
    //private
    beforeDestroy: function(){
        this.palette.destroy();
    }
});