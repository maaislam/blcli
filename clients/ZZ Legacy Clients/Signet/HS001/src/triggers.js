import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';


// check if something in wishlist, if not run test
if (!localStorage.getItem('HS001-wishlist', 1)) {
  const wishListPage = 'https://www.hsamuel.co.uk/webstore/showWishlist.sdo';
  const request = new XMLHttpRequest();
  request.open('GET', wishListPage, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const temp = document.createElement('div');
      temp.innerHTML = request.responseText;

      const wishlistItem = temp.querySelector('.wishlistItem');
      // if wishlist has an item already, show the nav link
      if (wishlistItem) {
        localStorage.setItem('HS001-wishlist', 1);
        document.querySelector('.top-bar__list-item:nth-child(5) a').style.display = 'block';
        // if no wishlist item and no storage set previously fire the test
      } else if (!wishlistItem && !localStorage.getItem('HS001-wishlist')) {
        pollerLite([
          '.js-top-bar.top-bar',
        ], activate);
      }

      /* if (!wishlistItem && !localStorage.getItem('HS001-wishlist')) {
        // document.querySelector('.top-bar__list-item:nth-child(5) a').style.display = 'block';
        console.log('wishlist in nav shown');
        pollerLite([
          '.js-top-bar.top-bar',
        ], activate);
        console.log('test fired');
      } else if (localStorage.getItem('HS001-wishlist')) {
        document.querySelector('.top-bar__list-item:nth-child(5) a').style.display = 'block';
        console.log('wishlist already has item');
      } else {
        localStorage.setItem('HS001-wishlist', 1);
        console.log('wishlist storage set');
      } */
    }
  };
  request.send();
}

