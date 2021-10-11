/// <amd-module name="Download.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import '../../../Commons/Quote/JavaScript/Quote.ListExpirationDate.View';

import * as _ from 'underscore';
import * as download_tpl from 'download.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import DownloadCollection = require('./Download.Collection');
import { Configuration } from '../../../Commons/Utilities/JavaScript/Configuration';
import { ListHeaderView } from '../../../Commons/ListHeader/JavaScript/ListHeader.View';
import { RecordViewsView } from '../../../Commons/Utilities/JavaScript/RecordViewsView';
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneCollectionView = require('../../../Commons/Backbone.CollectionView/JavaScript/Backbone.CollectionView');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import DownloadModel = require('./Download.Model');
import TransactionListView = require('../../../Commons/Transaction/JavaScript/Transaction.List.View');

import RecordViewsActionableView = require('../../../Advanced/RecordViews/JavaScript/RecordViews.Actionable.View');
import OrderHistoryListTrackingNumberView = require('../../../Advanced/OrderHistory/JavaScript/OrderHistory.List.Tracking.Number.View');

import { GlobalViewsPaginationView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Pagination.View';
import { GlobalViewsShowingCurrentView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.ShowingCurrent.View';
import Handlebars = require('../../../Commons/Utilities/JavaScript/Handlebars');
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



// @module Download.View @extends Backbone.View
const DownloadView: any = TransactionListView.extend({
    template: download_tpl,
   
    className: 'DownloadView',

    title: Utils.translate('Downloads'),

    page_header: Utils.translate('Download'),

    attributes: {
        id: 'landing-page',
        class: 'landing-page'
    },

    events: {},
    
    bindings:{},  


    getSelectedMenu: function() {
        return 'Download';
    },

    getBreadcrumbPages: function() {
        return {
            text: this.title,
            href: '/Download'
        };
    },

    initialize:function(options){
    this.collection = new DownloadCollection();

    this.application = options.application;

    const isoDate = Utils.dateToString(new Date());

    this.rangeFilterOptions = {
        fromMin: '1800-01-02',
        fromMax: isoDate,
        toMin: '1800-01-02',
        toMax: isoDate
    };

    // Manages sorting and filtering of the collection
    console.log(this)

    this.listHeader = new ListHeaderView({
        view: this,
        application: this.application,
        collection: this.collection,
        sorts: this.sortOptions,
        rangeFilter: 'date',
        rangeFilterLabel: Utils.translate('From'),
        hidePagination: false,
        allowEmptyBoundaries: true
    });    
    
    console.log(this.listHeader)
    this.collection.on('reset', this.showContent, this);
    },


    sortOptions: [
        {
            value: 'custrecord_download_expiry_date',
            name: Utils.translate('Sort By Date'),
            selected: true
        },
        {
            value: 'custrecord_downloadable_item',
            name: Utils.translate('Sort By Items'),
        },
        {
            value: 'internalid',
            name: Utils.translate('Sort By Serial No')
        }
    ], 
    childViews: {
        'Download.Items': function() {
            return this._resultsView;
        },
        'List.Header': function() {
            console.log(this.listHeader)
            return this.listHeader;
        },
        'GlobalViews.Pagination': function(){
            console.log(this.collection)
            console.log(this.collection.totalRecordsFound);
            console.log(this.collection.recordsPerPage);
            
          
            return new GlobalViewsPaginationView(
                _.extend(
                    {
                        totalPages: Math.ceil(
                            // 4/2
                            this.collection.totalRecordsFound / this.collection.recordsPerPage
                        )
                    },
                    Configuration.defaultPaginationSettings
                )
            );
        
        },
        'GlobalViews.ShowCurrentPage': function(){
            
            return new GlobalViewsShowingCurrentView({
                items_per_page: this.collection.recordsPerPage,
                total_items: this.collection.totalRecordsFound,
                total_pages: Math.ceil(
                    // 4/2
                    this.collection.totalRecordsFound / this.collection.recordsPerPage
                )
            });
        }
    },
    

    _buildResultsView: function() {
        const self = this;
//   console.log(this)
        let selectedColumns = [];
        // if (!Configuration.get().transactionListColumns.enableOrderHistory) {
            selectedColumns.push({
                 label: 'SerialNo',
                 name:'SerialNo',
                id: 'internalid', 
                type: 'origin' 
            });
            selectedColumns.push({
                 label: 'Items',
                 name:'Items',
                id: 'custrecord_downloadable_item', 
                type: 'number' 
            });
            selectedColumns.push({
                label: 'ExpirationDate',
                name: 'expiration-date',
                id: 'custrecord_download_expiry_date',
                type: 'date'
            });

        const records_collection = new Backbone.Collection(
            this.collection.map(function(order) {
                // console.log(order)
                const model = new Backbone.Model({
                    // title: new Handlebars.SafeString(
                    //     Utils.translate('<span class="tranid">$(0)</span>', order.get('tranid'))
                    // ),
                    touchpoint: 'customercenter',
                    // detailsURL: `/purchases/view/${order.get('recordtype')}/${order.get(
                    //     'internalid'
                    // )}`,    
                    recordType: order.get('recordtype'),
                    id: order.get('internalid'),
                    internalid: order.get('internalid'),
                    columns: self._buildColumns(selectedColumns, order)
                });
            
                return model;
            })
        );
            console.log(records_collection)
        return new BackboneCollectionView({
            childView: RecordViewsView,
            collection: records_collection,
            viewsPerRow: 1,
        });
    },
    
    // destroy: function() {
    //     this.collection.off('request reset');

    //     (<any>BackboneView.prototype).destroy.apply(this, arguments);
    // },

    getContext: function() {
        this._resultsView = this._buildResultsView();
        // console.log(this._resultsView)
        // console.log(this._buildResultsView())
        let columns = [];
        if (this._resultsView.collection.length > 0) {
            columns = this._resultsView.collection.at(0).get('columns');
        }

    console.log(columns)        
        return {
           // @property {String} pageHeader
           pageHeader: this.page_header,
           
        // showPagination: !!(4 && 2),

        collection: this.collection,
        //    showCurrentPage: this.showCurrentPage,
        collectionLength: this.collection.length,

        // isLoading: this.isLoading,

        showPagination: !!(this.collection.totalRecordsFound && this.collection.recordsPerPage),
        
        // showBackToAccount: Configuration.get('siteSettings.sitetype') === 'STANDARD',

        columns: columns
        };
    }
});

export = DownloadView;
