import { fullStory, events } from '../../../../lib/utils';

/**
 * {{EJNavUpdate}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'EJNavUpdate',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      // Sale
      const nav1 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down');
      // Watches
      const nav2 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down');
      // Jewellery
      const nav3 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down');
      // Engagement
      const nav4 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down');
      // Brands
      const nav5 = doc.querySelector('#js-nav-status > .top-level__title + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down + .top-level__drop-down');

      return {
        doc,
        bodyVar,
        nav1,
        nav2,
        nav3,
        nav4,
        nav5,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
    },
    components: {
      contentBuilder() {
        Exp.cache.nav1.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/offers.do?icid=hs-nv-sale-page">View All Sale Products</a>
          </div>
        `);

        Exp.cache.nav2.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/watches.do?icid=hs-nv-watches-page">View All Watches</a>
          </div>
        `);

        Exp.cache.nav3.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/jewellery.do?icid=hs-nv-jewellery-page">View All Jewellery</a>
          </div>
        `);
        
        Exp.cache.nav4.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/diamonds/?icid=hs-nv-engagement-page">View All Engagement Rings</a>
          </div>
        `);

        Exp.cache.nav5.querySelector('.drop-down').insertAdjacentHTML('afterbegin', `
          <div class="nav-slot-1 mobile_view-all">
            <a href="/webstore/brand-index.do?icid=hs-nv-brand-index">View All Brands</a>
          </div>
        `);
      },
    },
  };

  Exp.init();
};

export default Run;
