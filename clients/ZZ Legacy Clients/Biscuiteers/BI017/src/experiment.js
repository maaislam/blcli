import * as UC from '../../../../lib/uc-lib';
import {cacheDom} from '../../../../lib/cache-dom';
import * as utils from '../../../../lib/utils';

window.UC = window.UC || {};

const experiments = window.UC.experiments = (window.UC.experiments || {});
const exp = experiments['BI017'] = experiments['BI017'] || {};
exp.pollers = exp.pollers || [];

utils.destroyPollers('BI017');

// ---------------------------------------------------------
// Hold outer ref to jQuery
// ---------------------------------------------------------
let $ = null;

/**
 * Product IDs that we want to upsell, given in order shown
 */
const loadedProducts = [
    {
        id: 943,
        // image: '//thumbor-gc.tomandco.uk/unsafe/trim/fit-in/303x303/center/middle/smart/filters:fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog//product/f/f/fffff.jpg',    
        image: 'https://d191y0yd6d0jy4.cloudfront.net/g4eo7gc8zkfztv3.jpg',
        name: 'prosecco',
        price: '20'
    },
    {
        id: 942,
        image: '//d191y0yd6d0jy4.cloudfront.net/gk8f6mgmbfn35ad.jpg',
        name: 'gusbourne sparkling rose',
        price: '50'
    },
    {
      id: 990,
      image: '//cdn-sitegainer.com/uv48vfxipsp0p7x.jpg',
      name: 'Tregothnan for Biscuiteers Tea',
      price: '15.95'
  }
];

/**
 * Define link to image manipulator
 */
const imageUrlPrefix = `https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/303x303/center/middle/smart/filters:fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog/`;

/**
 * Entry point for product page amends
 */
const run = () => {
    // ---------------------------------------------------------
    // Set up
    // ---------------------------------------------------------
    utils.fullStory('BI017', 'Variation 1');

    const eventSender = utils.events.setDefaultCategory('BI017-PDP AOV Upsell');

    document.body.classList.add('bi017');

    // ---------------------------------------------------------
    // Get root scope for basket $on event handling
    // ---------------------------------------------------------
    const $rootScope = angular.element(document.querySelector('html')).scope();
    if(!$rootScope) {
        angular.reloadWithDebugInfo();

        return;
    }

    // ---------------------------------------------------------
    // Build upsell products markup
    // ---------------------------------------------------------
    if(loadedProducts.length) {
        const upsellRegion = cacheDom.get('upsell-product-options');
        if(!upsellRegion) {
            return;
        }

        const existingWrapper = cacheDom.get('.bi17-upsell-wrapper', true);
        if(existingWrapper) {
          existingWrapper.remove();
        }

        upsellRegion.insertAdjacentHTML('afterend', `
            <div class="bi17-upsell-wrapper">
                <p class="bi17-upsell-wrapper__lead-text">
                    why not add a little extra? Add a variety of extras for that special someone
                </p>
            </div>
        `);

        const upsellWrapper = cacheDom.get('.bi17-upsell-wrapper');
        loadedProducts.forEach((item) => {
            if(!upsellWrapper) {
                return;
            }

            eventSender.send(null, 'did-show-upsell-products');

            upsellWrapper.insertAdjacentHTML('beforeend', `
                <div class="bi17-upsell-item">
                    <div class="bi17-upsell-item__image">
                        <img src="${item.image}" />
                    </div>
                    <div class="bi17-upsell-item__text">
                        ${item.name}
                        <div>+ £${item.price}</div>
                    </div>
                    <div class="bi17-upsell-item__addbox">
                        <span data-id="${item.id}" 
                            class="bi17-upsell-item__checkbox icon-checkbox-unchecked"></span>
                        <em>add</em>
                    </div>
                </div>
            `);
        });
    }

    // ---------------------------------------------------------
    // Checkbox toggling
    // ---------------------------------------------------------
    [].forEach.call(cacheDom.getAll('.bi17-upsell-item'), (item) => {
        item.addEventListener('click', (e) => {
            const checkbox = e.currentTarget.querySelector('.bi17-upsell-item__checkbox');

            if(checkbox && checkbox.classList.contains('icon-checkbox-unchecked')) {
                checkbox.classList.remove('icon-checkbox-unchecked');    
                checkbox.classList.add('icon-checkbox-checked');    
            } else if(checkbox && checkbox.classList.contains('icon-checkbox-checked')) {
                checkbox.classList.remove('icon-checkbox-checked');    
                checkbox.classList.add('icon-checkbox-unchecked');    
            }

            eventSender.send(null, 'did-click-add-checkbox-against-upsell-item');
        });
    });

    // ---------------------------------------------------------
    // On add to basket of main product, add upsells
    // ---------------------------------------------------------
    $rootScope.$on('basket.add', () => {
        const productsToAdd = [];

        eventSender.send(null, 'did-add-to-basket');

        [].forEach.call(cacheDom.getAll('.bi17-upsell-item'), (item, idx) => {
            const checkbox = item.querySelector('.bi17-upsell-item__checkbox');
            if(checkbox.classList.contains('icon-checkbox-checked')) {
                const id = checkbox.dataset.id;
                productsToAdd.push({
                    id: id,
                    qty: 1    
                });

                checkbox.classList.remove('icon-checkbox-checked');
                checkbox.classList.add('icon-checkbox-unchecked');
            }
        });

        if(productsToAdd.length) {
            tco.get('customer').basket.add({
                products: productsToAdd
            }, {}, {});
        }
    });
};

// ---------------------------------------------------------
// Poll required elements
// ---------------------------------------------------------
const mainPoller = UC.poller([
    () => !!(angular && window.tco && window.tco.get),
    () => {
        const upsellLabel = document.querySelector('upsell-product-options [ng-bind="vm.label"]');
        if(upsellLabel) {
            return upsellLabel.innerText.trim().match(/add bubbly/) || upsellLabel.innerText.trim().match(/prosecco/) || upsellLabel.innerText.trim().match('add something special?');
        }
    },
    '.selection__options',
    'upsell-product-options'
], function() {
    $ = window.JQSG;
    
    run();    
});

exp.pollers.push(mainPoller);
