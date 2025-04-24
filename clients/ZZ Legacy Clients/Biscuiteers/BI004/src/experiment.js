import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as filterParser from './lib/filter-parser.js';
import cache from './lib/cache.js';
import scrollTo from './lib/scroll-to.js';

window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || {};

window.UC.experiments.BI004 = (function() {
    let $ = null, scrollOff = false;

    const eventSender = utils.events.setDefaultCategory('BI004---Filters-Redesign');
    
    /**
     * On sitegainer.newPage() execute run()
     */
    const run = () => {
        $ = window.JQSG;

        if(document.querySelector('.bi4-hfilters')) {
            // Prevent duplicate menu appearing
            return;
        }

        document.querySelector('html').classList.add('bi004');

        // Full Story
        utils.fullStory('BI004---Desktop', 'Variant 1');

        const leftCol = cache.add('left-col', document.querySelector('.page-content > .c-3')),
            mainCol = cache.add('main-col', document.querySelector('.page-content > .c-9-x')),
            mainColFlex = cache.add('main-col-flex', document.querySelector('.page-content > .c-9-x > .flex'));

        if(!mainColFlex) {
            return;
        }

        const flexCol1 = cache.add('flex-col1', mainColFlex.children[0]),
            flexCol2 = cache.add('flex-col2', mainColFlex.children[1]);

        $(flexCol1).removeClass('c-8');
        flexCol1.classList.add('c-6');
        $(flexCol2).removeClass('c-4-set');
        flexCol2.classList.add('c-6');

        leftCol.classList.add('bi4-leftcol');
        mainCol.classList.add('bi4-maincol');
        
        // ---------------------------------------------
        // Orientation change => refresh page
        // Workaround for DOM rebuliding
        //
        // Covers tablet orientation changes
        // ---------------------------------------------
        window.addEventListener("orientationchange", function() {
            window.location.reload();
        });
        

        // ----------------------------------------------------------------
        // Build new filters
        // ----------------------------------------------------------------
        generateDesktopFilters();

        // ----------------------------------------------------------------
        // Close menu when clicking outside it
        // ----------------------------------------------------------------
        document.body.addEventListener('click', function(e) {
            if(!$(e.target).closest('.bi4-hfilters__item').length) {
                hideAllMenus();

                $(cache.get('filters')).removeClass('bi4-hfilters--active');
            }
        });
    };

    /**
     * Helper scroll filters into view if off page
     */
    const scrollFilters = (submenu) => {
        if(!scrollOff) {
            scrollOff = true;

            const submenuTop = $(submenu).offset().top,
                windowHeight = window.innerHeight,
                submenuHeight = $(submenu).outerHeight();

            if(submenuTop - window.scrollY + submenuHeight > windowHeight) {
                const targetScroll = submenuTop + submenuHeight - windowHeight + 20;
                scrollTo(targetScroll, null, 400);
            }
        }
    }

    /**
     * Identify active submenu links
     */
    const checkActiveSubmenuLinks = (listItems) => {
        let totalNumActiveLinks = 0,
            activeLinksNames = [];

        [].forEach.call(listItems, (listItem) => {
            const activeLinks = listItem.querySelectorAll('.bi4-submenu__link--active'),
                numActiveLinks = activeLinks.length,
                link = listItem.querySelector('.bi4-link');

            if(numActiveLinks) {
                link.classList.add('bi4-link--has-options-chosen');
            } else {
                $(link).removeClass('bi4-link--has-options-chosen');
            }

            totalNumActiveLinks += numActiveLinks;
        });

        if(totalNumActiveLinks === 0) {
            $(cache.get('clear-button')).removeClass('bi4-actions__clear--active');
        } else {
            cache.get('clear-button').classList.add('bi4-actions__clear--active');
        }

        if($('.bi4-submenu__link').length == 1 || $('.listing-container p:first').text().trim().match(/no results/)) {
            cache.get('clear-button').classList.add('bi4-actions__clear--active');
        }
    }

    // ----------------------------------------------------------------
    // Generate desktop filters
    // ----------------------------------------------------------------
    const generateDesktopFilters = () => {
        // ----------------------------------------------------------------
        // Build HTML and append filters to DOM
        // ----------------------------------------------------------------
        const menuStructure = filterParser.parse(),
            html = filterParser.generateHorizontalLinks(menuStructure);

        cache.get('main-col-flex').insertAdjacentHTML('afterend', html);

        // ----------------------------------------------------------------
        // Set up
        // ----------------------------------------------------------------
        const filters = cache.add('filters', document.querySelector('.bi4-hfilters')),
            filtersHeading = cache.add('filters-heading', document.querySelector('.bi4-hfilters-heading')),
            clearButton = cache.add('clear-button', document.querySelector('.bi4-actions__clear')),
            bi4Links = cache.add('bi4-links', document.querySelectorAll('.bi4-link')),
            submenuLinks = cache.add('submenu-links', document.querySelectorAll('.bi4-submenu__link')),
            submenus = cache.add('bi4-submenus', document.querySelectorAll('.bi4-submenu')),
            listItems = cache.add('bi4-list-items', document.querySelectorAll('.bi4-hfilters__item'));

        checkActiveSubmenuLinks(listItems);

        // ----------------------------------------------------------------
        // Scroll filters if they are out of view
        // ----------------------------------------------------------------
        [].forEach.call(submenus, (submenu) => {
            submenu.addEventListener('webkitTransitionEnd', function() {
                scrollOff = false;
                scrollFilters(submenu);    
            });
            submenu.addEventListener('transitionend', function() {
                scrollOff = false;
                scrollFilters(submenu);    
            });
        });

        // ----------------------------------------------------------------
        // Bind click events to filter items
        // ----------------------------------------------------------------
        [].forEach.call(bi4Links, (item) => {
            item.addEventListener('click', (e) => {
                const link = e.currentTarget,
                    parent = link.parentNode,
                    isActive = !!link.classList.contains('bi4-link--active');
                    
                if(link) {
                    const submenu = link.nextElementSibling.firstElementChild;
                    if(submenu) {
                        // Hide other menus
                        hideAllMenus();

                        // Toggle this menu
                        if(isActive) {
                            $(submenu).removeClass('bi4-submenu--active');
                            $(link).removeClass('bi4-link--active');
                        } else {
                            submenu.classList.add('bi4-submenu--active');
                            link.classList.add('bi4-link--active');
                        }
                    }
                }

                if(filters.querySelectorAll('.bi4-link--active').length) {
                    filters.classList.add('bi4-hfilters--active');
                } else {
                    $(filters).removeClass('bi4-hfilters--active');
                }
            });
        });
        
        // ----------------------------------------------------------------
        // Clear button
        // ----------------------------------------------------------------
        cache.get('clear-button').addEventListener('click', (e) => {
            $(e.currentTarget).removeClass('.bi4-actions__clear--active');

            // Refresh the page without given filters
            window.location = window.location.pathname;
        });

        // ----------------------------------------------------------------
        // Handle submenu links clicked
        //
        // Rebuild the filters as these change
        // ----------------------------------------------------------------
        [].forEach.call(submenuLinks, (item) => {
            item.addEventListener('click', function() {
                const targetString = this.dataset['bi4id'],
                    target = document.querySelector('.bi4-target--' + targetString);

                if(item.classList.contains('bi4-submenu__link--active')) {
                    $(item).removeClass('bi4-submenu__link--active');
                } else {
                    item.classList.add('bi4-submenu__link--active');
                }

                if(target) {
                    target.click();//sg_no_spa_replace
                }

                checkActiveSubmenuLinks(listItems);

                setTimeout(function() {
                    regenerateDesktopFilters();
                }, 600);
            });
        });

        utils.events.send(null, 'did-rebuild-filters');
        utils.events.send(null, 'number-of-top-level-links=' + bi4Links.length);
        utils.events.send(null, 'number-of-bottom-level-links=' + submenuLinks.length);

        // ---------------------------------------------------------------------
        // 'Show only personalised' links
        //
        // Can only do this if occasion > personalised link exists
        // ---------------------------------------------------------------------
        if($('[data-bi4id=occasion__personalised').length > 0) {
            eventSender.send(null, 'did-show-only-personalised-available');

            let active = false;

            if($('.bi4-submenu__link--active').length == 1 && $('[data-bi4id=occasion__personalised]').hasClass('bi4-submenu__link--active')) {
                active = true
            }

            const personalisedToggleHtml = `
                <div class="bi4-toggler bi4-toggler--occasion ${active ? 'bi4-toggler--active' : ''}"   
                    data-bi4target="occasion-personalised"
                >
                    <span class="bi4-toggler__select"></span>
                </div>
            `;

            const toggleHtml = `
                <div class="bi4-toggle-wrap">
                    <label class="bi4-toggle-wrap__title">Show only personalised</label>
                    ${personalisedToggleHtml}
                </div>
            `;

            $('.bi4-hfilters').after(toggleHtml);

            // Toggler event handling
            $('.bi4-toggler').off('click.bi4').on('click.bi4', function() {
                if($(this).hasClass('bi4-toggler--active')) {
                    $(this).removeClass('bi4-toggler--active');

                    window.location = window.location.pathname + '/?bi4-refresh';

                    eventSender.send(null, 'did-show-only-personalised', 'off');
                } else {
                    $(this).addClass('bi4-toggler--active');

                    window.location = window.location.pathname + '/?bi4-refresh' + '#filter=occasion:personalised';

                    eventSender.send(null, 'did-show-only-personalised', 'on');
                }
            });
        }
    };

    // ----------------------------------------------------------------
    // RE-Generate desktop filters
    //
    // Required whenever we modify the filtered results as filter links
    // for which zero results are returned are removed and given 
    // choosable filters are reduced
    // ----------------------------------------------------------------
    const regenerateDesktopFilters = () => {
        $(cache.get('filters')).remove();
        $(cache.get('filters-heading')).remove();
        $('.bi4-toggle-wrap').remove();
        generateDesktopFilters();
    };

    // ----------------------------------------------------------------
    // Helper hide all menus
    // ----------------------------------------------------------------
    const hideAllMenus = () => {
        const submenus = cache.get('bi4-submenus'),
            bi4Links = cache.get('bi4-links');

        [].forEach.call(submenus, (item) => {
            $(item).removeClass('bi4-submenu--active');
        });
        [].forEach.call(bi4Links, (item) => {
            $(item).removeClass('bi4-link--active');
        });
    }

    return {
        run: run,
        regenerateDesktopFilters: regenerateDesktopFilters,
        destroy: function() {
        }
    }
})();

if(!document.querySelector('.bi4-hfilters')) {
    UC.poller([
        () => !!window.JQSG
    ], window.UC.experiments.BI004.run);
}
