import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || {};

const VARIATION = '{{VARIATION}}';

/**
 * Considerations:
 *
 * - The filters don't appear until a user clicks on 'filter by'
 * so we have to faux click on the filters button but hiding the menu 
 * in css until we have been able to grab all menu content
 * - Rebuild navigation when user chooses a filter - sitegainer.newPage() is not called
 * when filtering -- remove any bound event handlers and nodes to prevent memory leaks
 */
window.UC.experiments.BI018 = (function() {
    let $ = null;

    const eventSender = utils.events.setDefaultCategory('BI018');

    let mappedMenu = null; // Cached menu once mapped
    
    /**
     * Execute run() every time the filters need to be built
     */
    const run = () => {
        $ = window.JQSG;

        document.querySelector('html').classList.add('BI018');

        utils.fullStory('BI018', 'Variant ' + VARIATION);

        // Remove existing scroll event handlers on window
        $(window).off('scroll.bi018');

        // Initialise mappedMenu cache to null
        mappedMenu = null;
        
        // --------------------------------------------------------
        // Remove cat title subtitle 
        // --------------------------------------------------------
        $('h1 + p').eq(0).remove();
        $('h1 ~ .c-4.m-b.p-a-2').remove();

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
            document.querySelector('html').classList.add('bi18-force-hide-filters');

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
                    $('html').removeClass('bi18-force-hide-filters');
                        
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
                        $('html').removeClass('bi18-force-hide-filters');
                    }
                });
            }, {
                timeout: 3000,
                timeoutCallback: () => {
                    // ---------------------------------------------
                    // Timed out: reset hide filters
                    // ---------------------------------------------
                    $('.off-canvas-open main-overlay')[0].click();//sg_no_spa_replace 
                    $('html').removeClass('bi18-force-hide-filters');
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

        $('[ng-controller=LocalCategoryController] > .c-8.m-r-0.m-b:first')
          .insertBefore('.listing-container')
          .addClass('bi18-more-filters');

        // ---------------------------------------------
        // Event marking fired
        // ---------------------------------------------
        eventSender.send(null, 'did-fire', window.location.pathname);
        
        // ---------------------------------------------
        // Sticky scroll
        // ---------------------------------------------
        $(window).off('scroll.bi018');
        $('.bi18-sticky').remove();

        $('body').prepend(`
          <div class="bi18-sticky" style="display: none;">
            <div class="c-8 m-r-0 m-b p-a-2 b-a b-col-pink center">
              <span class="block cursor-pointer">
                <span class="fs-15 icon icon--filter va-m inline-block"></span>
                <span class="va-m inline-block col-grey-20">filter by</span>
              </span>
            </div>
          </div>
        `);

        $('.bi18-sticky > div').on('click', () => {
          $('.bi18-more-filters > span > span')[0].click();
          eventSender.send(null, 'did-click-sticky-filters-button', window.location.pathname, {
            sendOnce: true  
          });
        });

        const container = $('.listing-container');
        $(window).on('scroll.bi018', (e) => {
          if(
            container.length && 
            document.documentElement.classList.contains('BI018') && 
            document.querySelector('.bi18-headings')
          ) {
            const startY = container.offset().top;
            if(startY && window.scrollY > startY - 60) {
              $('.bi18-sticky').addClass('bi18-sticky--active');
              eventSender.send(null, 'sticky-nav-did-show', window.location.pathname, {
                sendOnce: true  
              });
            } else {
              $('.bi18-sticky').removeClass('bi18-sticky--active');
            }
          }
        });

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
        $('.bi18-sliding-menu-wrap').remove();
        $('.bi18-toggle-wrap').remove();
        $('.bi18-headings').remove();
        
        // ---------------------------------------------
        // Build sliding menu
        //
        // V1 = occasion
        // V2 = price range
        // ---------------------------------------------
        let menuKey = 'occasion';
        if(VARIATION == 2) {
          menuKey = 'pricerange';
        }
        const occasionMenuHtml = buildSlidingMenu(menuKey);

        if(occasionMenuHtml) {
            if(window.innerWidth > 519) {
                $('.page-content > .c-9-x > .flex').next('.block').hide();
                $('.page-content > .c-9-x > .flex').after(`
                    <div class="bi18-sliding-menu-wrap">
                    ${occasionMenuHtml}
                    </div>
                `);
            } else {
                $('.page-content h1:first').after(`
                    <div class="bi18-sliding-menu-wrap">
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
            const slidingMenu = document.querySelector('.bi18-sliding-menu'),
                $slidingMenu = $(slidingMenu);

            // ---------------------------------------------
            // Headings
            // ---------------------------------------------
            let heading = 'select:';
            switch(menuKey) {
              case 'occasion':
                heading = 'select occasion:';
                break;
              case 'pricerange':
                heading = 'select price:';
                break;
            }
            
            if(slidingMenu) {
                const title = document.querySelector('.c-12 > h1');
                let titleLength = 0;
                if(title && title.textContent) {
                  titleLength = title.textContent.trim().length;
                }

                let classNames = '';
                if(titleLength > 10) {
                  classNames = 'bi18-long-title';
                }

                document.querySelector('.bi18-sliding-menu-wrap').insertAdjacentHTML('beforebegin', `
                    <div class="bi18-headings ${classNames}">
                        <span class="col-pink bi18-headings__main">${heading}</span>
                        <span class="bi18-headings__swipe">swipe for more <img class="bi18-headings__swipe-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAqCAYAAAADBl3iAAAEUklEQVRogdXaa6hUVRQH8N/Vq5ZpL+1FKpZkKqQ91TB7QRBBIWFgHyqyx5fKHp8qsrBCI4og6INCH3pAFF2wh+AHSYoyDImCXmRqZoZlloVJ6dXbhz3D7Jk7ztlzjmfuvX/YMAxrrf/a65y99tprny75MQyzcBUuwVRMxBiMwj/Yiy34Dh9jPX4pwDkoMBnLsR19OcZHuBPHdNjvwpiEV9Cr+cQOYye+wRf4Hn8eQbYPu/AQRnZyEnkwHA9jv/4TXocHcRGObaLbhVNwLZ7FD/oH4lvML3UGBXCGsG5jh//CCpyZw16XMNl3G2wewuNCXhk0mKb/Ol+JcUfJ/qX4vMH+G0ICHXBMx241x37FNSXwjBDepjgIayr/DxgmYIf6NTqpZM5F+C/ifF1YLh3HCGxQP/nxHeK+Dgcj7vs7xFuHpyIHdgmFTSdxW8R/EDM7ST4dB9S2uCs7SR5hlVoQNujgzrA6In6xTd0ZeBRvCyXvJmH7fBmLcWIbtsaqz0EL2/QlF86LCP/ACYl6U4SsnVX+7seT0rP7zZHulzqQEF+KCJ9I1JkvBKudc8CHwhPOwnAhAVf15iX6FKML3dE4YhBHRhPpxWkJxs9VX+f34jPhlV8uPO3n0aP+de7DWmnrekmkszJBvhEnYXNk4/0j8V4RCa1JMNyFTyry+7AUp2bozMV7Ec89CTzjhRK5Dz/Ltwxm4O+Id0UzoWWRwH0JRhdWZLfgnDYduluY1B4clyC/MfJtaptcVdwg7GpVO4saBeLsf2GiU4eF6ObB0xWuJQmyz0W+3ZSTDx6L7OzXMM842YzOMDRN7USYF9dXbGxKkF0c+ba0ACe8Fdn6SSXXdaslvd+F6LRCdU/uK+gMoYcwGT+2kNkR/W6VnE/Hggy+jcJyGCVUuD24mlr9vTXDAGEbq57fhyfIN0Nc7t6RITsnkn21hdxlkVw7Y9UwtSh/neHMiIpDhO0k7wlxSvQ7qxO0Df9Wfm/PydcKB7qFbfByYZ9shRnqmxVzBQfbxZzo9wUZsr9htpB7VreQ24y7MmyNxTNqPcj1eCBDpw63qH993mxHuYJx6s/9B4Q8VDa68E7Eu02OzlZcL1SdP6ugjT6c3a4jORAf8/fJecx+TX/n10l/gucL67nRRhmtthgL1Qqhw7gxr6H1mmfSHhyfoTtPaLA00789r0MJmCU88SrXsiLG4oKpcewS2tqzhRp+tLDXLhByxaEWuo8UcaoFThaSY29l9Ch4rN4j316bNV4o4lRRtNNuSm2StIuy7CYhNQBj5K/8sjAkApDSxcmLrARaKlID0Ozi82hhQK/JUwNQppNDIgBl3uEP6GVoagDKrNfLSq5JSA1AmbczQyIAZV5MDOhHEanke2W3y/JiyHw1NkG4+IivsIuMnbjXAH8MkQcThfP1Vu1P+pBwqrzVIPkUpujanilco18stK0mCDfB3cLZf7fQ9f0Kn+IDoc01aPA/AdyvTltNCOgAAAAASUVORK5CYII=" /></span>
                    </div>
                `);
            }
            
            // ---------------------------------------------
            // Build personalised toggle
            // ---------------------------------------------
            const personalisedToggleHtml = buildToggleFilter('occasion', 'personalised');

            if(personalisedToggleHtml) {
                const toggleHtml = `
                    <div class="bi18-toggle-wrap">
                        <label class="bi18-toggle-wrap__title">Show only personalised</label>
                        ${personalisedToggleHtml}
                    </div>
                `;

                $('.bi18-headings').prepend(toggleHtml);

                eventSender.send(null, 'did-show-only-personalised-available', window.location.pathname);
            }

            // Remove this link from the sliding menu as it exists in toggle
            $('.bi18-sliding-link--occasion-personalised').remove();

            // ---------------------------------------------
            // Bind click to links
            // ---------------------------------------------
            bindMappingLinks();
            
            // ---------------------------------------------
            // If any filter links are highlighted, mark toggle off for when menu key matches occasion
            // as can't have toggle + menu key equal
            // ---------------------------------------------
            if($('.bi18-sliding-menu__link--active').length && menuKey == 'occasion') {
                $('.bi18-toggler--active').removeClass('bi18-toggler--active');

                $('.bi18-more-filters').addClass('c-12');
            } else {
                $('.bi18-more-filters').removeClass('c-12');
            }
        } else {
            eventSender.send(null, 'did-not-show-custom-filters', window.location.pathname);
        }
        
        // ---------------------------------------------
        // Quick remove links
        // ---------------------------------------------
        const quickRemove = $('.bi18-quick-remove');
        quickRemove.remove();

        const activeLinks = $('.bi18-sliding-menu__link--active');
        const h = `
            <div class="bi18-quick-remove">
              ${activeLinks.map((idx, item) => {
                return `
                  <div class="bi18-quick-remove__item" data-bi18target="${item.dataset['bi18target']}">
                    <i class="icon-close"></i>
                    ${item.textContent}
                  </div>
                `;
              }).toArray().join('')}
            </div>
        `;
        $('.bi18-sliding-menu-wrap').after(h);

        $('.bi18-quick-remove__item').on('click', (e) => {
          const target = e.currentTarget.dataset['bi18target'];

          $('.bi18-sliding-menu__link[data-bi18target=' + target + ']').click();
        });

        
        // ---------------------------------------------
        // Tidy up <br>
        // ---------------------------------------------
        $('.bi18-toggle-wrap').nextAll('br').remove();
        $('.page-content h1:first').nextAll('br').remove();
    };

    /**
     * Helper show loader
     */
    const showLoader = (keyword, hideOnTimeout = true) => {
      removeLoader();

      const loaderHtml = `
        <div class="bi18-loader">
          <div>
            <img src="https://thumbor-gc.tomandco.uk/unsafe/513x0/center/middle/smart/filters:sharpen(0.5,0.5,true)/https://www.biscuiteers.com/images/logo-biscuiteers-mobile.png" />
            <p class="center">
              prepping ${keyword} biscuits...
            </p>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('afterbegin', loaderHtml);

      if(hideOnTimeout) {
        setTimeout(() => {
          const loaderDiv = document.querySelector('.bi18-loader');
          if(loaderDiv) {
            loaderDiv.remove();
          }
        }, 1500);
      }
    };

    /**
     * Helper remove loader
     */
    const removeLoader = () => {
      const loaderDiv = document.querySelector('.bi18-loader');
      if(loaderDiv) {
        loaderDiv.remove();
      }
    };

    /**
     * Bind mapping links
     *
     * When clicking created menu link, faux click corresponding real filter link
     */
    const bindMappingLinks = () => {
        $('.bi18-sliding-menu__link').off('click.bi18').on('click.bi18', function() { //sg_no_spa_replace 
            const target = $(this).attr('data-bi18target').trim();

            if(target.length) {
                const targetLink = $('[data-bi18link=' + target + ']');
                if(targetLink.length) {

                    if($(this).hasClass('bi18-sliding-menu__link')) {

                      if($(this).hasClass('bi18-sliding-menu__link--active')) {
                        $(this).removeClass('bi18-sliding-menu__link--active');

                        showLoader('');
                      } else {
                        $(this).removeClass('bi18-sliding-menu__link--active');

                        showLoader(this.textContent);
                      }
                    }

                    if($('.bi18-sliding-menu__link--active').length) {
                        // If any links were marked active, remove active class on togglers
                        // which are single-filter only toggles
                        $('.bi18-toggler--active').removeClass('bi18-toggler--active');
                    }

                    targetLink[0].click();//sg_no_spa_replace  

                    eventSender.send(null, 'did-click-filter-menu-link', window.location.pathname);

                    reRun();
                }
            }
        });

        $('.bi18-toggler').off('click.bi18').on('click.bi18', function() { //sg_no_spa_replace
            if($(this).hasClass('bi18-toggler--active')) {
                $(this).removeClass('bi18-toggler--active');
                window.location = window.location.pathname + '/?bi18-refresh';

                showLoader('');

                eventSender.send(null, 'did-show-only-personalised', 'off');
            } else {
                $(this).addClass('bi18-toggler--active');
                window.location = window.location.pathname + '/?bi18-refresh' + '#filter=occasion:personalised';

                showLoader('personalised');

                eventSender.send(null, 'did-show-only-personalised', 'on');
            }
        });

        $('off-canvas .off-canvas-left').off('click.bi18').on('click.bi18', '.checkbox', () => {
          reRun();
        });
    };

    /**
     * Build toggle (single) filter
     */
    const buildToggleFilter = (menuKey, filterId) => {
        const menus = mapMenu(),
            flatKey = menuKey + '-' + filterId,
            filterItem = (menus.__flat || {})[flatKey];

        // Extra check if URL contains menu key / filter id
        let active = filterItem.checked;
        if(window.location.href.indexOf(menuKey + ':' + filterId) > -1) {
          active = true;
        }

        let html = '';
        if(filterItem) {
            html = `
                <div class="bi18-toggler bi18-toggler--${menuKey} ${active ? 'bi18-toggler--active' : ''}"
                    data-bi18target="${filterItem.identifier}"
                >
                    <span class="bi18-toggler__select"></span>
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
            html = '<ul class="bi18-sliding-menu">';

            menu.forEach(function(item) {
                const name = item.name,
                    identifier = item.identifier,
                    activeClass = item.checked ? 'bi18-sliding-menu__link--active' : '';

                html += `<li class="bi18-sliding-link--${identifier}">
                    <a class="bi18-sliding-menu__link ${activeClass}" data-bi18target="${identifier}">
                      <i class="icon-ok"></i>
                      <span>${name}</span>
                    </a>
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

                    $(this).attr('data-bi18link', labelIdentifier + '-' + identifier);

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
UC.poller([() => !!window.JQSG], () => window.UC.experiments.BI018.run());
