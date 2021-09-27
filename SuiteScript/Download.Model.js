// @module Account
// ----------
// Handles account creation, login, logout and password reset
// module Account
define('Download.Model', [
    'Transaction.Model',
    'SC.Model',
    'Application',
    'SC.Models.Init',
    'Profile.Model',
    'LiveOrder.Model',
    'Address.Model',
    'CreditCard.Model',
    'SiteSettings.Model',
    'underscore',
    'Utils',
    'Configuration'
], function(
    TransactionModel,
    Utils, 
     _, Configuration,
    SCModel,
    Application,
    ModelsInit,
    Profile,
    LiveOrder,
    Address,
    CreditCard,
    SiteSettings
) {
    // @class Account.Model Defines the model used by the all Account related services.
    // @extends SCModel

    return TransactionModel.extend({

        name:'Download',

        getDownloaddata: function(){

            var resp = [
            {item:1234,description:"hello",amount:120},
            {item:1235,description:"this",amount:130},
            {item:1236,description:"is",amount:140},
            {item:1237,description:"Demo",amount:150},
            {item:1238,description:"dought",amount:160},
            {item:1239,description:"cloud",amount:170},
            {item:1240,description:"alp",amount:180},
            {item:1241,description:"dought",amount:190},
            {item:1242,description:"com",amount:200},
            {item:1243,description:"welcome",amount:210},
            {item:1244,description:"to",amount:220},
            {item:1245,description:"Cloudalp",amount:230}
        ];
             return resp;
         },

    })
    // return SCModel.extend({
    //     name: 'Download',

        
    //     getDownloaddata: function(){

    //         var resp = [{item:1234,description:"hello",amount:120},{item:1235,description:"hello1",amount:150}];
    //          return resp;
    //      },
         

    //     // @method register
    //     // @param {UserData} user_data
    //     // @param {Account.Model.Attributes} user_data
    //     // register: function(user_data) {
			
	// 	// }
           
    // });
});

// @class UserData
// @property {String} email
// @property {String} password
// @property {String} password2
// @property {String} firstname
// @property {String} lastname
// @property {String} company
// @property {String} emailsubscribe T or F
