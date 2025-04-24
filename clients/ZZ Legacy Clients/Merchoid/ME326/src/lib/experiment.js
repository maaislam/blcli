/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

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
    return;
  }


  let brand;
  let name;
  let mainImage;

  if(document.querySelector('.gallery-placeholder .fotorama__img')) {
    mainImage = document.querySelector('.fotorama__stage__frame img').getAttribute('src');
  }

  if(document.querySelector('.page-title > span').childNodes[1]) {
    name = document.querySelector('.page-title > span').childNodes[1].textContent;
  } else {
    name = document.querySelector('.page-title > span').childNodes[0].textContent;
  }

  if(document.querySelector('meta[property="og:brand"]') && document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/)) {
    if(document.querySelector('meta[property="og:brand"]').content.indexOf('Warhammer') > -1) {
      brand = 'Warhammer 40,000';
    } else {
      brand = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
    } 
  } 

  const officialBanner = document.querySelector('.column.main .official-licensed');

  const standOutMessage = (brandName, productName) => {
    let logo = '';

    if(officialBanner) {
      logo = officialBanner.querySelector('img').getAttribute('src');
    }

    const content = 
    `<div class="${ID}-banner">
      <div class="${ID}-container">
      ${VARIATION === '1'  && logo !== ''? `<div class="${ID}-logo"><span style="background-image: url(${logo})"></span></div>` : ''}
        <div class="${ID}-text">
          ${VARIATION === '2'  && logo !== ''? `<div class="${ID}-logo"><span style="background-image: url(${logo})"></span></div>` : ''}
          <h3><b>STAND OUT</b> FROM THE CROWD</h3>
          <p>With this Officially Licensed ${productName}. Don't settle for ordinary clothing, those who love ${brandName} will appreciate the design and quality of this ${productName}.</p>
          <h4>For the biggest ${brandName} Fans</h4>
        </div>
        ${VARIATION === '2' ? `<div class="${ID}-image"><div class="${ID}-inner" style="background-image: url(${mainImage})"></div></div>` : ''}
      </div>
    </div>`;

    return content;
  }

  


  if(VARIATION === '1') {
    document.querySelector('.product-info-main').insertAdjacentHTML('beforeend', standOutMessage(brand, name));

    // Move banner
    const officialBanner = document.querySelector('.column.main .official-licensed');
    document.querySelector('.review-fans').insertAdjacentElement('afterend', officialBanner);

    // Add badge
    const exclusiveBadge = `<div class="${ID}-badge"></div>`;
    document.querySelector('.product.media').insertAdjacentHTML('beforeend', exclusiveBadge);
  }

  if(VARIATION === '2') {
    document.querySelector('#maincontent').insertAdjacentHTML('afterend', standOutMessage(brand, name));
  }
  
};
