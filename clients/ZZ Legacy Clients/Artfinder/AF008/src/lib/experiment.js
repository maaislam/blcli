/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { 
  getScore, 
  bandLevel, 
  detectActiveFilters, 
  getFilters,
  filterTerms } from './helpers';
import data from './data';
import { observer } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  const userCurrency = window.dataLayer[0].user_currency;
  let currencySymbol = '£';
  if (userCurrency == 'AUD' || userCurrency == 'CAD' || userCurrency == 'USD') {
    currencySymbol = '$';
  } else if (userCurrency == 'EUR') {
    currencySymbol = '€';
  }

  const resContainer = document.querySelector('#results-container');


  const detectAndFetch = () => {
    const score = getScore(); 
    if (!score) return;
    // console.log({score});

  
    const band = bandLevel(score);
    // console.log({band});


    const terms = filterTerms(band);
    // console.log({terms})
    const term = terms[0];
    

    // console.log({data});

    let filtersArr = [];

    if (term && term == 'Price') {
      const priceObj = data[userCurrency];
      if (window.location.href.indexOf('price') > -1) return;
      const filterButton = (ob) => {
        return `<a href="${window.location.href}${ob.min == '-' ? '' : `price_min-${ob.min}`}/${ob.max == '+' ? '' : `price_max-${ob.max}`}">${ob.min == '-' ? '£0' : `${currencySymbol}${ob.min}`} - ${ob.max == '+' ? `${currencySymbol}${ob.min}+` : `${currencySymbol}${ob.max}`}</a>`;
      }

      // console.log(priceObj)
      let len = Object.keys(priceObj).length;
      for (const prop in priceObj) {
        // console.log('ob =', priceObj[prop]);
        if (priceObj[prop]) {
          filtersArr.push(filterButton(priceObj[prop]));
        }
      }

      if (!document.querySelector('.AF008-filters') && filtersArr.length > 0) {
        resContainer.insertAdjacentHTML('afterbegin', `
          <div class="AF008-wrap">
            <p>Recommended ${term.toLowerCase()} filters to help you find your artwork</p>
            <div class="AF008-filters">
              ${[...filtersArr].join(' ')}
            </div>
          </div>
        `);
      }

    } else {
      terms.map((thisTerm) => {
        getFilters(thisTerm, (res) => {
          // console.log({res})
          if (window.location.href.indexOf(thisTerm.toLowerCase()) > -1) return;
          
          const filterButton = (ob) => {
            if (thisTerm !== 'Colour') {
              return `<a href="${window.location.href}${ob.value}">${ob.name ? ob.name.replace(/\-/g, ' ') : ''}</a>`;
            } else {
              return `<a class="AF008-colours" href="${window.location.href}${ob.value}" style="background-color: #${ob.value.replace('colours-', '')}">&nbsp;</a>`;
            }
          }

          res.forEach(obj => {
            filtersArr.push(filterButton(obj));
          });
          
          if (!document.querySelector('.AF008-filters') && filtersArr.length > 0) {
            resContainer.insertAdjacentHTML('afterbegin', `
              <div class="AF008-wrap">
                <p>Recommended ${thisTerm.toLowerCase()} filters to help you find your artwork</p>
                <div class="AF008-filters">
                  ${[...filtersArr].join(' ')}
                </div>
              </div>
            `);
          }
          
        });
        
      });
    }

    // console.log(filtersArr)
  

  }

  detectAndFetch();
  // Observe Results Container


  observer.connect(resContainer, () => {
    // console.log('Change');

    // Get current active filters
    detectAndFetch();
    

  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true
    }
  });


  const bod = document.body;
  observer.connect(bod, () => {
    if (!bod.classList.contains(ID)) {
      bod.classList.add(ID);
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false,
    }
  })

};
