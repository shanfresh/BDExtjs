Ext.define('MyApp.view.UserModifyWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.UserModifyWindow',
    autoShow: true,
    height: 600,
    width: 600,
    maximizable: true,
    layout: {
        type: 'absolute'
    },
    title: '用户修改页面',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
        	items: [
        	        {
        	        	xtype:'DetailInfoPanel',
        	        	y:0,
        	        	width:600
        			},
        			{
        				xtype:'TabInfoPanel',
        				width:600,
        				y:200
        			},
        			{
        				xtype: 'button',
    	                id:'commitButton',
    	                x: 100,
    	                y: 450,
    	                text: '立即修改'
        			},
        			{
        				xtype: 'button',
    	                id:'CancleButton',
    	                x: 300,
    	                y: 450,
    	                text: '关闭窗口'
        			}
        	]
        });
        me.callParent(arguments);
    },
     GetClickDate:function(target){
    	//console.log(target.get("JobID")+" "+target.get("JobName")+" "+target.get("JobGuarantee")+" "+target.get("InputPath")+" "+target.get("RunCmd"));
    	
    }

});