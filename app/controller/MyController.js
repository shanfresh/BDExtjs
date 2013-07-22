/*
 * File: app/controller/MyController.js
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

Ext.define('MyApp.controller.MyController', {
    extend:'Ext.app.Controller',
    views:['MyApp.view.MyWindow',
           'MyApp.view.DetailInfoPanel',
           'MyApp.view.CreateWindow',
           'MyApp.view.AppInfoPanel',
           'MyApp.view.JobInfoPanel',
           'MyApp.view.TabInfoPanel'],
    requires: [
               'MyApp.model.AppInfoModel'
           ],
    init:function(){
    	console.log("Start MyController");
    	this.control({
    		'MyWindow > button[text=更新]':{
    			click:this.TryInitMyWindow
    		},
    		'MyWindow > splitbutton > menu > menuitem[text=创建(模板)]':{
    			click:this.CreateBySelectItem
    		}
    	    
    	});
    	//Ext.getCmp('updatebutton').click();
    },
    TryInitMyWindow:function (button){
		console.log("准备拉取数据到Store");
		button.up().down('gridpanel').store.load();
	},
    
    CreateBySelectItem:function(button){
    	console.log("根据勾选的行来创建");
    	var sm=Ext.getCmp('AllJobPanel').getSelectionModel();
    	var selected=sm.getSelection();
    	if(selected.length>1){
    		alert("禁止多选");
    		sm.deselectAll();
    		return;
    	}else if(selected.length==0){
    		alert("尚未勾选模块")
    		return;
    	}
    	getDetail(selected[0]);
    }
	
});
function getDetail(target){
	//alert(target.get("JobID")+" "+target.get("JobName")+" "+target.get("JobGuarantee")+" "+target.get("InputPath")+" "+target.get("RunCmd"));
	var createWindow=Ext.widget('CreateWindow');
	createWindow.show();
	createWindow.down('DetailInfoPanel').getForm().loadRecord(target);
	createWindow.down('AppInfoPanel').down('gridpanel').store.load();
	createWindow.down('JobInfoPanel').down('gridpanel').store.load();

	
	console.log("Load gridpanel OK");
	
	
}