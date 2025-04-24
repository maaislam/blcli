/* eslint-disable */
import inclusionProducts from './lib/config/inclusion-products.js';
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import basketTest from './lib/pages/basket.js';
import desktopPdpTest from './lib/pages/desktop/pdp.js';
import desktopPlpTest from './lib/pages/desktop/plp.js';
import mobilePdpTest from './lib/pages/mobile/pdp.js';
import mobilePlpTest from './lib/pages/mobile/plp.js';

window._TP008Final = (function() {

    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    const eventSender = utils.events.setDefaultCategory('TP008---Final');

    if(document.body.classList.contains('tp008final')) {
        return;
    }
    document.body.classList.add('tp008final');

    // ----------------------------------------------------------------
    // Update disclaimer - across all relevant tests
    // ----------------------------------------------------------------
    const getDisclaimerText = () => {
        const disclaimerText = `
        *Next day and 2 day delivery are available on selected products only. If you are purchasing items eligible for next day or 2 day delivery alongside products that aren't eligible, then your order will be split accordingly. Your delivery lead time for both parts of the order will be communicated within the ordering process. Next day delivery applies to orders placed before 6pm Monday to Thursday. Deliveries in certain parts of Scotland and other remote areas may take slightly longer.
        `;

        return disclaimerText;
    };

    // ----------------------------------------------------------------
    // Basket Test (Desktop)
    //
    // - Force show delivery date in basket row item against any products
    // that don't match the inclusion products array
    // - Update the delivery date to 'tomorrow' or the actual date
    // according to the logic in helpers.getDeliveryTargetDate()
    // ----------------------------------------------------------------
    UC.poller([
        'body.page-cartPage',
        '.tp27_basket-item-content',
        '.baskt_items_wrap .baskt_item',
        '.delivery-entry-button',
        function() {
            return !!window.jQuery;
        }
    ], function() {
        const didMatchAProduct = basketTest(inclusionProducts);

        if(didMatchAProduct) {
            $('#content').after('<p class="tp8_disclaimer">' + getDisclaimerText() + '</p>');
        }
    });

    // ----------------------------------------------------------------
    // Basket Test (Mobile)
    // ----------------------------------------------------------------
    UC.poller([
        'body.page-mobile-cartPage',
        '.baskt_items_wrap .baskt_item',
        function() {
            return !!window.jQuery;
        }
    ], function() {
        const didMatchAProduct = basketTest(inclusionProducts);

        if(didMatchAProduct) {
            $('#content').after('<p class="tp8_disclaimer">' + getDisclaimerText() + '</p>');
        }
    });
    
    // ----------------------------------------------------------------
    // PDP - Desktop
    //
    // - Show messaging overlaid on product image
    // -> Next day delivery available or delivery target day
    // ----------------------------------------------------------------
    UC.poller([
        '.page-productDetails',
        '.s7staticimage',
        '.tpProductView .tpInfoWrapper .tpProductItem span',
        '#content',
        function() {
            return !!window.jQuery;
        }
    ], function() {
        const didMatchAProduct = desktopPdpTest(inclusionProducts);
        if(didMatchAProduct) {
            $('#content').after('<p class="tp8_disclaimer">' + getDisclaimerText() + '</p>');
        }
    });
    
    // ----------------------------------------------------------------
    // PDP - Mobile
    //
    // - Show messaging overlaid on product image
    // -> Next day delivery available or delivery target day
    // ----------------------------------------------------------------
    UC.poller([
        '.page-mobile-productDetails',
        '#s7ProductDetailsImage_zoomView',
        '#content',
        function() {
            return !!window.jQuery;
        }
    ], function() {
        const didMatchAProduct = mobilePdpTest(inclusionProducts);
        if(didMatchAProduct) {
            $('#content').after('<p class="tp8_disclaimer">' + getDisclaimerText() + '</p>');
        }
    });
    // ----------------------------------------------------------------
    // PLP - Desktop
    //
    // - Add roundel against matching products
    // (roundels only appear when next day available)
    // - Add banner against matching products
    // ----------------------------------------------------------------
    UC.poller([
        function() {
            return document.querySelector('.page-productGrid') || document.querySelector('.page-search');
        },
        '#products .prod',
        '.prod_img',
        function() {
            return !!window.jQuery;
        }
    ], function() {
        const didMatchAProduct = desktopPlpTest(inclusionProducts);
        if(didMatchAProduct) {
            $('#content').after('<p class="tp8_disclaimer">' + getDisclaimerText() + '</p>');
        }
    });

    // ----------------------------------------------------------------
    // PLP - Mobile
    //
    // - Add banner against matching products
    // ----------------------------------------------------------------
    UC.poller([
        function() {
            return document.querySelector('.page-mobile-productList') || document.querySelector('.page-mobile-searchResults');
        },
        '.tp_prodView',
        '#content',
        '.product_item',
        function() {
            return !!window.jQuery;
        }
    ], function() {
        const didMatchAProduct = mobilePlpTest(inclusionProducts);
        if(didMatchAProduct) {
            $('#content').after('<p class="tp8_disclaimer">' + getDisclaimerText() + '</p>');
        }
    });

})();
