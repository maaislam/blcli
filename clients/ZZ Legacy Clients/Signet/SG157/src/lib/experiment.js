/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { EJcontent, EJoffers } from './data';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

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

  // load in jQuery
  const loadScript = (source, beforeEl, async = true, defer = true) => {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      const prior = beforeEl || document.getElementsByTagName('script')[0];
  
      script.async = async;
      script.defer = defer;
  
      function onloadHander(_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = null;
          script.onreadystatechange = null;
          script = undefined;
  
          if (isAbort) { reject(); } else { resolve(); }
        }
      }
  
      script.onload = onloadHander;
      script.onreadystatechange = onloadHander;
  
      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    });
  }
 

  const categoriesData = EJcontent;
  let offers;

  if(VARIATION === '1') {
    offers = EJoffers.offersV1;
  } else if(VARIATION === '2') {
    offers = EJoffers.offersV2;
  }

  // add markup
  const createMarkup = () => {
    const content = document.createElement('div');
    content.classList.add(`${ID}-topContent`);
    content.innerHTML = `
    ${window.innerWidth >= 1024 ? `
    <div class="${ID}-heroBanner">
        <div class="${ID}-left"><a href="https://www.ernestjones.co.uk/webstore/l/luxury-watches/"></a></div>
        <div class="${ID}-middle ${ID}-ctaWrap">
            <h3>Shop Our Categories</h3>
            <div class="${ID}-buttons"></div>
        </div>
        <div class="${ID}-right"><a href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/?brand.lvl0=eternal%20diamond"></a></div>
    </div>` : `
    <div class="${ID}-heroBanner">
        <div class="${ID}-bannerWrap">
            <div class="${ID}-left"><a href="https://www.ernestjones.co.uk/webstore/l/luxury-watches/"></a></div>
            <div class="${ID}-right"><a href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/?brand.lvl0=eternal%20diamond"></a></div>
        </div>
        <div class="${ID}-middle ${ID}-ctaWrap">
            <h3>Shop Our Categories</h3>
            <div class="${ID}-buttons"></div>
        </div>
    </div>`}  
    <div class="${ID}-offersWrap">
        <div class="${ID}-offerContainer">
            <h3>OUR HIGHLIGHTS</h3>
            <div class="${ID}-offers"></div>
        </div>
    </div>`;

    document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', content);
  }

  // add the CTAs
  const addCategories = () => {
      const ctas = categoriesData.categories;
      Object.keys(ctas).forEach((i) => {
          const catEl = ctas[i];
          const category = document.createElement('a');
          category.classList.add(`${ID}-button`);

          if(catEl.colClass) {
            category.classList.add(`${ID}-${catEl.colClass}`);
          }
          category.setAttribute('href', catEl.link);
          category.innerHTML = `<span>${[i][0]}</span>`;

          document.querySelector(`.${ID}-ctaWrap .${ID}-buttons`).appendChild(category);
      });
  }

  // add the offers
  const addOffers = () => {
    const offersData = offers;
    Object.keys(offersData).forEach((i) => {
        const offerEl = offersData[i];
        const offer = document.createElement('div');
        offer.classList.add(`${ID}-offer`);
        offer.innerHTML = `
        <a href="${offerEl.link}">
          <div class="${ID}-offerImage" style ="background-image: url(${offerEl.image})"></div>
        </a>`;

        document.querySelector(`.${ID}-offerContainer .${ID}-offers`).appendChild(offer);
    });
  }

  // slick offers
  const offerCarousel = () => {
    const init = () => {
        window.jQuery(`.${ID}-offers`).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            swipeToSlide: true,
            centerMode: true,
            centerPadding: '30px',
            cssEase: 'linear', 
            variableWidth: true,
            rows: 0,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: true,
                        centerMode: false,
                        variableWidth: false,
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: false,
                        arrows: true,
                    }
                },
                {
                    breakpoint: 766,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        });  
    }
    if(window.jQuery && window.jQuery.fn.slick) {
        init();
      } else {
        window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
          init();
        });
    }
  }

  // cta and offer tracking
  const markupTracking = () => {
  const allOffers = document.querySelectorAll(`.${ID}-offers`);
  for (let index = 0; index < allOffers.length; index += 1) {
      const element = allOffers[index];
      if(element) {
          element.querySelector('a').addEventListener('click', () => {
              fireEvent('Clicked Homepage Offer ' + index);
          }); 
      }
  }

  const allCategoryLinks = document.querySelectorAll(`.${ID}-ctaWrap .${ID}-button`);
  for (let i = 0; i < allCategoryLinks.length; i += 1) {
      const cat = allCategoryLinks[i];
      if(cat) {
          cat.addEventListener('click', () => {
              fireEvent('Clicked Hero Category CTA ' + i);
          });
      }
  }
  }

  if(VARIATION !== 'control') {

    const scriptUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    loadScript(scriptUrl).then(() => {
      createMarkup();
      addCategories();
      addOffers();
      offerCarousel();
      markupTracking();
    });
    
  } else {
    // any control code here
  }
};
