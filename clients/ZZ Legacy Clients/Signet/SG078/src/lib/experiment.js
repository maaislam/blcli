/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { decompress } from 'compress-json'; // We use compress-json to create the compressed JSON data

const { ID, VARIATION } = shared;

/**
 * Helper capitalize words
 */
const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

// --------------------------
// Term map maps shorthand terms
// to the text we want to display
// --------------------------
const termMap = (term) => {
  const map = {
    '1 Year': '1 Year Warranty',
    '2 Years': '2 Years Warranty',
    '3 Years': '3 Years Warranty',
    '4 Years': '4 Years Warranty',
    '5 Years': '5 Years Warranty',
    'Analog': 'Analog Movement',
    'Automatic': 'Automatic Movement',
    'Display': 'Electronic Display',
    'Eco-Drive': 'Eco-Drive Movement',
    'Hybrid': 'Hybrid Movement',
    'Kinetic': 'Kinetic Movement',
    'Mechanical': 'Mechanical Movement',
    'Quartz': 'Quartz Movement',
    '9ct Yellow Gold': '9ct Yellow Gold Strap',
    'Alloy': 'Alloy Case',
    'Aluminium': 'Aluminium Case',
    'Brass': 'Brass Case',
    'Carbon FIbre Resin': 'Carbon Fire Resin Case',
    'Carnation Gold': 'Carnation Gold Case',
    'Ceramic': 'Ceramic Case',
    'Gold Plated': 'Gold Plated Case',
    'Ion plated': 'Ion Plated Case',
    'Nylon': 'Nylon Case',
    'Plastic': 'Plastic Case',
    'Polycarbonate': 'Polycarbonate Case',
    'Resin': 'Resin Case',
    'Rose Gold': 'Rose Gold Case',
    'Rose Gold plated': 'Rose Gold Plated Case',
    'Silicone': 'Silicon Case',
    'Silver': 'Silver Case',
    'Silver plated': 'Silver Plated Case',
    'Titanium': 'Titanium Case',
    'Date': 'Date Feature',
  }

  let result = map[term] || term;

  if(term.trim().match(/^\d+$/)) {
    // These are carat values for rings
    const carat = (parseInt(term)/100).toFixed(2);
    result = carat + ' Carat';
  }

  // Caps words
  result = capitalize(result);

  // A common typo :o
  result = result.replace(/jewelry/i, 'Jewellery');

  return result;
};

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    // ----------------------------------
    // Data is stored as compressed so decompress it
    // ----------------------------------
    const _sg078data1 = decompress(window.sg078data1); // skus beginning with 0,1,2,3
    const _sg078data2 = decompress(window.sg078data2); // skus beginning with 4,5,6  
    const _sg078data3 = decompress(window.sg078data3); // skus beginning with 7,8,9  
    
    // ----------------------------------
    // Loop over products and add key points
    // ----------------------------------
    const updateProds = () => {
      [].forEach.call(document.querySelectorAll('.js-product-list-item'), (item) => {
        if(item.querySelector(`.${ID}-feature-list`)) {
          // The feature list already exists, e.g. we've loaded more products
          // or polled
          return;
        }

        const productLink = item.querySelector('.productLink');
        if(productLink) {
          const skuMatches = productLink.getAttribute('href').match(/d\/(\d+)\//i);
          if(skuMatches && skuMatches[1]) {
            const sku = skuMatches[1].trim();
            const firstDigit = sku.substr(0,1);

            let data = [];
            if(['0','1','2','3'].indexOf(firstDigit) > -1) {
              data = _sg078data1[sku] || [];
            } else if(['4','5','6'].indexOf(firstDigit) > -1) {
              data = _sg078data2[sku] || [];
            } else {
              data = _sg078data3[sku] || [];
            }

            // Limit to 3 items
            const finalData = data.slice(0,3);

            // Append data to list after prod title
            const description = item.querySelector('.product-tile__description');
            if(description && finalData.length) {
              description.insertAdjacentHTML('afterend', `
                <ul class="${ID}-feature-list">
                  ${finalData.map((item) => `
                    ${termMap(item) ? `
                      <li>${termMap(item)}</li>
                    ` : ''}
                  `).join('')}
                </ul>
              `);
            }
          }
        }
      });
    };

    updateProds(); // On initial page load

    // ----------------------------------
    // Mutation observer to re-run the data add when the product
    // list is modified (by, for example, clicking 'view more prods' or using filters)
    // ----------------------------------
    observer.connect(document.querySelector('.browse__main-content'), () => {
      updateProds();
    }, {
      throttle: 1000,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    });

    // ----------------------------------
    // Site-specific changes
    // ----------------------------------
    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
