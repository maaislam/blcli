import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import tp026037 from './lib/tp026-tp037';
/* eslint-disable */
/**
 * PDP Tests
 *
 */
window._TP072 = (function () {
    // ----------------------------------------------------------------
    // Entry point for app
    // ----------------------------------------------------------------
    const run = () => {
        const $ = window.jQuery;

        $('body').addClass('tp072d');

        // Run PLP tests
        UC.poller([
            function() {
                return $('body.page-mobile-productDetails').length;
            }
        ], function() {
            tp026037();
        });
    };
    
    // ----------------------------------------------------------------
    // Triggers
    // ----------------------------------------------------------------
    const _triggers = (options) => {
        utils.fullStory('TP072', 'Variation 1');

        // Fix scroll to bundles
        UC.poller(['.inc_bundle_delas_msg a'], () => {
            $('.inc_bundle_delas_msg a').on('click', (e) => {
                const target = $(e.currentTarget).attr('href');
                if(target) {
                    const elm = $(target);
                    if(elm.length) {
                        const targetOffset = elm.offset().top;
                        $('body,html').animate({
                            scrollTop: targetOffset
                        }, 600);
                    }
                }
                e.preventDefault();
            });
        });

        // Fix make bundle links clickable
        UC.poller(['.product-bundle .products-view .increasingly_thumbnail'], () => {
            $('.products-view .caption > h4').on('click', (e) => {
                const pid = $(e.currentTarget).parents('.product-bundle .products-view .increasingly_thumbnail')
                    .attr('productid');
                if(pid) {
                    setTimeout(() => {
                        window.location = '/p/' + pid;
                    }, 300);
                }
            });
        });

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
