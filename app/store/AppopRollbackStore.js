Ext.define('MyApp.store.AppopRollbackStore', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.AppopModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.AppopModel',
            storeId: 'AppopRollbackStore',
            proxy: {
                type: 'ajax',
                url : 'AppopControl/loadRollbackList',
                reader: {
                    type: 'json'
                },
        		startParam:null,
        		limitParam:null
            }
        }, cfg)]);
    }
});