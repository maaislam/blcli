import { setup } from './services';
import settings from './settings';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

const activate = () => {
  setup();

  /**
   * @desc Create the wishlist area
   */
  const newWishlistArea = () => {
    const wishListArea = document.createElement('div');
    wishListArea.classList.add(`${settings.ID}-wishlist_wrapper`);
    wishListArea.innerHTML = `
    <div class="${settings.ID}-wishlist_title">
      <h3>Wishlist <span></span></h3>
      <a href="/webstore/showWishlist.sdo">View full wishlist</a>
    </div>
    <div class="${settings.ID}-wishlist_items">
      <div class="${settings.ID}-wishlist_products">
      <div class="HS015-wishlist-box HS015-box_one"></div>
      <div class="HS015-wishlist-box HS015-box_two"></div>
      <div class="HS015-wishlist-box HS015-box_three"></div>
      </div>
      <div class="${settings.ID}-save_wishlist">
        <span>To save your wishlist:</span>
        <a href="/webstore/secure/account/login.sdo">Register/Sign in</a>
      </div>
    </div>`;
    document.body.appendChild(wishListArea);
  };
  /**
   * @desc pull in wishlist
   */
  const getWishlist = () => {
    const wishlistPage = '/webstore/showWishlist.sdo';
    const request = new XMLHttpRequest();
    request.open('GET', wishlistPage, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('div');
        temp.innerHTML = request.responseText;
        const firstwishListItem = temp.querySelector('.wishlistItems .wishlistItem');
        const wishlistItems = temp.querySelectorAll('.wishlistItems .wishlistItem');


        if (firstwishListItem) {
          newWishlistArea();
          for (let index = 0; index < wishlistItems.length; index += 1) {
            const element = wishlistItems[index];
            if (index !== 0) {
              document.querySelector(`.${settings.ID}-wishlist_products`).classList.add(`${settings.ID}-wishlist-morethan1`);
            }

            // add the wishlist items to the boxes
            if (index === 0) {
              document.querySelector('.HS015-box_one').appendChild(element);
            }
            if (index === 1) {
              document.querySelector('.HS015-box_two').appendChild(element);
            }
            if (index === 2) {
              document.querySelector('.HS015-box_three').appendChild(element);
            }
            if (window.innerWidth < 767) {
              if (index === 2) {
                document.querySelector('.HS015-box_three').remove();
                break;
              }
            } else {
              /* eslint-disable */
              if (index === 4) {
                break;
              }
              /* eslint-enable */
            }
          }
          document.querySelector(`.${settings.ID}-wishlist_title h3 span`).textContent = `(${wishlistItems.length})`;
          events.send(settings.ID, 'View', `${settings.ID} Count number of items in wishlist - Variation ${settings.VARIATION}`);
        }
      }
    };
    request.send();
  };

  getWishlist();

  /**
   * @desc Hide/show wishlist items
   */
  const showWishlist = () => {
    const toggleWishList = document.querySelector(`.${settings.ID}-wishlist_title`);
    const wishlistItems = document.querySelector(`.${settings.ID}-wishlist_items`);
    toggleWishList.addEventListener('click', () => {
      if (wishlistItems.classList.contains(`${settings.ID}-wishlist-showing`)) {
        wishlistItems.classList.remove(`${settings.ID}-wishlist-showing`);
        toggleWishList.classList.remove(`${settings.ID}-wishlistTitle-active`);
      } else {
        events.send(settings.ID, 'Clicked', `${settings.ID} expanded wishlist - Variation ${settings.VARIATION}`);
        wishlistItems.classList.add(`${settings.ID}-wishlist-showing`);
        toggleWishList.classList.add(`${settings.ID}-wishlistTitle-active`);
      }
    });
  };
  pollerLite([`.${settings.ID}-wishlist_title`], () => {
    showWishlist();
  });

  /**
   * @desc If logged out user then change the messaging
   */
  const loggedOutUser = () => {
    const wishlistSave = document.querySelector(`.${settings.ID}-save_wishlist`);
    wishlistSave.innerHTML = `<span class="${settings.ID}-loggedin">Your wishlist is saved under your account</span>`;
    wishlistSave.classList.add(`${settings.ID}-loggedinMessage`);
  };

  if (window.digitalData.user[0].profile[0].profileInfo.profileID !== 'loggedOut') {
    pollerLite([`.${settings.ID}-save_wishlist`], () => {
      loggedOutUser();
    });
  }
  /**
   * @desc if any of the boxes are empty, set them by default
   */
  const emptyBoxes = () => {
    const allBoxes = document.querySelectorAll('.HS015-wishlist-box');
    for (let index = 0; index < allBoxes.length; index += 1) {
      const element = allBoxes[index];
      if (!element.querySelector('.wishlistItem')) {
        element.classList.add('HS015-no_item');
      } else {
        element.classList.remove('HS015-no_item');
      }
    }
  };
  pollerLite([`.${settings.ID}-wishlist-box`], () => {
    emptyBoxes();
  });

  const sendEvents = () => {
    document.querySelector('.HS015-wishlist_title a').addEventListener('click', () => {
      events.send(settings.ID, 'Clicked', `${settings.ID} View wishlist - Variation ${settings.VARIATION}`);
    });
    document.querySelector('.HS015-save_wishlist a').addEventListener('click', () => {
      events.send(settings.ID, 'Clicked', `${settings.ID} User clicked Sign in/Register - Variation ${settings.VARIATION}`);
    });
  };

  pollerLite([`.${settings.ID}-wishlist_title a`], () => {
    sendEvents();
  });
};

export default activate;
