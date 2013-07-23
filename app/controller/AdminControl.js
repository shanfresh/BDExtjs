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
       		},
       		'splitbutton[text=管理员审核] > menu > menuitem[text=通过]':{
       			//alert("点击详细信息了");
       			click:this.MarkSelectAsPassed
       		},
       		'splitbutton[text=管理员上线] > menu > menuitem[text=单一上线]':{
       			//alert("点击详细信息了");
       			click:this.MarkSelectAsOnline
       		}
       	});
       	
    },
    ShowDetail:function(){
    	//Adminappop 是相关的GridPanel
    	var TabbedPanel=Ext.ComponentQuery.query('MyAdminPanel > tabpanel')[0];
    	var allpanel=TabbedPanel.getActiveTab().down('gridpanel');
    	var sm=allpanel.getSelectionModel();
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
    	
    },
    MarkSelectAsPassed:function(){
    	var allpanel=Ext.getCmp('AdminAppop');
    	var TabbedPanel=Ext.ComponentQuery.query('MyAdminPanel > tabpanel')[0];
    	TabbedPanel.setActiveTab(allpanel.up());
    	var sm=Ext.getCmp('AdminAppop').getSelectionModel();
    	var selected=sm.getSelection();
    	if(selected.length<1){
    		alert("尚未选择要通过的申请");
    		return;
    	}
    	var ids=new Array();
    	for(var i=0;i<selected.length;i++){
    		var target=selected[i];
    		ids[i]=target.get('ID');
    	}
    	Ext.Ajax.request({
            method:'POST',
            url:'AppopControl/MarkAsPassed',
            success:function(response,obj){//这里值的是请求失败，与业务逻没的任何关系
                var obj = Ext.decode(response.responseText);
                Ext.getCmp('AdminAppop').store.remove(selected);
                Ext.getCmp('AdminAppopPassed').store.removeAll();
                Ext.getCmp('AdminAppopPassed').store.load();
                Ext.Msg.alert("返回结果:","操作成功O(∩_∩)O哈哈~");
            },
            failure:function(){
                Ext.Msg.alert('错误',"与后台联系时出错")
            },
            params:{ID:Ext.encode(ids)}
        });
    	
    	
    },
    MarkSelectAsOnline:function(){
    	var allpanel=Ext.getCmp('AdminAppopPassed');
    	var TabbedPanel=Ext.ComponentQuery.query('MyAdminPanel > tabpanel')[0];
    	TabbedPanel.setActiveTab(allpanel.up());
    	var sm=Ext.getCmp('AdminAppopPassed').getSelectionModel();
    	var selected=sm.getSelection();
    	if(selected.length<1){
    		alert("尚未选择需要上线的项目");
    		return;
    	}
    	var ids=new Array();
    	for(var i=0;i<selected.length;i++){
    		var target=selected[i];
    		ids[i]=target.get('ID');
    	}
    	Ext.Ajax.request({
            method:'POST',
            url:'AppopControl/MarkAsOnline',
            success:function(response,obj){//这里值的是请求失败，与业务逻没的任何关系
                var obj = Ext.decode(response.responseText);
                Ext.getCmp('AdminAppopPassed').store.remove(selected);
                Ext.getCmp('AdminAppopOnline').store.removeAll();
                Ext.getCmp('AdminAppopOnline').store.load();
                Ext.Msg.alert("返回结果:","上线成功O(∩_∩)O哈哈~");
            },
            failure:function(){
                Ext.Msg.alert('错误',"与后台联系时出错")
            },
            params:{ID:Ext.encode(ids)}
        });
    	
    }
    
    

});
