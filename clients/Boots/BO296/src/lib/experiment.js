/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { logMessage, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import Swiper from 'swiper/swiper-bundle';
const { ID, VARIATION } = shared;

const checkMobileFilters = (theType) => {
  return new Promise((resolve) => {
    let filterToClick;
    if (theType == "brand") {
      filterToClick = '.oct-listers-facets__item--brand';
    } else if(theType == "productType") {
      filterToClick = '.oct-listers-facets__item--product_type';
    } else if(theType == "rating") {
      filterToClick = '.oct-listers-facets__item--roundedReviewScore';
    }

    pollerLite(['.oct-listers-facet-burger-menu'], () => {

      if (!document.querySelector('.oct-listers-facet-burger-menu').classList.contains(`${ID}-pullingdata`)) {
        document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
        document.querySelector('.oct-listers-facet-burger-menu > button').click();
      }

      document.querySelector(`${filterToClick} > button`).click();
      if(theType == "rating") {
        pollerLite(['.rating-facet__child'], () => {

          let allFilters = document.querySelectorAll('.rating-facet__child');
          document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
          document.querySelector('.oct-listers-facet-menu__backdrop').click();
          resolve(allFilters);
        });

      } else {
        pollerLite(['.checkbox-list-facet__child'], () => {

          let allFilters = document.querySelectorAll('.checkbox-list-facet__child');
          document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
          document.querySelector('.oct-listers-facet-menu__backdrop').click();
          resolve(allFilters);
        });
      }


    });

  });

}

const clickMobileFilters = (theType, theValue) => {
    let filterToClick;
    if (theType == "brand") {
      filterToClick = '.oct-listers-facets__item--brand';
    } else if(theType == "productType") {
      filterToClick = '.oct-listers-facets__item--product_type';
    } else if (theType == "rating") {
      filterToClick = '.oct-listers-facets__item--roundedReviewScore';
    }

    pollerLite(['.oct-listers-facet-burger-menu'], () => {

      if (!document.querySelector('.oct-listers-facet-burger-menu').classList.contains(`${ID}-pullingdata`)) {
        document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
        document.querySelector('.oct-listers-facet-burger-menu > button').click();
      }

      document.querySelector(`${filterToClick} > button`).click();

      if (theType == "rating") {

        pollerLite(['.rating-facet__child'], () => {

          let allFilters = document.querySelectorAll('.rating-facet__child');
          allFilters.forEach((filter) => {

            if (filter.querySelector('.oct-input-radio__label').getAttribute('for') == theValue) {
              filter.querySelector('input').click();
            }

          });
          document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
          document.querySelector('.oct-listers-facet-menu__backdrop').click();
        });

      } else {

        pollerLite(['.checkbox-list-facet__child'], () => {

          let allFilters = document.querySelectorAll('.checkbox-list-facet__child');
          allFilters.forEach((filter) => {

            if (filter.querySelector('.checkbox__label').innerText.toLowerCase().substring(0, filter.querySelector('.checkbox__label').innerText.toLowerCase().indexOf('(')) == theValue.toLowerCase()) {
              filter.querySelector('input').click();
            }

          });
          document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
          document.querySelector('.oct-listers-facet-menu__backdrop').click();
        });

      }


    });

}

const getFilters = (filterType) => {
  return new Promise((resolve) => {

    if(filterType == "brand") {

        if(window.outerWidth > 1020) {
          pollerLite(['.oct-listers-facets__item--brand'], () => {
            let allCurrBrandOptions = document.querySelectorAll('.oct-listers-facets__item--brand .checkbox-list-facet__child');
            resolve(allCurrBrandOptions);
          });
        } else {
          checkMobileFilters('brand').then((data) => {
            let allCurrBrandOptions = data;
            resolve(allCurrBrandOptions);
          });
          
        }

    } else if(filterType == "productType") {

      if (window.outerWidth > 1020) {
        pollerLite(['.oct-listers-facets__item--product_type'], () => {
          let allCurrProductTypeOptions = document.querySelectorAll('.oct-listers-facets__item--product_type .checkbox-list-facet__child');
          resolve(allCurrProductTypeOptions);
        });
      } else {
        checkMobileFilters('productType').then((data) => {
          let allCurrProductTypeOptions = data;
          resolve(allCurrProductTypeOptions);
        });

      }

    } else if (filterType == "rating") {

      if (window.outerWidth > 1020) {
        pollerLite(['.oct-listers-facets__item--roundedReviewScore'], () => {
          let allCurrRatingOptions = document.querySelectorAll('.oct-listers-facets__item--roundedReviewScore .rating-facet__child');
          resolve(allCurrRatingOptions);
        });
      } else {
        checkMobileFilters('rating').then((data) => {
          let allCurrRatingOptions = data;
          resolve(allCurrRatingOptions);
        });

      }

    }

  });


}

const createFilterWrapper = (type) => {
  const heroFilter = document.createElement('div');
  heroFilter.classList.add(`${ID}-heroFilters`);

  let productType = "brand";
  if(type == "productType") {
    productType = "product type";
  } else if(type == "rating") {
    productType = "rating";
  }


  heroFilter.innerHTML = `
    <h3>Filter by <span>${productType}:</span></h3>
    <div class="${ID}-filters">
      <div class="swiper" id="${ID}-swiper">
      <div class="swiper-wrapper"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      </div>
    </div>`;
  document.querySelector('#octListers').insertAdjacentElement('beforebegin', heroFilter);
  document.querySelector('#octListers').parentElement.classList.add(`${ID}-filters-holder`);
  //document.querySelector('#estores_product_listing_widget').insertAdjacentElement('afterbegin', heroFilter);
};

const brandFilters = (brandData) => {

  const allBrandFilters = brandData;

  for (let index = 0; index < allBrandFilters.length; index += 1) {
    const element = allBrandFilters[index];
    const filterName = element.querySelector('.checkbox__label').innerText.substring(0, element.querySelector('.checkbox__label').innerText.indexOf('('));
    const filterActive = element.classList.contains('checkbox-list-facet__child--selected') ? true : false;
    const brandFilter = document.createElement('div');
    brandFilter.classList.add(`${ID}-topFilter`);
    brandFilter.classList.add('swiper-slide');
    if(filterActive) {
      brandFilter.classList.add(`${ID}-filterActive`);
    }
    brandFilter.setAttribute('filter-target', filterName);
    brandFilter.setAttribute('filter-type', 'brand');
    brandFilter.innerHTML = `<span>${filterName}</span>`;

    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(brandFilter);
    
  }
};


const productTypeFilters = (productTypeData) => {

  const allProductTypeFilters = productTypeData;

  for (let index = 0; index < allProductTypeFilters.length; index += 1) {
    const element = allProductTypeFilters[index];
    const filterName = element.querySelector('.checkbox__label').innerText.substring(0, element.querySelector('.checkbox__label').innerText.indexOf('('));
    const filterActive = element.classList.contains('checkbox-list-facet__child--selected') ? true : false;
    const brandFilter = document.createElement('div');
    brandFilter.classList.add(`${ID}-topFilter`);
    brandFilter.classList.add('swiper-slide');
    if (filterActive) {
      brandFilter.classList.add(`${ID}-filterActive`);
    }
    brandFilter.setAttribute('filter-target', filterName);
    brandFilter.setAttribute('filter-type', 'productType');
    brandFilter.innerHTML = `<span>${filterName}</span>`;

    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(brandFilter);

  }
};

const ratingFilters = (ratingData) => {

  const allRatingFilters = ratingData;

  for (let index = 0; index < allRatingFilters.length; index += 1) {
    const element = allRatingFilters[index];
    let filterName = "";
    const filterLabelFor = element.querySelector('.oct-input-radio__label').getAttribute('for');
    if (filterLabelFor == "RadioCount-5") {
      filterName = "5 stars only";
    } else if (filterLabelFor == "RadioCount-4") {
      filterName = "4 stars and up";
    } else if (filterLabelFor == "RadioCount-3") {
      filterName = "3 stars and up";
    } else if (filterLabelFor == "RadioCount-2") {
      filterName = "2 stars and up";
    } else if (filterLabelFor == "RadioCount-1") {
      filterName = "1 star and up";
    }
    const filterActive = element.classList.contains('rating-facet__child--selected') ? true : false;
    const ratingFilter = document.createElement('div');
    ratingFilter.classList.add(`${ID}-topFilter`);
    ratingFilter.classList.add('swiper-slide');
    if (filterActive) {
      ratingFilter.classList.add(`${ID}-filterActive`);
    }
    ratingFilter.setAttribute('filter-target', filterLabelFor);
    ratingFilter.setAttribute('filter-type', 'rating');
    ratingFilter.innerHTML = `<span>${filterName}</span>`;

    document.querySelector(`.${ID}-filters .swiper-wrapper`).appendChild(ratingFilter);

  }
};

const startSwiper = () => {

  new Swiper(`#${ID}-swiper`, {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 0,
    slidesOffsetAfter: 0,

    navigation: {
      nextEl: `#${ID}-swiper .swiper-button-next`,
      prevEl: `#${ID}-swiper .swiper-button-prev`,
    }
  });



}

const processExperiment = () => {

  if (VARIATION == 1) {

    // grab and use Rating Filters

    getFilters('rating').then((data) => {
      createFilterWrapper('rating');
      ratingFilters(data);
      startSwiper();
      fireEvent(`Interaction - Rating filters displayed`, true);
    });


  } else if (VARIATION == 2) {

    // grab and use productType filters

    getFilters('productType').then((data) => {
      createFilterWrapper('productType');
      productTypeFilters(data);
      startSwiper();
      fireEvent(`Interaction - product type filters displayed`, true);

    });


  } else if (VARIATION == 3) {

    // grab and use Brand Filters

    getFilters('brand').then((data) => {
      createFilterWrapper('brand');
      brandFilters(data);
      startSwiper();
      fireEvent(`Interaction - brand filters displayed`, true);
    });


  }

}

const startExperiment = () => {

  logMessage(`Started Experiment ${ID} - ${VARIATION}`);

  processExperiment();

  let oldHref = document.location.href;
  let bodyList = document.querySelector("body");
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        if (document.querySelector(`.${ID}-filters-holder`)) {
          pollerLite([`.${ID}-heroFilters`], () => {
            const filterBlock = document.querySelector(`.${ID}-heroFilters`);
            if (filterBlock) {
              filterBlock.remove();
            }
            processExperiment();
          });
        }



      }
    });
  });
  const config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);

  document.body.addEventListener('click', (e) => {

    if(e.target.classList.contains(`${ID}-topFilter`) || e.target.closest(`.${ID}-topFilter`)) {
      let element = e.target.classList.contains(`${ID}-topFilter`) ? e.target : e.target.closest(`.${ID}-topFilter`);
      let filterVal = element.getAttribute('filter-target');
      let filterType = element.getAttribute('filter-type');
      if(window.outerWidth > 1020) {
        if (filterType == "brand") {
          let allBrandFilters = document.querySelectorAll('.oct-listers-facets__item--brand .checkbox-list-facet__child');
          allBrandFilters.forEach((filter) => {

            if (filter.querySelector('.checkbox__label').innerText.substring(0, filter.querySelector('.checkbox__label').innerText.indexOf('(')) == filterVal) {
              filter.querySelector('input').click();
            }

          });
        } else if(filterType == "productType") {

          let allBrandFilters = document.querySelectorAll('.oct-listers-facets__item--product_type .checkbox-list-facet__child');
          allBrandFilters.forEach((filter) => {

            if (filter.querySelector('.checkbox__label').innerText.substring(0, filter.querySelector('.checkbox__label').innerText.indexOf('(')) == filterVal) {
              filter.querySelector('input').click();
            }

          });

        } else if(filterType == "rating") {

          let allBrandFilters = document.querySelectorAll('.oct-listers-facets__item--roundedReviewScore .rating-facet__child');
          allBrandFilters.forEach((filter) => {

            let filterLabelFor = filter.querySelector('.oct-input-radio__label').getAttribute('for');
            if(filterLabelFor == filterVal) {
              filter.querySelector('input').click();
            }

          });

        }

      } else {


        clickMobileFilters(filterType, filterVal);


      }

      fireEvent(`Click - filter clicked: ${filterVal} - ${filterType}`, true);
      
    }

  });





}

const startFilterTracking = () => {

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.checkbox-list-facet__child') && e.target.tagName.toLowerCase() == "input") {

      let thisFilterType;
      if (window.outerWidth < 992) {
        thisFilterType = e.target.closest('.oct-listers-facets-wrapper').querySelector('.oct-listers__filter-by__heading').innerText;
      } else {
        thisFilterType = e.target.closest('.oct-accordion__item').querySelector('.oct-accordion__text-wrapper h2').innerText;
      }
      let thisFilterName = e.target.closest('.checkbox-list-facet__child').querySelector('.checkbox__label').innerText;
      let isCurrentlyActive = e.target.closest('.checkbox-list-facet__child').classList.contains('checkbox-list-facet__child--selected') ? true : false;
      thisFilterName = thisFilterName.substring(0, thisFilterName.indexOf('('));
      if (isCurrentlyActive === false) {
        fireEvent(`Click - click on checkbox filter: ${thisFilterName} with type: ${thisFilterType}`, true);

      }


    }

    if (e.target.closest('.colour-facet__child')) {

      let thisFilterType = "Colour";
      let thisFilterName = e.target.closest('.colour-facet__child').querySelector('.colour-facet__child__name').innerText;
      fireEvent(`Click - click on colour filter: ${thisFilterName} with type: ${thisFilterType}`, true);

    }

    if (e.target.closest('.rating-facet__child')) {
      let thisFilterType = "Rating";
      let thisFilterName = e.target.closest('.rating-facet__child').getAttribute('aria-label');
      thisFilterName = thisFilterName.substring(0, thisFilterName.indexOf('stars') + 5);
      fireEvent(`Click - click on rating filter: ${thisFilterName} with type: ${thisFilterType}`, true);
    }

    if (e.target.closest('.oct-hero-filter')) {

      let slide = e.target.closest('.swiper-slide');
      let slideButtonText = slide.querySelector('.oct-hero-filter-swiper-slide__content').innerText;

      fireEvent(`Interaction - click on control hero filter item ${slideButtonText}`, true);

    }

  })


}

export default () => {

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  startFilterTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();

};
