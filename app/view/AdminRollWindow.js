Ext.define('MyApp.view.AdminRollWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.AdminRollWindow',
    xtype: 'AdminRollWindow',
    height: 400,
    title: '管理员回滚',
    width: 600,
    layout: {
        type: 'absolute'
    },
    id:'adminrollpanel',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'gridpanel',
                        x: 0,
                        y: 40,
                        height: 206,
                        title: '任务有效状态',
	                    selModel: Ext.create('Ext.selection.RowModel', {
	                    }),
	                    store:'AppopRollbackStore',
                        columns: [
							{
							    xtype: 'gridcolumn',
							    dataIndex: 'ID',
							    text: 'ID',
							    width:30
							},
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'JobName',
                                text: 'JobName',
                                flex:3
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'SubmitTime',
                                text: '提交时间',
                                flex:1
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'EffectTime',
                                text: '生效时间',
                                flex:1
                            }
                           
                        ]

                    },
                      {
                        xtype: 'datefield',
                        x: 10,
                        y: 10,
                        fieldLabel: '开始时间',
                        labelWidth: 80,
                        width:200
                        
                    },
                    {
                        xtype: 'datefield',
                        x: 250,
                        y: 10,
                        width:200,
                        fieldLabel: '结束时间',
                        labelWidth: 80
                    },
                    {
                        xtype: 'button',
                        x: 500,
                        y: 10,
                        text: '区间筛选'
                    }
                    
                ]	
        });
        me.callParent(arguments);
    }

	}
);