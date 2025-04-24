import { setup } from './services';
import shared from './shared';
import { events, viewabilityTracker } from '../../../../../lib/utils';
import data from './data';

/**
 * Get markup
 */
const getMarkup = () => {
  const { ID, VARIATION } = shared;

  let itemsMarkup = '';
  data.forEach(d => {
    itemsMarkup += `
      <a href="${d.link}" class="${ID}-item" data-name="${d.name.trim()}">
        <div class="${ID}-item__inner">
          <img class="${ID}-item__img" src="${d.image}">
          <span class="${ID}-item__title">${d.name.trim()}</span>
          <span class="${ID}-item__price has-text-weight-semibold">${d.price}</span>
        </div>
      </a>
    `;
  });

  const html = `
    <div class="${ID}-container">
      <div class="${ID}-header">
        <h2 class="${ID}-header__title">
          <span class="${ID}-font-madelyn">Feel Good</span>
          <span>Father's Day Gifts</span> 
        </h2>
        <a class="${ID}-header__viewall" href="/collections/feel-good-gifts-for-dad">View all</a>
        <div class="${ID}-header__btns">
          <a class="${ID}-header__btn-prev" disabled><span></span></a>
          <a class="${ID}-header__btn-next"><span></span></a>
        </div>
      </div>
      <div class="${ID}-carousel">
        ${itemsMarkup}
      </div>
    </div>
  `;

  return html;

};

/**
 * Entry point for experiment
 */
export default () => {
  const { ID, VARIATION } = shared;

  const mainSection = document.querySelector('main > .section');
  if(mainSection) {
    const markup = getMarkup();

    mainSection.insertAdjacentHTML('beforebegin', markup);

    // ------------------------------------
    // Event listeners on next and prev buttons
    // ------------------------------------
    let curPos = 0;
    const numItems = data.length;

    const carousel = document.querySelector(`.${ID}-carousel`);
    const prev = document.querySelector(`.${ID}-header__btn-prev`);
    const next = document.querySelector(`.${ID}-header__btn-next`);

    if(carousel && prev && next && window.innerWidth >= 1024) {
      next.addEventListener('click', (e) => {
        const numInView = window.innerWidth >= 1024 ? 5 : 4;
        const carouselWidth = carousel.getBoundingClientRect().width;
        const scrollAmount = Math.ceil(carouselWidth / numInView);

        const curPos = carousel.scrollLeft;

        const target = (Math.floor(Math.ceil(curPos) / scrollAmount) + 1) * scrollAmount; 

        if(target < carouselWidth) {
          e.currentTarget.removeAttribute('disabled');
        } else {
          e.currentTarget.setAttribute('disabled', true);
        }

        prev.removeAttribute('disabled');

        events.send(`${ID} F-day Components`, 'Clicked Next Button', `V-${VARIATION}`, {
          sendOnce: true
        });

        carousel.scrollTo({
          left: target,
          behavior: 'smooth'
        });
      });

      prev.addEventListener('click', (e) => {
        const numInView = window.innerWidth >= 1024 ? 5 : 4;
        const carouselWidth = carousel.getBoundingClientRect().width;
        const scrollAmount = Math.ceil(carouselWidth / numInView);

        const curPos = carousel.scrollLeft;

        const target = Math.max(Math.floor(Math.ceil(curPos) / scrollAmount) - 1, 0) * scrollAmount; 

        if(target > 0) {
          e.currentTarget.removeAttribute('disabled');
        } else {
          e.currentTarget.setAttribute('disabled', true);
        }

        next.removeAttribute('disabled');

        events.send(`${ID} F-day Components`, 'Clicked Prev Button', `V-${VARIATION}`, {
          sendOnce: true
        });

        carousel.scrollTo({
          left: target,
          behavior: 'smooth'
        });
      });

      carousel.addEventListener('scroll', (e) => {
        const curPos = e.currentTarget.scrollLeft;
        const carouselWidth = carousel.getBoundingClientRect().width;

        if(curPos == 0) {
          prev.setAttribute('disabled', true);
        }

        if(curPos >= carouselWidth - 5) {
          next.setAttribute('disabled', true);
        }

        if(curPos > 0 && curPos < carouselWidth) {
          next.removeAttribute('disabled');
          prev.removeAttribute('disabled');
        }
      });
    }

    if(carousel) {
      carousel.addEventListener('scroll', (e) => {
        events.send(`${ID} F-day Components`, 'Scrolled Carousel', `V-${VARIATION}`, {
          sendOnce: true
        });
      });
    }
    
    // ------------------------------------
    // Check in view + other events
    // ------------------------------------
    viewabilityTracker(carousel, () => {
      events.send(`${ID} F-day Components`, 'View Carousel', `V-${VARIATION}`, {
        sendOnce: true
      });
    }, {
      allElementHasToBeInView: false
    });

    const viewAll = document.querySelector(`.${ID}-header__viewall`);
    if(viewAll) {
      viewAll.addEventListener('click', () => {
        events.send(`${ID} F-day Components V-${VARIATION}`, 'Clicked View All', '');
      });
    }

    const items = document.querySelectorAll(`.${ID}-item`);
    [].forEach.call(items, (item) => {
      item.addEventListener('click', (e) => {
        events.send(`${ID} F-day Components`, 'Product Clicked', `V-${VARIATION} ${e.currentTarget.dataset.name}`);
      });
    });
  }
};
