import { fullStory, events } from '../../../../lib/utils';
import PJ042 from './lib/PJ042';

/**
 * {{PJ049}} - {{Offers Page Redesign (New Design) - Mobile}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ049',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    if (window.location.href.indexOf('/offers') > -1) {
      PJ042.init();
    }
    // Setup
    /*eslint-disable */
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /* eslint-enable */

    const categories = document.querySelectorAll('.PJ042-category');
    let dealCount = 0;
    [].forEach.call(categories, (category) => {
      if (category.id !== 'PJ042-other_deals') {
        const title = category.querySelector('h3').innerHTML;
        const offerTitleWrap = `<div class='PJ049-offerTitle'><h3>${title}</h3></div>`;
        category.insertAdjacentHTML('afterbegin', offerTitleWrap);

        // Add Offer Image Wrapper
        const offerBoxes = category.querySelectorAll('.offer-m');
        [].forEach.call(offerBoxes, (offer) => {
          dealCount += 1;
          let bannerColour = 'greenBanner';
          if (dealCount % 2 !== 0) {
            bannerColour = 'yellowBanner';
          }
          const offerTitle = offer.querySelector('.offer-desc > h2.redText').innerText;
          // Assign Offer id on Banner
          const offerId = services.getOfferBannerId(offerTitle);
          const imageWrap = `<div class='PJ049-offerImageWrapper'>
            <div class='PJ049-offer__image ${bannerColour}' id='${offerId}_imgOfferImageBanner'></div>
          </div>`;
          offer.insertAdjacentHTML('beforebegin', imageWrap);

          // Replace Text in CTA button
          const button = offer.querySelector('.actionButton');
          if (button) {
            components.replaceBtnText(button);
          }
        });
      }
    });

    // Change Offer Container Height
    components.changeContainerHeight();

    // Click on Offer Banner
    bindExperimentEvents.clickOnOfferBanner();

    // Click on Other Offers
    bindExperimentEvents.clickOnOtherOffers();

    // Click on Offer Name (not clickable)
    bindExperimentEvents.clickOnOfferName();

    // Click other deals
    bindExperimentEvents.clickOtherDeals();

    // Click on Offers in Nav (top right)
    bindExperimentEvents.clickOnOffersNav();
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
    /**
     * @desc Assign Offer id on Banner
     */
    getOfferBannerId(name) {
      let offerId;
      /*eslint-disable */
      switch (name) {
        case 'SPEND £25 GET 25% OFF ONLINE':
          offerId = 'spend25get25';
          break;
        case '30% OFF PIZZAS':
          offerId = 'percentage30offPizzas';
          break;
        case 'SPEND £40 GET 40% OFF':
          offerId = 'spend40get40';
          break;
        case 'BUY ONE GET ONE FREE COLLECTED':
          offerId = 'bogofCollected';
          break;
        case 'MEDIUM PIZZA £7.99 COLLECTED':
          offerId = 'mediumPizzaCollected';
          break;
        case 'MEDIUM PIZZA, POTATO WEDGES & GARLIC PIZZA STICKS £12.99':
          offerId = 'mediumPizzaWedgesGarlicSticks';
          break;
        case 'LARGE PIZZA & ANY 2 SIDES £18.99':
          offerId = 'largePizza2sides';
          break;
        case '2 LARGE PIZZAS, 2 SIDES, LARGE DRINK £26.99':
          offerId = 'largePizzas2sidesLargeDrink';
          break;
      }
      /* eslint-enable */
      return offerId;
    },
  },

  components: {
    /**
     * @desc Replace CTA Button Text
     */
    replaceBtnText(button) {
      /*eslint-disable */
      button.innerText = `Choose this deal`;
      /* eslint-enable */
    },
    /**
     * @desc Change Offer Container Height
     */
    changeContainerHeight() {
      /*eslint-disable */
      const deals = document.querySelectorAll('.offer-m');
      [].forEach.call(deals, (deal) => {
        deal.style.height = '';
      });
      /* eslint-enable */
    },
  },

  bindExperimentEvents: {
    /**
     * @desc GA Event - Click on Offer Banner
     */
    clickOnOfferBanner() {
      const { settings } = Experiment;
      const banners = document.querySelectorAll('.PJ049-offerImageWrapper');
      [].forEach.call(banners, (banner) => {
        banner.addEventListener('click', (e) => {
          const offerContainer = e.currentTarget.nextElementSibling;
          const ctaButton = offerContainer.querySelector('a.actionButton');
          if (ctaButton) {
            const bannerOfferName = offerContainer.querySelector('h2').textContent;
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Banner Offer: ${bannerOfferName} - Already being tracked`, { sendOnce: true });
            ctaButton.click();
          }
        });
      });
    },
    /**
     * @desc GA Event - Click on Other Offers
     */
    clickOnOtherOffers() {
      const { settings, components } = Experiment;
      const otherOffers = document.querySelectorAll('#PJ042-other_deals .offer-m.PJ042-otherDeal');
      [].forEach.call(otherOffers, (offer) => {
        const offerTitle = offer.querySelector('h2').textContent;
        const ctaButton = offer.querySelector('a.actionButton');
        if (ctaButton) {
          components.replaceBtnText(ctaButton);
          ctaButton.addEventListener('click', () => {
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Add Offer: ${offerTitle}`, { sendOnce: true });
          });
        }
      });
    },
    /**
     * @desc GA Event - Click on Offer Name (not clickable)
     */
    clickOnOfferName() {
      const { settings } = Experiment;
      const offerTitles = document.querySelectorAll('h2.redText');
      [].forEach.call(offerTitles, (title) => {
        title.addEventListener('click', () => {
          const name = title.textContent;
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Offer Name: ${name}`, { sendOnce: true });
        });
      });
    },
    /**
     * @desc GA Event - Click other deals
     */
    clickOtherDeals() {
      const { settings } = Experiment;
      document.querySelector('#PJ042-other_deals').addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - View more deals`, { sendOnce: true }); // eslint-disable-line quotes
      });
    },
    /**
     * @desc GA Event - Click on Offers in Nav (top right)
     */
    clickOnOffersNav() {
      const { settings } = Experiment;
      document.querySelector('.mainMenu.mobile > .first.uppercase').addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Offers in nav`, { sendOnce: true }); // eslint-disable-line quotes
      });
    },
  },
};

export default Experiment;
