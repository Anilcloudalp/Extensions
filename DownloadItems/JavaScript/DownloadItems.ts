/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="DownloadItems"/>
//import * as home_cms_tpl from 'home_cms.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import DownloadItemsView = require('./DownloadItems.View');
// import QuoteListView = require('../../../Commons/Quote/JavaScript/Quote.List.View');

import { MyAccountMenu } from '../../../Advanced/Header/JavaScript/MyAccountMenu';


// @class Home @extends ApplicationModule
export = {
    mountToApp: function(application) {
        const myAccountMenu = MyAccountMenu.getInstance();

        myAccountMenu.addSubEntry({
            entryId: 'orders',
            id: 'downloadItems',
            name: Utils.translate('Downloadable Items'),
            url: 'downloadItems',
            index: 6,
            permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
        });
        //const homeCMSTemplate = home_cms_tpl;
        const pageType = application.getComponent('PageType');

        pageType.registerPageType({
            name: 'landing-page',
            routes: ['downloadItems'],
            view: DownloadItemsView,

            defaultTemplate: {
                name:'DownloadItems.tpl',
                displayName: 'DownloadItems Default',
                
            // thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources('img/default-layout-PDP.png')
           
            }

        });
        


    }
};
