import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || {};

window.UC.experiments.BI005 = (function() {
    let $ = null;

    const eventSender = utils.events.setDefaultCategory('BI005---Homepage-Redesign');
    
    /**
     * On sitegainer.newPage() execute run()
     */
    const run = () => {
        $ = window.JQSG;

        $('main.app-body').addClass('bi005');

        utils.fullStory('BI005---Homepage-Redesign', 'Variant 1');

        // ----------------------------------------------------------------
        // Create new banner
        // ----------------------------------------------------------------
        $('main.app-body').prepend(`
            <div class="bi5-banner wrap">
                <div class="bi5-banner__content col-white">
                    <p class="fs-30 white bi5-banner__content-title">hand-iced gifts for every occasion</p>
                    <p>delivered worldwide, 7 days a week...</p>

                    <div class="bi5-banner__buttons-set">
                        <a href="/send-a-gift" class="bi5-btn bi5-btn--send-gift bi5-bg-pink">send a gift</a>
                        <em>or</em>
                        <a href="/biscuits" class="bi5-btn bi5-btn--browse-biscuits bi5-bg-trans bi5-border-white">browse biscuits</a>
                    </div>
                </div>
            </div>
        `);

        eventSender.send(null, 'did-show-banner');
        
        // ----------------------------------------------------------------
        // Additional items
        // ----------------------------------------------------------------
        const runAdditionalItems = () => {
            const carousel = $('.listing-page .carousel:first');
            carousel.addClass('bi5-hide');

            $('.bi5-carousel-slide-copies').remove(); // Reset
            $('.bi5-extra-items__header').remove(); // Reset

            if(window.innerWidth <= 519) {
                $('.listing-page .carousel:first .carousel-slide').eq(0).remove();
                $('.listing-page .carousel:first .carousel-slide').addClass('c-6-set bi5-carousel-slide-copies').insertBefore(carousel);

                // remove cta links
                $('.listing-page > section').eq(2).insertAfter( $('.listing-page > section').eq(3) );
                $('.listing-page > section').eq(1).remove();
            }

            const itemsWrap = $('.listing-page .c-7-set:first');
            itemsWrap.addClass('bi5-extra-items');

            itemsWrap.find('.c-6-set').removeClass('c-6-set').addClass('c-3-set');

            if(window.innerWidth <= 519) {
                $('.listing-page:first').prepend(`<p class="fs-16 m-b-4 center bi5-extra-items__header">trending now...</p>`);
            } else {
                itemsWrap.before(`<p class="fs-26 m-b-4 center bi5-extra-items__header">trending now...</p>`);
            }
        };

        runAdditionalItems();
        
        // ----------------------------------------------------------------
        // handle rebuilding items when page resizes
        // ----------------------------------------------------------------
        let winWidth = window.innerWidth, // for ref
            winHeight = window.innerHeight,
            winResizeTimeout = null;

        $(window).on('resize', () => {
            clearTimeout(winResizeTimeout);
            winResizeTimeout = setTimeout(() => {
                if(winWidth != window.innerWidth) {
                    if(winWidth > 519 && window.innerWidth <= 519) {
                        // to mobile
                        runAdditionalItems();
                    } else if (winWidth <= 519 && window.innerWidth > 519) {
                        // to larger devices
                        runAdditionalItems();
                    }

                    winWidth = window.innerWidth;
                }
            }, 500);
        });
        // ----------------------------------------------------------------
        // About section
        // ----------------------------------------------------------------
        $('.bi5-btn--send-gift').on('click', function() {
            eventSender.send(null, 'clicked-send-gift-button');
        });
        $('.bi5-btn--browse-biscuits').on('click', function() {
            eventSender.send(null, 'clicked-browse-biscuits-button');
        });
    };


    return {
        run: run,
        destroy: function() {
            $('main.app-body').removeClass('bi005');
        }
    }
})();

// ----------------------------------------------------------------
// Poll required elements
// ----------------------------------------------------------------
UC.poller([
    'main.app-body',
    function() {
        return !document.querySelector('.bi005');
    },
    function() {
        return !!window.JQSG;
    }
], function() {
    window.UC.experiments.BI005.run();
});
