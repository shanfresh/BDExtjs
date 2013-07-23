/**
 * 
 */

Ext.define('MyApp.view.DetailInfoPanel', {
	extend:'Ext.form.Panel',
	alias : 'widget.DetailInfoPanel',
	xtype:'DetailInfoPanel',
    title: '数据库信息',
    bodyPadding: 5,
    width: 350,

    // The form will submit an AJAX request to this URL when submitted
    url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
    	xtype: 'fieldset',
        title: 'Job基本信息',
        items: [
                {
                    xtype: 'textfield',
                    width: 100,
                    fieldLabel: '原始ID',
                    labelWidth: 50,
                    name: 'JobID',
                    readOnly:true
                },
                {
                    xtype: 'textfield',
                    width: 400,
                    fieldLabel: '名称',
                    labelWidth: 50,
                    name: 'JobName'
                },
                {
                    xtype: 'textfield',
                    width: 90,
                    fieldLabel: '状态',
                    labelWidth: 50,
                    name: 'JobGuarantee'
                },
                {
                    xtype: 'textareafield',
                    height: 30,
                    width: 400,
                    fieldLabel: 'InputPath',
                    labelWidth: 50,
                    name: 'InputPath',
                    enableKeyEvents:true
                },
                {
                    xtype: 'textareafield',
                    height: 30,
                    width: 400,
                    fieldLabel: 'RunCmd',
                    labelWidth: 50,
                    name: 'RunCmd'
                }
            ]
		}
    ],
    
    // Reset and Submit buttons
    buttons: [{
        text: '载入详细信息',
        handler: function() {
            this.up('form').getForm().reset();
        }
    },{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    },{
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                       Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }
        }
    }],
    renderTo: Ext.getBody()
});