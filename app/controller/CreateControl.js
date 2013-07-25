/*
 * File: app/controller/CreateControl.js
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

Ext.define('MyApp.controller.CreateControl', {
    extend: 'Ext.app.Controller',
    views: [
        'CreateWindow','TabInfoPanel','AppInfoPanel','DetailInfoPanel','JobInfoPanel'
    ],
    init:function(){
    	this.control({
    		'CreateWindow > button[text=立即创建]':{
    			click:this.OnClickButton
    		},
    		'CreateWindow > button[text=关闭窗口]':{
    			click:this.OnClickCloseButton
    		},
    		'CreateWindow DetailInfoPanel  textareafield[name=InputPath]': {
    			change:this.OnChangeCmdOrPath
            },
    		'CreateWindow DetailInfoPanel  textareafield[name=RunCmd]': {
    			change:this.OnChangeCmdOrPath
            }
    	    
    	});
    	//Ext.getCmp('updatebutton').click();
    },
    OnClickButton:function(button){
    	console.log("准备创建新的JOB");
    	var RunCmdTextfield=Ext.ComponentQuery.query('CreateWindow DetailInfoPanel  textareafield[name=RunCmd]')[0];
    	RunCmdTextfield.fireEvent('change', RunCmdTextfield,RunCmdTextfield.getValue());
      	var InputPathTextfield=Ext.ComponentQuery.query('CreateWindow DetailInfoPanel  textareafield[name=InputPath]')[0];
      	InputPathTextfield.fireEvent('change', InputPathTextfield,InputPathTextfield.getValue());
      	
    	var Control=this;
    	var form = button.up().down('form').getForm();
    	form.url='CreateJob/CreateNewJob';
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                   Control.CommitAppInfo(action);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                }
            });
        }
    },
    CommitAppInfo:function(action){
    	Ext.Msg.alert('创建Basic JobInfo 成功', action.result.msg+action.result.newRecordID);
    	console.log("创建AppInfo");
    	var button=Ext.ComponentQuery.query('CreateWindow > button[text=立即创建]')[0];
      	var countRows  = button.up().down('AppInfoPanel').down('gridpanel').store.getCount();
    	var csvData    = new Array();
    	var dataSource = button.up().down('AppInfoPanel').down('gridpanel').store;
    	var result=dataSource.getRange();
    	var appinfo=new Array();
    	
    	for(var i=0;i<result.length;i++){
    		appinfo.push(result[i].data);
    	}
    	var jobsource=button.up().down('JobInfoPanel').down('gridpanel').store;
    	var jobrange=jobsource.getRange();
    	var jobinfo=new Array();
    	for(var i=0;i<jobrange.length;i++){
    		jobinfo.push(jobrange[i].data);
    	}
    	 Ext.Ajax.request({
             method:'POST',
             url:'CreateJob/CreateApp',
             success:function(response){//这里值的是请求失败，与业务逻没的任何关系
                 Ext.Msg.alert('信息',"发送CreateDetailAPP信息成功");
             },
             failure:function(){
                 Ext.Msg.alert('错误',"与后台联系时出错")
             },
             params:{appinfo:Ext.encode(appinfo),jobinfo:Ext.encode(jobinfo),newID:action.result.newRecordID}
         });
    	
    	
    },
    CommitJobInfo:function(action){
    	console.log("创建JobInfo");
    },
    OnClickCloseButton:function(button){
    	button.up().close();
    },
    OnChangeInputPath:function(obj,newvalue,oldvalue,eopts){
    	this.setActiveAppInfoPanel();
    	var button = Ext.ComponentQuery.query('CreateWindow > button[text=立即创建]')[0];
      	var store = button.up().down('JobInfoPanel').down('gridpanel').store;
      	var index=store.find("Name","input_dir");
      	if(index==-1)
      		return;
      	var target=store.getAt(index);
      	target.set("Value",newvalue);
      	
    },
    OnChangeRunCmd:function(obj,newvalue,oldvalue,eopts){
    	this.setActiveAppInfoPanel();
    	var button = Ext.ComponentQuery.query('CreateWindow > button[text=立即创建]')[0];
      	var store = button.up().down('JobInfoPanel').down('gridpanel').store;
      	var index=store.find("Name","cmd");
      	if(index==-1)
      		return;
      	var target=store.getAt(index);
      	target.set("Value",newvalue);
      	
    },
    setActiveAppInfoPanel:function(){
    	console.log("StartActiveAppPanel");
    	var TabInfoPanel = Ext.ComponentQuery.query('CreateWindow > TabInfoPanel')[0];
    	TabInfoPanel.setActiveTab(1);
    },
    OnChangeCmdOrPath:function(obj,newvalue,oldvalue,eopts){
    	console.log("Fire Change "+obj.getName()+" "+oldvalue+"->"+newvalue);
    	this.setActiveAppInfoPanel();
    	var textfieldName=obj.getName();
    	var storeIndexName;
    	if(textfieldName=="InputPath"){
    		storeIndexName="input_dir";
    	}else if(textfieldName=="RunCmd"){
    		storeIndexName="cmd";
    	}
    	var button = Ext.ComponentQuery.query('CreateWindow > button[text=立即创建]')[0];
      	var store = button.up().down('JobInfoPanel').down('gridpanel').store;
      	var index=store.find("Name",storeIndexName);
      	if(index==-1)
      		return;
      	var target=store.getAt(index);
      	target.set("Value",newvalue);
      
    }
});
