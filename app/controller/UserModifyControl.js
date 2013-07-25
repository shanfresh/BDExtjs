Ext.define('MyApp.controller.UserModifyControl',{
	extend:'Ext.app.Controller',
    views: [
            'UserModifyWindow','DetailInfoPanel','TabInfoPanel','AppInfoPanel','AppInfoPanel'
        ],
    requires: [
               'MyApp.model.AppInfoModel'
           ],
    init:function(){
    	console.log("Start UserModifyControl");
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
    	var value=form.getValues();
    	var AppInfoPanel = Ext.ComponentQuery.query('UserModifyWindow TabInfoPanel AppInfoPanel')[0];
    	var JobInfoPanel = Ext.ComponentQuery.query('UserModifyWindow TabInfoPanel JobInfoPanel')[0];
    	var apparray=getResult(AppInfoPanel);
    	var jobarray=getResult(JobInfoPanel);
    	Ext.Ajax.request({
            method:'POST',
            url:'AppopControl/UserModifyByJobName',
            success:function(response,obj){//这里值的是请求失败，与业务逻没的任何关系
                var obj = Ext.decode(response.responseText);
                Ext.Msg.alert('成功','修改成功，等待管理员批复');
            	var window=Ext.ComponentQuery.query('UserModifyWindow')[0];
            	window.close();
            },
            failure:function(){
                Ext.Msg.alert('错误',"与后台联系时出错")
            },
            params:{JobName:Ext.encode(value.JobName),AppInfo:Ext.encode(apparray),JobInfo:Ext.encode(jobarray)}
        });

    }
});
function getResult(panel){
	var grid=panel.down('gridpanel');
	var result=grid.store.getRange();
	var appinfo=new Array();	
	for(var i=0;i<result.length;i++){
		appinfo.push(result[i].data);
	}
	return appinfo;
}