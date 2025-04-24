import { fullStory, events } from '../../../../lib/utils';
import PJ043 from './lib/PJ043';

/**
 * {{PJ050}} - {{Offers Page Redesign (New Design) - Desktop}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ050',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    if (window.location.href.indexOf('/offers') > -1) {
      PJ043.init();
    }
    /* eslint-disable */
    window.prm.add_pageLoaded(function (sender, error) {
      try {
        if(document.querySelector('.mainMenu .first.uppercase')){
          const offerDeals = document.querySelectorAll('.menuList.offerList');
          [].forEach.call(offerDeals, (deal) => {
            if (deal.classList.contains('PJ043-top_offer')) {
              const dealName = deal.querySelector('h3').innerText;
              const imgContainer = deal.querySelector('.pic');
              // Hide image
              imgContainer.classList.add('hide');

              // Assign Offer id on Banner
              const offerId = services.getOfferBannerId(dealName);
              const offerBannerWrapper = `<div class='PJ050-offerBannerWrapper'>
                <div class='PJ050-offerBanner' title='${dealName}' id='${offerId}_imgOfferImageBanner'></div>
              </div>`;
              imgContainer.insertAdjacentHTML('beforebegin', offerBannerWrapper);

              // Add Experiment ID
              deal.classList.add('PJ050-topOffers');
            } else {
              // Click on Other Offers
              bindExperimentEvents.clickOnOtherOffers(deal);
            }
          });

          // Click on Offer Banner
          bindExperimentEvents.clickOnOfferBanner();
          // Click on Offer Name (not clickable)
          bindExperimentEvents.clickOnOfferName();
          // Click other deals
          bindExperimentEvents.clickOtherDeals();
        }
      } catch (e) {}
      
    });
    /* eslint-enable */
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
        case 'Spend £25 Get 25% Off':
          offerId = 'spend25get25';
          break;
        case '25% Off £25 Online':
          offerId = 'spend25get25';
          break;
        case '30% off Pizzas':
          offerId = 'percentage30offPizzas';
          break;
        case 'Spend £40 Get 40% Off':
          offerId = 'spend40get40';
          break;
        case '40% off £40':
          offerId = 'spend40get40';
          break;
        case 'Spend £30 Get £10 Off':
          offerId = 'spend30get10';
          break;
        case '£10 off £30':
          offerId = 'spend30get10';
          break;
        case 'Buy One Get One Free Collected':
          offerId = 'bogofCollected';
          break;
        case 'Buy One Get One Free':
          offerId = 'bogofCollected';
          break;
        case 'Medium Pizza £7.99 Collected':
          offerId = 'mediumPizzaCollected';
          break;
        case 'Medium Pizza £7.99 Collected':
          offerId = 'mediumPizzaCollected';
          break;
        case 'Any Large Pizza £10.99':
          offerId = 'largePizza';
          break;
        case 'Any Large pizza £10.99':
          offerId = 'largePizza';
          break;
        case 'Medium Pizza, Potato Wedges & Garlic Pizza Sticks £12.99':
          offerId = 'mediumPizzaWedgesGarlicSticks';
          break;
        case 'Medium pizza, potato wedges & garlic pizza sticks £12.99':
          offerId = 'mediumPizzaWedgesGarlicSticks';
          break;
        case 'Large Pizza & Any 2 Sides £18.99':
          offerId = 'largePizza2sides';
          break;
        case 'Large pizza & any 2 sides £18.99':
          offerId = 'largePizza2sides';
          break;
        case '3 XXL Pizzas For £33':
          offerId = 'xxlPizzasFor33';
          break;
        case 'Get 3 XXL pizzas for £33':
          offerId = 'xxlPizzasFor33';
          break;
        case 'Any Small Pizza, Side & a Small Drink £11.99':
          offerId = 'smallPizzaSideSmallDrink';
          break;
        case 'Small Pizza, any Side and 500ml Drink £11.99':
          offerId = 'smallPizzaSideSmallDrink';
          break;
        case '2 Large Pizzas, 2 Sides, large drink £26.99':
          offerId = 'largePizzas2sidesLargeDrink';
          break;
        case 'Two Large Pizzas, two sides and a Large drink £26.99':
          offerId = 'largePizzas2sidesLargeDrink';
          break;
      }
      /* eslint-enable */
      return offerId;
    },
  },

  components: {},

  bindExperimentEvents: {
    /**
     * @desc GA Event - Click on Offer Banner
     */
    clickOnOfferBanner() {
      const { settings } = Experiment;
      const topOffers = document.querySelectorAll('.PJ050-topOffers');
      [].forEach.call(topOffers, (offer) => {
        const banner = offer.querySelector('.PJ050-offerBanner');
        const ctaButton = offer.querySelector('a.greenButton');
        banner.addEventListener('click', (e) => {
          const dealTitle = e.currentTarget.getAttribute('title');
          if (ctaButton) {
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Banner Offer: ${dealTitle} - Already being tracked`, { sendOnce: true });
            ctaButton.click();
          }
        });
      });
    },
    /**
     * @desc GA Event - Click on Other Offers
     */
    clickOnOtherOffers(deal) {
      const { settings } = Experiment;
      const ctaButton = deal.querySelector('a.greenButton');
      const dealTitle = deal.querySelector('h3').innerText;
      if (ctaButton) {
        ctaButton.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Add Offer: ${dealTitle}`, { sendOnce: true });
        });
      }
    },
    /**
     * @desc GA Event - Click on Offer Name (not clickable)
     */
    clickOnOfferName() {
      const { settings } = Experiment;
      const offerTitles = document.querySelectorAll('.menuList.offerList h3.w100');
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
      document.querySelector('#PJ043-other_deals').addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - View more deals`, { sendOnce: true }); // eslint-disable-line quotes
      });
    },
  },
};

export default Experiment;
