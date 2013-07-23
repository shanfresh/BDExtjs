Ext.define('MyApp.view.MyWindow', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.MyWindow',
    autoShow: true,
    height: 500,
    width: 858,
    layout: {
        type: 'absolute'
    },
    title: 'CreateWindow',
    maximizable: true,
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
					            },
					            {
					                xtype: 'menuitem',
					                text: 'Menu Item'
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
					            },
					            {
					                xtype: 'menuitem',
					                text: 'Menu Item'
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
					    xtype: 'textfield',
					    x: 800,
					    y: 10,
					    fieldLabel: ''
					},
					{
					    xtype: 'button',
					    x: 490,
					    y: 10,
					    text: '搜索'
					},
					{
					    xtype: 'button',
					    id:'updatebutton',
					    width: 60,
					    text: '更新'
					}

               ]
               
           }
    ],
    items: [
            {
                xtype: 'gridpanel',
                id:'AllJobPanel',
                y: 10,
                height: 400,
                title: '默认列表',
                store: 'JobStore',
                columns: [
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'JobID',
                        text: 'JobID',
                        flex: 1,
                        format: '0000'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'JobName',
                        text: 'JobName',
                        flex: 4
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 30,
                        dataIndex: 'JobGuarantee',
                        text: 'JobGuarantee',
                        flex: 1
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
            }
            
        ],
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            
        });       
        me.callParent(arguments);
    }

});