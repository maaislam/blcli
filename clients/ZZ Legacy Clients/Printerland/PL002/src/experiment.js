import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'PL002',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // on add to bag click
    const addToBag = document.querySelector('.button.product_buy');
    addToBag.addEventListener('click', () => {
      events.send('PL002', 'click', 'buy', { sendOnce: true });
    });

    // Wait for the add to basket to be clicked
    /* eslint-disable */
    window.prm.add_endRequest(function (sender, error) {
      const target = sender._postBackSettings.asyncTarget;
      try {
          if (target === 'ctl00$ctl00$ContentPlaceHolderMain$cntPlaceHlderMain$lnkBuyProduct'){
            poller(['#PopupBehaviourQA_foregroundElement .list_table', '.modal-footer .button.product_buy'], () => {
              components.createColumns();
              components.rebuildTheProducts();
              components.loadMoreProducts();
              events.send('PL002', 'add to bag click', 'Lightbox fired', { sendOnce: true });
            });
          }
      } catch (e) { 
        // else catch the error
      }
    });
    /* eslint-enable */
  },
  services: {
    /**
    * @desc Inits all page level tracking
    */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
    * @desc create the 3 new columns
    */
    createColumns: function createColumns() {
      const { components } = Experiment;
      const columns = document.createElement('div');
      columns.classList.add('PL002-columns_wrapper');
      columns.innerHTML = `<div class="PL002-column PL002-consumable"><h3>Consumables</h3></div>
      <div class="PL002-column PL002-accessories"><h3>Accessories</h3></div>
      <div class="PL002-column PL002-cables"><h3>Cables</h3></div>`;

      const basketpopup = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_pnlRelatedItems');
      basketpopup.insertBefore(columns, basketpopup.firstChild);

      components.moveProducts();
    },

    /**
     * @desc move products to relevant columns
     */
    moveProducts: function moveProducts() {
      const consumables = document.getElementById('ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_pnlPopupConsumables');
      const accessories = document.getElementById('ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_pnlPopupAccessories');
      const cables = document.getElementById('ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_pnlPopupCables');

      document.querySelector('.PL002-consumable').appendChild(consumables);
      document.querySelector('.PL002-accessories').appendChild(accessories);
      document.querySelector('.PL002-cables').appendChild(cables);
    },
    /**
     * @desc loop through them, get the text, rebuild the html
     */
    rebuildTheProducts: function rebuildTheProducts() {
      const upsellItems = document.querySelectorAll('#PopupBehaviourQA_foregroundElement .list_table tr:not(:first-child)');
      for (let i = 0; i < upsellItems.length; i += 1) {
        const element = upsellItems[i];
        const upsellImage = element.querySelector('img').getAttribute('src');
        const upsellName = element.querySelector('.col2').innerHTML;
        const upsellProductNo = element.querySelector('.col.col3').textContent;
        const upsellPrice = element.querySelector('.col.col4').innerHTML;
        const buyButton = element.querySelector('.col.col5').innerHTML;

        // create the new markup
        const newProducts = document.createElement('div');
        newProducts.classList.add('PL002_upsell_item');
        newProducts.innerHTML = `
        <div class="PL002-item_image" style="background-image:url('${upsellImage}')"></div>
        <div class="PL002-innerInfo">
          <h4>${upsellName}</h4>
          <p class="PL002-serial">${upsellProductNo}</p>
          <p>${upsellPrice}</p>
        </div>
        <div class="PL002-add">${buyButton}</div>`;

        element.parentNode.appendChild(newProducts);
      }
    },
    /**
     * @desc add load more functionality
     */
    loadMoreProducts: function loadMoreProducts() {
      const loadMore = document.createElement('div');
      loadMore.classList.add('PL002-load_more');
      loadMore.innerHTML = '<span>Load More</span>';

      const upsellWrapper = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_pnlRelatedItems');
      upsellWrapper.insertBefore(loadMore, upsellWrapper.querySelector('.modal-footer').previousElementSibling);

      // show all upsell products on click
      const upsellItems = document.querySelectorAll('.PL002_upsell_item');
      const newColumnWrap = document.querySelector('.PL002-columns_wrapper');
      loadMore.addEventListener('click', () => {
        for (let index = 0; index < upsellItems.length; index += 1) {
          const element = upsellItems[index];
          if (!element.classList.contains('PL002_showing_all')) {
            element.classList.add('PL002_showing_all');
          } else {
            element.classList.remove('PL002_showing_all');
          }
        }
        if (!newColumnWrap.classList.contains('PL002_expanded')) {
          loadMore.style.display = 'none';
          newColumnWrap.classList.add('PL002_expanded');
        } else {
          newColumnWrap.classList.remove('PL002_expanded');
          loadMore.querySelector('span').textContent = 'Show More';
        }
      });
    },
  },
};

export default Experiment;
