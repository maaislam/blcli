import { events, scrollTo } from '../../../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const PJ038 = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ042',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services, components } = PJ038;

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
     * @desc Track all events from change log
     */
    sendEvents() {
      const { settings } = PJ038;

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
      offerTitle.classList.add('PJ042-offer_title');
      offerTitle.innerHTML = 'OFFERS';

      contentBox.insertBefore(offerTitle, contentBox.firstChild);
    },
    /**
     * @desc create the 4 groups
     */
    createOfferGroups: function createOfferGroups() {
      const voucherCode = document.querySelector('#ctl00_cphBody__objOffersMobile_pnlPromoCode');
      const groupedOffers = document.createElement('div');
      groupedOffers.classList.add('PJ042-offersWrap');
      groupedOffers.innerHTML = `
      <div id="PJ042-moneyoff_deal" class="PJ042-category"><h3>% or £ Off Deals</h3></div>
      <div id="PJ042-pizzaonly_deal" class="PJ042-category"><h3>Pizza Only Deals</h3></div>
      <div id="PJ042-meal_deal" class="PJ042-category"><h3>Meal Deals</h3></div>
      <div id="PJ042-other_deals" class="PJ042-category"><h3>View more deals</h3><div class="PJ042-other"></div></div>`;

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
            element.classList.add('PJ042-moneyoff_deal');
          }
          if (dealTypes[0] === 'mealDeal') {
            element.classList.add('PJ042-meal_deal');
          }
          if (dealTypes[0] === 'pizzaOnly') {
            element.classList.add('PJ042-pizzaonly_deal');
          }
        }
      }
    },

    /**
    * @desc If the offer matches the top attributes to be shown/categorised add a class
    */
    assignTheTopOffers: function assignTheTopOffers() {
      const allOffers = document.querySelectorAll('.offer-m');

      const topOffers = [
        '25% Off £25 Online',
        '40% off £40',
        'Buy One Get One Free',
        '2 Large Pizzas and 2 sides £24.99',
        'Medium pizza, potato wedges & garlic pizza sticks £12.99',
        'Large pizza & any 2 sides £18.99',
        'Two For Tuesdays',
        '30% off Pizzas',
        'Medium Pizza £7.99 Collected',
        'Two Large Pizzas, two sides and a Large drink £26.99',
      ];
      for (let i = 0; i < allOffers.length; i += 1) {
        const element = allOffers[i];
        const offerTitle = element.querySelector('.offer-desc .redText').textContent;

        [].forEach.call(topOffers, (item) => {
          if (offerTitle === item) {
            element.classList.add('PJ042-top_offer');
          } else {
            element.classList.add('PJ042-otherDeal');
          }
        });
      }
    },

    /**
     * @desc Move the offers based on their classname and their titles
     */
    moveOffers: function moveOffers() {
      const menuItems = document.querySelectorAll('.offer-m');
      const categories = document.querySelectorAll('.PJ042-category');
      for (let i = 0; i < menuItems.length; i += 1) {
        const element = menuItems[i];

        [].forEach.call(categories, (item) => {
          if (item.id === element.classList[1] && element.classList.contains('PJ042-top_offer')) {
            item.appendChild(element);
          } else if (item.id === element.classList[1] && element.classList.contains('PJ042-otherDeal')) {
            document.querySelector('.PJ042-other').appendChild(element);
          }
        });
      }
    },
    /**
     * @desc Show hide the rest of the deals on view all
     */
    showHideDeals: function showHideDeals() {
      const { settings } = PJ038;
      const viewMore = document.querySelector('#PJ042-other_deals');
      const moreDeals = document.querySelector('.PJ042-other');
      viewMore.querySelector('h3').addEventListener('click', () => {
        if (moreDeals.classList.contains('PJ042-others_showing')) {
          moreDeals.classList.remove('PJ042-others_showing');
          viewMore.querySelector('h3').classList.remove('PJ042-otherTitle_showing');
        } else {
          events.send(settings.ID, 'Clicked', `View more deals v${settings.VARIATION}`, { sendOnce: true });
          moreDeals.classList.add('PJ042-others_showing');
          viewMore.querySelector('h3').classList.add('PJ042-otherTitle_showing');
        }
      });
    },

    /**
     * @desc Fixed filter bar
     */
    fixedfilterBar: function fixedfilterBar() {
      const filterBar = document.createElement('div');
      filterBar.classList.add('PJ042-filter_bar');
      filterBar.innerHTML = `
      <div class="PJ042-filter PJ042-filter_active" cat-attr="PJ042-moneyoff_deal"><span>Back to top</span></div>
      <div class="PJ042-filter" cat-attr="PJ042-moneyoff_deal"><span>% or £ Off</span></div>
      <div class="PJ042-filter" cat-attr="PJ042-pizzaonly_deal"><span>Pizza Only</span></div>
      <div class="PJ042-filter" cat-attr="PJ042-meal_deal"><span>Meal Deals</span></div>`;
      document.body.appendChild(filterBar);
    },
    /**
     * @desc Anchor to the correct category
     */
    filterAnchor: function filterAnchor() {
      const allFilters = document.querySelectorAll('.PJ042-filter');
      const categories = document.querySelectorAll('.PJ042-category');

      for (let i = 0; i < allFilters.length; i += 1) {
        const element = allFilters[i];

        element.addEventListener('click', (e) => {
          const anchorName = element.textContent;
          const { settings } = PJ038;
          const categoryToMatch = element.getAttribute('cat-attr');
          for (let j = 0; j < allFilters.length; j += 1) {
            allFilters[j].classList.remove('PJ042-filter_active');
          }
          e.target.parentNode.classList.add('PJ042-filter_active');

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

export default PJ038;
