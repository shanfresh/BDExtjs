Ext.define('MyApp.controller.AdminControl', {
	extend:'Ext.app.Controller',
	views:['MyApp.view.AdminPanel','MyApp.view.AppopDetailWindow','MyApp.view.AdminRollWindow'],
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
       		},

       		'tabpanel > panel > gridpanel':{
       	        itemdblclick: function(dataview, record, item, index, e) {
       	            this.ShowDetail();
       	        }
       		}

       		'splitbutton[text=管理员回滚] > menu > menuitem[text=回滚]':{
       			//alert("点击详细信息了");
       			click:this.RollBackSelected
       		},
       		'AdminRollWindow > button[text=区间筛选]':{
       			click:this.ClickFilterButton
       		},
       		'AdminRollWindow > gridpanel':{
       			selectionchange:this.OnChaneSelect
       		},
       		'AdminRollWindow > button[text=回滚]':{
       			click:this.ConfirmRollback
       		},

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
    	var oldCreatewindow=Ext.getCmp('AppopDetailWindow');
    	if(oldCreatewindow!=null){
    		oldCreatewindow.close();
    	}
    	var createWindow=Ext.widget('AppopDetailWindow');
    	createWindow.show();
    	createWindow.mask("Loading");
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
    	createWindow.unmask();
    	
    	
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
    	
    },
    RollBackSelected:function (){
    	var TabbedPanel=Ext.ComponentQuery.query('MyAdminPanel > tabpanel')[0];
    	var allpanel=TabbedPanel.getActiveTab().down('gridpanel');
    	var sm=allpanel.getSelectionModel();
    	var selected=sm.getSelection();
//    	if(selected.length!=1){
//    		alert("尚未选择或者选择数目大于1");
//    	}
    	var rollwindow=Ext.widget('AdminRollWindow');
    	rollwindow.title=rollwindow.title+"--"+selected[0].get('JobName');
    	var jobappname=selected[0].get('JobName');
    	var split=jobappname.split(".")
    	rollwindow.setValue(split[0],split[1]);
    	rollwindow.appjobname=jobappname;
    	rollwindow.show();
    	var jobname=selected[0].get('JobName');
    	var operation = new Ext.data.Operation({
    	    action: 'read',
    	    page:jobname
    	});
    	var store=rollwindow.down('gridpanel').store;
    	store.read(operation);
    	
    	
    	
    },
    ClickFilterButton:function(){
    	var rollwindow=Ext.getCmp('adminrollwindow');
    	var starttime=rollwindow.down('datefield[fieldLabel=开始时间]').getValue().getTime( )/1000;    	
    	var endtime=rollwindow.down('datefield[fieldLabel=结束时间]').getValue().getTime( )/1000+86400;
    	var operation = new Ext.data.Operation({
    	    action: 'read',
    	    page:rollwindow.appjobname,
    	    params:{starttime:starttime,endtime:endtime}
    	});
    	var store=rollwindow.down('gridpanel').store;
    	store.removeAll(true);
    	store.read(operation);
    },
    OnChaneSelect:function(current,target,selected){
    	if(target[0]!=null){
    		var changeID=target[0].get('ID');
        	var rollwindow=Ext.getCmp('adminrollwindow');
        	rollwindow.down('textfield[name=RollBackTo]').setValue(changeID);
    	}
    	
    },
    ConfirmRollback:function(){
    	var rollwindow=Ext.getCmp('adminrollwindow');
    	var targetID=rollwindow.down('textfield[name=RollBackTo]').getValue();
    	if(isNaN(targetID)){
    		Ext.Msg.alert("错误","要回滚的目标ID不正确");
    		return;
    	}
    	Ext.Ajax.request({
            method:'POST',
            url:'RollBackControl/doRollBack',
            success:function(response,opts){
            	 var result = Ext.decode(response.responseText);
            	 if(result.success){
            		 Ext.Msg.alert('回滚成功',result.msg)
            	 }else{
                     Ext.Msg.show({
                         title : '错误',
                         msg : result.msg,
                         buttons : Ext.Msg.OK,
                         icon : Ext.Msg.ERROR
                     });
            	 }
            	
            },
            failure:function(){
                Ext.Msg.alert('回滚错误');
            },
            params:{ID:Ext.encode(targetID),JobName:Ext.encode(rollwindow.appjobname)}
        });
    }
    
    

});
