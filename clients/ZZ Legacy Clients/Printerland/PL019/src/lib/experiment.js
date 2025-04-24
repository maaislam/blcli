/**
 * PL019 - Price & brand Smart Filter (PLP)
 * @author User Conversion
 */
import { setup } from './services';
import { getUrlParameter } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import settings from './settings';
import { clickPriceRangeFilterBtn, movedPriceSlider, brandCheckboxes, sortByFilterSelection } from './bindExperimentEvents';
import rangeSlider from './priceFilterSlider/nouislider';
import brandsContent from './brands_data';
import preSelectedBrands from './preSelectedBrands';
import getDataFromPDP from './getDataFromPDP';
import availableFilterBrands from './availableFilterBrands';
import queryBrands from './queryBrands';

const activate = () => {
  // Experiment code
  if ((localStorage.getItem('recentlyViewedProducts') !== null && JSON.parse(localStorage.getItem('recentlyViewedProducts')).length > 2) && window.location.href.indexOf('/printers') > -1 ) {
    setup();
    const device = document.documentElement.clientWidth > 500 ? 'desktop' : 'mobile';
    pollerLite(['#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_ctl01_ddBrands .inner .checkbox'], () => {
      brandCheckboxes();
    });
    // console.log(availableFilterBrands);
    /**
     * @desc Get list of Recently Viewed Product Data
     * Extract Minimum and Maximum price to create the Price Slider
     */
    const recentlyViewedProducts = JSON.parse(localStorage.getItem('recentlyViewedProducts'));
    // console.log(recentlyViewedProducts);
    let prices = [];
    [].forEach.call(recentlyViewedProducts, (product) => {
      let bPrice = parseFloat(product.business_price);
      prices.push(Math.floor(bPrice));
    });
    let max = Math.max.apply(null, prices);
    let min = Math.min.apply(null, prices);
    // console.log(`MIN: ${min}`);
    // console.log(`MAX: ${max}`);
    /**
     * @desc Get the values of min and max, either from recently viewed products or the url
     * Default min to 0 to 16000
     * These are our 'starting' values
     */
    let urlMin = parseInt(getUrlParameter('price-from'));
    let urlMax = parseInt(getUrlParameter('price-to'));
    let recentlyViewedMin = min || 0;
    let recentlyViewedMax = max || 16000;

    // These values are taken either from the URL, or from recently viewed products
    // let minTemp = urlMin != null ? urlMin : recentlyViewedMin;
    // let maxTemp = urlMax != null ? urlMax : recentlyViewedMax;
    let minTemp = recentlyViewedMin;
    let maxTemp = recentlyViewedMax;
    if (urlMax > recentlyViewedMax) {
      maxTemp = urlMax;
    }
    if (urlMin < recentlyViewedMin) {
      minTemp = urlMin;
    }
    const pricesArray = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 9000, 10000, 12000, 14000, 16000];

    let newMin = 0;
    let newMax = prices[prices.length - 1];
    let counter = 0;

    while(newMin == 0) {
      if(pricesArray[counter] <= minTemp && pricesArray[counter+1] >= minTemp) {
        newMin = pricesArray[counter];
      }
      counter++
      if(!pricesArray[counter+1]) {
        break;
      }
    }
    counter = 0;
    while(newMax == prices[prices.length - 1]) {
      if(pricesArray[counter] < maxTemp && pricesArray[counter+1] >= maxTemp) {
        newMax = pricesArray[counter+1];
      }
      counter++
      if(!pricesArray[counter+1]) {
        break;
      }
    }

    // Use this range to create a sliced Array:
    const newPrices = pricesArray.slice(pricesArray.indexOf(newMin), pricesArray.indexOf(newMax) + 1);

    // Add percentage keys based on how many items are now in our sliced array
    let rangeValues = {};
    newPrices.forEach((price, index) => {
      let k = parseInt((index * 100) / (newPrices.length - 1)) + '%';
      if(index == 0) {
        k = 'min';
      } else if(index == newPrices.length - 1) {
        k = 'max';
      }

      rangeValues[k] = parseInt(price);
    });

    // console.log(rangeValues);
    /**
     * @desc If price filter is not applied, apply new Min and Max values
     * This refreshes page
     */
    if (getUrlParameter('price-from') === null && getUrlParameter('price-to') === null) {
      window.location.href =  `https://www.printerland.co.uk${window.location.pathname}?price-from=${newMin}&price-to=${newMax}`;
    }
    
    /**
     * @desc Create Sort By buttons (Popularity, Rating, etc.) based on the Sort By Select
     * Hide Control Select
     */
    let newSortByContainer = '';
    if (device === 'desktop') {
      const sortBy = document.querySelector('select#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_drpDepartmentsSortBy');
      const sortByOptions = sortBy.options;
      let sortByOptionsContent = '';
      [].forEach.call(sortByOptions, (el) => {
        const optionText = el.innerText.trim();
        const optionValue = el.value;
        let selectedOption = '';
        if (el.getAttribute('selected') === 'selected') {
          selectedOption = 'selected';
        }
        sortByOptionsContent += `<div class="PL019-sortBy__btn ${selectedOption}" value="${optionValue}">${optionText}</div>`;
      });
      newSortByContainer = `<div class="PL019-sortBy__wrapper">
        <div class="PL019-sortBy__container">
          <div class="PL019-sortBy__label">Sort By:</div>
          <div class="PL019-sortBy__options">${sortByOptionsContent}</div>
        </div>
      </div>`;

      const sortBySelectElement = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlPager');
      if (sortBySelectElement) {
        sortBySelectElement.classList.add('hide');
      }
    }
    
    // ----------- BRANDS -------------
    let brands = [];
    let priorityBrands = ['Xerox', 'Lexmark', 'HP', 'Samsung', 'Epson', 'Kyocera', 'OKI'];
    recentlyViewedProducts.reverse().forEach(product => {
      // Add brand in brands array
      if (brands.indexOf(product.brand) === -1) {
        // Remove Recently Viewed Brand from Priority list (to avoid duplicates)
        if (priorityBrands.indexOf(`${product.brand}`) > -1) {
          let index = priorityBrands.indexOf(`${product.brand}`);
          priorityBrands.splice(index, 1);
        }
        // Do the same for Available Brands (on page)
        if (availableFilterBrands.availableBrands.indexOf(`${product.brand}`) > -1) {
          let index = availableFilterBrands.availableBrands.indexOf(`${product.brand}`);
          availableFilterBrands.availableBrands.splice(index, 1);
          brands.push(product.brand);
        }
      }
    });
    // console.log(`[164] Priority brands:: ${priorityBrands}`);
    // Check if priority brand is in available brands filters
    priorityBrands.forEach(item => {
      if (availableFilterBrands.availableBrands.indexOf(`${item}`) === -1) {
        let index = priorityBrands.indexOf(`${item}`);
        priorityBrands.splice(index, 1);
      }
    });
    // Remove duplicate brands from available brands
    priorityBrands.forEach(item => {
      if (availableFilterBrands.availableBrands.indexOf(`${item}`) > -1) {
        let index = availableFilterBrands.availableBrands.indexOf(`${item}`);
        availableFilterBrands.availableBrands.splice(index, 1);
      }
    });
    // console.log(`--- Recently Brands: ${brands}`);

    // Brands List to be build
    let brandListItems = '';
    let count = 0;
    // console.log(`--- Priority Brands: ${priorityBrands}`);
    // console.log(`--- Available Filter Brands: ${availableFilterBrands.availableBrands}`);

    // Create Brands Final List
    let brandsToBeBuilt = [];
    brandsToBeBuilt.push.apply(brandsToBeBuilt, brands);
    brandsToBeBuilt.push.apply(brandsToBeBuilt, priorityBrands);
    brandsToBeBuilt.push.apply(brandsToBeBuilt, availableFilterBrands.availableBrands);

    for (let i = 0; i < brandsToBeBuilt.length; i += 1) { 
      const content = brandsContent[`${brandsToBeBuilt[i]}`];
      if (brandsToBeBuilt.indexOf(brandsContent[`${brandsToBeBuilt[i]}`].value) > -1 && count < 5) {
        let checked = '';
        if (preSelectedBrands.brandFilters.indexOf(`${content.value}`) > -1) {
          checked = 'checked';
        }
        brandListItems += `<li>
          <input type="checkbox" name="${content.value}" value="${content.value}" ${checked}>
            <span class="brand__img" id="PL019-${content.id}-brand"></span>
          </li>`;

        count += 1;
      }    
    }
    rangeSlider();
    const sliderContainer = `${newSortByContainer}
    <div class='PL019-rangeSlider__wrapper'>
    <div class="PL019-filterLabel"><span>Refine your search, here are some filters for you</span></div>
      <div class="PL019-brandsCheck__wrapper">
        <ul class="PL019-brands__list">
          ${brandListItems}
        </ul>
      </div>
      <div class='PL019-rangeSlider__content'>
        <div id='skipstep'></div>
        <div class='PL019-sliderValues'>
          <span class='example-val' id='skip-value-lower'></span>
          <span class='example-val' id='skip-value-upper'></span>
          <span class='example-val' id='PL019-minValue'>£${newMin}</span>
          <span class='example-val' id='PL019-maxValue'>£${newMax }</span>
        </div>
        <div class='PL019-rangeSlider__button'>
          <div class='PL019-ctaBtn'>Refine Search</div>
        </div>
      </div>
    </div>`;
    document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlProductList').insertAdjacentHTML('beforebegin', sliderContainer);

    // Check if price filter was previously selected
    const storageItem = sessionStorage.getItem('PL019_filtered-by-price-range');
    /*eslint-disable */

    if (storageItem !== null) {
      const minMax = JSON.parse(storageItem);
      newMin = minMax.min;
      newMax = minMax.max;
    }
    
    let skipSlider = document.getElementById('skipstep');

    // ---- Get Min and Max values for handles ----
    // const minHandleValue = newPrices[0];
    // const maxHandleValue = newPrices[newPrices.length-1];
    const minHandleValue = urlMin;
    const maxHandleValue = urlMax;

    noUiSlider.create(skipSlider, {
      range: rangeValues,
      direction: 'ltr',
      snap: true,
      start: [minHandleValue, maxHandleValue]
    });

    if (document.querySelector('.noUi-handle-lower') && document.querySelector('.noUi-handle-upper')) {
      document.querySelector('.noUi-handle-lower').insertAdjacentHTML('afterbegin', `<div id='PL019-minHandle'>£${minHandleValue}</div>`);
      document.querySelector('.noUi-handle-upper').insertAdjacentHTML('afterbegin', `<div id='PL019-maxHandle'>£${maxHandleValue}</div>`);
    }
    
    let skipValues = [
      document.getElementById('PL019-minValue'),
      document.getElementById('PL019-maxValue')
    ];
    skipSlider.noUiSlider.on('update', function (values, handle) {
      document.querySelector('#PL019-minHandle').innerText = `£${values[0].replace('.00', '')}`;
      document.querySelector('#PL019-maxHandle').innerText = `£${values[1].replace('.00', '')}`;
      // skipValues[handle].innerHTML = `£${values[handle].replace('.00', '')}`;
    });
    /* eslint-enable */
    pollerLite(['.noUi-handle', '.PL019-ctaBtn', '.PL019-brands__list'], () => {
      movedPriceSlider();
      clickPriceRangeFilterBtn();
      brandCheckboxes();
      sortByFilterSelection();
    });
  } else if (window.location.href.indexOf('/product/') > -1) {
    setup();
    getDataFromPDP();
  }

  /**
   * @desc When content is reloaded, then re-run the experiment
   */
  pollerLite(['#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_updateProducts'], () => {
    observer.connect([document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_updateProducts')], () => {
      activate();
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  });
  
};

export default activate;
