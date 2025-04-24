/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events, pollerLite, logMessage, observer } from '../../../../../lib/utils';


events.analyticsReference = '_gaUAT';

let debug = false;
let takeoverURL, takeoverButtonText, takeoverImage, insertionPosition;
let messageHolderRef;

if(debug === true) {
  takeoverURL = "https://www.sportsdirect.com/sales"; //"${theTakeoverDestURL}";
  takeoverButtonText = "SHOP SALE"; //"${theTakeoverButtonText}";
  takeoverImage = "https://www.sportsdirect.com/images/marketing/summer-sale-infeed-436x410.jpg"; //"${theTakeoverImageURL}";
  insertionPosition = 14; //"${theInsertionPosition}";
} else {
  takeoverURL = "${theTakeoverDestURL}";
  takeoverButtonText = "${theTakeoverButtonText}";
  takeoverImage = "${theTakeoverImageURL}";
  insertionPosition = "${theInsertionPosition}";
}

export default () => {
  setup();

  logMessage("SD-388");

  const { ID, VARIATION } = settings;

  const buildProductTakeover = () => {

    let html = `

      <div class="SD-388-product-takeover loading">

        <div class="loading-spinner">
          <p> Personalising... </p>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
          </svg>
        </div>

        <a href="${takeoverURL}" id="takeover-click" class="takeover-click" style="background-image: url('${takeoverImage}');"> 

          <div class="takeover-main-cta-holder"><span class="takeover-main-cta">${takeoverButtonText}</span></div>

        </a>

      </div>

    `;
    
    return html;

  }

  const checkHeight = () => {
    let element = document.querySelector('#productlistcontainer #navlist li:nth-of-type('+insertionPosition+')');
    let prevEleOffsetHeight = element.clientHeight;
    let prevEleFullHeight = prevEleOffsetHeight;

    messageHolderRef = document.querySelector('.SD-388-product-takeover');
    messageHolderRef.style.height = prevEleFullHeight + "px";
    if(messageHolderRef.classList.contains('loading')) {
      messageHolderRef.classList.remove('loading');
    }

  }

  const addEvents = () => {

    window.addEventListener('resize', checkHeight);

    // Trigger re render on pagniation change
    const wrap = document.querySelector('#productlistcontainer #navlist');
    observer.connect(wrap, () => {

      pollerLite(['#productlistcontainer #navlist li:first-of-type .reviews-container .bv_stars_svg_no_wrap svg', '#productlistcontainer #navlist li:first-of-type .MainImage'], () => {

        if(!document.querySelector('.SD-388-product-takeover')) {
          placeProductTakeover("update");
        }
        
        
      });
      

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
    })

    let takeoverClick = document.getElementById('takeover-click');

    takeoverClick.addEventListener('click', (e) => {
      // sending event click
      let destHref = e.currentTarget.getAttribute('href');
      let currHref = window.location.href;
      events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `click on product takeover - current page href: ${currHref} destination href: ${destHref}`);
    });

  }

  const placeProductTakeover = (method) => {

    let tbInserted = buildProductTakeover();

    if(window.outerWidth < 767) {
      insertionPosition = insertionPosition - 5;
    }

    let ref = document.querySelector('#productlistcontainer #navlist li:nth-of-type('+insertionPosition+')');

    ref.insertAdjacentHTML('beforebegin', tbInserted);

    pollerLite(['.SD-388-product-takeover', '#productlistcontainer #navlist li:first-of-type .MainImage'], () => {

      setTimeout(function() {
        // sets the height of the takeover element to match the ones around it.
        checkHeight();        
      },100);
      
    });

    if(method == "create") {
      addEvents();
    }

    
    
  }

  placeProductTakeover("create");

  

};
