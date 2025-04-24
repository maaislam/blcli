import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import ejBrands from './EJ_brands';
import hsBrands from './HS_brands';
// import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Get Site from hoestname
 * EJ or HS
 */
export const getSiteFromHostname = () => {
  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.body.classList.add(siteIdent);
  }
};

export const checkPageToRunExperiment = () => {
  const { ID, VARIATION } = shared;
  const page = window.location.pathname;
  let runExperiment = false;
  if(getSiteFromHostname() == 'ernestjones') {
    // EJ-specific JS
    const ejPages = ['/webstore/l/watches/select%7Cluxury+watches/?icid=ej-wp-lux-watch',
    '/webstore/l/watches/select%7Cluxury+watches/',
    '/webstore/l/mens-watches/',
    '/webstore/l/ladies-watches/',
    '/webstore/l/watches/'];


    if (ejPages.indexOf(`${page}`) > -1) {
      runExperiment = true;
    }
  }

  if(getSiteFromHostname() == 'hsamuel') {
    // HS-specific JS
    const hsPages = ['/webstore/l/watches/recipient%7chim/?icid=hs-nv-watches-him',
    '/webstore/l/watches/recipient%7Chim/?icid=hs-nv-watches-him',
    '/webstore/l/watches/recipient%7chim/',
    '/webstore/l/watches/recipient%7Chim/',
    '/webstore/l/watches/select%7csale/',
    '/webstore/l/watches/select%7Csale/',
    '/webstore/l/watches/recipient%7cher/',
    '/webstore/l/watches/recipient%7Cher/',
    '/webstore/l/watches/'];

    if (hsPages.indexOf(`${page}`) > -1) {
      runExperiment = true;
    }
  }

  return runExperiment;
};


export const getMostPopularBrandFilters = (brandFilterOptions, availableFilters, preSelectedFilters) => {
  const { ID, VARIATION } = shared;

  const setFilterId = (brand, id) => {
    brand.setAttribute('id', `${id}`);
    availableFilters.push(`${id}`);
    if (brand.classList.contains('checked')) {
      preSelectedFilters.push(`${id}`);
    }
  };

  [].forEach.call(brandFilterOptions, (brand) => {
    let name = brand.querySelector('.filters-panel__refinement-title').innerText.trim().toLowerCase();

    if (getSiteFromHostname() == 'ernestjones') {
      if (name.indexOf('omega') > -1) {
        setFilterId(brand, 'omega');
      } else if (name.indexOf('breitling') > -1
      && name.indexOf('bentley') === -1) {
        setFilterId(brand, 'breitling');
      } else if (name.indexOf('tag heuer') > -1) {
        setFilterId(brand, 'tagHeuer');
      } else if (name.indexOf('tudor') > -1) {
        setFilterId(brand, 'tudor');
      } else if (name.indexOf('longines') > -1) {
        setFilterId(brand, 'longines');
      } else if (name.indexOf('gucci') > -1) {
        setFilterId(brand, 'gucci');
      } else if (name.indexOf('rado') > -1) {
        setFilterId(brand, 'rado');
      } 
    } else if (getSiteFromHostname() == 'hsamuel') {
      if (name.indexOf('citizen') > -1) {
        setFilterId(brand, 'citizen');
      } else if (name.indexOf('casio') > -1) {
        setFilterId(brand, 'casio');
      } else if (name.indexOf('sekonda') > -1) {
        setFilterId(brand, 'sekonda');
      } else if (name.indexOf('seiko') > -1) {
        setFilterId(brand, 'seiko');
      } else if (name.indexOf('tommy hilfiger') > -1) {
        setFilterId(brand, 'tommyHilfiger');
      } else if (name.indexOf('hugo') > -1) {
        setFilterId(brand, 'boss');
      }
    }
    
  });

};


export const generateFiltersContainer = (availableFilters, preSelectedFilters) => {
  const { ID, VARIATION } = shared;
  let options = '';
  if (getSiteFromHostname() == 'ernestjones') {
    const keys = Object.keys(ejBrands);
    for (const key of keys) {
      const brandImg = ejBrands[`${key}`].img; 
      options += `<li data-option="${key}" class="swiper-slide">
        <img src="${brandImg}">
      </li>`;
    }
  } else if (getSiteFromHostname() == 'hsamuel') {
    const keys = Object.keys(hsBrands)
    for (const key of keys) {
      const brandImg = hsBrands[`${key}`].img; 
      options += `<li data-option="${key}">
        <img src="${brandImg}">
      </li>`;
    }
  }
  const brandsFiltersContainer = `<div class="${ID}-brandFilters__wrapper swiper-container v${VARIATION}">
      <h2>Filter by Brand</h2>
      <ul class="${ID}-brandOptions ${ID}__mainProductSlider swiper-wrapper">
        ${options}
      </ul>
      <div class="swiper-pagination"></div>
    </div>`;
  
  // const filtersCta = document.querySelector('.browse__header-section.browse__header-section--filters-applied');
  const filtersCta = document.querySelector('.browse__header-section');
  if (!document.querySelector(`.${ID}-page-heading`) && !document.querySelector(`.${ID}-brandFilters__wrapper`)) {
    filtersCta.insertAdjacentHTML('beforebegin', brandsFiltersContainer);
    const brandFilters = document.querySelectorAll(`ul.${ID}-brandOptions li`);
    [].forEach.call(brandFilters, (filter) => {
      const filterId = filter.getAttribute('data-option');
      if (availableFilters.indexOf(`${filterId}`) == -1) {
        filter.setAttribute('style', 'display: none;');
      }
      if (preSelectedFilters.indexOf(`${filterId}`) > -1) {
        filter.classList.add('selected');
      } 
      filter.addEventListener('click', () => {
        document.querySelector(`a.filters-panel__refinement-link#${filterId}`).click();
      });

    });

  }




  // if(document.querySelectorAll(`.${ID}-brandOptions li`).length > 1) {

  //   const mySwiper = new Swiper (`.swiper-wrapper`, {
  //     direction: 'horizontal',
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //     freeMode: true,
  //     loop: true,
  //     effect: 'fade',
  //     paginationClickable: true,
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true
  //     },
  //   });

  // }

  // // // Slick Slider
  // jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
  //   $(`ul.${ID}-brandOptions`).slick({
  //     infinite: false,
  //     // centerMode: true,
  //     slidesToShow: 7,
  //     slidesToScroll: 1,
  //     adaptiveHeight: true,
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 7,
  //           slidesToScroll: 1,
  //         }
  //       },
  //       {
  //         breakpoint: 460,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 1,
  //         }
  //       },
  //       // You can unslick at a given breakpoint now by adding:
  //       // settings: "unslick"
  //       // instead of a settings object
  //     ]
  //   });
  // });
};
