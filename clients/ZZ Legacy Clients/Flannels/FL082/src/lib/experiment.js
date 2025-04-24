/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import { fetchBrands, fetchRecentlyViewedBrands } from './fetchBrands';
import { fillBrands } from './fillBrands';
import { buildFilters } from './buildFilters';
import { toTitleCase } from './sortBrandText';
import { toggleList } from './toggleList';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, 'FL082 Control', 'FL082 Control is active');
    return false;
  } else {
    events.send(ID, `FL082 Variation ${VARIATION}`, `FL082 Variation ${VARIATION} active`);
  }

  let brands =  fetchBrands();
  brands.then((brandArr) => {
    const recentBrands = fetchRecentlyViewedBrands();
  
  const ref = document.querySelector('#FiltersAndProductsWrapper');
  // let brandArr = [];
  // if (!brands && recentBrands) {
  //   brandArr = recentBrands.slice(0, 5);
  // } else {
  //   brandArr = brands.map((brand) => brand.word);
  // }
  // Remove dupes
  brandArr.filter((item, index) => brandArr.indexOf(item) === index); 
  
  const matchingBrands = [];
  // Check how many filters we need to add to get to 5. 
  let numberNeeded = 0;
  let hasRan = false;
  
  if (brandArr) {
    for (let i = 0; brandArr.length > i; i += 1) {
      if (i == brandArr.length - 1) {
        hasRan = true; // Run on completion
      }
      if (document.querySelector(`div[data-productname="${toTitleCase(brandArr[i])}"]`)) {
        if (matchingBrands.length < 5) { // Check if brand exists and we don't already have 5.
          matchingBrands.push(brandArr[i]);
        }
      } else {
        numberNeeded += 1;
      }
    }
  } else {
    hasRan = true;
  }

  pollerLite([() => {
    let run = false;
    if (hasRan == true) {
      run = true;
    }
    return run;
  }], () => {
    if (matchingBrands.length == 5) { // If We have all 5 matching brands
      buildFilters(matchingBrands, ref);
    } else if (matchingBrands.length > 0 && matchingBrands.length < 5) { // If we have 1 - 4 matching brands
      numberNeeded = 5 - matchingBrands.length;
      const fetchedBrands = fillBrands(matchingBrands, numberNeeded); // Get remaining
      if (fetchedBrands) {
        for (let i = 0; fetchedBrands.length > i; i += 1) {
          matchingBrands.push(fetchedBrands[i]); // Add to matchingBrands
        }
      }
      buildFilters(matchingBrands, ref);
    } else if (matchingBrands.length == 0) { // If we have NO matching brands, fetch all 5
      const allFilledFilters = fillBrands(5);
      if (allFilledFilters) {
        buildFilters(allFilledFilters, ref);
      } else { // If there's none whatsoever, show original. 
        document.body.classList.add('FL082-noBrands');
      }
    }
  });
  
  // Attach events
  pollerLite(['.FL082-brands--list', '#ToggleFiltersContainer'], () => {

    // More brands button
    const moreBrands = document.querySelector('#FL082-moreBrands');
    let filterToggle = document.querySelector('#ToggleFiltersContainer');
    const brandInput = document.querySelector('input#txtBrandSearch');
    const brandWrap = document.querySelector('.brandSearchSort');
    if (window.innerWidth < 1022) {
      filterToggle = document.querySelector('#FilterContainer');
    }
    if (moreBrands) {
      moreBrands.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('FL082-showFilter');

        if (window.innerWidth < 1022) {
          filterToggle.classList.toggle('MobClosed');
          filterToggle.classList.toggle('FL082-mobileShow');
        }

        if (brandWrap && brandWrap.parentElement && brandWrap.parentElement.parentElement && brandWrap.parentElement.parentElement.classList.contains('productFilter')) {
          if (window.innerWidth < 1022) {
            const openEl = brandWrap.parentElement.parentElement.querySelector('.productFilterTitleBox');
            if (openEl) {
              setTimeout(() => {
                openEl.click();
              }, 300);
            }
          }
          brandWrap.parentElement.parentElement.classList.add('FL082-shine');
        }
        // Highlight input
        // brandInput.classList.add('FL082-shine');
        brandInput.focus();
        setTimeout(() => {
          brandWrap.classList.remove('FL082-shine');
        }, 2500);
      });
    }

    // Added filters hide/add
    const addedList = document.querySelector('.FL082-brands--list');
    toggleList(addedList);
    

  });
  }).catch((err) => console.log('FL082 affinity error, ', err));
  

};
