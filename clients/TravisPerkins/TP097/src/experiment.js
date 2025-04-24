import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP097}} - {{Full width search bar}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP097',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const headerLinks = bodyVar.querySelector('.tpHeaderLinks');
      const logo = bodyVar.querySelector('.yCmsComponent.tpSiteLogo');

      return {
        bodyVar,
        headerLinks,
        logo,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.reOrder();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      reOrder: () => {
        const navLinks = Exp.cache.headerLinks.querySelectorAll('.nav li');
        Exp.cache.logo.insertAdjacentHTML('afterend', '<div class="TP097_nav-links"></div>');
        const newNav = document.querySelector('.TP097_nav-links');
        const accountDD = document.querySelector('.accountOptionsBox');

        [].forEach.call(navLinks, (el) => {
          if (el.querySelector('.button_text a').innerText.indexOf('Welcome') > -1) {
            newNav.insertAdjacentHTML('beforeend', `
              <a class="TP097_link TP097-name">${el.querySelector('.button_text a').innerText}</a>
            `);
          } else if (el.querySelector('.button_text a').innerText.indexOf('Your Account') > -1) {
            newNav.insertAdjacentHTML('beforeend', `
              <div class="TP097_link_dd TP097_link">
                <a href="${el.querySelector('.button_text a').href}" class="TP097_link">${el.querySelector('.button_text a').innerText}</a>
              </div>
            `);
          } else {
            newNav.insertAdjacentHTML('beforeend', `
              <a href="${el.querySelector('.button_text a').href}" class="TP097_link">${el.querySelector('.button_text a').innerText}</a>
            `);
          }
        });

        if (accountDD && document.querySelector('.TP097_link_dd')) {
          document.querySelector('.TP097_link_dd').appendChild(accountDD, document.querySelector('.TP097_link_dd a'));
        }
      },
    },
  };

  if (!document.body.classList.contains('TP097')) {
    Exp.init();
  }
};

export default Run;
