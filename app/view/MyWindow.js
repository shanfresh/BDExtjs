Ext.define('MyApp.view.MyWindow', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.MyWindow',
    autoShow: true,
    height: 500,
    layout: {
        type: 'absolute'
    },
    title: '用户系统',
    maximizable: true,
    MyRender:function(value){
    	if(value=="1"){
    		return "用户新创建";
    	}else if(value==2){
    		return "用户修改";
    	}else if(value==3){
    		return "通过审核";
    	}else if(value==4){
    		return "用户删除";
    	}else if(value==5){
    		return "已经上线";
    	}else if(value==6){
    		return "审核失败,作废";
    	}else if(value==7){
    		return "审核失败,重新修改";
    	}else if(value==8){
    		return "停止运行";
    	}        
    },
    initComponent:function(){
    	var me=this;
    	Ext.applyIf(me,{
	        items:[
	               {
	                   xtype: 'tabpanel',
	                   x: 0,
	                   y: 10,
	                   height: 500,
	                   activeTab:1,
	                   items:[
    		   				{
    		   				    xtype: 'gridpanel',
    		   				    id:'AllJobPanel',
    		   				    y: 10,
    		   				    height: 400,
    		   				    title: '目前线上JOB表',
    		   				    store: 'JobStore',
    		   				    columns: [
    		   				        {
    		   				            xtype: 'numbercolumn',
    		   				            dataIndex: 'JobID',
    		   				            text: 'JobID',
    		   				            width:40,
    		   				            format: '0000'
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            dataIndex: 'JobName',
    		   				            text: 'JobName',
    		   				            width:300
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            width: 200,
    		   				            dataIndex: 'InputPath',
    		   				            text: 'InputPath',
    		   				            flex: 5
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            dataIndex: 'RunCmd',
    		   				            text: 'RunCmd',
    		   				            flex: 5
    		   				        }
    		   				    ],
    		   					    selModel: Ext.create('Ext.selection.CheckboxModel', {
    		   					
    		   					    })
    		   				},
    		   				{
    		   				    xtype: 'gridpanel',
    		   				    id:'MyJobPanel',
    		   				    y: 10,
    		   				    height: 400,
    		   				    title: '我的Job列表',
    		   				    store: 'user.MyJobStore',
    		   				    columns: [
    		   				        {
    		   				            xtype: 'numbercolumn',
    		   				            dataIndex: 'JobID',
    		   				            text: 'JobID',
    		   				            width:40,
    		   				            format: '0000'
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            dataIndex: 'JobName',
    		   				            text: 'JobName',
    		   				            width:300
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            width: 30,
    		   				            dataIndex: 'UserName',
    		   				            text: '所属用户',
    		   				            flex: 1
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            width: 30,
    		   				            dataIndex: 'Status',
    		   				            text: '当前状态',
    		   				            renderer:this.MyRender,
    		   				            flex: 1
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            width: 200,
    		   				            dataIndex: 'InputPath',
    		   				            text: 'InputPath',
    		   				            flex: 3
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            dataIndex: 'RunCmd',
    		   				            text: 'RunCmd',
    		   				            flex: 3
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            dataIndex: 'SubmitTime',
    		   				            text: '提交时间',
    		   				            flex: 1
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            dataIndex: 'ApprovalTime',
    		   				            text: '通过时间',
    		   				            flex: 1
    		   				        },
    		   				        {
    		   				            xtype: 'gridcolumn',
    		   				            dataIndex: 'EffectTime',
    		   				            text: '上线时间',
    		   				            flex: 1
    		   				        }
    		   				        
    		   				    ],
    		   					    selModel: Ext.create('Ext.selection.CheckboxModel', {
    		   					
    		   					    })
    		   					
    		   				}
    		   			]
	                   
	   				
	               }            
	        ],
    		dockedItems: [
    		    {
		       	   xtype: 'toolbar',
		       	   x: 180,
		           y: 55,
		           dock: 'top',
		           height: 40,
		           items: [
		               {
   					    xtype: 'splitbutton',
   					    x: 10,
   					    y: 10,
   					    text:'创建',
   					    width: 60,
   					    showText: true,
   					    menu: {
	   					        xtype: 'menu',
	   					        width: 160,
	   					        items: [
    		   					            {
    		   					                xtype: 'menuitem',
    		   					                text: '创建(模板)'
    		   					         
    		   					            },
    		   					            {
    		   					                xtype: 'menuitem',
    		   					                text: '创建(默认值)'
    		   					            }
    		   					        ]
		   					    }
	   					},
	   					{
		   					    xtype: 'splitbutton',
		   					    text:'修改',
		   					    width: 80,
		   					    showText: true,
		   					    menu: {
		   					        xtype: 'menu',
		   					        width: 160,
		   					        items: [
		   					            {
		   					                xtype: 'menuitem',
		   					                text: '单一修改'
		   					            },
		   					            {
		   					                xtype: 'menuitem',
		   					                text: '批量修改'
		   					            }
		   					        ]
		   					    }
	   					},
	   					{
		   					    xtype: 'splitbutton',
		   					    text:'删除',
		   					    width: 80,
		   					    showText: true,
		   					    menu: {
    		   					        xtype: 'menu',
    		   					        width: 160,
    		   					        items: [
    		   					            {
    		   					                xtype: 'menuitem',
    		   					                text: '删除'
    		   					            },
    		   					            {
    		   					                xtype: 'menuitem',
    		   					                text: '批量删除'
    		   					            },
    		   					            {
    		   					                xtype: 'menuitem',
    		   					                text: 'Menu Item'
    		   					            }
    		   					        ]
		   					    }
	   					},
	   					{
	   						xtype:'searchfield',
	   					    width:200,
	   					    fieldLabel:'Search',
	   					    labelWidth:40,
	   					    paramName:'JobName'
	   					},
	   					{
	   					    xtype: 'button',
	   					    id:'updatebutton',
	   					    width: 60,
	   					    text: '更新'
	   					}

   				  ]
    		    }
	        ]
	       
    	}//end applyIF
    	
    	
    	);
    	me.callParent(arguments);
    }
}
)
