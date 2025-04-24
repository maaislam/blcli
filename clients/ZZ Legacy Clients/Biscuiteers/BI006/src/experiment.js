/**
 * Note that this should be run in 'page load' mode in Sitegainer
 *
 * This means that run() will probably only be called once on first page load
 * so we create an interval poller that rebuilds the bar if ever it does not exist
 * e.g. when visiting checkout and coming back to home page
 */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || {};

window.UC.experiments.BI006 = (function() {
    let $ = null, pollingTimeout = null;

    const eventSender = utils.events.setDefaultCategory('BI006---Christmas-Delivery');

    /**
     * Does the rebuilt bar exist? 
     *
     * The desktop nav code gets removed and rebuilt in the DOM so we check that
     * the new block is added
     */
    const rebuiltBarExists = () => {
        return !!document.querySelector('.bi6-block__christmas-ordering');
    }

    /**
     * Entry point for test do-all actions
     */
    const run = () => {
        if(rebuiltBarExists()) {
            return false;
        }

        $ = window.JQSG;

        $('html').addClass('bi006');

        // Rebuild bar
        rebuildBar();
        
        // !! NOTE !!
        // Since page requests are asynchronous we poll to see if the rebuild bar
        // has been removed from the DOM (it will happen for example when
        // going from the checkout back to a pgae on the site)
        const poller = () => {
            clearTimeout(pollingTimeout);
            pollingTimeout = setTimeout(() => {
                if(!rebuiltBarExists()) {
                    rebuildBar();
                }
                poller();
            }, 500);
        };
        poller();
    };

    /**
     * Rebuild Bar area
     */
    const rebuildBar = () => {
        // If checkout page, bail out
        if(window.location.pathname.match(/\/checkout/)) {
            return;
        }

        // Desktop header
        const wrap = $('.page-header > .wrap:eq(2)');
        if(wrap.length) {

            wrap.children().removeClass('c-5 c-4-set c-3-set').addClass('c-3 bi6-block');

            const newsletter = wrap.children('.block-newsletter:first').addClass('bi6-block__newsletter'),
                delivery = wrap.children('.block-delivery:first').addClass('bi6-block__delivery'),
                search = wrap.children('[ng-controller=MiniSearchController]:first').addClass('bi6-block__search'),
                newHead = $('<div class="bi6-bar">');

            const christmasMessage = $(`
                <div class="bi6-block bi6-block__christmas-ordering c-3">
                    <a href="/christmas-delivery-information">
                        <span>ordering christmas gifts?</span> 
                        <span class="col-pink">everything you need to know</span>
                    </a>
                </div>
            `);

            delivery.after(christmasMessage);

            eventSender.send(null, 'did-build-new-bar');
        }

        // Mobile header
        if(!document.querySelector('.bi6-section__christmas-ordering')) {
            $('header.page-header').append(`
                <div class="bi6-bar-mobile">
                    <div class="bi6-section bi6-bg-light-grey bi6-mb0 bi6-relative bi6-section__christmas-ordering">
                        <span>ordering christmas gifts?</span> 
                        <a href="/christmas-delivery-information" class="col-pink">read more &gt;</a>
                    </div>
                </div>
            `);

            eventSender.send(null, 'did-build-new-bar');
        }
    };

    return  {
        _bi6_run: run
    }
})();

// ----------------------------------------------------------------
// Poll required elements
// ----------------------------------------------------------------
UC.poller([
    '.page-header',
    function() {
        return !!window.JQSG;
    }
], function() {
    window.UC.experiments.BI006._bi6_run();
});
