/*
 * 用户所上线的列表
 */
Ext.define('MyApp.store.user.MyJobStore', {
    extend: 'Ext.data.Store',
    storeId: 'UserMyJobStore',
    model: 'MyApp.model.user.MyJobModel',
    requires: [
        'MyApp.model.user.MyJobModel'
    ],
    autoLoad:true,
    proxy: {
    	
        type: 'ajax',
        url : 'GetJobInfo/userJob',
        api: {
            destroy : 'DeleteAbsJob/doDelete/delete.json'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            encode: true,
            root:'data'
        }
    },
    
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            
        }, cfg)]);
        
    }
	
});