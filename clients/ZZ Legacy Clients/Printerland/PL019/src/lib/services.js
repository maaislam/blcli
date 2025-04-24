import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
import priceRanges from './priceFilterSlider/price_ranges';
import queryBrands from './queryBrands';
import brandsContent from './brands_data';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function buildFilterUrl(min, max) {
  const minParameter = min.replace('£', '');
  const maxParameter = max.replace('£', '');
  let brandsToAddToQuery = '';

  // Get Checked Brands
  const checkboxes = document.querySelectorAll('ul.PL019-brands__list li');
  [].forEach.call(checkboxes, (el) => {
    const checkbox = el.querySelector('input');
    
    const brandToClick = document.querySelector(`.PL019-${checkbox.value} a`);
    if (checkbox.checked) {
      queryBrands.brands.push(checkbox.value);
    }     
  });

  for (let i = 0; i < queryBrands.brands.length; i += 1) {
    const content = brandsContent[`${queryBrands.brands[i]}`];
    if (i < queryBrands.brands.length - 1) {
      brandsToAddToQuery += `${content.id}-`;
    } else {
      brandsToAddToQuery += `${content.id}`;
    }
  }
  let str = '';
  if (window.location.pathname.indexOf('/printers/') > -1) {
    const arr = window.location.pathname.split('/');
    if (arr.length === 3) {
      arr.splice(2, 0, brandsToAddToQuery);
      for (let i = 0; i < arr.length; i += 1) {
        if (i === arr.length - 1) {
          str += arr[i];
        } else {
          str += `${arr[i]}/`;
        }
      }
    } else if (arr.length >= 4) {
      // Remove previously filtered brands
      arr.splice(2, 1);
      arr.splice(2, 0, brandsToAddToQuery);
      // Create query string 
      for (let i = 0; i < arr.length; i += 1) {
        if (i === arr.length - 1) {
          str += arr[i];
        } else {
          str += `${arr[i]}/`;
        }
      }
    }
    
  }
  // Check if // exists in URL string and remove it
  if (str.indexOf('//') > -1) {
    str = str.replace('//', '/');
  }

  // const minMax = {min: minParameter, max:maxParameter};
  // sessionStorage.setItem('PL019_filtered-by-price-range', JSON.stringify(minMax));

  window.location.href =  `https://www.printerland.co.uk${str}?price-from=${minParameter}&price-to=${maxParameter}`;
  
}

export { setup, buildFilterUrl }; // eslint-disable-line
