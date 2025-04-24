import { fullStory, events } from '../../../../lib/utils';

/**
 * {{HH008}} - {{Test Description}}
 */
const Run = () => {
  const doc = document;
  const bodyVar = doc.body;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'HH008',
      VARIATION: '{{VARIATION}}',
    },
    cache: (() => {
      const navQuicklinks = doc.getElementById('menu-top-menu');
      const mobileNav = doc.getElementById('mobile-call-block');

      return {
        navQuicklinks,
        mobileNav,
      };
    })(),
    init: () => {
      if (Exp.settings.VARIATION === '2') {
        events.send(Exp.settings.ID, 'Control', 'Control version fired');
        return false;
      }
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      Exp.render();

      services.tracking();
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
    render() {
      const navParent = Exp.cache.navQuicklinks.parentNode;
      const newQuicklink = `
        <li class="HH008_quicklink menu-item">
          <a href="https://www.helpinghandshomecare.co.uk/existing-customers/">Existing <strong>customers</strong></a>
        </li>
      `;

      navParent.classList.remove('col-lg-2');
      navParent.classList.add('col-lg-3');
      const careBlock = bodyVar.querySelector('.col-lg-3 + .col-lg-2.contact .col-xs-12:last-child p');

      careBlock.innerHTML = '<span class="HH008_time">Open Mon - Fri: 8am - 7pm<br /> and Sat & Sun: 9am - 5:30pm</span>';
      Exp.cache.navQuicklinks.insertAdjacentHTML('beforeend', newQuicklink);
      Exp.cache.mobileNav.insertAdjacentHTML('beforeend', `
        <div class="HH008_mobile">
          <p><img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/ca22b4a6150a5209cf8c20baee700b03_noun_customer_service_848586_%282%29.png" />Our Experts are here to help, give us a<br class="HH008-sm_mobile" /> call. Our team is available from: <br /> Mon - Fri: 8am - 7pm Sat & Sun: 9am - 5:30pm</p>
        </div>
      `);
    },
  };

  Exp.init();
};

export default Run;
