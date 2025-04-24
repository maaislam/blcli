import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let $ = null;

const eventSender = utils.events.setDefaultCategory('BI012---Top-Picks');

/**
 * Pull elements out of listing
 */
const breakUpProducts = () => {
    const productItems = $('product-list-item'),
        top10 = productItems.slice(0, 10),
        allOthers = productItems.slice(10);

    top10.wrapAll('<div class="bi12-feature bi12-feature--top-10"></div>');
    allOthers.wrapAll('<div class="bi12-feature bi12-feature--other-products"></div>');

    $('.bi12-feature__title').remove();

    $('.bi12-feature--top-10:first').prepend(`
        <h2 class="bi12-feature__title">
            here are our top 10 best selling items
        </h2>
    `);

    $('.bi12-feature--other-products:first').prepend(`
        <h2 class="bi12-feature__title">
            other customers also bought
        </h2>
    `);
};

/**
 * Get homepage content boxes
 *
 * Via proxy mimics gbot for html retrieval
 * Note cache lifetime is 1 hour defined on server
 */
const displayTrendingNowBoxes = () => {

    var targetUrl = 'https://ab-test-sandbox.userconversion.com/gbotproxy/?url=https%3A%2F%2Fwww.biscuiteers.com%2F';
    $.ajax({
        url: targetUrl,
        data: {
            key: '08asdhjiusdhfasdmflkhdsf890ewhf9q3u' + (Math.pow(Math.E, 4) + '').substring(0,7),
            identifier: 'biscuiteers-homepage'
        },
        type: 'get',
        success: (data) => {
            const d = document.createElement('div');
            d.innerHTML = data;

            // Retrieve the banners from the markup
            const banners = $(d).find('[ng-switch="banner.type"]');
            banners.removeClass('c-6-set').addClass('c-3-set-x c-3-set-l c-6-set-m c-6-set-s');

            $('.bi12-categories').append(banners);

            eventSender.send(null, 'did-show-trending-now-banners');
        },
        error: () => {
            eventSender.send(null, 'hide-trending-now-section-error-retrieving-categories');

            $('.bi12-categories').hide();
        }
    });
};

const sendAdditionalEvents = () => {
    $('product-list-item').on('click', () => eventSender.send(null, 'did-click-product-item'));
    $('.bi12-categories').on('click', '.c-3-set-l', () => eventSender.send(null, 'did-click-trending-now-category'));
};

/**
 * Entry point for running app once polling conditions met
 */
const run = () => {
    // -----------------------------------------------------------
    // Setup
    // -----------------------------------------------------------
    $('body').addClass('bi012');
    
    // -----------------------------------------------------------
    // Page title
    // -----------------------------------------------------------
    UC.poller(['.page-content h1'], () => {
        const pageContent = $('.page-content');
        pageContent.find('h1').addClass('bi12-page-title').insertBefore(pageContent.find('> .c-12-x'));
    });
    
    // -----------------------------------------------------------
    // Break into sections
    // -----------------------------------------------------------
    breakUpProducts();
    
    // -----------------------------------------------------------
    // Amend classes
    // -----------------------------------------------------------
    $('.page-content > .c-9-x').removeClass('c-9-x c-9-l').addClass('c-12-x c-12-l');
    
    // -----------------------------------------------------------
    // Create Categories
    // -----------------------------------------------------------
    $('.bi12-categories').remove();
    $('.bi12-feature--other-products').after(`
        <div class="bi12-categories">
            <h2 class="bi12-feature__title">
                trending now...
            </h2>
        </div> 
    `);
    
    // -----------------------------------------------------------
    // Trending boxes retrieved from homepage via boxes
    // -----------------------------------------------------------
    displayTrendingNowBoxes();
    
    // -----------------------------------------------------------
    // Send additional events for tracking
    // -----------------------------------------------------------
    sendAdditionalEvents();
        
    // ---------------------------------------------
    // Orientation change => refresh page
    // Workaround for DOM rebuliding
    // ---------------------------------------------
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    });
};

// -----------------------------------------------------------
// Poll elements required for *all* tests
// -----------------------------------------------------------
const poller = UC.poller([
    () => !!window.JQSG,
    'product-list-item'
], () => {
    utils.fullStory('BI012---Top 25 Hero Page', 'Variant 1');

    $ = window.JQSG;

    run();
}); 
