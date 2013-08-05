/**
 * 
 */

Ext.define('MyApp.view.JobInfoPanel', {
    extend: 'Ext.panel.Panel',
	alias : 'widget.JobInfoPanel',
	xtype: 'JobInfoPanel',
    height: 384,
    title: 'JobPanel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    title: 'JobInfo',
                    height: 181,
                    title: 'Job Panel',
                    store:'JobInfoStore',
                    header : false,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Name',
                            text: 'Name',
                            flex:1,
                            editor: 'textfield'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Type',
                            text: 'Type',
                            flex:1,
                            editor: {
                                xtype: 'combobox',
                                typeAhead: true,
                                triggerAction: 'all',
                                selectOnTab: true,
                                store: [
                                    ['NUM','NUM'],
                                    ['STR','STR']
                                ],
                                lazyRender: true,
                                listClass: 'x-combo-list-small'
                            },
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Value',
                            text: 'Value',
                            flex:3,
                            editor: 'textfield'
                        }
                    ],
                    plugins: [
                              Ext.create('Ext.grid.plugin.CellEditing', {
                                  clicksToEdit: 1
                              })
                    ],
                    tbar: [{
                    	text: '添加配置',
                    	icon:'images/add.gif'
                    }],
                    selType: 'cellmodel'
                }
            ]
        });

        me.callParent(arguments);
    }

});