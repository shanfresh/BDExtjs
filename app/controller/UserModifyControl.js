Ext.define('MyApp.controller.UserModifyControl',{
	extend:'Ext.app.Controller',
    views: [
            'UserModifyWindow','DetailInfoPanel','TabInfoPanel','AppInfoPanel','AppInfoPanel'
        ],
    requires: [
               'MyApp.model.AppInfoModel'
           ],
    init:function(){
    	console.log("Start MyController");
    	this.control({
    		'UserModifyWindow > button[text=关闭窗口]':{
    			click:this.OnClickCloseButton
    		},
    		'UserModifyWindow DetailInfoPanel  textfield[name=InputPath]': {
    			change:this.OnChangeCmdOrPath
            },
    		'UserModifyWindow DetailInfoPanel  textfield[name=RunCmd]': {
    			change:this.OnChangeCmdOrPath
            },
    		'UserModifyWindow > button[text=立即修改]':{
    			click:this.OnClickUpdateNow
    		},
    	    
    	});
    	
    	
    },
    OnClickCloseButton:function(button){
		button.up().close();
	},
    OnChangeCmdOrPath:function(obj,newvalue,oldvalue,eopts){
    	var gridpanel = Ext.ComponentQuery.query('UserModifyWindow TabInfoPanel JobInfoPanel gridpanel')[0];
    	gridpanel.up().up().setActiveTab(1);
    	var textfieldName=obj.getName();
    	var storeIndexName;
    	if(textfieldName=="InputPath"){
    		storeIndexName="input_dir";
    	}else if(textfieldName=="RunCmd"){
    		storeIndexName="cmd";
    	}
    	
      	var store = gridpanel.store;
      	var index=store.find("Name",storeIndexName);
      	if(index==-1)
      		return;
      	var target=store.getAt(index);
      	target.set("Value",newvalue);
      
    },
    OnClickUpdateNow:function(){
    	this.ModifyAbatractJobInfo();
    },
    ModifyAbatractJobInfo:function(){
    	console.log("Modify AbatractJobInfo Update");
    	var Control=this;
    	var DetailInfoPanel = Ext.ComponentQuery.query('UserModifyWindow DetailInfoPanel')[0];
    	var form = DetailInfoPanel.getForm();
    	form.url='AbstractJobInfoControl/ModifyByID';
        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                	Ext.Msg.alert('Success', action.result.msg);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                }
            });
        }
    }


});