import { fullStory, events } from '../../../../lib/utils';
import { _offers, _images } from './lib/config';

/**
 * PJ009 - Social Proofing Offers
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ009',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Add image against matching deals
    // Send an event when the select button chosen against deal
    const matchingDeals = Experiment.getMatchingDeals();
    matchingDeals.forEach((d) => {
      const elm = d.elem;
      if(elm) {
        elm.insertAdjacentHTML('afterbegin', `
            <img alt="Top Offer" title="Top Offer" 
              src="${_images.starBadge}" class="pj9-icon" />
        `);
      }

      // Send event when deal clicked
      const selectBtn = elm.querySelector('.greenButton');
      if(selectBtn) {
        selectBtn.addEventListener('click', () => {
          events.send(settings.ID, 'clicked-select-against-product', d.title);
        });
      }
    });

    // Send an event showing all the deals we matched against
    const matchedDealsString = matchingDeals.reduce((acc, cur) => {
      return acc + cur.title + '|';
    }, '');

    if(matchedDealsString) {
      events.send(settings.ID, 'deals-matched', matchedDealsString);
    }
  },

  /**
   * Check whether any of our defined deals match deal names on the page
   * @return {Array}
   */
  getMatchingDeals() {
    const dealsOnPage = Experiment.getDeals();

    return dealsOnPage.filter(d => _offers.indexOf(d.title) > -1);
  },

  /**
   * Get deal names lower case
   * @return {Array}
   */
  getDeals() {
    const desktopDeals = [].slice.call(
      document.querySelectorAll('.menuItems .menuList.offerList')
    );

    const mobileDeals = [].slice.call(
      document.querySelectorAll('.offers-m-cont .offer-m')
    );

    let result = [];

    if(desktopDeals.length) {
      result = desktopDeals.map((d) => {
        const deal = {
          title: '',
          elem: null
        }
        const h3 = d.querySelector('h3');

        if(h3) {
          deal.title = h3.textContent.trim().toLowerCase();
          deal.elem = d;
        }

        return deal;
      });
    }

    if(mobileDeals.length) {
      result = mobileDeals.map((d) => {
        const deal = {
          title: '',
          elem: null
        }
        const h2 = d.querySelector('h2');

        if(h2) {
          deal.title = h2.textContent.trim().toLowerCase();
          deal.elem = d;
        }

        return deal;
      });
    }

    return result;
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
