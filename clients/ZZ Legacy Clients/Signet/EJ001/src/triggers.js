import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';


// check if something in wishlist, if not run test
if (!localStorage.getItem('EJ001-wishlist', 1)) {
  const wishListPage = 'https://www.ernestjones.co.uk/webstore/showWishlist.sdo';
  const request = new XMLHttpRequest();
  request.open('GET', wishListPage, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const temp = document.createElement('div');
      temp.innerHTML = request.responseText;

      const wishlistItem = temp.querySelector('.wishlist #listItems .productSection');
      // if wishlist has an item already, show the nav link
      if (wishlistItem) {
        localStorage.setItem('EJ001-wishlist', 1);
        document.querySelector('.top-bar__list-item:nth-child(5) a').style.display = 'block';
        // if no wishlist item and no storage set previously fire the test
      } else if (!wishlistItem && !localStorage.getItem('EJ001-wishlist')) {
        pollerLite([
          '.js-top-bar.top-bar',
        ], activate);
      }
    }
  };
  request.send();
}

