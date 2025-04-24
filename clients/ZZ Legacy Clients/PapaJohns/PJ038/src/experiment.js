import { fullStory, events, scrollTo } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ038',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    components.AddOfferTitle();
    components.createOfferGroups();
    components.loopThroughAttributes();
    components.assignTheTopOffers();
    components.moveOffers();
    components.showHideDeals();
    components.fixedfilterBar();
    components.filterAnchor();
    components.redirectOffersLink();

    services.sendEvents();

    if (document.querySelector('#ctl00_cphBody__objOffersMobile__pnlPromoError')) {
      events.send(settings.ID, 'Clicked', 'Promo Code Failure');
    }
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
     * @desc Track all events from change log
     */
    sendEvents() {
      const { settings } = Experiment;

      const offer = document.querySelectorAll('.offer-m');
      for (let i = 0; i < offer.length; i += 1) {
        const element = offer[i];
        const offerName = element.querySelector('.redText').textContent;

        // click the title of the offer
        element.querySelector('.redText').addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', `Offer name: ${offerName} v${settings.VARIATION}`);
        });

        element.querySelector('a').addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', `Add offer: ${offerName} v${settings.VARIATION}`);
        });
      }

      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc create the 4 groups
     */
    AddOfferTitle: function AddOfferTitle() {
      const contentBox = document.querySelector('.main.mainMobileInside');
      const offerTitle = document.createElement('div');
      offerTitle.classList.add('PJ038-offer_title');
      offerTitle.innerHTML = 'OFFERS';

      contentBox.insertBefore(offerTitle, contentBox.firstChild);
    },
    /**
     * @desc create the 4 groups
     */
    createOfferGroups: function createOfferGroups() {
      const voucherCode = document.querySelector('#ctl00_cphBody__objOffersMobile_pnlPromoCode');
      const groupedOffers = document.createElement('div');
      groupedOffers.classList.add('PJ038-offersWrap');
      groupedOffers.innerHTML = `
      <div id="PJ038-moneyoff_deal" class="PJ038-category"><h3>% Or £ Off deals</h3></div>
      <div id="PJ038-pizzaonly_deal" class="PJ038-category"><h3>Pizza Only</h3></div>
      <div id="PJ038-meal_deal" class="PJ038-category"><h3>Meal Deals</h3></div>
      <div id="PJ038-other_deals" class="PJ038-category"><h3>View more deals</h3><div class="PJ038-other"></div></div>`;

      voucherCode.insertAdjacentElement('beforebegin', groupedOffers);
    },

    /**
     * @desc Loop through the menu items, identify the attributes, add
     * class defining which category to put the offer in
     */
    loopThroughAttributes: function loopThroughAttributes() {
      const attributes = {
        '% Off Basket': ['moneyOff'],
        '% Off Product': ['moneyOff'],
        '£ Off Basket': ['moneyOff'],
        BOGOF: ['pizzaOnly'],
        'BOGOF+': ['pizzaOnly'],
        Bundle: ['mealDeal'],
        'Buy Get': ['pizzaOnly'],
        'Fixed Price - Other Product': ['pizzaOnly'],
        'Fixed Price - Pizza': ['pizzaOnly'],
        'Free Product': ['pizzaOnly'],
        'Free with Papa Rewards': ['moneyOff'],
      };

      const allOffers = document.querySelectorAll('.offer-m');

      for (let i = 0; i < allOffers.length; i += 1) {
        const element = allOffers[i];

        const offerAttr = element.getAttribute('data-attr');
        const dealTypes = attributes[offerAttr];
        if (dealTypes) {
          if (dealTypes[0] === 'moneyOff') {
            element.classList.add('PJ038-moneyoff_deal');
          }
          if (dealTypes[0] === 'mealDeal') {
            element.classList.add('PJ038-meal_deal');
          }
          if (dealTypes[0] === 'pizzaOnly') {
            element.classList.add('PJ038-pizzaonly_deal');
          }
        }
      }
    },

    /**
    * @desc If the offer matches the top attributes to be shown/categorised add a class
    */
    assignTheTopOffers: function assignTheTopOffers() {
      const { settings } = Experiment;

      const allOffers = document.querySelectorAll('.offer-m');

      let topOffers;
      if (settings.VARIATION === '1') {
        topOffers = [
          '25% Off £25 Online',
          '40% off £40',
          'Buy One Get One Free',
          'Get 3 XXL pizzas for £33',
          '2 Large Pizzas and 2 sides £24.99',
          'Medium pizza, potato wedges & garlic pizza sticks £12.99',
          'Large pizza & any 2 sides £18.99',
          'Two For Tuesdays',
          'Any Size Pizza £11.99',
        ];
      } else if (settings.VARIATION === '2') {
        topOffers = [
          '25% Off £25 Online',
          '40% off £40',
          'Buy One Get One Free',
          'Get 3 XXL pizzas for £33',
          '2 Large Pizzas and 2 sides £24.99',
          'Medium pizza, potato wedges & garlic pizza sticks £12.99',
          'Large pizza & any 2 sides £18.99',
          '33% off Pizzas Online',
          'Any Size Pizza £11.99',
          '£10 off £30',
          'Any Large pizza £10.99',
          'Two For Tuesdays',
          'Medium Pizza £6.99 Collected',
        ];
      }

      for (let i = 0; i < allOffers.length; i += 1) {
        const element = allOffers[i];
        const offerTitle = element.querySelector('.offer-desc .redText').textContent;

        [].forEach.call(topOffers, (item) => {
          if (offerTitle === item) {
            element.classList.add('PJ038-top_offer');
          } else {
            element.classList.add('PJ038-otherDeal');
          }
        });
      }
    },

    /**
     * @desc Move the offers based on their classname and their titles
     */
    moveOffers: function moveOffers() {
      const menuItems = document.querySelectorAll('.offer-m');
      const categories = document.querySelectorAll('.PJ038-category');
      for (let i = 0; i < menuItems.length; i += 1) {
        const element = menuItems[i];

        [].forEach.call(categories, (item) => {
          if (item.id === element.classList[1] && element.classList.contains('PJ038-top_offer')) {
            item.appendChild(element);
          } else if (item.id === element.classList[1] && element.classList.contains('PJ038-otherDeal')) {
            document.querySelector('.PJ038-other').appendChild(element);
          }
        });
      }
    },
    /**
     * @desc Show hide the rest of the deals on view all
     */
    showHideDeals: function showHideDeals() {
      const { settings } = Experiment;
      const viewMore = document.querySelector('#PJ038-other_deals');
      const moreDeals = document.querySelector('.PJ038-other');
      viewMore.querySelector('h3').addEventListener('click', () => {
        if (moreDeals.classList.contains('PJ038-others_showing')) {
          moreDeals.classList.remove('PJ038-others_showing');
          viewMore.querySelector('h3').classList.remove('PJ038-otherTitle_showing');
        } else {
          events.send(settings.ID, 'Clicked', `View more deals v${settings.VARIATION}`, { sendOnce: true });
          moreDeals.classList.add('PJ038-others_showing');
          viewMore.querySelector('h3').classList.add('PJ038-otherTitle_showing');
        }
      });
    },

    /**
     * @desc Fixed filter bar
     */
    fixedfilterBar: function fixedfilterBar() {
      const filterBar = document.createElement('div');
      filterBar.classList.add('PJ038-filter_bar');
      filterBar.innerHTML = `
      <div class="PJ038-filter PJ038-filter_active" cat-attr="PJ038-moneyoff_deal"><span>All</span></div>
      <div class="PJ038-filter" cat-attr="PJ038-moneyoff_deal"><span>% or £ Off</span></div>
      <div class="PJ038-filter" cat-attr="PJ038-pizzaonly_deal"><span>Pizza Only</span></div>
      <div class="PJ038-filter" cat-attr="PJ038-meal_deal"><span>Meal Deals</span></div>`;
      document.body.appendChild(filterBar);
    },
    /**
     * @desc Anchor to the correct category
     */
    filterAnchor: function filterAnchor() {
      const allFilters = document.querySelectorAll('.PJ038-filter');
      const categories = document.querySelectorAll('.PJ038-category');

      for (let i = 0; i < allFilters.length; i += 1) {
        const element = allFilters[i];

        element.addEventListener('click', (e) => {
          const anchorName = element.textContent;
          const { settings } = Experiment;
          const categoryToMatch = element.getAttribute('cat-attr');
          for (let j = 0; j < allFilters.length; j += 1) {
            allFilters[j].classList.remove('PJ038-filter_active');
          }
          e.target.parentNode.classList.add('PJ038-filter_active');

          [].forEach.call(categories, (item) => {
            if (item.id === categoryToMatch) {
              const itemToScroll = item.getBoundingClientRect().y + window.scrollY;
              scrollTo(itemToScroll - 200);

              events.send(settings.ID, 'Clicked', `Anchor Link: ${anchorName} - V${settings.VARIATION}`);
            }
          });
        });
      }
    },
    /**
     * @desc Redirects offers link in nav to /offers.aspx
     */
    redirectOffersLink: function redirectOffersLink() {
      const offersLink = (() => {
        const links = document.querySelectorAll('.mainMenu > a');
        const offers = Array.from(links).filter(link => link.innerHTML.trim() === 'Offers');
        return offers.length ? offers[0] : false;
      })();

      if (offersLink && offersLink.href !== '/offers.aspx') {
        offersLink.href = '/offers.aspx';
        offersLink.removeAttribute('onclick');
      }
    },
  },
};

export default Experiment;
