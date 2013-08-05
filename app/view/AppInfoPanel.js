/*
 * File: app/view/MyPanel.js
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

Ext.define('MyApp.view.AppInfoPanel', {
    extend: 'Ext.panel.Panel',
    xtype:'AppInfoPanel',
    height: 345,
    title: 'APP_INFO',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    height: 181,
                    title: 'App信息',
                    store:'AppInfoStore',
                    header : false,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Name',
                            flex: 2,
                            text: 'Name',
                            editor: 'textfield'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Type',
                            text: 'Type',
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
                            flex: 1   	
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Value',
                            text: 'Value',
                            flex: 3,
                            editor: 'textfield'
                        }
                        
                    ],
                    plugins: [
                              Ext.create('Ext.grid.plugin.CellEditing', {
                                  clicksToEdit: 1
                              })
                    ],
                    tbar: [
                    	{ 	xtype: 'button', 
                    		text: '添加配置',
                    		icon:'images/add.gif'
                    	}
                    ],
                    selType: 'cellmodel'
                }
            ]
        });

        me.callParent(arguments);
    }

});