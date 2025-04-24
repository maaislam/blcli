/**
 * BI035
 */
import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * Create markup
 */
const createMarkup = () => {
  return `
    <div class="${settings.ID}-contentwrap ${settings.ID}-DOD">
      <h2><img alt="why send flowers when you can send biscuits"
        src="https://thumbor-gc.tomandco.uk/unsafe/trim/fit-in/1154x462/center/middle/smart/filters:upscale():sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/uploads/2019/07/why-send-flowers-mobile.jpg"></h2>

      <div class="${settings.ID}-boxes">

        ${Array.prototype.map.call([1,2,3,4,5,6,7,8], (idx) => {
          return `<div class="${settings.ID}-box ${settings.ID}-box--${idx}"></div>`;
        }).join('')}

      </div>

    </div>
  `;
};

/**
 * Populate a content box
 *
 * @param {int} pos Which box to populate by integer position
 * @param {array} data Title, link, image etc.
 */
const populateContent = (pos, data) => {
  const boxSelector = `.${settings.ID}-box--${pos}`;

  const box = document.querySelector(boxSelector);

  if(box) {
    box.classList.add(`${settings.ID}-box--populated`);

    box.insertAdjacentHTML('afterbegin', `
      <a href="${data.link}" style="background-image: url('${data.image}')">
        <span class="${settings.ID}-box__title">${data.title}</span>
      </a>
    `);
  }
};

/**
 * ACTIVATE
 *
 * Entry point for running experiment
 *
 * 1. Build placeholder content to minimise flash of content
 * 2. Once carousel content is ready, feed it in
 */
const activate = () => {
  const variation = settings.VARIATION == 'control' ? 'control' : settings.VARIATION;

  if(variation == 'control') {
    return;
  }

  [].forEach.call(document.querySelectorAll(`.${settings.ID}-DOD`), (elm) => {
    elm.parentNode.removeChild(elm);
  });

  setup();

  const existingCarouselSection = document.querySelector('#section-2');

  if(existingCarouselSection) {
    // ---------------------------------------------------
    // Create skeleton HTML
    // ---------------------------------------------------
    if(!document.querySelector(`.${settings.ID}-contentwrap`)) {
      const html = createMarkup();
      existingCarouselSection.insertAdjacentHTML('beforebegin', html);

      [].forEach.call(document.querySelectorAll(`.${settings.ID}-box`), (box) => {
        addEventListener(box, 'click', (e) => {
          const title = e.target.querySelector(`.${settings.ID}-box__title`);

          events.send(
            settings.ID, 
            `${settings.ID}-${settings.VARIATION}`, 
            'clicked-cta--' + (title ? title.innerText.trim() : '')
          );
        });
      });
    }
    
    // ---------------------------------------------------
    // Populate content from hardcoded categories
    // ---------------------------------------------------
    settings.cats.hardcoded.forEach((cat) => {
      populateContent(cat.position, cat);
    });
    
    // ---------------------------------------------------
    // Populate Content from carousel
    // ---------------------------------------------------
    addPoller([
      () => document.querySelectorAll('#section-2 .carousel__frame img.rf.loaded[src]').length >= 4
    ], () => {
      const frames = document.querySelectorAll('#section-2 .carousel__frame');
      [].forEach.call(frames, (frame, idx) => {
        const textElm = frame.querySelector('heading h2');
        const imgElm = frame.querySelector('img.rf.loaded');
        const linkElm = frame.querySelector('a');

        const correspondingPosition = settings.cats.carouselMap[idx];

        if(correspondingPosition && textElm && imgElm && linkElm) {
          const data = {
            title: textElm.innerText.trim(),
            link: linkElm.href,
            image: imgElm.src,
          };

          populateContent(correspondingPosition, data);
        }
      });
    });

    // Workaround for orientation change
    addEventListener(window, 'orientationchange', () => {
      window.location.reload();
    });
  }
};

export default activate;
