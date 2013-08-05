/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
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
Ext.Loader.setPath('Ext.ux', 'extjs/src/ux');
Ext.require([
             'Ext.ux.form.SearchField'
         ]);

Ext.application({
    models: [
        'JobsModel'
    ],
    stores: [
        'JobStore','AppInfoStore','JobInfoStore','user.MyJobStore'
    ],
    controllers: [
        'MyController','CreateControl','DeleteControl','UserModifyControl'
    ],
    name: 'MyApp'
});
Ext.onReady(function() {
	console.log("Applation is Ready");
	var mycontent=Ext.get("content");
	console.log(mycontent);
	Ext.create('MyApp.view.MyWindow', {
    	renderTo:mycontent  	 
    });
	//Ext.getCmp('AllJobPanel').store.load();
	
});