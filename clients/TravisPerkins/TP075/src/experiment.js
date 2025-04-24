import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

/**
 * TP075
 *
 * DEPENDS on TP011 (TP074)
 */
window._TP075 = (() => {

    // ----------------------------------------------------------
    // Helpers
    //
    // @see TP011, TP074
    // ----------------------------------------------------------
    var isTouchDevice = ('ontouchstart' in window ||  (navigator && navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0));
    var body = document.getElementsByTagName('body')[0];
    var hasClassTP011 = !!body.className.match(' TP011');
    
    if (isTouchDevice || !document.querySelectorAll) {
        return false;
    }

    /**
     * Entry point for test called after TP011 loaded in
     */
    const run = () => {
        const $ = window.jQuery;

        document.body.classList.add('tp075');

        utils.fullStory('TP075', 'Variation 1');

        // Add a new item to menu
        $('#TP011_az-listing').after(`
            <li id="TP075-offers">
                <a href="#">
                    <div class="TP011_hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span>Offers</span>
                </a>
                <div class="TP011_megamenu">
                    <ul class="tp75-offers-links">
                        <li>
                            <a href="/spotlight/bathroomsnovemberdecember"><span>Bathrooms</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/buildingmaterialsnovemberdecember"><span>Building Materials</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/doorsironmongerynovemberdecember"><span>Doors &amp; Ironmongery</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/electricalnovemberdecember"><span>Electrical &amp; Lighting</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/flooringnovemberdecember"><span>Flooring</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/handtoolsnovemberdecember"><span>Hand Tools</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/insulationnovemberdecember"><span>Insulation</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/kitchensnovemberdecember"><span>Kitchens</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/landscapingnovemberdecember"><span>Landscaping</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/plasterplasterboardnovemberdecember"><span>Plaster &amp; Plasterboard</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/plumbingandheatingnovemberdecember"><span>Plumbing &amp; Heating</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/powertoolsnovemberdecember"><span>Power Tools</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/poweraccessoriesnovemberdecember"><span>Power Tool Accessories</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/timbernovemberdecember"><span>Timber</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/roofwindowsnovemberdecember"><span>Roof Windows</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/paintingdecoratingnovemberdecember"><span>Painting &amp; Decorating</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/roofingnovemberdecember"><span>Roofing</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/worktopsnovemberdecember"><span>Worktops</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/winteressentialsnovemberdecember"><span>Winter Essentials</span></a>
                        </li>
                        <li>
                            <a href="/spotlight/workwearnovemberdecember"><span>Workwear</span></a>
                        </li>
                    </ul>
                </div>
            </li>
        `);

        // Since TP011 has already run, rebind toggle handlers
        toggleMenus();
    };

    /**
     * Helper TP011 bind toggle open / close navs
     *
     * @see TP011, TP074
     */
    const toggleMenus = () => {
        var closeNavEvents = [];
        function closeAllNavs() {
            $.each(closeNavEvents, function() {
                this();
            });
        }

        var $nav_HTML = $('.TP011_nav');

        var hoverTimer;
        $('.TP011_level0 > li').each(function() {
            var $el = $(this);
            var name = $el.find('> a > span').text();
            var $menu = $el.find('> a > .TP011_hamburger');

            var openNav = function() {
                $menu.addClass('TP011_menu-open');
                $el.find('.TP011_open').removeClass('TP011_open');
                $el.addClass('TP011_open');

                if (isTouchDevice) {
                    $level1.find('> li.TP011_show-link-indicator:not(".TP011_single-link")').removeClass('TP011_show-link-indicator');
                    $first.addClass('.TP011_show-link-indicator');
                }
            
                $nav_HTML.css('z-index', '1002');

              
                var $overlay = $('.TP011_overlay');
                $overlay.css('z-index', '1001');

                $('.TP011_overlay').stop(true, true).fadeIn(400, function() {
                    $overlay.css('z-index', '1001');
                });
                
            };

            var closeNav = function() {
                $menu.removeClass('TP011_menu-open');
                $el.removeClass('TP011_open');
                //$('body').removeClass('TP011_scroll-lock');

                $nav_HTML.css('z-index', '999');

                var $overlay = $('.TP011_overlay');
                $('.TP011_overlay').stop(true, true).fadeOut(400, function() {
                    //$overlay.css('z-index', '998');
                });
            };

            closeNavEvents.push(closeNav);

            if (isTouchDevice) {
                // Open/Close nav on click for touch devices
                $el.children('a').on('touchstart', function() {
                    $el.off('mouseenter');
                    $el.off('mouseleave');

                    if ($el.hasClass('TP011_open')) {
                        //closeNav();
                        closeAllNavs();
                    } else {
                        closeAllNavs();
                        openNav();
                    }
                });
            }

            $el.off('mouseenter');
            $el.off('mouseleave');
          
            $el.on({
                mouseenter: function() {
                    clearTimeout(hoverTimer);
                    closeAllNavs();
                    openNav();
                },
                mouseleave: function() {
                    hoverTimer = setTimeout(function() {
                        closeAllNavs();
                    }, 1000);
                }
            });
        });
    };

    // ----------------------------------------------------------
    // Poll for existence of TP011 menu
    // ----------------------------------------------------------
    UC.poller([
        '.TP011_nav',
        '#TP011_az-listing',
        () => {
            return window.jQuery
        },
        () => {
            return window.ga
        }
    ], run);

})();

UC.poller
