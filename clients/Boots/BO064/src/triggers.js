/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','.product_listing_container .grid_mode.grid li', '.estore_product_container', '.showing_products_current_range'], () => {
    setTimeout(() => {
        checkGrid();
    }, 1000);
});

function checkGrid() {
    if(document.querySelector('.grid_mode.grid').getAttribute('data-dojo-props').indexOf('{0:1') > -1) {
        return false
    } else {
        activate();
    }
}

pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range',
], () => {

const getIds = () => [].slice.call(document.querySelectorAll('.estore_product_container')).map(elm => elm.dataset.productid).join('');

// for observer
let oldHref = document.location.href;
let oldIds = getIds();
let bodyList = document.querySelector(".product_listing_container");
let timeout = null;
const observer = new MutationObserver(function(mutations) {
    clearTimeout(timeout);
    setTimeout(() => {
        
    
        mutations.forEach(function(mutation) {
            if (oldHref != document.location.href || oldIds != getIds()) {
                oldHref = document.location.href;
                oldIds = getIds();
                document.body.classList.remove('BO064');
                document.body.classList.remove('BO064-1');
                document.body.classList.remove('BO064-2');
                document.body.classList.remove('BO064-3');
                const block = document.querySelectorAll(`.BO064-inGridBlock`);
                    for (let index = 0; index < block.length; index += 1) {
                        const element = block[index];
                        if(element) {
                            element.remove();
                        }
                    }

                    pollerLite(['body','.product_listing_container .grid_mode.grid li', '.estore_product_container', '.showing_products_current_range'], () => {
                        setTimeout(() => {
                            checkGrid();
                        }, 1000);
                    });
            }
        });
        }, 600);
    });
const config = {
    throttle: 500,
    childList: true,
    subtree: false
};

observer.observe(bodyList, config);
}); 