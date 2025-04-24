/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as helpers from './lib/helpers';
import pdpDesktop from './lib/pdp-desktop';
import pdpMobile from './lib/pdp-mobile';
import plpDesktop from './lib/plp-desktop';
import plpMobile from './lib/plp-mobile';

/**
 * Amalgamation of all RRP Prices tests (TP021-x) for PDP and PLP
 */
window._TP021Final = (function () {
    // ----------------------------------------------------------------
    // Entry point for app
    // ----------------------------------------------------------------
    const run = () => {
        const $ = window.jQuery;

        if(helpers.isLoggedInDesktop() || helpers.isLoggedInMobile() || document.body.classList.contains('TP021')) {
          // Originally Added 2017-09-07
          // Bail out for logged in users as that functionality has been developed live
          // This applies to desktop and mobile
          return;
        }

        // ----------------------------------------------------
        // PDP Desktop
        // ----------------------------------------------------
        UC.poller([
            '.page-productDetails',
            '#ProductDetail .tpProductItem > span',
            '.product_price_section > .price_value',
        ], () => {
            $('body').addClass('TP021');

            pdpDesktop();
        });
        
        // ----------------------------------------------------
        // PDP Mobile
        // ----------------------------------------------------
        UC.poller([
            '.page-mobile-productDetails',
            'meta[itemprop="sku"]',
            '.product_price_section > .price_value'
        ], () => {
            $('body').addClass('TP021');

            pdpMobile();
        });
        
        // ----------------------------------------------------
        // PLP Desktop
        // ----------------------------------------------------
        UC.poller([
            function() {
                return document.querySelector('.page-productGrid') ||
                    document.querySelector('.page-spotLightPage') ||
                    document.querySelector('.page-search');
            },
            '#products',
            '#products .prod',
            '.product_price_holder',
            '.price_value'
        ], () => {
            $('body').addClass('TP021');

            plpDesktop();
        });
        
        // ----------------------------------------------------
        // PLP Mobile
        // ----------------------------------------------------
        UC.poller([
            function() {
                return document.querySelector('.page-mobile-productList') ||
                    document.querySelector('.page-mobile-searchResults');
            },
            '.tp_prodView',
            '.product_item',
            '.price_section',
            '.price_value'
        ], () => {
            $('body').addClass('TP021');

            plpMobile();
        });
    };
    
    // ----------------------------------------------------------------
    // Triggers
    // ----------------------------------------------------------------
    const _triggers = (options) => {
        utils.fullStory('TP021Final', 'Variation 1');

        UC.poller([
            () => {
                return window.jQuery
            },
            () => {
                return window.ga
            }
        ], run);
    };

    // Run experiment
    _triggers();

})();
