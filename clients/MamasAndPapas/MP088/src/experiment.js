import { fullStory, events } from '../../../../lib/utils';
import { poller, observer } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP088',
    VARIATION: '{{VARIATION}}',
  },


  init() {
    const {
      settings,
      services,
      components,
    } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (!document.querySelector('.MP088-individualPrice') || !document.querySelector('.MP081_price')) {
      console.log('ran first');
      components.savingBadge();
      components.savingInPounds();
      components.addPriceLabel();
      components.AddIndivudualText();
      components.detailedSavings();
    }

    poller(['.MP081_price--rrp', '.MP081_price', '.MP081_priceBlockBottom'], () => {
      const productName = document.querySelector('.productDetail_title');

      observer.connect(document.querySelector('.productDetail.py-4'), () => {
        if (document.querySelector('.MP088-saving_badge') || document.querySelector('.MP088-individualPrice')) {
          document.querySelector('.MP088-saving_badge').remove();
          document.querySelector('.MP088-individualPrice').remove();
        }

        if (productName.textContent.indexOf('Bundle') > -1 && !document.querySelector('.MP088-individualPrice')) {
          components.savingBadge();
          components.savingInPounds();
          components.addPriceLabel();
          components.AddIndivudualText();
          components.detailedSavings();
        }
      }, {
        config: { attributes: false, childList: true, subtree: false },
        throttle: 1000,
      });
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
     * @desc Add the saving badge on the image
     */
    savingBadge: function savingBadge() {
      if (document.querySelector('.MP081_price--rrp')) {
        const productImage = document.querySelector('#js-desktopImageContainer');
        const worthPrice = document.querySelector('.MP081_price--rrp').textContent.replace('*', '').replace('Worth', '').replace('£', '').replace(/,/g, '');
        const parseWorth = parseFloat(worthPrice);

        const badgeSaving = document.createElement('div');
        badgeSaving.classList.add('MP088-saving_badge');
        badgeSaving.innerHTML = `<p>Worth <span>£${parseWorth}</span></p>`;
        productImage.insertBefore(badgeSaving, productImage.firstChild);
      }
    },
    /**
    * @desc Add the word bundled price on the current price
    */
    addPriceLabel: function addPriceLabel() {
      const bundlePrice = document.querySelectorAll('.MP081_price');
      [].forEach.call(bundlePrice, (element) => {
        const bundlePriceText = document.createElement('span');
        bundlePriceText.innerHTML = 'Bundled Price ';
        element.insertBefore(bundlePriceText, element.firstChild);
      });
    },
    /**
    * @desc work out saving from the percentage and add under price
    */
    savingInPounds: function savingInPounds() {
      const priceBlock = document.querySelector('.productDetail.py-4 .price-block');
      const RRPPrice = parseFloat(document.querySelector('.MP081_price--rrp').textContent.replace('£', '').replace(',', '').replace('Worth', ''));
      const nowPrice = parseFloat(document.querySelector('.MP081_price').textContent.replace('£', '').replace('Bundled Price', '').replace(/[, ]+/g, ''));
      const totalSaving = (RRPPrice - nowPrice).toFixed(0);

      const savingPoundsBlock = document.createElement('div');
      savingPoundsBlock.classList.add('MP088-savingsPrice');
      savingPoundsBlock.innerHTML = `Save £<span>${totalSaving}</span>`;
      priceBlock.appendChild(savingPoundsBlock);
    },
    /**
    * @desc work out saving from the percentage and add under price
    */
    AddIndivudualText: function AddIndivudualText() {
      const bottomPriceBlock = document.querySelector('.productDetail.py-4');
      const worthPrice = document.querySelector('.MP081_price--rrp').textContent.replace('*', '').replace('Worth', '');
      const individualPrice = document.createElement('div');
      individualPrice.classList.add('MP088-individualPrice');
      individualPrice.innerHTML = `<p>If you bought all items individually it would cost <span>${worthPrice}</span></p>`;
      bottomPriceBlock.appendChild(individualPrice);
    },
    /**
    * @desc Add saving price and percentage to the bottom of the page
    */
    detailedSavings: function detailedSavings() {
      poller(['.MP081_BundlePicker__saving'], () => {
        const savingsPrice = document.querySelector('.MP088-savingsPrice').textContent;
        const savingPercentage = document.querySelector('.MP081_BundlePicker__option--active .MP081_BundlePicker__savings').textContent.replace('Save', '');
        const bottomSavingsLine = document.createElement('div');
        bottomSavingsLine.classList.add('MP088-bundleSaving');
        bottomSavingsLine.innerHTML = `<p>${savingsPrice} - thats ${savingPercentage}!</p>`;

        const bottomPriceBlock = document.querySelector('.MP081_priceBlockBottom');
        bottomPriceBlock.appendChild(bottomSavingsLine);
      });
    },
  },
};

export default Experiment;
