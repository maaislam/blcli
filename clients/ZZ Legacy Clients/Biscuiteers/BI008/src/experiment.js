import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as helpers from './lib/helpers';
import hrefList from './lib/list';

// -----------------------------------------------------------
// Set up experiment on the window
// -----------------------------------------------------------
window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || {};
window.UC.experiments.BI008 = {};

if(!(window.UC.experiments.BI008 || {}).pollers) {
    window.UC.experiments.BI008.pollers = [];
}

// -----------------------------------------------------------
// - Destroy any pollers that were running from previous page run
// - Remove any previously created nodes and event handlers in 
// order to prevent duplication
// -----------------------------------------------------------
window.UC.experiments.BI008.destroyOnPageChange = true;
window.UC.experiments.BI008.destroy = () => {
    helpers.destroyPollers();

    // [].forEach.call(document.querySelectorAll('.bi8-plp-letterbox-label'), (item) => {
    //     item.remove();
    //     console.log('top removed');
    // });
    [].forEach.call(document.querySelectorAll('.bi8-product-about'), (item) => {
        item.remove();
    });
    [].forEach.call(document.querySelectorAll('.bi8-pdp-letterbox-banner'), (item) => {
        item.remove();
    });
};

// -----------------------------------------------------------
// Poll elements required for *all* tests
// -----------------------------------------------------------
const poller = UC.poller([
    () => !!window.JQSG
], () => {
    utils.fullStory('BI008---Biscuit Cards USPs', 'Variant 1');

    window.UC.experiments.BI008.run();
}); 

window.UC.experiments.BI008.pollers.push(poller);

// -----------------------------------------------------------
// BI008
// -----------------------------------------------------------
(() => {
    let $ = null;

    const eventSender = utils.events.setDefaultCategory('BI008---Biscuit Cards USPs');

    /**
     * Entry point for experiment, called every time sitegainer.newPage() is called
     */
    const run = () => {
        $ = JQSG;

        // ---------------------------------------------------------------------
        // Initialise PLP / PDP specific pollers
        // ---------------------------------------------------------------------
        initPollers();
        
        // ---------------------------------------------
        // Orientation change => refresh page
        // Workaround for DOM rebuliding
        // ---------------------------------------------
        window.addEventListener("orientationchange", function() {
            window.location.reload();
        });
    };

    /**
     * Helper conditions for matching product name
     */
    const productDoesMatch = (title) => {
      title = title.toLowerCase();
      return !!(title.match(/card/) || title.match(/letterbox/));
    };
    
    const urlList = hrefList;
    const urlDoesMatch = (url) => {
      return !!(urlList[url]);
    };

    /**
     * Initialise specific pollers
     */
    const initPollers = () => {
        // ---------------------------------------------------------------------
        // Poll PLP
        // ---------------------------------------------------------------------
        window.UC.experiments.BI008.pollers.push(
            UC.poller([
                'product-list-item',
                '.page-content[ng-controller="LocalCategoryController"]'
            ], () => {
                // 'Biscuit cards' label
                showCategoryProductLabel();

                // Amends to 'biscuits cards' category
                if(helpers.getPathName() === '/biscuits/biscuit-cards') {
                    updateCategoryPageBlurb();
                }

                // Mutation observers on container
                // When products are filtered out / in, the category page products are reloaded
                UC.observer.connect(document.querySelector('.listing-container > div > div'), function() {
                    // 'Biscuit cards' label
                    showCategoryProductLabel();
                }, {
                    config: {
                        attributes: false,
                        childList: true,
                    }
                });

                // Destroy any other active pollers 
                helpers.destroyPollers();
            })
        );

        // ---------------------------------------------------------------------
        // Poll PDP
        // ---------------------------------------------------------------------
        window.UC.experiments.BI008.pollers.push(
            UC.poller([
                '.page-content[ng-controller="LocalProductController"]',
                () => {
                    const t = $('.wrap h1').text().trim();
                    // return productDoesMatch(t);
                    /**
                     * Amends to match the URL list
                     */
                    const uEl = $('ul.breadcrumbs li:last-of-type > a');
                    if (uEl) {
                      const u = uEl[0];
                      if (u) {
                        const uHref = u.pathname;
                        const doesUrlMatch = urlDoesMatch(uHref);
                        if (doesUrlMatch === true) {
                          return true;
                        } else if (productDoesMatch(t)) {
                          return true;
                        } else {
                          return false;
                        }
                      }

                    }
                }
            ], () => {
                updateProductPage();

                // Destroy any other active pollers 
                helpers.destroyPollers();
            })
        );
    };

    /**
     * Update product page
     */
    const updateProductPage = () => {
        // Banner after title
        const h1 = $('.wrap h1');
        h1.addClass('bi8-title-has-associated-banner');

        h1.after(`
            <span class="bi8-pdp-letterbox-banner inline-block b-a b-col-grey-60 col-grey-40 p-t-1 p-b-1 p-l-4 p-l-3-l p-l-2-m p-l-2-s p-r-4 p-r-3-l p-r-2-m p-r-2-s b-radius col-grey-40 center fs-09-s">
                Easy delivery, our biscuit cards fit through the letterbox
                <img src="//www.sitegainer.com/fu/up/1pt19nf4a4q9nmh.png">
            </span>
        `);

        // Additional information add to 'about'
        $('[ng-bind-html~="::product.about"]').prepend(`
            <p class="bi8-product-about"><i class="icon-star"></i> Easy delivery, biscuit cards fit through the letterbox <i class="icon-star"></i></p>
            <p class="bi8-product-about bi8-product-about--last"><i class="icon-star"></i> Beautifully presented in a keepsake box <i class="icon-star"></i></p>
        `);

        eventSender.send(null, 'did-update-product-page');
    };

    /**
     * Update blurb on category page
     */
    const updateCategoryPageBlurb = () => {
        $('[ng-bind-html="category.description"]').addClass('bi8-cat-page-description').html(`
            With our biscuit cards, they:
            <ul>
                <li>are Easy to deliver</li>
                <li>Fit through the letterbox</li>
                <li>are Beautifully presented in a keepsake box</li>
            </ul>
        `);

        eventSender.send(null, 'did-update-biscuit-cards-category-blurb');
    };

    /**
     * Show a label against biscuit card products on PLP pages
     */
    const showCategoryProductLabel = () => {
        // Clear existing cat cards
        [].forEach.call(document.querySelectorAll('.bi8-plp-letterbox-label'), (item) => {
            item.remove();
        });

        // Update cards
        let numBiscuitCards = 0;
        $('product-list-item').each((idx, item) => {
            const name = $(item).find('[itemprop=name]').text().trim();
            /**
             * Amends to match URL list
             */
            const productHref = $(item).find('.block-item__image a:first').attr('href');
            if(productHref) {
              if(urlDoesMatch(productHref) || productDoesMatch(name)) {
                    numBiscuitCards++;

                    const label = `
                        <a href="${productHref}" class="bi8-plp-letterbox-label inline-block b-a b-col-grey-60 col-grey-40 p-t-1 p-b-1 p-l-4 p-l-3-l p-l-2-m p-l-2-s p-r-4 p-r-3-l p-r-2-m p-r-2-s b-radius col-grey-40 center fs-09-s">
                            letterbox size
                            <img src="//www.sitegainer.com/fu/up/1pt19nf4a4q9nmh.png">
                        </a>
                    `;

                    // $(item).find('.pos-relative:first').append(label);
                    const ref = $(item).find('.pos-relative:first');
                    if (ref) {
                      ref[0].insertAdjacentHTML('beforeend', label);
                    }
                }
            }
        });

        if(numBiscuitCards > 0) {
            eventSender.send(null, 'did-update-plp', 'num-cards=' + numBiscuitCards);
        }

    };

    window.UC.experiments.BI008.run = run;
})();
