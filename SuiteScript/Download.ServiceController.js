/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// Download.ServiceController.js
// ----------------
// Service to submit a user request
define('Download.ServiceController', ['ServiceController', 'Download.Model'], function(
    ServiceController,
    DownloadModel
) {
    // @class Download.Us.ServiceController Supports Download process
    // @extend ServiceController
    try{
console.warn('download service controller')

    return ServiceController.extend({
        // @property {String} name Mandatory for all ssp-libraries model
        name: 'Download.ServiceController',

        options: {
            common: {
                requireLogin: true,
                requirePermissions: {
                    list: ['transactions.tranEstimate.1', 'transactions.tranFind.1']
                }
            }
        },

        // @method post The call to Download.Us.Service.ss with http method 'post' is managed by this function
        // @return {Download.Model.register.data} Object literal with registration related data
        get: function() {
            console.warn(DownloadModel.getDownloaddata(this.data));
            return DownloadModel.getDownloaddata(this.data);
        }
    });
}
catch(e){
    console.warn('DownloadPos.Service.ss' + e.name, e);
    this.sendError(e);
}
});
