/**
 * 
 */
Ext.define('MyApp.view.TabInfoPanel', {
    extend: 'Ext.tab.Panel',
    xtype:'TabInfoPanel',
    alias : 'widget.TabInfoPanel',
    height: 250,
    width: 600,
    activeTab: 0,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'AppInfoPanel',
                    title: 'App信息'
                },
                {
                    xtype: 'JobInfoPanel',
                    title: 'Job信息'
                }
            ]
        });

        me.callParent(arguments);
    }

});