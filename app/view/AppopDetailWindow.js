/*
 * File: app/view/AppopDetailWindow.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.AppopDetailWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.AppopDetailWindow',
    xtype: 'AppopDetailWindow',
    height: 484,
    width: 613,
    layout: {
        type: 'absolute'
    },
    title: '查看详细信息',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    x: -3,
                    y: 160,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: 'AppInfo',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 209,
                                    
                                    title: 'AppInfoPanel',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'Name',
                                            text: 'Name'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'Type',
                                            text: 'Type'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'Value',
                                            text: 'Value'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'JobInfo',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 204,
                                    title: 'JobInfoPanel',
                                    
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'Name'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'Type'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'Value'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    x: 10,
                    y: 10,
                    width: 220,
                    fieldLabel: 'JobName',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    x: 10,
                    y: 40,
                    width: 220,
                    fieldLabel: '申请人',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    x: 10,
                    y: 70,
                    width: 220,
                    fieldLabel: '操作号',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    x: 10,
                    y: 100,
                    width: 220,
                    fieldLabel: '状态',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    x: 10,
                    y: 130,
                    width: 220,
                    fieldLabel: '申请时间',
                    labelWidth: 80
                },
                {
                    xtype: 'button',
                    x: 250,
                    y: 400,
                    height: 50,
                    width: 100,
                    text: '关闭'
                }
            ]
        });

        me.callParent(arguments);
    }
    

});