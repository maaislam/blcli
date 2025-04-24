/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import settings from './shared';
import { events, pollerLite, logMessage, observer } from '../../../../../lib/utils';


events.analyticsReference = '_gaUAT';

let messageHolderRef;
let takeoverURL, takeoverButtonText, takeoverImage, insertionPosition;
let takeoverInformation = [
  {desturl: "https://www.sportsdirect.com/mens/footwear/trainers/adidas", buttontext: "View Adidas Trainers", imageurl: "https://www.sportsdirect.com/images/marketing/mens-trainers-adidas.jpg", position: 14, pageurl: "/mens/footwear/trainers"},
  {desturl: "https://www.sportsdirect.com/ladies/footwear/trainers/adidas", buttontext: "View Adidas Trainers", imageurl: "https://www.sportsdirect.com/images/marketing/ladies-trainers-adidas.jpg", position: 14, pageurl: "/ladies/footwear/trainers"},
  {desturl: "https://www.sportsdirect.com/mens/clothing/tracksuit-bottoms", buttontext: "View Tracksuit Bottoms", imageurl: "https://ab-test-sandbox.userconversion.com/experiments/SD-154-takeover-image-menstracksuitbottoms.jpg", position: 14, pageurl: "/mens/clothing/tracksuits"},
  {desturl: "https://www.sportsdirect.com/outdoor-clothing/ladies-outdoor-clothing/ladies-waterproof-jackets", buttontext: "View Waterproof Jackets", imageurl: "https://ab-test-sandbox.userconversion.com/experiments/SD-154-takeover-image-womenscoats.jpg", position: 14, pageurl: "/ladies/clothing/jackets-and-coats"},
  {desturl: "https://www.sportsdirect.com/mens/clothing/hoodies", buttontext: "View Hoodies", imageurl: "https://ab-test-sandbox.userconversion.com/experiments/SD-154-takeover-image-hoodie.jpg", position: 14, pageurl: "/mens/clothing/jackets-and-coats"}
];

export default () => {
  setup();

  logMessage("SD-154");

  const { ID, VARIATION } = settings;

  const buildProductTakeover = () => {

    let currHref = window.location.href;

    takeoverInformation = takeoverInformation.filter((element) => {

      if(currHref.indexOf(element.pageurl) > -1) {
        return element;
      } else {
        return false;
      }

    });

    takeoverURL = takeoverInformation[0].desturl;
    takeoverImage = takeoverInformation[0].imageurl;
    takeoverButtonText = takeoverInformation[0].buttontext;
    insertionPosition = takeoverInformation[0].position;

    let html = `

      <div class="SD-154-product-takeover loading">

        <div class="loading-spinner">
          <p> Personalising... </p>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
          </svg>
        </div>

        <a href="${takeoverURL}" id="takeover-click" class="takeover-click"> 

          <img src="${takeoverImage}" alt="product takeover image" class="takeover-image" />

          <span class="takeover-main-cta">${takeoverButtonText}</span>

        </a>

      </div>

    `;
    
    return html;

  }

  const checkHeight = () => {

    let element = document.querySelector('#productlistcontainer #navlist li:nth-of-type('+insertionPosition+')');
    let prevEleOffsetHeight = element.clientHeight;
    let prevEleFullHeight = prevEleOffsetHeight;

    messageHolderRef = document.querySelector('.SD-154-product-takeover');
    messageHolderRef.style.height = prevEleFullHeight + "px";
    if(messageHolderRef.classList.contains('loading')) {
      messageHolderRef.classList.remove('loading');
    }

  }

  const addEvents = () => {

    let columnSelectors = document.querySelectorAll('.columnselector a');

    [].slice.call(columnSelectors).forEach((linkEle) => {
      linkEle.addEventListener('click', () => {
        let takeoverEle = document.querySelector('.SD-154-product-takeover');
        takeoverEle.classList.add('loading');
        setTimeout(function() {
          // sets the height of the takeover element to match the ones around it.
          checkHeight();  
        },500);
        return true;
      });
    });


    // Trigger re render on pagniation change
    const wrap = document.querySelector('#productlistcontainer #navlist');
    observer.connect(wrap, () => {

      pollerLite(['#productlistcontainer #navlist li:first-of-type .reviews-container .bv_stars_svg_no_wrap svg', '#productlistcontainer #navlist li:first-of-type .MainImage'], () => {

        if(!document.querySelector('.SD-154-product-takeover')) {
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

    let scrollWatch = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          events.send(settings.ID, `${settings.ID} Variation ${settings.VARIATION}`, `User has seen product takeover`);
          setTimeout(function() {
            // sets the height of the takeover element to match the ones around it.
            checkHeight();  
          },250);
        }
      });
    }, { root: null });

    scrollWatch.observe(document.querySelector('.SD-154-product-takeover'));

  }

  const placeProductTakeover = (method) => {

    let tbInserted = buildProductTakeover();

    insertionPosition = 14;
    if(window.outerWidth < 600) {
      insertionPosition = 9;
    }

    let ref = document.querySelector('#productlistcontainer #navlist li:nth-of-type('+insertionPosition+')');

    ref.insertAdjacentHTML('beforebegin', tbInserted);

    pollerLite(['.SD-154-product-takeover', '#productlistcontainer #navlist li:first-of-type .reviews-container .bv_stars_svg_no_wrap svg', '#productlistcontainer #navlist li:first-of-type .MainImage'], () => {

      setTimeout(function() {
        // sets the height of the takeover element to match the ones around it.
        checkHeight();        
      },500);
      
    });

    if(method == "create") {
      addEvents();
    }

    
    
  }

  placeProductTakeover("create");

  

};
