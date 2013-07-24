
Ext.define('MyApp.model.user.MyJobModel', {
    extend: 'Ext.data.Model',

    fields: [

         {
             name: 'JobID'
         },
         {
             name: 'AppopID'
         },
         {
             name: 'JobName'
         },
         {
             name: 'UserName'
         },
         {
             name: 'Status'//当前状态
         },
         {
             name: 'RunCmd'
         },
         {
             name: 'InputPath'
         },
         {
             name: 'SubmitTime'
         },
         {
             name: 'ApprovalTime'
         },
         {
             name: 'EffectTime'
         }
    ]
});