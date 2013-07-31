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
							    text: 'ID'
							},
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'JobName',
                                text: 'JobName'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'CreateTime',
                                text: '创建时间'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'EffectTime',
                                text: '生效时间'
                            }
                           
                        ]

                    }
                ]	
        });
        me.callParent(arguments);
    }

	}
);