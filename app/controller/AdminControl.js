Ext.define('MyApp.controller.AdminControl', {
	extend:'Ext.app.Controller',
	views:['MyApp.view.AdminPanel','MyApp.view.AppopDetailWindow'
	       ],
    requires:[
               'MyApp.model.AppInfoModel'
           ],
    init:function(){
    	console.log("Start AdminControl");
    	this.control({
       		'splitbutton[text=查看] > menu > menuitem[text=详细信息]':{
       			//alert("点击详细信息了");
       			click:this.ShowDetail
       		}
       	    
       	});
       	
    },
    ShowDetail:function(){
    	//Adminappop 是相关的GridPanel
    	var allpanel=Ext.getCmp('AdminAppop');
    	var sm=Ext.getCmp('AdminAppop').getSelectionModel();
    	var selected=sm.getSelection();
    	if(selected.length!=1){
    		alert("尚未选择或者选择数目大于1");
    	}
    	var createWindow=Ext.widget('AppopDetailWindow');
    	createWindow.show();
    	var target=selected[0];
    	var JobName=target.get("JobName");
    	var ID=target.get("ID");
    	var control=this;
    	Ext.Ajax.request({
            method:'POST',
            url:'AppopControl/loadById',
            success:function(response,obj){//这里值的是请求失败，与业务逻没的任何关系
                var obj = Ext.decode(response.responseText);
                control.AddResult(obj,createWindow);
                //Ext.Msg.alert("返回结果:",obj['JobName']);
            },
            failure:function(){
                Ext.Msg.alert('错误',"与后台联系时出错")
            },
            params:{ID:Ext.encode(ID),jobname:Ext.encode(JobName)}
        });
    	
    	
    },
    AddResult:function(obj,createWindow){
    	createWindow.down("#JobName").setValue(obj.JobName);
    	createWindow.down("textfield[fieldLabel='申请人']").setValue(obj.UserName);
    	createWindow.down("textfield[fieldLabel='状态']").setValue(obj.Status);
    	createWindow.down("textfield[fieldLabel='申请时间']").setValue(obj.SubmitTime);
    	
    	createWindow.down("#AppInfoDetailPanel").store.loadData(obj.AppInfo, false); 
    	createWindow.down("#JobInfoDetailPanel").store.loadData(obj.JobInfo, false); 
    	
    }

});
