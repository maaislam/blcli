/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer, pollerLite } from '../../../../../lib/utils';
import filters from './components/filters';
import heroProduct from './components/heroProduct';
import inGrid from './components/inGrid';
import QuickViewBox from './components/quickviewbox';
import quickViewContent from './components/quickViewContent';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800);

  if(VARIATION !== 'control') {

    const addCssToPage = (href, id, classes) => {
      if (document.querySelector(`#${id}`)) {
        return;
      }
    
      const c = document.createElement('link');
      c.setAttribute('id', id);
      c.setAttribute('rel', 'stylesheet');
    
      if (classes) {
        c.className = classes;
      }
    
      c.href = href;
      document.head.appendChild(c);
    };
    const addJsToPage = (src, id, cb, classes) => {
      if (document.querySelector(`#${id}`)) {
        return;
      }
    
      const s = document.createElement('script');
      if (typeof cb === 'function') {
        s.onload = cb;
      }
    
      if (classes) {
        s.className = classes;
      }
    
      s.src = src;
      s.setAttribute('id', id);
      document.head.appendChild(s);
    };

    addJsToPage(swiperJs, `${ID}__swiperjs`);
    addCssToPage(swiperCss, `${ID}__swipercss`);


    
    filters();
    if(VARIATION === '1') {
      heroProduct();
    }

    if(window.innerWidth >= 1024 && VARIATION !== '3') {
      pollerLite([() => typeof window.Swiper === 'function'], () => {
        new QuickViewBox(); 
        quickViewContent();
      });
    }

    inGrid();

    // Observer for new elements
    const removeAllEls = () => {
      const quickViewCTA = document.querySelectorAll(`.${ID}-quickViewCTA`);
      if(quickViewCTA) {
        quickViewCTA.forEach((elm) => {
          elm.remove();
        });
      }

      const removeInGrid = document.querySelectorAll(`.${ID}-inGrid`);
      if(removeInGrid) {
        removeInGrid.forEach((el) => {
          el.remove();
        });
      }

      const heroProduct = document.querySelector(`.${ID}-heroProduct`);
      if(heroProduct) {
        heroProduct.remove();
      }
    }

    observer.connect(document.querySelector('.products.products-display--grid'), () => {
      removeAllEls();

      if(VARIATION === '1' && document.documentElement.classList.contains("popularOnly")) {
        heroProduct();
      }

      if(window.innerWidth >= 1024 && VARIATION !== '3') {
        quickViewContent();
      }
  
      inGrid();
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        subTree: true
      },
    });



    
  } else {
    // any control code here
  }
};
