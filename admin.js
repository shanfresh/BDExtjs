/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});

Ext.application({

    requires: [
        'MyApp.view.AdminPanel'
    ],
    models: [
        'AppopModel'
    ],
    stores: [
        'AppopStore','JobConfigStore','AppConfigStore'
    ],
    views: [
        'AdminPanel'
    ],
    controllers: [
        'AdminControl'
    ],
    name: 'MyApp'
});
Ext.onReady(function() {
	console.log("Admin is Ready");
    Ext.create('Ext.container.Viewport', {
    	layout: 'border',
    	items:[{
    		region: 'center',
            xtype: 'MyAdminPanel'
    	}
    	]    	 
    });
	Ext.getCmp('AdminAppop').store.load();
	
});
