import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import tp011 from './lib/tp011';
import tp040 from './lib/tp040';
import tp042 from './lib/tp042';

/**
 * SITE WIDE TESTS
 *
 * - TP011: new navigation (with search) - DESKTOP AND TABLET
 * - TP040: adds checkout button to mini basket - DESKTOP
 * - TP042: shows 'click and collect' wording - DESKTOP
 */

window._TP074 = (function () {
    // ----------------------------------------------------------------
    // Entry point for app
    // ----------------------------------------------------------------
    const run = () => {
        const $ = window.jQuery;

        $('body').addClass('tp074');

        // None of these tests run on the checkout
        if(window.location.pathname.match(/checkout/)) {
            return;
        }

        // TP011 nav menu
        // tp011(); // Excluded as it's been built live on the site

        // TP040
        tp040();
        
        // TP042: messaging 'click and collect' on buttons, desktop only
        UC.poller([
            function() {
                return $('body.page-search').length || $('body.page-productDetails').length || $('body.page-productGrid').length;
            }
        ], tp042);

        $('#addToQuoteToolTip').on('click', () => {
            UC.poller([function() {
                return $('#add_to_quote_message').is(':visible');
            }], () => {
                $('body,html').animate({
                    scrollTop: $('#add_to_quote_message').offset().top - 80
                });
            }, { timeout: 2000 });
        });
    };
    
    // ----------------------------------------------------------------
    // Triggers
    // ----------------------------------------------------------------
    const _triggers = (options) => {
        utils.fullStory('TP074', 'Variation 1');

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

    return {
        tp042: tp042
    };

})();
