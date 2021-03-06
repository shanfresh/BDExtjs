/*
 * File: app/view/CreateWindow.js
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

Ext.define('MyApp.view.CreateWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.CreateWindow',
    autoShow: true,
    height: 600,
    width: 600,
    maximizable: true,
    layout: {
        type: 'absolute'
    },
    title: '根据模板创建',
    initComponent: function() {
    	console.log("Start CreateWindow View");
        var me = this;
        Ext.applyIf(me, {
        	items: [
        	        {
        	        	xtype:'DetailInfoPanel',
        	        	y:0,
        	        	width:600
        			},
        			{
        				xtype:'TabInfoPanel',
        				id:'CreateTabInfoPanel',
        				width:600,
        				y:200
        			},
        			{
        				xtype: 'button',
    	                id:'commitButton',
    	                x: 100,
    	                y: 450,
    	                text: '立即创建'
        			},
        			{
        				xtype: 'button',
    	                id:'CancleButton',
    	                x: 300,
    	                y: 450,
    	                text: '关闭窗口'
        			}
        	]
        });
        me.callParent(arguments);
    },
     GetClickDate:function(target){
    	//console.log(target.get("JobID")+" "+target.get("JobName")+" "+target.get("JobGuarantee")+" "+target.get("InputPath")+" "+target.get("RunCmd"));
    	
    }

});