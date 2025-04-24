/* eslint-disable */
// Note that inclusion products are taken from TP008
import inclusionProducts from '../../TP008Final/src/lib/config/inclusion-products.js';
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import tp027 from './lib/tp027';

/**
 * BASKET TESTS
 *
 * - TP027
 */

window._TP073 = (function () {
    // ----------------------------------------------------------------
    // Entry point for app
    // ----------------------------------------------------------------
    const run = () => {
        const $ = window.jQuery;

        $('body').addClass('tp073');

        // Run basket tests
        tp027();
    
        // ----------------------------------------------------------------
        // If any products on basket match inclusion products, remove
        // the dlievery information message
        // ---------------------------------------------------------------
        var allSkusMatch = true;
        $('.baskt_items_wrap .baskt_item').each(function() {
            var sku = $(this).find('.item_code').text().trim();
            if(!sku || inclusionProducts.indexOf(parseInt(sku)) === -1) {
                allSkusMatch = false;
                return false;
            }
        });

        if(allSkusMatch) {
            $('.tp27_basket-bottom-sidebar').hide();
        }
    };
    
    // ----------------------------------------------------------------
    // Triggers
    // ----------------------------------------------------------------
    const _triggers = (options) => {
        utils.fullStory('TP073', 'Variation 1');

        UC.poller([
            () => {
                return window.jQuery;
            },
            () => {
                return window.ga;
            }
        ], run);
    };

    // Run experiment
    _triggers();

    return {
        tp027: tp027
    };

})();
