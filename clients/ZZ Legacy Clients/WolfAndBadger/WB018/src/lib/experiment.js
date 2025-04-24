import { pollerLite, events, viewabilityTracker } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';
import data from './data';

const { ID, VARIATION } = shared;

/**
 * Get items to display by matching key paths to breadcrumbs
 */
const getItemsToDisplay = (breadcrumb) => {
  const results = [];
  data.forEach(d => {
    if(breadcrumb.innerHTML.match(new RegExp(d['Matching Path'], 'mgi'))) {
      results.push(d);
    }
  });

  return results;
};

/**
 * Create markup
 */
const createMarkup = (itemsToDisplay) => {
  let result = `
    <div class="${ID}-promo row-fluid">
      <h3 class="${ID}-promo__title">Designers you might like...</h3>

      <div class="${ID}-promo__inner">
  `;

  itemsToDisplay.forEach(item => {
    result += `
      <div class="${ID}-promo__designer">
        <a class="${ID}-promo__designer-colwrap ${ID}-designer-link" href="${item['Designer URL']}">
          <div class="${ID}-promo__designer-col">
            <img class="${ID}-promo__designer-img" src="${item['Designer Image']}">
          </div>
          <div class="${ID}-promo__designer-col">
            <h4 class="${ID}-promo__designer-title">${item['Designer Name']}</h4>
            <p class="${ID}-promo__designer-desc">${item['Designer Description']}</p>
          </div>
        </a>
        <div class="${ID}-promo__designer-btnwrap">
          <a class="${ID}-promo__designer-btn ${ID}-designer-link" href="${item['Designer URL']}">View more from this designer</a>
        </div>
      </div>
    `;
  });

  result += `
      </div>
    </div>
  `;

  return result;
}

/**
 * slick if needed
 */
const initSlick = () => {
  if(window?.jQuery?.fn?.slick) {
    jQuery(`.${ID}-promo__inner`).slick({
      dots: false,
      arrows: true,
      mobileFirst: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 768,
          settings: 'unslick',
        },
      ]
    });
  }
};

/**
 * Entry point for experiment
 */
export default () => {

  const urlPrefix = window.currentPrefix || 'uk';

  const init = () => {
    const relatedProdsContainer = document.querySelector('.related-products-container');

    if(relatedProdsContainer) {
      viewabilityTracker(relatedProdsContainer, () => {
        events.send(`${ID}-${VARIATION}`, 'will-scroll-into-view', '', {
          sendOnce: true
        });
      }, {
        allElementHasToBeInView: false
      });
    }

    if(VARIATION != 'control') {
      const breadcrumb = document.querySelector('#content .breadcrumbs');
      if(breadcrumb) {
        const itemsToDisplay = getItemsToDisplay(breadcrumb);
        if(itemsToDisplay.length) {
          const content = document.querySelector('#content');

          if(content) {
            const promo = document.querySelector(`.${ID}-promo`);
            if(promo) {
              promo.parentNode.removeChild(promo);
            }

            const markup = createMarkup(itemsToDisplay);
            content.insertAdjacentHTML('beforeend', markup);

            const links = document.querySelectorAll(`.${ID}-designer-link`);
            [].forEach.call(links, (l) => {
              l.addEventListener('click', () => {
                events.send(`${ID}-${VARIATION}`, 'clicked-link', l.pathname || '', {
                  sendOnce: true
                });
              });
            });
          }
        }
      }
    }
  };

  init();

};
