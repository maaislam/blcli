/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

/**
 * Create section slider
 */
const createSectionSlider = (slides, title, target, loc) => {
  const markup = `
    <div class="${settings.ID}-slider">
      <h2 class="${settings.ID}-slider__title"><span>${title}</span></h2>
      <div class="${settings.ID}-slider__slides"></div>
    </div>
  `;

  target.insertAdjacentHTML(loc, markup);

  const slidesElm = document.querySelector(`.${settings.ID}-slider__slides`);
  if(slidesElm) {
    slides.forEach((slideItem) => {
      slidesElm.insertAdjacentHTML('beforeend', `
        <a class="${settings.ID}-slider__slide-item" href="${slideItem.link}" data-name="${slideItem.name}">
          <img src="${slideItem.icon}" class="${settings.ID}-slider__item-img">
          <h3 class="${settings.ID}-slider__item-title">${slideItem.name}</h3>
          ${
            slideItem.subtext ? 
              '<p class="' + settings.ID + '-slider__item-subtext">' + slideItem.subtext + '</p>' : ''
          }
        </a>
      `);

      const slideElms = document.querySelectorAll(`.${settings.ID}-slider__slide-item`);
      [].forEach.call(slideElms, (elm) => {
        elm.addEventListener('click', (e) => {
          events.send(settings.ID, 'did-click-slider-category', e.currentTarget.dataset.name, {
            sendOnce: true  
          });
        });
      });
    });

    if(window.innerWidth <= settings.slider_grouping_breakpoint) {
      const slideItems = document.querySelectorAll(`.${settings.ID}-slider__slide-item`);

      slidesElm.classList.add(`${settings.ID}-slider--grouped`);

      let groupDiv = null; 
      [].forEach.call(slideItems, (item, idx) => {
        if(idx == 0 || idx % 4 == 0) {
          groupDiv = document.createElement('div');
          groupDiv.classList.add(`${settings.ID}-slider__groupdiv`);

          slidesElm.insertAdjacentElement('beforeend', groupDiv);
        }

        if(groupDiv) {
          groupDiv.insertAdjacentElement('beforeend', item);
          item.classList.add(`${settings.ID}-slider__slide-item--grouped`);
        }
      });
    }

  }

  const jq = window['j'.trim() + 'Query'];
  jq(slidesElm).slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  }).on('afterChange', () => {
    events.send(settings.ID, 'did-slide-slider', '', {
      sendOnce: true  
    });
  });
};

/**
 * Create ctas section
 */
const createCtasSection = (ctas, title, target, loc) => {
  const markup = `
    <div class="${settings.ID}-ctas">
      <h2 class="${settings.ID}-ctas__title"><span>${title}</span></h2>
      <div class="${settings.ID}-ctas__content"></div>
    </div>
  `;

  target.insertAdjacentHTML(loc, markup);

  const content = document.querySelector(`.${settings.ID}-ctas__content`);

  if(content) {
    ctas.forEach((cta) => {
      content.insertAdjacentHTML('beforeend', `
        <a href="${cta.link}" class="${settings.ID}-cta" data-name="${cta.name}">
          <div class="${settings.ID}-cta__inner" style="background-image: url(${cta.image})">
            ${cta.top ? '<div class="' + settings.ID + '-cta__top">' + cta.top + '</div>' : ''}
            <div class="${settings.ID}-cta__inner-text">
              <h3 class="${settings.ID}-cta__title">
                ${cta.prefix ? '<span class="' + settings.ID + '-cta__prefix ' 
                  + settings.ID + '-orange">' + cta.prefix + '</span><br>' : ''}

                ${cta.name}
              </h3>
              <p class="${settings.ID}-cta__text">${cta.cta}</p>
            </div>
          </div>
        </a>
      `);
    });

    const ctaElms = document.querySelectorAll(`.${settings.ID}-cta`);
    [].forEach.call(ctaElms, (elm) => {
      elm.addEventListener('click', (e) => {
        events.send(settings.ID, 'did-click-cta-box', e.currentTarget.dataset.name, {
          sendOnce: true  
        });
      });
    });
  }
};


/**
 * Activate
 */
const activate = () => {
  setup();

  const mainGrid = document.querySelector('.homepageContainer > .grid');

  createSectionSlider(settings.categories, 'Favourite Categories', mainGrid, 'beforeBegin');
  createCtasSection(settings.offers, 'Check out our Latest Offers', mainGrid, 'beforeBegin');
};

export default activate;
