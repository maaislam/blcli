import { fullStory, events } from '../../../../lib/utils';
import data from './lib/conf';

/**
 * {{IT065}} - {{2 Products on PDP}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'IT065',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Returns the matching product pathname
     */
    const matchingProductPathname = services.checkProduct(data);
    /**
     * Returns new product HTML from the matching
     * product pathname.
     */
    services.requestProduct(matchingProductPathname, (htmlDiv) => {
      console.log(htmlDiv);
      /**
       * Run the following services on the new returned HTML.
       */
      const productElementObject = services.returnElementsObject(htmlDiv);
      console.log(productElementObject);
    });
    /**
     * Things needed to be able to add to basket ** Look for 'spConfig' in source code
     * - Form Key
     * - Product ID
     * - Super Attribute[150]
     * - Qty
     */
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
     * @desc checkProduct will return true or false, it takes in the data object
     * and checks if the url key matches the current page pathname and returns the
     * matched value url.
     * @param {Object} urlObj
     */
    checkProduct(urlObj) {
      const url = window.location.pathname.replace('/', '');
      const matchedUrl = urlObj[url];
      return matchedUrl;
    },
    /**
     * @desc AJAX request for the associated product. Will return HTML if found.
     * @param {String} productUrl
     */
    requestProduct(productUrl, cb) {
      const url = `https://www.inthestyle.com/${productUrl}`;
      const html = document.createElement('div');
      const request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success
          const returnedData = request.responseText;
          // console.log(returnedData);
          html.innerHTML = returnedData;
          cb(html);
        } else {
          // Error
          console.log('error');
        }
      };
      request.onerror = () => {
        console.log('error');
      };
      request.send();
    },
    /**
     * @desc return an object containing the elements needed.
     * @param {HTML} html
     */
    returnElementsObject(html) {
      let title = '';
      const titleEl = html.querySelector('.product-name > h1');
      if (titleEl) {
        title = titleEl.textContent.trim();
      }
      return {
        title,
      };
    },
  },

  components: {},
};

export default Experiment;
