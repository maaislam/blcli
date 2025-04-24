import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import handleSearch from './lib/handle-search';

utils.events.setTrackerName('tracker2'); 

const NH011 = (function() {
    let $ = null;

    const eventSender = utils.events.setDefaultCategory('NH011---Increase Search Prominence');

    let mappedMenu = null; // Cached menu once mapped
    
    /**
     * Execute run() every time the filters need to be built
     */
    const run = () => {
        $ = window.jQuery;

        document.querySelector('html').classList.add('nh11');

        utils.fullStory('NH011', 'Variant 1');

        const pageLoadWinWidth = window.innerWidth,
            linkArea = $('.top-nav .link-area'),
            headerBtm = linkArea.find('.header-btm'),
            headerLeft = linkArea.find('.header-left'),
            headerRight = linkArea.find('.header-right'),
            searchBox = headerLeft.find('.search-box'),
            searchInput = searchBox.find('input[type=search]'),
            liveChat = headerLeft.find('.live-chat'),
            loginLink = $('.top-nav a[title^="Log in"]'),
            myAccount = headerLeft.find('.my-account');

        /**
         * Build Desktop
         */
        const buildDesktop = () => {
            // ---------------------------------------------
            // Move header elements
            // ---------------------------------------------
            headerBtm.prependTo(linkArea);

            liveChat.prependTo(headerRight);
            myAccount.prependTo(headerRight);
        
            // ---------------------------------------------
            // Identify login link
            // ---------------------------------------------
            loginLink.addClass('nh11-nav-login-link');
            loginLink.html('<span>My Account / </span>Login');

            // ---------------------------------------------
            // Placeholder
            // ---------------------------------------------
            searchInput.attr('placeholder', 'SEARCH FOR A SPECIFIC HOLIDAY OR SHOW');
        };

        /**
         * Build mobile
         */
        const buildMobile = () => {
            $('header').after(`
                <div class="nh11-search-wrap">
                    <span class="nh11-search-wrap-title">
                        Search for a specific holiday or show
                    </span>
                </div>
            `);  

            const searchWrap = $('.nh11-search-wrap');

            searchWrap.append(searchBox);
            searchWrap.find('button').addClass('orange-btn').text('Go');
        };
        
        // ---------------------------------------------
        // Orientation change => refresh page
        // Workaround for having to rebuild page
        // ---------------------------------------------
        window.addEventListener("orientationchange", function() {
            setTimeout(() => {
                if(pageLoadWinWidth > 900 && window.innerWidth <= 900
                    || pageLoadWinWidth <= 900 && window.innerWidth > 900) 
                {
                    window.location.reload();
                }
            }, 400);
        });
        
        // ---------------------------------------------
        // Handle search where depature cookie not set
        //
        // There is code on the site that references
        // globals and we override those
        // ---------------------------------------------
        handleSearch(eventSender);

        // ---------------------------------------------
        // Run
        // ---------------------------------------------
        if(window.innerWidth > 900) {
            buildDesktop();
        } else {
            buildMobile();
        }

        // ---------------------------------------------
        // Event marking test as fired
        // ---------------------------------------------
        eventSender.send(null, 'did-fire', window.location.pathname);
    };

    return {
        run: run
    }
})();

// ----------------------------------------------------------------
// Run..
// ----------------------------------------------------------------
UC.poller([() => !!window.jQuery], () => NH011.run());
