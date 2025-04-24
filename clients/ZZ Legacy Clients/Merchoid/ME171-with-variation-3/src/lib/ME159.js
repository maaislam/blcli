import { fullStory, events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * {{ME159}} - {{Test Description}}
 */
const ME159 = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME159',
    VARIATION: '1',
  },
  cache: (() => {
    const doc = document;
    const bodyVar = doc.body;

    const gallery = doc.getElementById('merchoid-scarcity-message');
    const pathName = window.location.pathname;
    let productArr = localStorage.getItem('ME159_products');
    let seenMsg = false;

    if (productArr === null) {
      productArr = [];
    } else {
      productArr = JSON.parse(productArr);
      for (let i = 0; productArr.length > i; i += 1) {
        if (productArr[i].name.indexOf(pathName) > -1) {
          seenMsg = true;
        }
      }
    }

    return {
      doc,
      bodyVar,
      gallery,
      seenMsg,
      pathName,
      productArr,
    };
  })(),
  init: () => {
    // Setup
    const { services, settings, components } = ME159;

    ME159.cache.bodyVar.classList.add(settings.ID);
    services.tracking();

    components.contentBuilder();
    components.loader();
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = ME159;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /*
      events.send(`${ME159.settings.ID}`, 'Action', 'Label', { sendOnce: true });
    */
  },
  components: {
    contentBuilder() {
      console.log('-------- CONTENT BUILDER CALLED ---------');
      console.log(ME159.cache.gallery);
      console.log('-----------------------------------------');
      ME159.cache.gallery.insertAdjacentHTML('afterend', `
        <div class="ME159_stock-checker">
          <p class="ME159_loading-stock">Checking stock levels<span class="ME159_elip"></span></p>
          <p class="ME159_curr-stock">Hurry! Less than 3 available</p>
        </div>
      `);
    },
    loader() {
      pollerLite([
        () => {
          let trigger = false;
          if (window.jQuery) trigger = true;
          return trigger;
        },
      ], () => {
        const stockChecker = $('.ME159_stock-checker');
        setTimeout(() => {
          stockChecker.find('.ME159_loading-stock').fadeOut(() => {
            stockChecker.addClass('ME159_loaded-stock');
            if (ME159.cache.seenMsg === false) {
              ME159.cache.productArr.push({ name: ME159.cache.pathName });
              localStorage.setItem('ME159_products', JSON.stringify(ME159.cache.productArr));
            }
          });
        }, 2500);
      });
    },
  },
};

export default ME159;
