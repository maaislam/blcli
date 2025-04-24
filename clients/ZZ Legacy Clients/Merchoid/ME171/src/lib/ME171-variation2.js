import { fullStory, events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * {{ME159}} - {{Test Description}}
 */
const ME171_variation2 = {
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
    const { services, settings, components, cache } = ME171_variation2;

    // ME171_variation2.cache.bodyVar.classList.add(settings.ID);
    document.body.classList.add(settings.ID);
    // services.tracking();

    components.contentBuilder();
    components.loader();
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = ME171_variation2;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      // events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /*
      events.send(`${ME159.settings.ID}`, 'Action', 'Label', { sendOnce: true });
    */
  },
  components: {
    contentBuilder() {
      document.getElementById('merchoid-scarcity-message').insertAdjacentHTML('afterend', `
        <div class="ME159_stock-checker ME171-loading">
          <p class="ME159_loading-stock"><span class='ME171-loading-bar'>Checking stock levels</span><span class="ME159_elip"></span></p>
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
            if (ME171_variation2.cache.seenMsg === false) {
              ME171_variation2.cache.productArr.push({ name: ME171_variation2.cache.pathName });
              localStorage.setItem('ME159_products', JSON.stringify(ME171_variation2.cache.productArr));
            }
          });
        }, 4000);
      });
    },
  },
};

export default ME171_variation2;
