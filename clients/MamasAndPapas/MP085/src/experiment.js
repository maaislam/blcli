import { fullStory, events } from '../../../../lib/utils';

/**
 * {{MP085}} - {{Car seat age/Value association}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP085',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    if (/Car Seat/.test(window.universal_variable.page.breadcrumb) || window.universal_variable.page.breadcrumb.indexOf('Pushchairs') > -1) {
      // Setup
      const { settings, services } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);

      // Checks if details contain the words 'Groups' and 'Weight'
      let productDetails = document.querySelector('.productDetail_description.text-black').textContent.toLowerCase();
      let ageDetails;
      let weightDetails
      if (/group/.test(productDetails) && /weight/.test(productDetails)) {
        if (/child weight/.test(productDetails)) {
          ageDetails = productDetails.replace(':', '').split('child weight')[0].replace('group', '');
          weightDetails =  productDetails.replace(':', '').split('child weight')[1];
        } else if (/weight/.test(productDetails)) {
          ageDetails = productDetails.replace(':', '').split('weight')[0].replace('group', '');
          weightDetails =  productDetails.replace(':', '').split('weight')[1];
        }

        const newProductDetails = `<div class='MP085-productDetail_description'>
        <div class='MP085-productDetail__item' id='MP085-age'>Group ${ageDetails}</div>
        <div class='MP085-productDetail__item' id='MP085-weight'>${weightDetails}</div>
        </div>`;

        document.querySelector('.productDetail_description.text-black').insertAdjacentHTML('afterend', newProductDetails);
      } else {
        document.querySelector('.productDetail_description.text-black').style.display = 'block';
      }
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
  },

  components: {},
};

export default Experiment;
