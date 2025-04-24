import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || {};

/**
 * Considerations:
 *
 * - The filters don't appear until a user clicks on 'filter by'
 * so we have to faux click on the filters button but hiding the menu 
 * in css until we have been able to grab all menu content
 * - Rebuild navigation when user chooses a filter - sitegainer.newPage() is not called
 * when filtering -- remove any bound event handlers and nodes to prevent memory leaks
 */
window.UC.experiments.BI004Mobile = (function() {
    let $ = null;

    const eventSender = utils.events.setDefaultCategory('BI004---Filters-Redesign---Mobile');

    let mappedMenu = null; // Cached menu once mapped
    
    /**
     * Execute run() every time the filters need to be built
     */
    const run = () => {
        $ = window.JQSG;

        document.querySelector('html').classList.add('bi004m');

        utils.fullStory('BI004---Mobile', 'Variant 1');

        // Initialise mappedMenu cache to null
        mappedMenu = null;

        // --------------------------------------------------------
        // Trigger faux click on filter by
        // 
        // 1. Add class to container so we can use css to hide filters block
        // 2. Once we have polled for the existence of filters:
        // - Hide the filters (faux click again)
        // - Remove container class 
        // --------------------------------------------------------
        if($('.block-filters .block').length > 0) {
            didInitialiseMenu();
        } else {
            document.querySelector('html').classList.add('bi4m-force-hide-filters');

            angular.element($('[off-canvas-toggle=category-filters]')[0]).triggerHandler('click');//sg_no_spa_replace 

            // Filters don't exist yet, so initialise them so we can identify items in the menu
            UC.poller([
                '.off-canvas-open',
                '.block-filters .block'
            ], () => {
                const overlay = $('.off-canvas-open main-overlay')[0];
                overlay.click();//sg_no_spa_replace 

                UC.poller([
                    'off-canvas[name=category-filters] > .off-canvas.ng-hide'
                ], function() {
                    $('html').removeClass('bi4m-force-hide-filters');
                        
                    // ---------------------------------------------
                    // Success
                    // Menu has been built and we should have this available to us
                    // ---------------------------------------------
                    didInitialiseMenu();
                }, {
                    timeout: 3000,
                    timeoutCallback: () => {
                        // ---------------------------------------------
                        // Timed out: reset html class that prevents filters showing
                        // ---------------------------------------------
                        $('html').removeClass('bi4m-force-hide-filters');
                    }
                });
            }, {
                timeout: 3000,
                timeoutCallback: () => {
                    // ---------------------------------------------
                    // Timed out: reset hide filters
                    // ---------------------------------------------
                    $('.off-canvas-open main-overlay')[0].click();//sg_no_spa_replace 
                    $('html').removeClass('bi4m-force-hide-filters');
                }
            });
        }
        
        // ---------------------------------------------
        // Orientation change => refresh page
        // Workaround for DOM rebuliding
        // ---------------------------------------------
        window.addEventListener("orientationchange", function() {
            window.location.reload();
        });
        
        // ---------------------------------------------
        // Move top filter by menu
        // ---------------------------------------------
        $('.page-content > .c-4.m-b:first').insertBefore('.listing-container');
        $('.page-content > .c-12-set.m-b').insertBefore('.listing-container');

        // ---------------------------------------------
        // Event marking fired
        // ---------------------------------------------
        eventSender.send(null, 'did-fire', window.location.pathname);
    };

    /**
     * Re-run
     *
     * Delay to allow filters to be rebuilt
     */
    const reRun = () => {
        setTimeout(run, 500);
    };

    /**
     * Did get menu template
     *
     * Build the new menu elements...
     */
    const didInitialiseMenu = () => {
        // ---------------------------------------------
        // Remove existing elements from dom for rebuild
        // ---------------------------------------------
        $('.bi4m-sliding-menu-wrap').remove();
        $('.bi4m-toggle-wrap').remove();
        $('.bi4m-headings').remove();
        
        // ---------------------------------------------
        // Build occasion sliding menu
        // ---------------------------------------------
        const occasionMenuHtml = buildSlidingMenu('occasion');

        if(occasionMenuHtml) {
            if(window.innerWidth > 519) {
                $('.page-content > .c-9-x > .flex').next('.block').hide();
                $('.page-content > .c-9-x > .flex').after(`
                    <div class="bi4m-sliding-menu-wrap">
                    ${occasionMenuHtml}
                    </div>
                `);
            } else {
                $('.page-content h1:first').after(`
                    <div class="bi4m-sliding-menu-wrap">
                    ${occasionMenuHtml}
                    </div>
                `);
            }

            eventSender.send(null, 'did-show-custom-filters', window.location.pathname);
            
            // ---------------------------------------------
            // Filters text
            // ---------------------------------------------
            $('[off-canvas-toggle=category-filters] span.va-m.inline-block.col-grey-20').text('more filters');

            // ---------------------------------------------
            // Pan on swipe menu
            // ---------------------------------------------
            const slidingMenu = document.querySelector('.bi4m-sliding-menu'),
                $slidingMenu = $(slidingMenu);
            
            // ---------------------------------------------
            // Build personalised toggle
            // ---------------------------------------------
            const personalisedToggleHtml = buildToggleFilter('occasion', 'personalised');

            if(personalisedToggleHtml) {
                const toggleHtml = `
                    <div class="bi4m-toggle-wrap">
                        <label class="bi4m-toggle-wrap__title">Show only personalised</label>
                        ${personalisedToggleHtml}
                    </div>
                `;
                $('.bi4m-sliding-menu-wrap').after(toggleHtml);

                eventSender.send(null, 'did-show-only-personalised-available', window.location.pathname);
            }

            // Remove this link from the sliding menu as it exists in toggle
            $('.bi4m-sliding-link--occasion-personalised').remove();

            // ---------------------------------------------
            // Bind click to links
            // ---------------------------------------------
            bindMappingLinks();
            
            // ---------------------------------------------
            // If any filter links are highlighted, mark toggle off
            // ---------------------------------------------
            if($('.bi4m-sliding-menu__link--active').length) {
                $('.bi4m-toggler--active').removeClass('bi4m-toggler--active');
            }

            // ---------------------------------------------
            // Headings
            // ---------------------------------------------
            if(slidingMenu) {
                document.querySelector('.bi4m-sliding-menu-wrap').insertAdjacentHTML('beforebegin', `
                    <div class="bi4m-headings">
                        <span class="col-pink bi4m-headings__main">select occasion:</span>
                        <span class="bi4m-headings__swipe">swipe for more <img class="bi4m-headings__swipe-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAqCAYAAAADBl3iAAAEUklEQVRogdXaa6hUVRQH8N/Vq5ZpL+1FKpZkKqQ91TB7QRBBIWFgHyqyx5fKHp8qsrBCI4og6INCH3pAFF2wh+AHSYoyDImCXmRqZoZlloVJ6dXbhz3D7Jk7ztlzjmfuvX/YMAxrrf/a65y99tprny75MQyzcBUuwVRMxBiMwj/Yiy34Dh9jPX4pwDkoMBnLsR19OcZHuBPHdNjvwpiEV9Cr+cQOYye+wRf4Hn8eQbYPu/AQRnZyEnkwHA9jv/4TXocHcRGObaLbhVNwLZ7FD/oH4lvML3UGBXCGsG5jh//CCpyZw16XMNl3G2wewuNCXhk0mKb/Ol+JcUfJ/qX4vMH+G0ICHXBMx241x37FNSXwjBDepjgIayr/DxgmYIf6NTqpZM5F+C/ifF1YLh3HCGxQP/nxHeK+Dgcj7vs7xFuHpyIHdgmFTSdxW8R/EDM7ST4dB9S2uCs7SR5hlVoQNujgzrA6In6xTd0ZeBRvCyXvJmH7fBmLcWIbtsaqz0EL2/QlF86LCP/ACYl6U4SsnVX+7seT0rP7zZHulzqQEF+KCJ9I1JkvBKudc8CHwhPOwnAhAVf15iX6FKML3dE4YhBHRhPpxWkJxs9VX+f34jPhlV8uPO3n0aP+de7DWmnrekmkszJBvhEnYXNk4/0j8V4RCa1JMNyFTyry+7AUp2bozMV7Ec89CTzjhRK5Dz/Ltwxm4O+Id0UzoWWRwH0JRhdWZLfgnDYduluY1B4clyC/MfJtaptcVdwg7GpVO4saBeLsf2GiU4eF6ObB0xWuJQmyz0W+3ZSTDx6L7OzXMM842YzOMDRN7USYF9dXbGxKkF0c+ba0ACe8Fdn6SSXXdaslvd+F6LRCdU/uK+gMoYcwGT+2kNkR/W6VnE/Hggy+jcJyGCVUuD24mlr9vTXDAGEbq57fhyfIN0Nc7t6RITsnkn21hdxlkVw7Y9UwtSh/neHMiIpDhO0k7wlxSvQ7qxO0Df9Wfm/PydcKB7qFbfByYZ9shRnqmxVzBQfbxZzo9wUZsr9htpB7VreQ24y7MmyNxTNqPcj1eCBDpw63qH993mxHuYJx6s/9B4Q8VDa68E7Eu02OzlZcL1SdP6ugjT6c3a4jORAf8/fJecx+TX/n10l/gucL67nRRhmtthgL1Qqhw7gxr6H1mmfSHhyfoTtPaLA00789r0MJmCU88SrXsiLG4oKpcewS2tqzhRp+tLDXLhByxaEWuo8UcaoFThaSY29l9Ch4rN4j316bNV4o4lRRtNNuSm2StIuy7CYhNQBj5K/8sjAkApDSxcmLrARaKlID0Ozi82hhQK/JUwNQppNDIgBl3uEP6GVoagDKrNfLSq5JSA1AmbczQyIAZV5MDOhHEanke2W3y/JiyHw1NkG4+IivsIuMnbjXAH8MkQcThfP1Vu1P+pBwqrzVIPkUpujanilco18stK0mCDfB3cLZf7fQ9f0Kn+IDoc01aPA/AdyvTltNCOgAAAAASUVORK5CYII=" /></span>
                    </div>
                `);
            }
        } else {
            eventSender.send(null, 'did-not-show-custom-filters', window.location.pathname);
        }
        
        // ---------------------------------------------
        // Tidy up <br>
        // ---------------------------------------------
        $('.bi4m-toggle-wrap').nextAll('br').remove();
        $('.page-content h1:first').nextAll('br').remove();
    };

    /**
     * Bind mapping links
     *
     * When clicking created menu link, faux click corresponding real filter link
     */
    const bindMappingLinks = () => {
        $('.bi4m-sliding-menu__link').off('click.bi4').on('click.bi4', function() { //sg_no_spa_replace 
            const target = $(this).attr('data-bi4target').trim();

            if(target.length) {
                const targetLink = $('[data-bi4link=' + target + ']');
                if(targetLink.length) {

                    if($(this).hasClass('bi4m-sliding-menu__link')) {
                        $(this).toggleClass('bi4m-sliding-menu__link--active');
                    }

                    if($('.bi4m-sliding-menu__link--active').length) {
                        // If any links were marked active, remove active class on togglers
                        // which are single-filter only toggles
                        $('.bi4m-toggler--active').removeClass('bi4m-toggler--active');
                    }

                    targetLink[0].click();//sg_no_spa_replace  

                    eventSender.send(null, 'did-click-filter-menu-link', window.location.pathname);

                    reRun();
                }
            }
        });

        $('.bi4m-toggler').off('click.bi4m').on('click.bi4m', function() { //sg_no_spa_replace
            if($(this).hasClass('bi4m-toggler--active')) {
                $(this).removeClass('bi4m-toggler--active');
                window.location = window.location.pathname + '/?bi4m-refresh';

                eventSender.send(null, 'did-show-only-personalised', 'off');
            } else {
                $(this).addClass('bi4m-toggler--active');
                window.location = window.location.pathname + '/?bi4m-refresh' + '#filter=occasion:personalised';

                eventSender.send(null, 'did-show-only-personalised', 'on');
            }
        });
    };

    /**
     * Build toggle (single) filter
     */
    const buildToggleFilter = (menuKey, filterId) => {
        const menus = mapMenu(),
            flatKey = menuKey + '-' + filterId,
            filterItem = (menus.__flat || {})[flatKey];

        let html = '';
        if(filterItem) {
            html = `
                <div class="bi4m-toggler bi4m-toggler--${menuKey} ${filterItem.checked ? 'bi4m-toggler--active' : ''}"
                    data-bi4target="${filterItem.identifier}"
                >
                    <span class="bi4m-toggler__select"></span>
                </div>
            `;
        }
        return html;
    };

    /**
     * Build the occasion filters
     */
    const buildSlidingMenu = (menuKey) => {
        const menus = mapMenu(),
            menu = (menus || {})[menuKey];

        let html = '';
        if(menu) {
            html = '<ul class="bi4m-sliding-menu">';

            menu.forEach(function(item) {
                const name = item.name,
                    identifier = item.identifier,
                    activeClass = item.checked ? 'bi4m-sliding-menu__link--active' : '';

                html += `<li class="bi4m-sliding-link--${identifier}">
                    <a class="bi4m-sliding-menu__link ${activeClass}" data-bi4target="${identifier}">${name}</a>
                </li>`;
            });

            html += '</ul>';
        }

        return html;
    };

    /**
     * Map menus to existing filter set
     *
     * Returns collection of links that map
     */
    const mapMenu = () => {
        if(!mappedMenu) {
            const results = {};
            results.__flat = {};

            $('.block-filters .block').each(function() {
                const label = $(this).find('> label:first'),
                    labelText = label.children('span:first').text().trim(),
                    labelIdentifier = utils.slugify(labelText);

                // Grab individual links and map them
                const links = $(this).find('.block-filters__content:first span.checkbox'),
                    resultLinks = [];

                links.each(function() {
                    const name = $(this).text().trim(),
                        identifier = utils.slugify(name);

                    $(this).attr('data-bi4link', labelIdentifier + '-' + identifier);

                    var result = {
                        name: name,
                        checked: !!$(this).hasClass('checked'),
                        identifier: labelIdentifier + '-' + identifier
                    };
                    resultLinks.push(result);

                    results.__flat[labelIdentifier + '-' + identifier] = result;
                });

                results[labelIdentifier] = resultLinks;
            });

            mappedMenu = results;
        }

        return mappedMenu;
    };

    /**
     * Helper send error event
     */
    const sendErrorEvent = (label) => {
        eventSender.send(null, 'Error', label || '');
    };

    return {
        run: run
    }
})();

// ----------------------------------------------------------------
// Run..
// ----------------------------------------------------------------
UC.poller([() => !!window.JQSG], () => window.UC.experiments.BI004Mobile.run());
