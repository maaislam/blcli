/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite, observer } from '../../../../../lib/utils';
import countries from './countries';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  const runFunc = () => {
    let shippingAccordTitle = document.querySelector('span.af-normal-text');
  let shippingAccordContent = null;
  let shippingCopy = null;
  console.log({shippingAccordTitle})
  if (shippingAccordTitle.textContent === 'Shipping') {
    shippingAccordTitle.click();
    shippingAccordContent = shippingAccordTitle.parentElement.nextElementSibling;

    pollerLite(['.content > div p', 'ul.af-underline-links', () => {
      let run = false;
      if (shippingAccordContent.classList.contains('active')) {
        run = true;
      }
      return run;
    }], () => {
      const activeContent = document.querySelector('.content.active');

      let copy = activeContent.querySelector('p:last-of-type')
      
      // Split the copy to get title and copy.
      let copyText = copy.childNodes;

      let title = `${copyText[0].textContent} ${copyText[1].textContent}`;

      let sub = `${copyText[3].textContent}`;

      // Strip any spaces and full stops.
      sub = sub.replace(/^\.\s|^\./, '');


      // Get art size
      const listItems = document.querySelectorAll('ul.af-underline-links > li');
      let getSizeItem = null;
      for (let i = 0; listItems.length > i; i += 1) {
        if (listItems[i] && listItems[i].textContent.indexOf('Size:') > -1) {
          getSizeItem = listItems[i];
        }
      }

      const itemSizes = getSizeItem.textContent.match(/\d+/g);
      const itemSizeNumbers = itemSizes.map((size) => parseFloat(size));
      
      
      const biggestSize =  Math.max.apply(Math, itemSizeNumbers);


      let sizeText = '';
      
      switch (true) {
        case biggestSize < 100:
          sizeText = 'small';
          break;
        case biggestSize >= 100 && biggestSize < 150:
          sizeText = 'medium size';
          break;
        case biggestSize >= 150 && biggestSize < 200:
          sizeText = 'large';
          break;
        case biggestSize >= 200:
          sizeText = 'extra large';
          break;
        default:
          sizeText = 'small';
          break;
      }

      // Get artist location
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let countryCode = null;
      let countryName = 'overseas';

      for (let i = 0; scripts.length > i; i += 1) {
        const thisScript = scripts[i];
        const ob = JSON.parse(thisScript.innerText.replace(/,[\n\s]*\}/gm, '}'));
        if (ob && ob.provider && ob.provider.country) {
          countryCode = ob.provider.country;
        }
      }
      

      // If countryCode !== null, fetch the Countries name
      if (countryCode) {
        countryName = countries[countryCode];
      }

      let isFreeShipping = false;
      let shippingPrice = null;
      // Check for Free Shipping
      const freeBadge = document.querySelector('p.h2 + .af-label.af-monetgreen');
      
      if (freeBadge && freeBadge.textContent === 'Free shipping') {
        title = 'Free Shipping';

        sub = 'This piece qualifies for free shipping';

        freeBadge.classList.add('AF-hide')
      } else {

        title = 'Safe and Secure Shipping';
        
        if (countryCode == 'GB' || countryCode == 'US') {
          if (sizeText == 'small' || sizeText == 'medium size') {
            sub = `This artist is in the ${countryName} and will ensure secure shipment`;
          }  
          if (sizeText == 'large' || sizeText == 'extra large') {
            sub = `This is ${sizeText == 'extra large' ? 'an ' : 'a '}${sizeText} piece and the artist will ensure secure shipment`;
          }  
        } else { // Not UK or USA
          if (sizeText == 'small' || sizeText == 'medium size') {
            sub = `This piece of art will be shipped securely from ${countryName}`;
          }  
          if (sizeText == 'large' || sizeText == 'extra large') {
            sub = `This is ${sizeText == 'extra large' ? 'an ' : 'a '}${sizeText} piece of art, shipped securely from ${countryName}`;
          }
        }
        // sub = `This is a ${sizeText} piece of art, shipped securely from ${countryName}`;

        // Add price above 
        const priceEl = document.querySelector('span.right.af-bold');
        if (priceEl) {
          shippingPrice = priceEl.textContent;
          isFreeShipping = true;
        }

      }


      // Add to the page
      const ref = document.querySelector('ul.af-underline-links');
      if (!document.querySelector('.AF009-banner')) {
        ref.insertAdjacentHTML('beforebegin', `
          ${shippingPrice !== 'Free' && shippingPrice ? `
            <div class="AF009-shipping">
              <p>Shipping <strong>${shippingPrice}</strong></p>
            </div>
          ` : ''}
          <div class="AF009-banner">
            <h2 class="h2">${title}</h2>
  
            <p class="margin margin-s">${sub}</p>
          <div>
        `);
      }
      

      // Close the shipping accrodian. 
      shippingAccordTitle.click();
    });
  }
  }

  runFunc();

  setTimeout(() => {
    runFunc()
  }, 2000);


  const bod = document.body;
  observer.connect(bod, () => {
    if (!bod.classList.contains(ID)) {
      bod.classList.add(ID);
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false
    }
  })

};
