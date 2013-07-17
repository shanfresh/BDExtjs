Ext.define('MyApp.controller.DeleteControl', {
    extend: 'Ext.app.Controller',
    views: [
        'MyWindow'
    ],
	init:function(){
    	console.log("Start MyController");
    	this.control({
    		'MyWindow > splitbutton > menu > menuitem[text=删除]':{
    			click:this.CreateBySelectItem
    		}
    	    
    	});
    	//Ext.getCmp('updatebutton').click();
    },
    CreateBySelectItem:function(){
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
    	
    }
   
});