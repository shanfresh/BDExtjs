/*
 * File: app/view/AdminPanel.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.AdminPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.AdminPanel',
    xtype: 'MyAdminPanel',
    height: 616,
    //width: 847,
    layout: {
        type: 'absolute'
    },
    title: '管理员窗口',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            text: '查看',
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: '详细信息'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'splitbutton',
                            text: '管理员审核',
                            menu: {
                                xtype: 'menu',
                                width: 120,
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: '通过'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: '作废'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: '批量通过'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'splitbutton',
                            text: '管理员上线',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: '单一上线'
                                    },
                                    {
                                        xtype: 'menuitem',
                                        text: '批量上线'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'splitbutton',
                            text: '管理员回滚',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: '回滚选中至'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'tabpanel',
                    x: 0,
                    y: 10,
                    height: 500,
                    activeTab: 0,
                    items: [
                        {
                        	xtype: 'panel',
                            height: 337,
                            width: 200,
                            title: '等待处理',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id:'AdminAppop',
                                    height: 477,
                                    width: 840,
                                    title: '待处理提交',
                                    store: 'AppopStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ID',
                                            text: 'ID'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'JobName',
                                            width:280,
                                            text: 'JobName'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'UserName',
                                            text: 'UserName'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'Status',
                                            text: 'Status'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'SubmitTime',
                                            text: 'SubmitTime',
                                            flex:3
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ApprovalTime',
                                            text: 'ApprovalTime'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]                            
                        },
                        {
                        	xtype: 'panel',
                            height: 337,
                            width: 200,
                            title: '等待上线',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 477,
                                    width: 840,
                                    id:'AdminAppopPassed',
                                    title: '待上线',
                                    store: 'AppopPassedStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ID',
                                            text: 'ID'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'JobName',
                                            width:280,
                                            text: 'JobName'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'UserName',
                                            text: 'UserName'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'Status',
                                            text: 'Status'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'SubmitTime',
                                            text: 'SubmitTime',
                                            flex:3
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ApprovalTime',
                                            text: 'ApprovalTime'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]
                        },
                        {
                        	xtype: 'panel',
                            height: 337,
                            width: 200,
                            title: '已经上线',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 477,
                                    width: 840,
                                    id:'AdminAppopOnline',
                                    title: '已经上线',
                                    store: 'AppopOnlineStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ID',
                                            text: 'ID'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'JobName',
                                            width:280,
                                            text: 'JobName'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'UserName',
                                            text: 'UserName'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'Status',
                                            text: 'Status'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'SubmitTime',
                                            text: 'SubmitTime',
                                            flex:3
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ApprovalTime',
                                            text: 'ApprovalTime'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});