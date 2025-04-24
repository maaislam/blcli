import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{ME159}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'ME159',
      VARIATION: '2',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      const gallery = doc.getElementById('merchoid-scarcity-message');
      let seenMsg = false;
      const pathName = window.location.pathname;
      let productArr = localStorage.getItem('ME159V2_products');

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
        productArr,
        pathName,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.loader();
    },
    initAlt: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilderAlt();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder() {
        Exp.cache.gallery.insertAdjacentHTML('afterend', `
          <div class="ME159_stock-checker">
            <p class="ME159_first-stock">Currently less than 10 available</p>
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
            stockChecker.find('.ME159_first-stock').fadeOut(() => {
              stockChecker.addClass('ME159_start-anim');
              setTimeout(() => {
                stockChecker.removeClass('ME159_start-anim');
              }, 1600);
              setTimeout(() => {
                stockChecker.addClass('ME159_loaded-stock');
                Exp.cache.productArr.push({ name: Exp.cache.pathName });
                localStorage.setItem('ME159V2_products', JSON.stringify(Exp.cache.productArr));
              }, 2500);
            });
          }, 1800);
        });
      },
      contentBuilderAlt() {
        Exp.cache.gallery.insertAdjacentHTML('afterend', `
          <div class="ME159_stock-checker ME159_static">
            <p class="ME159_curr-stock">Hurry! Less than 3 available</p>
          </div>
        `);
        events.send(`${Exp.settings.ID}`, 'Visit', 'Already seen loading message', { sendOnce: true });
      },
    },
  };

  if (Exp.cache.seenMsg === true) {
    Exp.initAlt();
  } else {
    Exp.init();
  }
};

export default Run;
