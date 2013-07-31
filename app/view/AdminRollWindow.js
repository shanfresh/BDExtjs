Ext.define('MyApp.view.AdminRollWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.AdminRollWindow',
    xtype: 'AdminRollWindow',
    height: 450,
    title: '管理员回滚',
    width: 600,
    layout: {
        type: 'absolute'
    },
    id:'adminrollwindow',
    appjobname:"",
    setValue:function(appname,jobname){
    	var apptextfield=this.down('textfield[name=AppName]');
    	var jobtextfield=this.down('textfield[name=JobName]');
    	apptextfield.setValue(appname);
    	jobtextfield.setValue(jobname);
    	
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
                        width:200,
                        value: new Date('1970-01-01')
                        
                    },
                    {
                        xtype: 'datefield',
                        x: 250,
                        y: 10,
                        width:200,
                        fieldLabel: '结束时间',
                        labelWidth: 80,
                        value: new Date()
                    },
                    {
                        xtype: 'button',
                        x: 500,
                        y: 10,
                        text: '区间筛选'
                    },
                    {
                        xtype: 'textfield',
                        x: 10,
                        y: 250,
                        width:500,
                        fieldLabel: '操作APP',
                        name:'AppName',
                        labelWidth: 80,
                        readOnly:true
                    },
                    {
                        xtype: 'textfield',
                        x: 10,
                        y: 280,
                        fieldLabel: '操作JOB',
                        name:'JobName',
                        labelWidth: 80,
                        width:500,
                        readOnly:true                        	
                    },
                    {
                        xtype: 'textfield',
                        x: 10,
                        y: 310,
                        fieldLabel: '回滚至',
                        name:'RollBackTo',
                        labelWidth: 80,
                        width:200,
                        value:'尚未选择要变更的ID',
                        readOnly:true                        	
                    },
                    {
                        xtype: 'button',
                        x: 200,
                        y: 350,
                        text: '回滚',
                        textAlign:'center'
                    },
                    {
                        xtype: 'button',
                        x: 300,
                        y: 350,
                        text: '取消',
                        textAlign:'center',
                        handler: function() {
                           this.up().close();
                        }
                    }  
                    
                ]	
        });
        me.callParent(arguments);
    }

	}
);