/**
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

/**
 * Grab the new arrivals
 */
const grabNewArrivalProducts = () => {
  return new Promise((res, rej) => {
    jQuery.ajax({
      url: '/menswear/new-arrivals/?page_from=1&page_to=5',
      type: 'get',
      success(data) {
        const products = jQuery(data).find('.product-card');
        const prods = products.toArray();

        res(prods);
      }
    });
  });
};

/**
 * Parse products
 *
 * @param {Function} fn Product fetching function
 */
const parseProducts = (fn) => {
  return new Promise((res, rej) => {
    let result = [];

    const cache = localStorage.getItem(`${shared.ID}-cache`);
    const timeSinceCache = 0.001 * ((+new Date) - (localStorage.getItem(`${shared.ID}-cache-date`) || 0));

    if(cache && timeSinceCache < 7200) {
      res(JSON.parse(cache));
    } else {
      fn().then((domProds) => {

        domProds.forEach((p) => {
          const img = p.querySelector('.card-image');
          const title = p.querySelector('.product-title');
          const price = p.querySelector('.product-price');

          result.push({
            img: img.getAttribute('data-src'),
            imgAlt: img.getAttribute('data-alt-image'),
            title: title.innerHTML.trim(),
            priceHtml: price.innerHTML,
            link: (p.querySelector('a') || {}).href
          });
        });

        localStorage.setItem(`${shared.ID}-cache`, JSON.stringify(result));
        localStorage.setItem(`${shared.ID}-cache-date`, (+new Date));

        res(result);
      });
    }
  });
};

/**
 * Pick random from array
 */
const pickRandomFromArray = (arr, num) => {
  const arrLength = arr.length;

  // Shuffle
  for(let i = arrLength - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  return arr.slice(0,num);
};

/**
 * Initialise Slick
 */
const initialiseSlick = (target, slidesToShow = 2) => {
  jQuery(target).slick({
    arrows: true,
    slidesToShow: slidesToShow
  }).on('afterChange', () => {
    events.send(`${shared.ID}-${shared.VARIATION}`, 'interacted-with-carousel');
  });
};

/**
 * Entry point for experiment
 */
export default () => {
  if(document.body.classList.contains(`${shared.ID}`)) {
    return;
  }

  setup();

  // --------------
  // Generate arrival prods
  // --------------
  parseProducts(grabNewArrivalProducts).then((prods) => {
    const random4Prods = pickRandomFromArray(prods, 4);

    const endTarget = document.querySelector('#product-info .inner-info');

    if(endTarget) {
      let prodHtml = '';

      random4Prods.forEach((p) => {
        if(p) {
          prodHtml += `
            <a class="${shared.ID}-prod col-xs-6 col-md-3" href="${p.link}">
              <div class="${shared.ID}-imgwrap">
                <img class="${shared.ID}-img" src="${p.img}">
              </div>

              <div class="${shared.ID}-title">
                ${p.title}
              </div>

              <div class="${shared.ID}-price">
                ${p.priceHtml}
              </div>
              
            </a>
          `;
        }
      });

      if(prodHtml) {
        endTarget.insertAdjacentHTML(`beforeend`, `
          <div class="${shared.ID}-prods">
            <h2 class="prod-heading ${shared.ID}-prods__title">Recommended...</h2>
            <div class="row">
              <div class="${shared.ID}-prods__carousel">
                ${prodHtml}
              </div>
            </div>
          </div>
        `);

        const target = document.querySelector(`.${shared.ID}-prods__carousel`);
        initialiseSlick(target);

        const prods = document.querySelectorAll(`.${shared.ID}-prod`);
        [].forEach.call(prods, (c) => {
          c.addEventListener('click', () => {
            events.send(`${shared.ID}-${shared.VARIATION}`, 'clicked-recommended-prod', c?.href || '');
          });
        });
      }
    }
  });

  // --------------
  // Carousel colours
  // --------------
  pollerLite([
    '#product-colours .colour-cards-wrapper'
  ], () => {
    const wrapper = document.querySelector('#product-colours');

    if(wrapper) {
      const cards = document.querySelectorAll('#product-colours .colour-cards-wrapper .colour-card');
      if(cards.length == 0) {
        wrapper.classList.add('xzero-cards');
      }
    }
  });

  pollerLite([
    '#product-colours .colour-cards-wrapper .lazyload-wrapper.loaded'
  ], () => {
    // --------------
    // Initialise slick on carousel colours
    // --------------
    const prodColours = document.querySelector('#product-colours .colour-cards-wrapper');
    prodColours.parentNode.classList.add(`${shared.ID}-prod-colours`);

    initialiseSlick(prodColours, 3);

    // --------------
    // Events
    // --------------
    const prodColourCards = document.querySelectorAll('#product-colours .colour-cards-wrapper .colour-card');
    [].forEach.call(prodColourCards, (c) => {
      c.addEventListener('click', () => {
        events.send(`${shared.ID}-${shared.VARIATION}`, 'clicked-prod-color-card', c.querySelector('a')?.href || '');
      });
    });

  }, {
    multiplier: 1
  });
};
