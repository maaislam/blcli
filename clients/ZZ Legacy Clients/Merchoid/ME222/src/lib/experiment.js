/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  let jumperText;
  const url = window.location.href;

  if(url.indexOf('/uk/') > -1) {
    jumperText = 'jumper';
  } else {
    jumperText = 'sweater';
  }

  // create the badge
  const addBadge = () => {
    document.body.classList.add(`${ID}-badge_added`);
    const productBadge = document.createElement('div');
    productBadge.classList.add(`${ID}-productBadge`);

    const productImage =  document.querySelector('.product .gallery-placeholder .fotorama__stage');
    productImage.appendChild(productBadge);  
  }

  // add the badge to the first page visited
  if(!sessionStorage.getItem(`${ID}-badgeShow`)) {
    addBadge();
    sessionStorage.setItem(`${ID}-badgeShow`, url);
    // show it if user goes back to first product viewed
  } else if (sessionStorage.getItem(`${ID}-badgeShow`) === window.location.href) {
    addBadge();
  } else {
    document.body.classList.add(`${ID}-badge_added`);
  }

  const addLastUSP = () => {
    const lastUsp = document.createElement('li');
    lastUsp.classList.add(`${ID}-usp`);
    lastUsp.innerHTML = `<span>100% authentic knit ${jumperText}</span>`;

    const allUSPs = document.querySelector('.product-usps-wrapper .product-usps');
    allUSPs.appendChild(lastUsp);
  }

  // addLastUSP();

};
