import { events, scrollTo } from '../../../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const PJ039 = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ043',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services, components } = PJ039;
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
    services.sendEvents();
    /* eslint-disable */

      window.prm.add_pageLoaded(function (sender, error) {
        try {
          if(!document.querySelector('.PJ043-category')){
            components.AddOfferTitle();
            components.createOfferGroups();
            components.loopThroughAttributes();
            components.assignTheTopOffers();
            components.moveOffers();
            components.showHideDeals();
            components.fixedfilterBar();
            components.filterAnchor();
            services.sendEvents();

            if (document.querySelector('#ctl00_cphBody__objOffers__pnlPromoError')) {
              events.send(settings.ID, 'Clicked', 'Promo Code Failure');
            }
          }
        } catch (e) {}
        
      });
    /* eslint-enable */
  },

  services: {
    /**
     * @desc Track all events from change log
     */
    sendEvents() {
      const { settings } = PJ039;

      const offer = document.querySelectorAll('.menuList');
      for (let i = 0; i < offer.length; i += 1) {
        const element = offer[i];
        const offerName = element.querySelector('h3').textContent;

        // click the title of the offer
        element.querySelector('h3').addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', `Offer name: ${offerName}`);
        });

        element.querySelector('a').addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', `Add offer: ${offerName}`);
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
      const contentBox = document.querySelector('.main');
      const offerTitle = document.createElement('div');
      offerTitle.classList.add('PJ043-offer_title');
      offerTitle.innerHTML = 'OFFERS';

      contentBox.insertBefore(offerTitle, contentBox.firstChild);
    },
    /**
     * @desc create the 4 groups
     */
    createOfferGroups: function createOfferGroups() {
      const voucherCode = document.querySelector('#ctl00_cphBody__objOffers_pnlPromoCode');
      const groupedOffers = document.createElement('div');
      groupedOffers.classList.add('PJ043-offersWrap');
      groupedOffers.innerHTML = `
      <div id="PJ043-moneyoff_deal" class="PJ043-category"><h3>% Or £ Off deals</h3><hr/></div>
      <div id="PJ043-pizzaonly_deal" class="PJ043-category"><h3>Pizza Only</h3><hr/></div>
      <div id="PJ043-meal_deal" class="PJ043-category"><h3>Meal Deals</h3><hr/></div>
      <div id="PJ043-other_deals" class="PJ043-category"><h3>View more deals</h3><hr/><div class="PJ043-other"></div></div>`;

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

      const allOffers = document.querySelectorAll('.menuList');

      for (let i = 0; i < allOffers.length; i += 1) {
        const element = allOffers[i];

        const offerAttr = element.getAttribute('data-attr');
        const dealTypes = attributes[offerAttr];
        if (dealTypes) {
          if (dealTypes[0] === 'moneyOff') {
            element.classList.add('PJ043-moneyoff_deal');
          }
          if (dealTypes[0] === 'mealDeal') {
            element.classList.add('PJ043-meal_deal');
          }
          if (dealTypes[0] === 'pizzaOnly') {
            element.classList.add('PJ043-pizzaonly_deal');
          }
        }
      }
    },

    /**
    * @desc If the offer matches the top attributes to be shown/categorised add a class
    */
    assignTheTopOffers: function assignTheTopOffers() {
      const allOffers = document.querySelectorAll('.menuList');

      const topOffers = [
        '25% Off £25 Online',
        '40% off £40',
        'Buy One Get One Free',
        'Get 3 XXL pizzas for £33',
        'Medium pizza, potato wedges & garlic pizza sticks £12.99',
        'Large pizza & any 2 sides £18.99',
        'Small Pizza, any Side and 500ml Drink £11.99',
        '£10 off £30',
        'Any Large pizza £10.99',
        '30% off Pizzas',
        'Medium Pizza £7.99 Collected',
        'Any Large Pizza £10.99',
        'Two Large Pizzas, two sides and a Large drink £26.99',
        'Small Pizza, any Side and 500ml Drink £11.99',
      ];

      for (let i = 0; i < allOffers.length; i += 1) {
        const element = allOffers[i];
        const offerTitle = element.querySelector('.menuList h3').textContent;

        [].forEach.call(topOffers, (item) => {
          if (offerTitle === item) {
            element.classList.add('PJ043-top_offer');
          } else {
            element.classList.add('PJ043-otherDeal');
          }
        });
      }
    },

    /**
     * @desc Move the offers based on their classname and their titles
     */
    moveOffers: function moveOffers() { // To here - sort css of offers
      const menuItems = document.querySelectorAll('.menuList');
      const categories = document.querySelectorAll('.PJ043-category');
      for (let i = 0; i < menuItems.length; i += 1) {
        const element = menuItems[i];

        [].forEach.call(categories, (item) => {
          if (item.id === element.classList[2] && element.classList.contains('PJ043-top_offer')) {
            item.appendChild(element);
          } else if (item.id === element.classList[2] && element.classList.contains('PJ043-otherDeal')) {
            document.querySelector('.PJ043-other').appendChild(element);
          }

          if (element.querySelector('h3').textContent === 'Earn 2 Papa Rewards points - Giant Choc Chip Cookie') {
            element.style.display = 'none';
          }
        });
      }
    },
    /**
     * @desc Show hide the rest of the deals on view all
     */
    showHideDeals: function showHideDeals() {
      const { settings } = PJ039;
      const viewMore = document.querySelector('#PJ043-other_deals');
      const moreDeals = document.querySelector('.PJ043-other');
      viewMore.querySelector('h3').addEventListener('click', () => {
        if (moreDeals.classList.contains('PJ043-others_showing')) {
          moreDeals.classList.remove('PJ043-others_showing');
          viewMore.querySelector('h3').classList.remove('PJ043-otherTitle_showing');
        } else {
          events.send(settings.ID, 'Clicked', 'View more deals', { sendOnce: true });
          moreDeals.classList.add('PJ043-others_showing');
          viewMore.querySelector('h3').classList.add('PJ043-otherTitle_showing');
        }
      });
    },
    /**
     * @desc Fixed filter bar
     */
    fixedfilterBar: function fixedfilterBar() {
      const filterBar = document.createElement('div');
      filterBar.classList.add('PJ043-filter_bar');
      filterBar.innerHTML = `
      <p>Deal Type:</p>
      <div class="PJ043-filter PJ043-filter_active" cat-attr="PJ043-moneyoff_deal"><span>All</span></div>
      <div class="PJ043-filter" cat-attr="PJ043-moneyoff_deal"><span>% or £ Off</span></div>
      <div class="PJ043-filter" cat-attr="PJ043-pizzaonly_deal"><span>Pizza Only</span></div>
      <div class="PJ043-filter" cat-attr="PJ043-meal_deal"><span>Meal Deals</span></div>`;
      document.querySelector('.quailityGuaranteeOffersBanner').insertAdjacentElement('afterend', filterBar);
    },
    /**
     * @desc Anchor to the correct category
     */
    filterAnchor: function filterAnchor() {
      const allFilters = document.querySelectorAll('.PJ043-filter');
      const categories = document.querySelectorAll('.PJ043-category');

      for (let i = 0; i < allFilters.length; i += 1) {
        const element = allFilters[i];

        element.addEventListener('click', (e) => {
          const anchorName = element.textContent;
          const { settings } = PJ039;
          const categoryToMatch = element.getAttribute('cat-attr');
          for (let j = 0; j < allFilters.length; j += 1) {
            allFilters[j].classList.remove('PJ043-filter_active');
          }
          e.target.parentNode.classList.add('PJ043-filter_active');

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
  },
};

export default PJ039;
