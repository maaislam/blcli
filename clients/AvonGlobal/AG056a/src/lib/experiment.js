/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, strEndsWith, getPLPType, getLayoutName } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;
  let userClosedModal = false;
  const data = {
    lipstick: {
      title: 'Defines lips for a sculpted look',
      text: 'Lasting colour and comfort in just 1 sweep. Lightweight, hydrating formula which stays true, hour after hour. No drying. No cracking. No caking. Guaranteed comfort.',
      name: 'Avon True Perfectly Matte Lipstick',
      previousPrice: 'R119,00',
      price: 'R85,00',
      ctaLabel: 'View Shades',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/A8C2740750BCAC996AD5AE4D026FABF4A71D4E81D7A83996FA0E24A26B9583E8.png?meta=/AG056a---Product-Promotion-Cards-ZA/lipstick_img.png',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/7B534EA53D5D0CEA63E5D8EA71B0BB6147E8B8221C6C1A66EE91DAC970F4A19C.png?meta=/AG056a---Product-Promotion-Cards-ZA/lipstick_bg.png')",
      url: `${window.location.origin}/product/569/avon-true-perfectly-matte-lipstick-3-6-grams`,
    },
    eyeliner: {
      title: 'All-day colour in just 1 swipe',
      text: 'Improved, more intense formula for tug-free, soft glide, vitamin enriched. Provides higher impact definitionand lasts up to 10 hours with a creamy, smooth colour.',
      name: 'Avon True Glimmerstick Eyeliner',
      previousPrice: 'R99,00',
      price: 'R69,00',
      ctaLabel: 'View Shades',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/D8F211C781BCA1EBA94BBD60E9E1AAA95633605378E8E02AA1470F97E67B479C.png?meta=/AG056a---Product-Promotion-Cards-ZA/eyeliner_img.png',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/160ACA9E816F6AE8D7C15BD6CA0BBEF49B0EDE4FCF4ADB31FF0CF2FB562387F6.png?meta=/AG056a---Product-Promotion-Cards-ZA/eyeliner_bg.png')",
      url: `${window.location.origin}/product/189/avon-true-glimmerstick-eyeliner-0-28-grams`,
    },
    skincare: {
      title: 'A longer lasting collagen boost',
      text: 'SEVEN shots for results in just SEVEN days! That’s the promise of our breakthrough skincare collection that uses Patented Protinol™ Technology, to boost the skin’s collagen to help you restore seven years of collagen loss.',
      name: 'Anew Skin Reset Plumping Shots ',
      price: 'R389,00',
      ctaLabel: 'View Product',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/1CB795BECDB787B6D88E697DC0306C837DEC7666FFA0019806356770321CE02C.png?meta=/AG056a---Product-Promotion-Cards-ZA/skincare_img.png',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/853AD1D3AF4D219CEE13232ECD00BDD3EBFB595F40F9C413B7098E9C208B2B53.png?meta=/AG056a---Product-Promotion-Cards-ZA/skincare_bg.png')",
      url: `${window.location.origin}/product/6249/anew-skin-reset-plumping-shots-7-x-1-3ml`,
    },
  };

  const closeModal = (animate) => {
    if (animate) {
      $(`#${ID}_swipe`).slideUp();

    } else {
      $(`#${ID}_swipe`).hide();
    }
    $('body').removeClass(`${ID}_noscroll`);
    userClosedModal = true;
  };

  // Variation 1 - Popup html
  const getPopupHTML = (content, headerBottomPos, pageType) => {
    return `
      <aside style="top: ${headerBottomPos}px; background-image: ${content.backgroundImage};" class="${ID}_wrapper ${ID}_${pageType}" id="${ID}_swipe">
        <div class="${ID}_content">
          <div class="${ID}_header">
            <p class="${ID}_label">Bestseller</p>
            <div class="${ID}_close-button"></div>
          </div>
          <h4 class="${ID}_title ${ID}_link">${content.title}</h4>
          <div class="${ID}_description">${content.text}</div>
          <div class="${ID}_product-details">
            <div class="${ID}_details-left">
              <h5 class="${ID}_product-name">${content.name}</h5>
              ${content.previousPrice ?
                `<p class="${ID}_previousPrice">WAS: <em>${content.previousPrice}</em></p>`
                :
                `<p class="${ID}_previousPrice"><em></em></p>`
              }
              <p class="${ID}_currentPrice">NOW: <em>${content.price}</em></p>
            </div>
            <div class="${ID}_details-right ${ID}_link" style="background-image: url('${content.image}')"></div>
          </div>
          <div class="${ID}_cta ${ID}_link Button vi-btn vi-btn--primary">${content.ctaLabel}</div>
          <div class="${ID}_scroll-label-wrapper">
            <div class="${ID}_scroll-label">
            <span>Swipe down for products</span>
            </div>
          </div>
        </div>
      </aside>
    `;
  };

  const getVariation2HTML = (content, pageType) => {
    const ctaClass = pageType === 'eyeliner' ? 'vi-btn--primary bg-dark' : 'vi-btn--dark';
    return `
      <aside style="background-image: ${content.backgroundImage};" class="${ID}_wrapper_v2 ${ID}_${pageType}" id="${ID}_swipe">
        <div class="${ID}_content">
          <div class="${ID}_header">
            <p class="${ID}_label">Bestseller</p>
            <div class="${ID}_close-button"></div>
          </div>
          <h4 class="${ID}_title ${ID}_link">${content.title}</h4>
          <h5 class="${ID}_product-name">${content.name}</h5>
          <div class="${ID}_product-details">
            <div class="${ID}_details-right ${ID}_link" style="background-image: url('${content.image}')"></div>
            <div class="${ID}_prices">
              ${content.previousPrice ?
                `<p class="${ID}_previousPrice">WAS: <em>${content.previousPrice}</em></p>`
                :
                `<p class="${ID}_previousPrice"><em></em></p>`
              }
              <p class="${ID}_currentPrice">NOW: <em>${content.price}</em></p>
            </div>
          </div>
          <div class="${ID}_cta ${ID}_link Button vi-btn ${ctaClass}">View product</div>
        </div>
      </aside>
    `;
  };

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {

    if (userClosedModal) return;

    sessionStorage.setItem(`${ID}-init`, '1');
    if (getLayoutName() === 'Phone') {

      // Vars.
      const pageType = getPLPType();
      const content = data[pageType];

      // Variation 1 - popup
      if (VARIATION.toLowerCase() === '1') {
        const $header = $('#HeaderPlaceholder');
        const headerBottomPos = $header.position().top + $header.outerHeight(true);
        const popup = getPopupHTML(content, headerBottomPos, pageType);
        $('body').addClass(`${ID}_noscroll`);

        // Wait for header to fully load it before finding out it's position
        setTimeout(() => {
          const topPos = $header.position().top + $header.outerHeight(true);
          $(`.${ID}_wrapper`).css('top', `${topPos}px`);
        }, 1000);

        // Prevent duplication.
        $(`#${ID}_swipe`).remove();

        // Add popup html to the DOM
        $header.after(popup);

        // Close popup on swipe up event
        window.addEventListener('load', () => {
          const touchsurface = document.getElementById(`${ID}_swipe`);
          let startX;
          let startY;
          let dist;
          const threshold = 200; // required min distance traveled to be considered swipe
          const allowedTime = 300; // maximum time allowed to travel that distance
          let elapsedTime;
          let startTime;

          function handleswipe(hasSwiped) {
            if (hasSwiped) closeModal(true);
          }

          touchsurface.addEventListener('touchstart', (e) => {
            const touchobj = e.changedTouches[0];
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
          }, false);

          touchsurface.addEventListener('touchmove', (e) => {
            // e.preventDefault(); // prevent scrolling when inside DIV
          }, false);

          touchsurface.addEventListener('touchend', (e) => {
            const touchobj = e.changedTouches[0];

            dist = startY - touchobj.pageY; // get total dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            // check that elapsed time is within specified, vertical dist traveled >= threshold, and horizontal dist traveled <= 100
            const swipeUp = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageX - startX) <= 100);
            handleswipe(swipeUp);
          }, false);
        }, false); // end window.onload
      }
      else {
        // Variation 2 - element in page
        const variantHTML = getVariation2HTML(content, pageType);

        // Prevent duplication.
        $(`#${ID}_swipe`).remove();

        // Prepend to the product list.
        $('.ProductList').before(variantHTML);
      }

      // Shared across variations.

      // Handle close.
      $(document).on('click', `.${ID}_close-button`, () => {
        closeModal(true);
      });

      // Open PDP
      $(`.${ID}_link`).click(() => {
        window.location.href = content.url;

        // Track click.
        events.send(`${ID}-${VARIATION}`, 'Click', 'PDP');
      });

    }
    else {
      // On Desktop.
      $(`.${ID}_wrapper`).hide();
      $('body').removeClass(`${ID}_noscroll`);
    }
  };


  // Make device specific changes when layout changes
  rootScope.$on('NotificationService.DismissCookiePolicy', () => {
    setTimeout(init, 500);
  });

  init();
};
