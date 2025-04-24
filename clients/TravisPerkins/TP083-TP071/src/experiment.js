import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import tp009 from './lib/tp009';
import tp044 from './lib/tp044';
import tp083 from './lib/tp083';

/**
 * PLP Tests
 */
window._TP071 = (function () {
    // ----------------------------------------------------------------
    // Entry point for app
    // ----------------------------------------------------------------
    const run = () => {
        if(window.location.pathname.match(/Product\/Tool-Hire/)) {
            // 2018-02-15 Prevent running on tool hire pages
            return;
        }

        const $ = window.jQuery;

        $('body').addClass('tp071');

        // Run PLP tests
        UC.poller([
            function() {
                return $('body.page-search').length  || $('body.page-productGrid').length || $('body.page-spotLightPage').length;
            }
        ], function() {
            // TP009
            tp009();
            
            // TP083
            tp083();

            // TP044
            tp044();
        });
    };
    
    // ----------------------------------------------------------------
    // Triggers
    // ----------------------------------------------------------------
    const _triggers = (options) => {
        utils.fullStory('TP071', 'Variation 1');

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
    };

})();
