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
  const data = {
    face: {
      title: 'FLAWLESS IN 5',
      text: 'This hydrating foundation with SPF15 uses Blue Colour IQ technology to create a beautiful, full-coverage finish without the cakey feel.',
      name: 'Flawless Liquid Foundation',
      price: '£7.00',
      previousPrice: '£10.00',
      ctaLabel: 'View Shades',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/34DF6BD306E8E86290EA0721D307ACD4B380BC06BAB394CCE5135940D189A66E.png?meta=/AV049---Brochure-style-Product-Promotion/Group9.png',
      // image: '#$(ContentManager:face_product.png)!',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/7B7DFB039972F8CA21B5E78B9D577AA6AC0D39A3753B171BD06DFD58628DA9DD.png?meta=/AV049---Brochure-style-Product-Promotion/face_background.png')",
      // backgroundImage: "url('#$(ContentManager:face_background.png)!)",
      url: `${window.location.origin}/product/5498/avon-true-flawless-liquid-foundation-spf15`,
    },
    skincare: {
      title: 'HYDRATED HAPPY SKIN',
      text: 'Lock in moisture with our Skin So Soft Original Dry Oil Spray. Infused with jojoba oil to help your skin feel silky smooth.',
      name: 'Skin So Soft Original Dry Oil Spray',
      price: '£3.50',
      ctaLabel: 'View Product',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/BC561BE267B9255805319187FFBFA736E2BF509BA48DC0163456EA6FFEFBED63.png?meta=/AV049---Brochure-style-Product-Promotion/Group10.png',
      // image: '#$(ContentManager:skin_product.png)!',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/FB9488D6B6ADE6550556E0A4004DE35BC140C25BD510DCDAD5757AA75BEF9C02.png?meta=/AV049---Brochure-style-Product-Promotion/skin_background.png')",
      // backgroundImage: "url('#$(ContentManager:skin_background.png)!)",
      url: `${window.location.origin}/product/5072/skin-so-soft-original-dry-oil-spray-150ml`,
    },
    nails: {
      title: 'MANI MUST-HAVE',
      text: 'Enjoy high-shine, high-impact salon-ready nails with our Gel Shine Nail Enamel. Our new and improved formula provides intense plump colour without a UV lamp!',
      name: 'Gel Shine Nail Enamel',
      price: '£3.50',
      previousPrice: '£4.00',
      ctaLabel: 'View Colours',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/4306BCC0C140FF6B450CB0293C53FD894401C7A3C8B245AAF55191ED8EB3AFAC.png?meta=/AV049---Brochure-style-Product-Promotion/Group11.png',
      // image: '#$(ContentManager:nails_product.png)!',
      backgroundImage: "linear-gradient(180deg, #FCFEFF 0%, rgba(252, 254, 255, 0) 100%), url('https://service.maxymiser.net/cm/images-eu/avon-mas/146F4274A786A59CBF364B3E180F9FD1929968570EBEEE692B919A64E9E0F810.png?meta=/AV049---Brochure-style-Product-Promotion/nails_background.png')",
      // backgroundImage: "linear-gradient(180deg, #FCFEFF 0%, rgba(252, 254, 255, 0) 100%), url('#$(ContentManager:nails_background.png)!')",
      url: `${window.location.origin}/product/14047/gel-shine-nail-enamel`,
    },
  };

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {

    sessionStorage.setItem(`${ID}-init`, '1');
    if (getLayoutName() === 'Phone') {

      const pageType = getPLPType();
      const content = data[pageType];

      const $header = $('#HeaderPlaceholder');
      const headerBottom = $header.position().top + $header.outerHeight(true);
      $('body').addClass(`${ID}_noscroll`);

      const popup = `
        <aside style="top: ${headerBottom}px; background-image: ${content.backgroundImage};" class="${ID}_wrapper" id="${ID}_swipe">
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
                ${content.previousPrice ? `<p class="${ID}_previousPrice">WAS: <em>${content.previousPrice}</em></p>` : ''}
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

      setTimeout(() => {
        const topPos = $header.position().top + $header.outerHeight(true);
        $(`.${ID}_wrapper`).css('top', `${topPos}px`);
      }, 1000);

      // Add to the DOM
      $header.after(popup);

      const closeModal = (animate) => {
        if (animate) {
          $(`.${ID}_wrapper`).slideUp();

        } else {
          $(`.${ID}_wrapper`).hide();
        }
        $('body').removeClass(`${ID}_noscroll`);

        // Track.
        if (window.usabilla_live) window.usabilla_live('trigger', 'Variation negative');
      };

      // Handle close.
      $(document).on('click', `.${ID}_close-button`, () => {
        closeModal(true);
      });

      // Open PDP
      $(`.${ID}_link`).click(() => {
        window.location.href = content.url;

        // Track click.
        events.send(`${ID}-${VARIATION}`, 'Click', 'PDP');
        if (window.usabilla_live) window.usabilla_live('trigger', 'Variation positive');
      });

      // On swipe
      window.addEventListener('load', () => {
        const touchsurface = document.getElementById(`${ID}_swipe`);
        let startX;
        let startY;
        let dist;
        const threshold = 100; // required min distance traveled to be considered swipe
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
          e.preventDefault(); // prevent scrolling when inside DIV
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
      $(`.${ID}_wrapper`).hide();
      $('body').removeClass(`${ID}_noscroll`);
    }
  };


  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
