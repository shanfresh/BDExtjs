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
           'MyApp.view.TabInfoPanel',
           'MyApp.view.UserModifyWindow'],
    requires: [
               'MyApp.model.AppInfoModel'
           ],
    init:function(){
    	console.log("Start MyController");
    	this.control({
    		'MyWindow > toolbar >button[text=更新]':{
    			click:this.TryInitMyWindow
    		},
    		'MyWindow > toolbar > splitbutton > menu > menuitem[text=创建(模板)]':{
    			click:this.CreateBySelectItem
    		},
    		'MyWindow > toolbar > splitbutton > menu > menuitem[text=单一修改]':{
    			click:this.ModifySelectItem
    		}
    	    
    	});
    	//Ext.getCmp('updatebutton').click();
    },
    TryInitMyWindow:function (button){
		console.log("准备拉取数据到Store");
		Ext.getCmp('AllJobPanel').store.load();
		Ext.getCmp('MyJobPanel').store.load();
	},
    
    CreateBySelectItem:function(button){
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
    },
    ModifySelectItem:function(){
    	console.log("根据勾选的行来修改");
    	var sm=Ext.getCmp('MyJobPanel').getSelectionModel();
    	var selected=sm.getSelection();
    	if(selected.length>1){
    		alert("禁止多选");
    		sm.deselectAll();
    		return;
    	}else if(selected.length==0){
    		alert("尚未勾选模块")
    		return;
    	}
    	var modifyWindow=Ext.widget('UserModifyWindow');
    	modifyWindow.show();
    	var selectedtarget=selected[0];
    	loadDetailToModifyWindow(selectedtarget,modifyWindow);
    	
    }
	
});
function getDetail(target){
	//alert(target.get("JobID")+" "+target.get("JobName")+" "+target.get("JobGuarantee")+" "+target.get("InputPath")+" "+target.get("RunCmd"));
	var createWindow=Ext.widget('CreateWindow');
	createWindow.show();
	createWindow.mask("正在读取ZK数据......");
	var split=target.get('JobName').split(".");
	console.log("Get:"+split[0]+"-"+split[1]);
	
	var operation = new Ext.data.Operation({
	    action: 'read',
	    page:split[0]
	});
	var operation2 = new Ext.data.Operation({
	    action: 'read',
	    params:{appname:split[0],jobname:split[1]}
	});
	createWindow.down('AppInfoPanel').down('gridpanel').store.read(operation);
	createWindow.down('JobInfoPanel').down('gridpanel').store.read(operation2);
	createWindow.down('DetailInfoPanel').getForm().loadRecord(target);
	createWindow.unmask();
};
function loadDetailToModifyWindow(selected,target){
	console.log("Prepare To LoadData To ModifyWindow");
	var detail=target.down('DetailInfoPanel');
	var t=detail.down('textfield[name=JobID]');
	setvalue(detail,'JobID',selected.get('JobID'));
	setvalue(detail,'JobName',selected.get('JobName'));
	setvalue(detail,'InputPath',selected.get('InputPath'));
	setvalue(detail,'RunCmd',selected.get('RunCmd'));
	var control=this;
	Ext.get("content").mask("数据重新加载中，请稍等");   
	Ext.Ajax.request({
        method:'POST',
        url:'AppopControl/loadById',
        success:function(response,obj){//这里值的是请求失败，与业务逻没的任何关系
        	var obj = Ext.decode(response.responseText);
            control.addResult(obj,target);
            Ext.get("content").unmask();
        },
        failure:function(){
        	Ext.get("content").unmask();
            Ext.Msg.alert('错误',"与后台联系时出错")
        },
        params:{ID:Ext.encode(selected.get('AppopID'))}
    });
	
	
};
function setvalue(detail,name,value){
	var t=detail.down('textfield[name='+name+']');
	t.setValue(value);
};
/*
 * 创建时刻加载信息
 */
function addResult(obj,window){
	Ext.get("content").mask("正在载入数据");
	window.down('TabInfoPanel').down("AppInfoPanel").down('gridpanel').store.loadData(obj.AppInfo, false); 
	window.down('TabInfoPanel').down("JobInfoPanel").down('gridpanel').store.loadData(obj.JobInfo, false); 
	Ext.get("content").unmask();
	
};
