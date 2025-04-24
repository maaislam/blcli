import { fullStory, events } from '../../../../lib/utils';
import { pollerLite, observer } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL007',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();

    /* eslint-disable */
    window.prm.add_endRequest(function (sender, error) {
      const target = sender._postBackSettings.asyncTarget;
      try {
        if (target === 'ctl00$ctl00$ContentPlaceHolderMain$cntPlaceHlderMain$lnkBuyProduct' || target.indexOf('ctl00$ctl00$ContentPlaceHolderMain$cntPlaceHlderMain$popupConsumables$lstRelatedItems') > -1){
          document.body.classList.add(settings.ID);
          pollerLite(['#ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_pnlRelatedItems'], () => {
            events.send('PL007', 'clicked', 'buy', { sendOnce: true });
            components.createColumns();
            components.rebuildTheProducts();
            components.loadMoreProducts();
      
            components.contentChanges();
            components.moveSavings();
      
            components.addedToBagmessage();
            components.scrollOnClick();
          });

        }
      } catch (e) {
        // else catch the error
      }
    });
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

  components: {
    /**
    * @desc create the 3 new columns
    */
    createColumns: function createColumns() {
      const { components } = Experiment;
      const columns = document.createElement('div');
      columns.classList.add('PL007-columns_wrapper');
      columns.classList.add('PL007_expanded');
      columns.innerHTML = `
      <h3>Ink & Toners</h3>
      <div class="PL007-column PL007-consumable"></div>
      <div class="PL007-column PL007-accessories"></div>
      <div class="PL007-column PL007-cables"></div>`;

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

      document.querySelector('.PL007-consumable').appendChild(consumables);
      document.querySelector('.PL007-accessories').appendChild(accessories);
      document.querySelector('.PL007-cables').appendChild(cables);
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
        newProducts.classList.add('PL007_upsell_item');
        newProducts.innerHTML = `
        <div class="PL007-item_image" style="background-image:url('${upsellImage}')"></div>
        <div class="PL007-innerInfo">
          <h4>${upsellName}</h4>
          <p class="PL007-serial">${upsellProductNo}</p>
          <p>${upsellPrice}</p>
        </div>
        <div class="PL007-add">
        <div class="PL007-saving"></div>
        ${buyButton}
        </div>`;

        element.parentNode.appendChild(newProducts);
      }
    },
    /**
     * @desc add load more functionality
     */
    loadMoreProducts: function loadMoreProducts() {
      const loadMore = document.createElement('div');
      loadMore.classList.add('PL007-load_more');
      loadMore.innerHTML = '<span>Scroll to see more</span>';

      const upsellWrapper = document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_cntPlaceHlderMain_pnlRelatedItems');
      upsellWrapper.insertBefore(loadMore, upsellWrapper.querySelector('.modal-footer').previousElementSibling);
    },
    /**
     * @desc changes from the PL007 doc
     */
    contentChanges: function contentChanges() {
      const title = document.querySelector('.popSubTitle');
      title.innerHTML = '<h2>Add genuine* cartridges to your order and save £££s!</h2><p>*genuine products protect your warranty</p>';
    },
    /**
     * @desc move the savings and add a tooltip
     */
    moveSavings: function moveSavings() {
      const columns = document.querySelectorAll('.PL007-column');
      for (let index = 0; index < columns.length; index += 1) {
        const element = columns[index];

        const allItems = element.querySelectorAll('.PL007_upsell_item');
        [].forEach.call(allItems, (product) => {
          const savings = product.querySelector('.PL007-innerInfo .grid-stock');
          if (savings) {
            const savingsWrapper = product.querySelector('.PL007-saving');

            if (savingsWrapper) {
              const saveAmount = savings.querySelector('b').textContent;
              savings.innerHTML = `<p>Bundle saving <span>${saveAmount}</span> off</p><span>i</span><div class="PL007-tooltip"><p>Buying these inks in a bundle saves you money compared to buying them seperately.<br/>Why not stock up now!</p></div>`;
              savingsWrapper.appendChild(savings);


              const tooltip = product.querySelector('.PL007-tooltip');
              const tooltipTrigger = product.querySelector('.PL007-saving > span');

              tooltipTrigger.addEventListener('mouseenter', () => {
                tooltip.classList.add('PL007-tooltip_showing');
              });
              tooltipTrigger.addEventListener('mouseleave', () => {
                tooltip.classList.remove('PL007-tooltip_showing');
              });
            }
          }
        });
      }
    },
    /**
     * @desc On added to bag, get the product that was added and add feedback
     */
    addedToBagmessage: function addedToBagmessage() {
      const upsellItems = document.querySelectorAll('.PL007_upsell_item');
      for (let index = 0; index < upsellItems.length; index += 1) {
        const element = upsellItems[index];
        const addedProduct = element.querySelector('.button.selected');
        if (element.querySelector('.button.selected')) {
          if (document.querySelector('.PL007-addedProduct')) {
            document.querySelector('.PL007-addedProduct').remove();
            const productName = addedProduct.parentNode.parentNode.querySelector('.PL007-innerInfo h4').textContent.trim();
            const addedMessage = document.createElement('div');
            addedMessage.classList.add('PL007-addedProduct');
            addedMessage.innerText = `You've added ${productName} to your basket.`;
            document.querySelector('.PL007-bundle_text').insertAdjacentElement('afterend', addedMessage);
            document.querySelector('.popSubTitle h2').innerHTML = 'Shop more genuine products below:';
          } else {
            const productName = addedProduct.parentNode.parentNode.querySelector('.PL007-innerInfo h4').textContent.trim();
            const addedMessage = document.createElement('div');
            addedMessage.classList.add('PL007-addedProduct');
            addedMessage.innerText = `You've added ${productName} to your basket.`;
            document.querySelector('.PL007-bundle_text').insertAdjacentElement('afterend', addedMessage);
            document.querySelector('.popSubTitle h2').innerHTML = 'Shop more genuine* products below:';
          }
        }
      }
    },
  },
};

export default Experiment;
