import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD019',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    events.useLegacyTracker();
    services.tracking();
    document.body.classList.add(settings.ID);
    components.topUspMessage();
    components.addQualityAssurance();
    components.productSaving();
    components.seperateTitle();
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
     * @desc top USP
     */
    topUspMessage: function topUspMessage() {
      const productTitle = document.querySelector('.product-info');
      const uspMessage = document.createElement('div');
      uspMessage.classList.add('HD019-top_usp');
      uspMessage.innerHTML = 'Since selling our first hearing aid battery in 2010, we have delivered over 50,000,000 of them all over the world.';
      productTitle.insertAdjacentElement('beforebegin', uspMessage);
    },
    /**
     * @desc top USP
     */
    addQualityAssurance: function addQualityAssurance() {
      const priceBlock = document.querySelector('.product-actions');
      const reviews = document.querySelector('.product-into__reviews');
      const packSize = document.querySelector('.product-info__name').textContent;

      let qaMessageText;

      if (packSize.indexOf('Pack') === -1) {
        qaMessageText = 'A pack of 6 of our hearing aids last, on average, between 1 and 2 months. Our shelf life on batteries is normally 3 years minimum';
      }
      if (packSize.indexOf('Pack of 60') > -1) {
        qaMessageText = 'A pack of 60 of our hearing aids last, on average, between 10  and 12 months. Our shelf life on batteries is normally 3 years minimum';
      }
      if (packSize.indexOf('Pack of 120') > -1) {
        qaMessageText = 'A pack of 120 of our hearing aids last, on average, between 20  and 24 months. Our shelf life on batteries is normally 3 years minimum';
      }

      const qualityAssuranceMessage = document.createElement('div');
      qualityAssuranceMessage.classList.add('HD019-QA_message');
      qualityAssuranceMessage.innerHTML = `<div class="HD019-text"><h3>Quality Assurance</h3><p>${qaMessageText}</p></div>`;
      if (window.innerWidth < 767) {
        priceBlock.insertAdjacentElement('beforebegin', qualityAssuranceMessage);
      } else {
        reviews.insertAdjacentElement('afterend', qualityAssuranceMessage);
      }
    },
    /**
     * @desc Separate title of battery took from HD003
     */
    seperateTitle: function seperateTitle() {
      const productTitle = document.querySelector('.product-info__name');
      const regexSizePack = /Size \d+ Pack of \d+/;
      const regexSize = /Size \d+/;
      const regexPack = /Pack of \d+/;

      if (productTitle.textContent.match(regexSizePack)) {
        const sizePackVal = productTitle.textContent.match(regexSizePack)[0];
        let newNameHTML = productTitle.textContent.replace(sizePackVal, '');
        const sizeVal = sizePackVal.match(regexSize)[0];
        const packVal = sizePackVal.match(regexPack)[0];
        newNameHTML = `${newNameHTML}<br>${sizeVal}<br>${packVal}`;

        productTitle.innerHTML = newNameHTML;
      }
    },
    /**
     * @desc price per pack, from HD003
     */
    productSaving: function productSaving() {
      const productTitle = document.querySelector('.product-info__name').textContent;
      const regexSizePack = /Size \d+ Pack of \d+/;
      const regexPack = /Pack of \d+/;

      const sizePackVal = productTitle.match(regexSizePack)[0];
      const packVal = sizePackVal.match(regexPack)[0];
      const getPackValue = parseFloat(packVal.match(/\d+/)[0]);

      let productPrice;
      let getproductPrice;

      const specialPrice = document.querySelector('.product-actions .price-box .special-price');
      const regularPrice = document.querySelector('.product-actions .price-box .regular-price');
      if (specialPrice) {
        getproductPrice = parseFloat(specialPrice.querySelector('.price').textContent.replace('£', ''));
        productPrice = Math.ceil(getproductPrice);
      } else if (regularPrice) {
        getproductPrice = parseFloat(regularPrice.querySelector('.price').textContent.replace('£', ''));
        productPrice = Math.ceil(getproductPrice);
      }

      const pricePerBattery = parseFloat((productPrice / getPackValue) * 100);
      const roundedPDB = Math.ceil(pricePerBattery);

      const productPriceBox = document.querySelector('.product__actions');
      const pricePerBatBox = document.createElement('div');
      pricePerBatBox.classList.add('HD019-pricePerBat');
      pricePerBatBox.innerHTML = `That's just ${roundedPDB}p per battery!`;

      productPriceBox.insertAdjacentElement('afterend', pricePerBatBox);
    },
  },
};

export default Experiment;
