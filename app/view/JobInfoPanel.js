/**
 * 
 */

Ext.define('MyApp.view.JobInfoPanel', {
    extend: 'Ext.panel.Panel',
	alias : 'widget.JobInfoPanel',
	xtype: 'JobInfoPanel',
    height: 384,
    width: 400,
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
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Name',
                            text: 'Name',
                            flex:1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Type',
                            text: 'Type',
                            flex:1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Value',
                            text: 'Value',
                            flex:3
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});