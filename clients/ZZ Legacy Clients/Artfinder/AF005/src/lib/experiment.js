/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { observer, events, pollerLite } from '../../../../../lib/utils';
import settings from './shared';

const { ID, VARIATION } = settings;


const findDuplicates = (arr) => {
  let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
  // JS by default uses a crappy string compare.
  // (we use slice to clone the array so the
  // original array won't be modified)
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}


export const PLP = () => {
  setup();
  events.send('AF005', 'AF005 PLP');
  let filtersForm;
  
  pollerLite([() => {
    let run = false;
    if (window.innerWidth > 764) {
      filtersForm = document.querySelector('form.accordion');
    } else {
      filtersForm = document.querySelector('.af-main-row.alternative-field');
    }
    if (filtersForm) {
      run = true;
    }

    return run;
  }], () => {
    console.log({filtersForm});

    const captureAndStore = () => {
      const ob = {};
  
      // const activeFilters = document.querySelectorAll('div.af-css-radio input:checked + .af-place-container label');
      let activeFilters = document.querySelectorAll('.af-tag.margin-all .tag-description span span');
      let activeMobileFilters = null;
      if (window.innerWidth < 649) {
        activeFilters = document.querySelector('.af-hide-for-large-up');
        console.log({activeFilters});
        if (activeFilters && activeFilters.textContent) {
          const activeNum = parseInt(activeFilters.textContent.replace(/\(|\)/g, ''), 10);
          console.log({activeNum});
          if (activeNum >= 2) {
            activeMobileFilters = true;
          }
        }
      }
  
      console.log({activeFilters});
      console.log({activeMobileFilters});
  
        
      // 1 || window.location.href.indexOf('price_') > -1
      if (activeFilters.length && activeFilters.length > 2 || activeMobileFilters) {
  
        const nameEl = document.querySelector('h1.af-super');
        if (nameEl) {
          ob.name = nameEl.textContent;
        }
  
        ob.link = window.location.href;
  
        console.log({ob});
        if (ob) {
          // Get storage if exists
          const existingStorage = window.localStorage.getItem('AF005-storedFilters');
          if (!existingStorage) {
            window.localStorage.setItem('AF005-storedFilters', JSON.stringify([ob]));
          } else {
            let tempArr = [];
            tempArr = JSON.parse(existingStorage);
            
            
  
            tempArr.unshift(ob);
            
            // Remove dupes
            const allNames = tempArr.map((objecto) => objecto.name);
  
            // console.log({allNames})
            const hasDupe = findDuplicates(allNames);
  
            if (hasDupe) {
              // console.log({hasDupe})
              tempArr.map((obj, index) => {
                if (obj.name && obj.name == hasDupe) {
                  tempArr.splice(index, 1);
                }
              })
            }
  
            if (tempArr.length > 4) {
              tempArr.pop();
            }
  
            
  
            window.localStorage.setItem('AF005-storedFilters', JSON.stringify(tempArr));
  
            console.log('set store')
          }
        }
  
      }
    }
    
    captureAndStore()
    
    observer.connect(filtersForm, () => {
      console.log('CHANGE')
      // if (!activeFilters || activeFilters.length < 2) return;
  
      
      
      
      
      let link = 'art/sort-best_match/paginate-60'; // Moved this out of the loop
  
  
      const priceBands = [];
      const priceObj = {}
      let hasMin = false;
      let hasMax = false;
      let priceLink = `art/sort-best_match/paginate-60`;
      let minAmt = 0;
      let maxAmt = 0;
  
      setTimeout(() => {
        captureAndStore();
      }, 1500);
      
  
      // setTimeout(() => {
      //   priceBands[0] = document.querySelector('.min-label');
      //   priceBands[1] = document.querySelector('.max-label');
    
    
      //   if (priceBands[0]) {
      //     priceBands[0] = priceBands[0].textContent.trim().replace('£', '');
      //   }
    
      //   if (priceBands[1]) {
      //     priceBands[1] = priceBands[1].textContent.trim().replace('£', '');
      //   }
    
    
      //   if (priceBands[1] && !priceBands[1] !== '-') { // Max price changed
      //     priceLink += `/price_max-${parseFloat(priceBands[1])}`;
      //     hasMax = true;
      //     maxAmt = parseFloat(priceBands[1]);
      //   }
    
      //   if (priceBands[0] && parseFloat(priceBands[0]) > 0) { // Min price changed
      //     priceLink += `/price_min-${parseFloat(priceBands[0])}`;
      //     hasMin = true;
      //     minAmt = parseFloat(priceBands[0]);
      //   }
        
      //   // console.log('link = ', priceLink);  
      //   if (priceLink.indexOf('price') > -1 && priceLink.indexOf('NAN') === -1) {
      //     ob['Price'] = {
      //       name: hasMin ? `${minAmt > 0 ? `Over £${minAmt}` : ''}` : hasMax ? `${maxAmt > 0 ? `Under £${maxAmt}` : ''}` : 'Price',
      //       link: priceLink,
      //     }
      //   }
        
      // }, 1000);
      
  
  
    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: true,
      }
    })
  })
  

  
};

function matchHeight () {
  //Grab divs with the class name 'match-height'
  var getDivs = document.getElementsByClassName('match-height');

  //Find out how my divs there are with the class 'match-height' 
  var arrayLength = getDivs.length;
  var heights = [];

  //Create a loop that iterates through the getDivs variable and pushes the heights of the divs into an empty array
  for (var i = 0; i < arrayLength; i++) {
      heights.push(getDivs[i].offsetHeight);
  }

   //Find the largest of the divs
  function getHighest() {
    return Math.max(...heights);
  }

  //Set a variable equal to the tallest div
  var tallest = getHighest();

  //Iterate through getDivs and set all their height style equal to the tallest variable
  for (var i = 0; i < getDivs.length; i++) {
      getDivs[i].style.height = tallest + "px";
  }
};


export const homepage = () => {
  setup();

  

  // Check for LS
  const storage = window.localStorage.getItem('AF005-storedFilters');

  if (!storage) {
    events.send('AF005', 'AF005 No Storage', 'No storage present');
    return;
  }


  const obj = JSON.parse(storage);
  
  const createBanner = (currentObj, objectName) => {
    if (!currentObj) return '';
    // ${ID}
    // console.log('ob = ', currentObj)
    // const type = currentObj.link.match(/^\w+/g)[0];
    let type = null;
    if (!currentObj.name || !currentObj.link) return '';

    // let type = 
    return `
      <div class="${ID}-bannerItem ${objectName === 'Category' ? 'AF-cat' : ''}">
        <div class="match-height">
          ${objectName === 'Category' && type ? `<h2>${type}</h2>` : ''}
          <h2>${currentObj.name}</h2>
        </div>

        <a class="${ID}-btn button" href="${currentObj.link}">View</a>

        <i class="af-dot af-dot-l af-place place-top place-right hide-for-small-only"></i>
      </div>
    `;
  }

  // Loop list and build UI
  let html = '';


  for (const obKey in obj) {

    const ob = obj[obKey];

    html += createBanner(ob, obKey);

  }
  // console.log({html})
  // got html?
  if (!html) return;

  let ref = document.querySelector('.slick-slider + section.af-white-bg');
  let pos = 'afterend';
  // ref = document.querySelector('.af-topbar-wrapper');
  // pos = 'af';
  // if (window.innerWidth < 679) {
  // }
  
  // console.log('AF005 = ', {
  //   ref,
  //   pos,
  //   html
  // })

  ref ? ref.insertAdjacentHTML(pos, `
    <div class="${ID}-banner">
      <h1>Welcome Back!</h1>
      <p>Categories we think you'll like</p>

      <div class="${ID}-banner--wrap">
        ${html}
      </div>
    </div>
  `) : null;


  setTimeout(() => {
    matchHeight()
  }, 1500);

};
