/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Download.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import '../../../Commons/Quote/JavaScript/Quote.ListExpirationDate.View';

import * as _ from 'underscore';
import * as download_tpl from 'download.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import DownloadCollection = require('../../../Commons/Quote/JavaScript/Quote.Collection');
import { Configuration } from '../../../Commons/Utilities/JavaScript/Configuration';
import { ListHeaderView } from '../../../Commons/ListHeader/JavaScript/ListHeader.View';
import { RecordViewsView } from '../../../Commons/Utilities/JavaScript/RecordViewsView';
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneCollectionView = require('../../../Commons/Backbone.CollectionView/JavaScript/Backbone.CollectionView');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import DownloadModel = require('./Download.Model');

import { GlobalViewsPaginationView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Pagination.View';
import { GlobalViewsShowingCurrentView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.ShowingCurrent.View';
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');
import GlobalViewsCountriesDropdownView = require('../../../Commons/GlobalViews/JavaScript/GlobalViews.CountriesDropdown.View');
import GlobalViewsStatesView = require('../../../Commons/GlobalViews/JavaScript/GlobalViews.States.View');
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';
import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';

/*import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';*/
//import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';

//import AddressModel = require('../../../Commons/Address/JavaScript/Address.Model');
//import { template } from 'underscore';*/
//import Tracker = require('../../../Commons/Tracker/JavaScript/Tracker');
//import AccountRegisterModel = require('../../../Advanced/Account/JavaScript/Account.Register.Model');

interface CaseListViewContext {
    showPagination: boolean;
    showCurrentPage: boolean;

}



// @module Download.View @extends Backbone.View
const DownloadView: any = BackboneView.extend({
    template: download_tpl,

    className: 'DownloadView',

    title: Utils.translate('Downloads'),

    page_header: Utils.translate('Download'),

    attributes: {
        id: 'landing-page',
        class: 'landing-page'
    },

    events: {
        // 'click [data-action="validate"]': 'validateFields',
        // 'change [data-action="selectcountry"]': 'updateStates'
    },
    
    bindings:{
        // '[name="firstname"]': 'firstname',
        // '[name="lastname"]': 'lastname',
        // '[name="email"]': 'email',
        // '[name="country"]': 'country'
    },  

    initialize:function(){

            var mymodel = new DownloadModel();
           
        // console.log(mymodel);
             this.modeldata = null;
            //  this.modeldata = [];
            var self = this;
            mymodel.fetch().then(function(element){
                // element.map((x)=>{
                //     self.modeldata.push(x);
                //     // console.log(x)
                // })
                 self.modeldata = element;
               console.log(self.modeldata)
            });

this.collection = new DownloadCollection();
    },
  
    getBreadcrumbPages: function() {
        return {
            text: this.title,
            href: '/Download'
        };
    },


    childViews: {
        'Download.Items': function() {
            return this._resultsView;
        },
        'List.Header': function() {
            return this.listHeader;
        },
        'GlobalViews.Pagination': function(){
            return  new GlobalViewsPaginationView(
                _.extend(
                    {
                        totalPages: Math.ceil(
                         12/5 //total records / records per page
                        )
                    },
                    this.options.application.getConfig().defaultPaginationSettings
                )
            );
        
        },
        'GlobalViews.ShowCurrentPage': function(){
            return new GlobalViewsShowingCurrentView({
                items_per_page: 5,
                total_items: 12,
                total_pages:Math.ceil(
                    12/5
                )
            })
        }
    },
    



    getContext: function() {

        var self = this;
        console.log(this.showCurrentPage)
        // console.log(self.modeldata);
        var tpl = JSON.stringify(self.modeldata);

        var tpldata = JSON.parse(tpl)
        console.log('tpldata',tpldata);
        console.log('tpl',tpl);
        console.log('modeldata', self.modeldata.length);
       
        
        return {

            data:tpldata,
           // @property {String} pageHeader
           pageHeader: this.page_header,
           showPagination: !!(12 && 5),
        //    showCurrentPage: this.showCurrentPage,
           collectionLength: self.modeldata.length,

             
        };
    }
});

export = DownloadView;
