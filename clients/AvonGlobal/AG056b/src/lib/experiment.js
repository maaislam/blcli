/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getPLPType, getLayoutName } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;
  let userClosedModal = false;

  const data = {
    fragrance: {
      title: 'Today – аромат твоей любви!',
      text: 'Изысканная и утонченная композиция, в которой весенняя легкость гибискуса переплетается с роскошной терпкостью мускуса, а романтичный аккорд ваточника сирийского волнует так же как первый взгляд.',
      name: 'парфюмернaя вода Today для нее, 50 мл',
      previousPrice: ' 1 800 руб.',
      price: '1 249 руб.',
      ctaLabel: 'смотреть продукт',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/02CDE33D56AA5323E695A43574D9BD9FD66FB8F040856B2322812872217E29D5.png?meta=/AG056b---Product-Promotion-Cards-RU/fragrance_img.png',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/83A5C89C7B192802832427C1BE8A08CE6D8F7077BCCF3DFE45C0402C9FEA62C7.png?meta=/AG056b---Product-Promotion-Cards-RU/fragrance_bg.png')",
      url: `${window.location.origin}/tovar/719/parfyumernaya-voda-today-dlya-nee-50-ml`,
    },
    eyeliner: {
      title: 'МЕРЦАЮЩИЕ СТРЕЛКИ НА ВЕСЬ ДЕНЬ',
      text: 'Выкручивающийся карандаш помогает создать стрелки <br />с роскошным бриллиантовым сиянием.',
      name: 'Карандаш для глаз "Диамант"',
      previousPrice: '350 руб.',
      price: '199 руб.',
      ctaLabel: 'смотреть продукт',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/3F66CFFADE1E8A09AA6E2454B2DF6D8D4FBFBB4914EDB10BC238483BF1DF1879.png?meta=/AG056b---Product-Promotion-Cards-RU/eyeliner_img.png',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/6690BF58B0859D55E92ED8A7474925096288C57BDBD18EE2FAA48642D3E6FCA9.png?meta=/AG056b---Product-Promotion-Cards-RU/eyeliner_bg.png')",
      url: `${window.location.origin}/tovar/11180/karandash-dlya-glaz-diamant`,
    },
    skincare: {
      title: 'уход для тела с ароматом ванили',
      text: 'Теплое благоухание ванили раскрывает истинную женственность, а сливочный древесный штрих добавляет <br />в композицию изыска. Содержит витамины С и Е.',
      name: 'Лосьон-спрей для тела "Ароматная ваниль и сандаловое дерево"',
      previousPrice: '170 руб.',
      price: '129 руб.',
      ctaLabel: 'смотреть продукт',
      image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/64D4758F58028B35E0F7695ACE026C42397C41C6C78C0D5A97DFC31665742D36.png?meta=/AG056b---Product-Promotion-Cards-RU/skincare_Img.png',
      backgroundImage: "url('https://service.maxymiser.net/cm/images-eu/avon-mas/5D32EDA3BEC759D8A1D9B3D471A1AA32A7374948BADA964C1F941862C29286A0.png?meta=/AG056b---Product-Promotion-Cards-RU/skincare_bg.png')",
      url: `${window.location.origin}/tovar/8290/los-on-sprei-dlya-tela-aromatnaya-vanil--i-sandalovoe-derevo-100-ml`,
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
            <p class="${ID}_label">бестселлер</p>
            <div class="${ID}_close-button"></div>
          </div>
          <h4 class="${ID}_title ${ID}_link">${content.title}</h4>
          <div class="${ID}_description">${content.text}</div>
          <div class="${ID}_product-details">
            <div class="${ID}_details-left">
              <h5 class="${ID}_product-name">${content.name}</h5>
              <p class="${ID}_previousPrice"><em>${content.previousPrice ? content.previousPrice : ''}</em></p>
              <p class="${ID}_currentPrice"><em>${content.price}</em></p>
            </div>
            <div class="${ID}_details-right ${ID}_link" style="background-image: url('${content.image}')"></div>
          </div>
          <div class="${ID}_cta ${ID}_link Button vi-btn vi-btn--primary">${content.ctaLabel}</div>
          <div class="${ID}_scroll-label-wrapper">
            <div class="${ID}_scroll-label">
            <span>еще больше предложений</span>
            </div>
          </div>
        </div>
      </aside>
    `;
  };

  const getVariation2HTML = (content, pageType) => {
    const ctaClass = 'vi-btn--dark';
    return `
      <aside style="background-image: ${content.backgroundImage};" class="${ID}_wrapper_v2 ${ID}_${pageType}" id="${ID}_swipe">
        <div class="${ID}_content">
          <div class="${ID}_header">
            <p class="${ID}_label">бестселлер</p>
            <div class="${ID}_close-button"></div>
          </div>
          <h4 class="${ID}_title ${ID}_link">${content.title}</h4>
          <h5 class="${ID}_product-name">${content.name}</h5>
          <div class="${ID}_product-details">
            <div class="${ID}_details-right ${ID}_link" style="background-image: url('${content.image}')"></div>
            <div class="${ID}_prices">
              ${content.previousPrice ? `<p class="${ID}_previousPrice"><em>${content.previousPrice}</em></p>` : ''}
              <p class="${ID}_currentPrice"><em>${content.price}</em></p>
            </div>
          </div>
          <div class="${ID}_cta ${ID}_link Button vi-btn ${ctaClass}">${content.ctaLabel}</div>
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
          const threshold = 150; // required min distance traveled to be considered swipe
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
