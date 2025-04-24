/**
 * AF002 - Price Filter Enhancement
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.artfinder.com/art/sort-best_match/paginate-60/product_category-painting/
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { getUrlParameter, updateUrlParameter } from '../../../../../lib/utils';
import shared from './shared';
import data from './data';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${shared.ID} >>>`);
  let pathname = window.location.pathname;
  let pathnameParts = pathname.split('/');
  let productPathname = '';
  for (let i = 0; i < 5; i += 1) {
    const part = pathnameParts[i];
    if (part !== '') {
      productPathname += `${part}/`;
    }
  }

  /**
   * @desc Check whether landing page/PLP has price filters applied 
   */
  if (pathname.indexOf('price_min') > -1
  || pathname.indexOf('price_max') > -1) {
    const landingUrlParts = pathname.split('/');
    let landingMin = '';
    let landingMax = '';
    for (let i = 0; i < landingUrlParts.length; i += 1) {
      let part = landingUrlParts[i];
      if (part.indexOf('price_min') > -1) {
        landingMin = part.replace('price_min-', '');
      } else if (part.indexOf('price_max') > -1) {
        landingMax = part.replace('price_max-', ''); 
      }

      if (landingMin === '') {
        landingMin = '-';
      }
      if (landingMax === '') {
        landingMax = '+';
      }
    }

    if (landingMin !== '' && landingMax !== '') {
      const landingPageData = {data: {'min': landingMin, 'max': landingMax}};
      sessionStorage.setItem(`${productPathname}`, JSON.stringify(landingPageData));
    }
    
  }
  // alert(productPathname);
  // --- Get User Currency
  const userCurrency = window.dataLayer[0].user_currency;
  const filterDataObj = data[`${userCurrency}`];
  let currency = '';
  switch(userCurrency) {
    case 'EUR':
      currency = '€';
      break;
    case 'GBP':
      currency = '£';
      break;
    case 'AUD':
      currency = 'A$';
      break;
    case 'CAD':
      currency = 'C$';
      break;
    case 'USD':
      currency = '$';
      break;
    // default:
    //   // code block
  }

  // --- Add class name to side Price Filter -- DESKTOP
  if (window.innerWidth > 420) {
    const allFilters = document.querySelectorAll('.accordion-navigation.alternative-accordion-navigation-for-small-only');
    for (let i = 0; i <= allFilters.length; i += 1) {
      const filter = allFilters[i];
    // [].forEach.call(allFilters, (filter) => {
      const title = filter.querySelector('span.af-bold');
      if (title) {
        const titleText = title.innerText.trim();
        if (titleText === 'Price') {
          filter.classList.add(`${shared.ID}-Price--filter`);
          break;
        }
        
      }
    }
  } 
  // -- MOBILE ALL FILTERS
  // else {
  //   const allFilters = document.querySelectorAll('form.af-form-nomargins-labels.margin.margin-m.margin-bottom.accordion.af-accordion div');
  //   for (let i = 0; i <= allFilters.length; i += 1) {
  //     const filter = allFilters[i];
  //   // [].forEach.call(allFilters, (filter) => {
  //     const title = filter.querySelector('span.af-bold');
  //     if (title) {
  //       const titleText = title.innerText.trim();
  //       if (titleText === 'Price') {
  //         filter.classList.add(`${shared.ID}-Price--filter`);
  //         break;
  //       }
        
  //     }
  //   }
  // }
  

  // -- Get DEFAULT/previously selected min-max, if it exists from Session Storage
  let defaultMin = '';
  let defaultMax = '';
  const defaultValues = JSON.parse(sessionStorage.getItem(`${productPathname}`));
  if (defaultValues !== null) {
    defaultMin = defaultValues.data.min;
    defaultMax = defaultValues.data.max;
  }
  // console.log('data object size:');
  // console.log(Object.keys(filterDataObj).length);

  // --- Generate new Price Range buttons
  let priceElements = '';
  for (let i = 0; i < Object.keys(filterDataObj).length; i += 1) {
    let activeRange = '';
    const priceRange = filterDataObj[i];
    if (priceRange.min === defaultMin
    && priceRange.max === defaultMax) {
      activeRange = 'active';
    }
    if (priceRange.min == "-") {
      priceElements += `<li class="${shared.ID}-priceFilter__btn--wrapper ${activeRange}">
        <div class="${shared.ID}-priceFilter__btn" data-min="${priceRange.min}" data-max="${priceRange.max}"> < ${currency}${priceRange.max}</div>
      </li>`;
    } else if (priceRange.max == "+") {
      priceElements += `<li class="${shared.ID}-priceFilter__btn--wrapper ${activeRange}">
        <div class="${shared.ID}-priceFilter__btn" data-min="${priceRange.min}" data-max="${priceRange.max}"> ${currency}${priceRange.min}+</div>
      </li>`;
    } else {
      priceElements += `<li class="${shared.ID}-priceFilter__btn--wrapper ${activeRange}">
        <div class="${shared.ID}-priceFilter__btn" data-min="${priceRange.min}" data-max="${priceRange.max}"> ${currency}${priceRange.min} - ${currency}${priceRange.max}</div>
      </li>`;
    }
  }

  // const rowNavContainer = document.querySelector('.af-main-row.alternative-field .row .medium-9.column.margin.margin-xs.margin-responsive-for-small-only');
  const newPriceFiltersContainer = `<div class="${shared.ID}-newPriceFilters__wrapper">
    <div class="${shared.ID}-newPriceFilters__container">
      <h2>Discover your perfect piece of artwork within your budget</h2>
      <ul class="${shared.ID}-priceFilters">
        ${priceElements}
      </ul>
    </div>
    <div class="${shared.ID}-link--wrapper">Got a different budget in mind? 
      <span class="${shared.ID}-link">Click here</span>
    </div>
  </div>`;


  let rowNavContainer;
  if (window.innerWidth > 420) {
    rowNavContainer = document.querySelector('.af-main-row.alternative-field .row #results-container');
    rowNavContainer.insertAdjacentHTML('afterbegin', newPriceFiltersContainer);
  } else {
    rowNavContainer = document.querySelector('.af-main-row.alternative-field .row');
    rowNavContainer.insertAdjacentHTML('afterend', newPriceFiltersContainer);
  }
  

  // --- If no price range selected, de-select
  if ((window.location.href.indexOf('price_min') == -1)
  && (window.location.href.indexOf('price_max') == -1)) {
    if (document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`)) {
      document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`).classList.remove('active');
    }
    sessionStorage.removeItem(`${productPathname}`);
    // alert('true');
  }

  // --- Filter link CTA
  const filterLink = document.querySelector(`span.${shared.ID}-link`);
  filterLink.addEventListener('click', () => {
    if (document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`)) {
      // document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`).classList.remove('active');
    }
    if (window.innerWidth > 420) {
      document.querySelector(`.${shared.ID}-Price--filter a`).click();
      // document.querySelector(`.${shared.ID}-Price--filter`).nextElementSibling.nextElementSibling.setAttribute('style', 'background-color: lightcoral;');
      document.querySelector(`.${shared.ID}-Price--filter`).nextElementSibling.nextElementSibling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    } else {
      document.querySelector('#browse-form a').click();
      setTimeout(() => {
        // alert('here');
        document.querySelector('a.af-accordion-element').click();
        const mobileFilters = document.querySelectorAll('a.af-accordion-element');
        for (let i = 0; i < mobileFilters.length; i += 1) {
          const filter = mobileFilters[i];
          if (filter.querySelector('.af-bold')
          && filter.querySelector('.af-bold').innerText === "Price") {
            // document.querySelectorAll('a.af-accordion-element')[4].click();
            filter.click();
            // filter.setAttribute('style', 'background-color: lightblue;');
            filter.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            break;
          }
        }
      }, 500);
      
    }
    
  });

  // --- New Price Range Button functionality
  const newPriceButtons = document.querySelectorAll(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper`);
  [].forEach.call(newPriceButtons, (btn) => {
    // console.log(btn);
    // console.log('-  -  -  -  -  -  -  -  - ');
    btn.addEventListener('click', (e) => {
      pathname = window.location.pathname;
      // --- Remove pre-selected active button
      if (document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`)) {
        document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`).classList.remove('active');
      }
      
      btn.classList.add('active');
      const min = btn.querySelector(`.${shared.ID}-priceFilter__btn`).getAttribute('data-min');
      let urlMin = '';
      if (min !== '-') {
        urlMin = `price_min-${min}/`;
      }
      // alert(urlMin);
      const max = btn.querySelector(`.${shared.ID}-priceFilter__btn`).getAttribute('data-max');
      let urlMax = '';
      if (max !== '+') {
        urlMax = `price_max-${max}/`;
      }
      // alert(urlMax);
      const productData = {data: {'min': min, 'max': max}};
      sessionStorage.setItem(`${productPathname}`, JSON.stringify(productData));

      // console.log(pathnameParts);
      /**
       * @desc Reconstruct URL
       */
      let currentUrl = window.location.pathname;
      let newUrl = '';
      const urlParts = currentUrl.split('/');
      for (let i = 0; i < urlParts.length; i += 1) {
        let part = urlParts[i];
        if (part.indexOf('price_min') > -1) {
          if (min !== '-') {
            urlParts[i] = `price_min-${min}`;
          } else {
            urlParts[i] = '';
          }
        } else if (part.indexOf('price_max') > -1) {
          if (max !== '+') {
            urlParts[i] = `price_max-${max}`;
          } else {
            urlParts[i] = '';
          }
          
        }

        if (urlParts[i] !== '') {
          newUrl += `${urlParts[i]}/`;
        }
      }

      if (min !== '-' && newUrl.indexOf('price_min-') == -1) {
        newUrl += `price_min-${min}/`;
      }
      if (max !== '+' && newUrl.indexOf('price_max-') == -1) {
        newUrl += `price_max-${max}/`;
      }
      // alert('now');
      // alert(productPathname);
      // alert(`${productPathname}${urlMin}${urlMax}`);
      ////////////////
      window.location.pathname = `${newUrl}`;
    });
  });



  // --- Detect URL change
  let oldHref = document.location.href;
  let bodyList = document.querySelector("body");
  const observeEl = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                  let newHref = document.location.href;
                  // do something here on url change
                  if ((newHref.indexOf('price_min') == -1)
                  && (newHref.indexOf('price_max') == -1)) {
                    document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`).classList.remove('active');
                    sessionStorage.removeItem(`${productPathname}`);
                  } else if (newHref.indexOf(`price_min-${defaultMin}`) == -1
                  || newHref.indexOf(`price_max-${defaultMax}`) == -1) {
                    document.querySelector(`.${shared.ID}-priceFilters li.${shared.ID}-priceFilter__btn--wrapper.active`).classList.remove('active');
                    sessionStorage.removeItem(`${productPathname}`);
                  }
              }
          });
      });
  const config = {
      childList: true,
      subtree: true
  };
  observeEl.observe(bodyList, config);

};


export default activate;
