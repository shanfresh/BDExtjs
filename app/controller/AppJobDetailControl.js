/**
 * 
 */

Ext.define('MyApp.controller.AppJobDetailControl', {
	extend:'Ext.app.Controller',
    views: [
            'AppInfoPanel','JobInfoPanel'
        ],
    init:function(){
    	this.control({
        	'AppInfoPanel gridpanel toolbar button[text=添加配置]':{
        		click:this.OnClickButton
        	},
        	'JobInfoPanel gridpanel toolbar button[text=添加配置]':{
        		click:this.OnClickButton
        	},
        	
    	});
	
    },//end init:function
    OnClickButton:function(obj){
		var gridpanel=obj.up().up();
		var store=gridpanel.store;
        var r = Ext.create('MyApp.model.AppInfoModel', {
        	Name:'----New----',
        	Type:'STR',
        	Value:'请-输-入'
        });
        store.insert(0, r);        
	}
});