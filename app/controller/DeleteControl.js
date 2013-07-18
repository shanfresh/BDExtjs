Ext.define('MyApp.controller.DeleteControl', {
    extend: 'Ext.app.Controller',
    views: [
        'MyWindow'
    ],
	init:function(){
    	console.log("Start MyController");
    	this.control({
    		'MyWindow > splitbutton > menu > menuitem[text=删除]':{
    			click:this.DeleteBySelectItem
    		},
    		'MyWindow > splitbutton > menu > menuitem[text=批量删除]':{
    			click:this.MulityDeleteBySelectItem
    		}
    	    
    	});
    	//Ext.getCmp('updatebutton').click();
    },
    DeleteBySelectItem:function(){
    	var allpanel=Ext.getCmp('AllJobPanel');
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
    	allpanel.store.remove(selected);
    	allpanel.store.sync({
    		success :function(){
	    		alert("删除成功")
	    	},
	    	failure:function(){
	    		alert("删除失败")
	    	}
	    })
    	
    },
    MulityDeleteBySelectItem:function(){
    	var allpanel=Ext.getCmp('AllJobPanel');
    	var sm=Ext.getCmp('AllJobPanel').getSelectionModel();
    	var selected=sm.getSelection();
    	if(selected.length==0){
    		alert("尚未勾选模板，返回操作")
    		return;
    	}
    	allpanel.store.remove(selected);
    	allpanel.store.sync({
    		success :function(){
	    		alert("删除成功")
	    	},
	    	failure:function(){
	    		alert("删除失败")
	    	}
	    })
    }
    
   
});