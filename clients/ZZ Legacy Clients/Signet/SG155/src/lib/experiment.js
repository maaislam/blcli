/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
//import { EJOffers, EJV2Offers } from './data';
import { loadScript } from './helpers';

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

  setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    // test code here

    const offerData = window.EJOffers[VARIATION];


    const createMarkup = () => {
        const content = document.createElement('div');
        content.classList.add(`${ID}-topContent`);
        content.innerHTML = `
        <div class="${ID}-offersWrap">
            <div class="${ID}-offerContainer">
                <h3>Our Highlights</h3>
                <div class="${ID}-offers"></div>
            </div>
        </div>`;

        document.querySelector('#access-content .banner').insertAdjacentElement('afterend', content);
    }

    const addOffers = () => {
        const offersData = offerData;
        Object.keys(offersData).forEach((i) => {
            const offerEl = offersData[i];
            const offer = document.createElement('div');
            offer.classList.add(`${ID}-offer`);
            offer.innerHTML = `
            <a href="${offerEl.link}">
            <div class="${ID}-offerImage" style ="background-image: url(${offerEl.image})">
            </div>
            <div class="${ID}-offerInfo">
                <h4>${offerEl.heading}</h4>
                <p>${offerEl.text}</p>
            </div>
            </a>`;

            document.querySelector(`.${ID}-offerContainer .${ID}-offers`).appendChild(offer);
        });
        
    }

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
                          arrows: false,
                      }
                  },
                  {
                      breakpoint: 320,
                      settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          arrows: false,
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
    }

    const scriptUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    loadScript(scriptUrl).then(() => {
        createMarkup();
        addOffers();
        offerCarousel();
        markupTracking();
    });
    
  } else {
    // any control code here
  }
};
