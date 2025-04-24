/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, logMessage, observer } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let firstRun = true;

const addPLPWishlistTracking = () => {
  firstRun = false;
  // dae stuff here

  let allPLPWishlistIcons = document.querySelectorAll('.smartwishlist');
  [].slice.call(allPLPWishlistIcons).forEach((icon) => {
    icon.classList.add(`${ID}-tracked`);
    icon.addEventListener('click', (e) => {
      fireEvent(`Click - user has clicked on the wishlist icon to ${e.currentTarget.classList.contains('unbookmarked') ? 'add' : 'remove'} the product: ${e.currentTarget.getAttribute('data-product')} which is on ${window.location.href}`);
    });
  })

}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    pollerLite(['.site-header__wishlist'], () => {
      document.documentElement.classList.add(`${ID}-wishlist-hidden`);
      return;
    });
    
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  
  pollerLite(['.site-header__wishlist'], () => {

    document.documentElement.classList.add(`${ID}-wishlist-shown`);

    // Track clicks on wishlist header item

    let siteHeaderWishlistIcon = document.querySelector('.site-header__wishlist');
    siteHeaderWishlistIcon.addEventListener('click', (e) => {
      fireEvent('Click - user has clicked on the header wishlist icon');
    });

    if(document.body.classList.contains('template-collection')) {

      pollerLite(['.boost-pfs-filter-products .grid__item .smartwishlist'], () => {
        addPLPWishlistTracking();


        observer.connect(document.querySelector('.boost-pfs-filter-products'), (e) => {
          setTimeout(() => {
            if(!document.querySelector('.smartwishlist').classList.contains(`${ID}-tracked`)) {
              addPLPWishlistTracking();
            }
            
          }, 500);
  
  
  
        }, {
          config: {
            attributes: true,
            childList: false,
            subtree: false,
          }
        });

      });

      

    }

    if(document.body.classList.contains('template-product')) {

      pollerLite(['#sw_wishlist_label'], () => {

        let wishlistIcon = document.getElementById('sw_wishlist_label');
        wishlistIcon.addEventListener('click', (e) => {
          fireEvent(`Click - user has clicked on ${e.target.innerText} on product: ${window.location.href}`);
        });

      });


    }

    if(window.location.href.indexOf('/a/wishlist') > -1) {

      // dae wl stuff here

      document.documentElement.classList.add(`${ID}-wishlist-page`);

      pollerLite(['#bookmarks .product', '.removebutton.clearall', '.sharebutton'], () => {

        let allWLProducts = document.querySelectorAll('#bookmarks .product');
        [].slice.call(allWLProducts).forEach((product) => {

          product.querySelector('.image a').addEventListener('click', (e) => {
            fireEvent(`Click - user has clicked on WL item image to take them back to the PDP which is: ${e.currentTarget.href}`);
          });

        })

        pollerLite(['#modal_remove_button'], () => {
          let removeButton = document.getElementById('modal_remove_button');
          removeButton.addEventListener('click', (e) => {
            fireEvent(`Click - user has clicked on WL item remove button to remove item: ${e.currentTarget.getAttribute('data-product_id')}`);
          });
        })

        let removeAllButton = document.querySelector('.removebutton.clearall');
        removeAllButton.addEventListener('click', (e) => {

          pollerLite(['#modal_remove_all_button'], () => {
            let removeAllButton = document.getElementById('modal_remove_all_button');
            removeAllButton.addEventListener('click', (e) => {
              fireEvent(`Click - user has clicked on remove all wishlist items button`);
            });
          })
        });

        let shareWishlistButton = document.querySelector('.sharebutton');
        shareWishlistButton.addEventListener('click', (e) => {
          fireEvent(`Click - user has clicked on share wishlist button`);
        });



      })

    }

  })
  
};
