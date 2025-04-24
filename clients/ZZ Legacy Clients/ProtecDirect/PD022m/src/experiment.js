import { fullStory } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
/**
 * {{PD022m}} - {{Promote industry regulations - mobile}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD022m',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const regexArray = [/^(\/)($|\?.*)/, /^((\/)(Clothing-and-Workwear|Site-Equipment-and-Consumables|Personal-Protective-Equipment-PPE-|Industrial-Skin-Care-and-Janitorial|All-discounts|summer-essentials)(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+)($|\?.*)|^((\/)(Safety-Signs)(\/))[\w\d\s-+_=~]+($|\?.*)|^(\/)(Storage-Solutions~c~F)$/, /((\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+($|\?.*)|.*(gallery).*|^(\/)(Safety-Signs)(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+.*|(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+(\/).*(~p~).*)/, /^((\/)(cart))($|\?.*)/];
      const homepageBasketMarkup = `
      <div class="PD022-Wrapper">
        <div class="PD022-Image-Wrap">
          <img class="PD022-Image" src="https://d191y0yd6d0jy4.cloudfront.net/idlkbp6e0rwdlrf.png" alt="Ribbon">
        </div>
        <div class="PD022-Text-Wrap">
          <span class="PD022-Text">We know it’s too big a risk, physically and financially, to use equipment that does not meet industry standards and regulations. This is why we strive to make sure as many of our products meet these standards as possible.</span>
        </div>
      </div>
      `;

      const PLPMarkup = `
      <div class="PD022-Wrapper PD022-PLP">
        <div class="PD022-Image-Wrap">
          <img class="PD022-Image" src="https://d191y0yd6d0jy4.cloudfront.net/idlkbp6e0rwdlrf.png" alt="Ribbon">
        </div>
        <div class="PD022-Text-Wrap">
          <span class="PD022-Text"></span>
        </div>
      </div> 
      `;

      const PLPTextArray = ['You can trust that all products sold by Protec Direct meet all industry regulations and standards. We know how important it is for the safety and security of your business and individuals.', 'Making sure your PPE & Workwear keeps people safe is so important. That\'s why we make it our number 1 priority to only provide you with PPE & Workwear that we know meets industry regulations and standards.', 'Buying your equipment from websites that do not ensure their products meet industry regulations and standards can be a big risk for you and your company. This is why Protec Direct is committed to supplying safe and trusted equipment to our customers.', 'Injuries in the workplace are something that nobody wants. This is why we do everything we can to make sure our products meet industry regulations and standards, making them safe and of high quality.'];

      return {
        bodyVar,
        regexArray,
        homepageBasketMarkup,
        PLPMarkup,
        PLPTextArray,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      services.pageCheck();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      pageCheck: () => {
        const { components } = Exp;
        // Regex statements
        if (window.location.pathname.match(Exp.cache.regexArray[0])) {
          components.setupHomepage();
          // PLP
        } else if (window.location.pathname.match(Exp.cache.regexArray[1])) {
          components.setupPLP();
          // Product Page
        } else if (window.location.pathname.match(Exp.cache.regexArray[2])) {
          components.setupProductPage();
          // Basket page
        } else if (window.location.pathname.match(Exp.cache.regexArray[3])) {
          components.setupBasket();
        }
      },
    },
    components: {
      setupHomepage() {
        poller([
          '.span-24.section1.last > .highlights-carousel',
        ], () => {
          // Insert content
          Exp.cache.bodyVar.querySelector('.span-24.section1.last > .highlights-carousel').insertAdjacentHTML('afterend', Exp.cache.homepageBasketMarkup);
          // Add styling class
          Exp.cache.bodyVar.querySelector('.PD022-Wrapper').classList.add('PD022-Homepage');
        });
      },
      setupPLP() {
        poller([
          '#header_container',
        ], () => {
          Exp.cache.bodyVar.querySelector('#header_container').insertAdjacentHTML('afterend', Exp.cache.PLPMarkup);
          // Generate a random number between 0 and 3 to insert text
          const randomIndex = Math.floor(Math.random() * 4);
          Exp.cache.bodyVar.querySelector('.PD022-Text-Wrap > .PD022-Text').textContent = Exp.cache.PLPTextArray[randomIndex];
          // Test conflict with PD023, if the body class has PD023 add styling classes
          if (Exp.cache.bodyVar.classList.contains('PD023')) {
            Exp.cache.bodyVar.querySelector('.PD022-Wrapper.PD022-PLP').classList.add('PD023-PD022-Adjust');
            Exp.cache.bodyVar.querySelector('#content').classList.add('PD023-PD022-Adjust');
          }
        });
      },
      setupProductPage() {
        poller([
          '.productDetailPanel > .grid_12.pd2-quantities',
        ], () => {
          // Add markup
          Exp.cache.bodyVar.querySelector('.productDetailPanel > .grid_12.pd2-quantities').insertAdjacentHTML('beforebegin', `
            <div class="PD022-Wrapper PD022-Product">
              <div class="PD022-Image-Wrap">
                <img class="PD022-Image" src="https://d191y0yd6d0jy4.cloudfront.net/idlkbp6e0rwdlrf.png" alt="Ribbon">
              </div>
              <div class="PD022-Text-Wrap">
                <span class="PD022-Text">You can trust that all products sold by Protec Direct meet industry regulations and standards. Our buying guides and datasheets are available to give you more information.</span>
              </div>
           </div> 
          `);
        });
      },
      setupBasket() {
        poller([
          '.container_12 > .grid_12.linkButton.row1',
        ], () => {
          Exp.cache.bodyVar.querySelector('.container_12 > .grid_12.linkButton.row1').insertAdjacentHTML('beforebegin', Exp.cache.homepageBasketMarkup);
          // Add styling class
          Exp.cache.bodyVar.querySelector('.PD022-Wrapper').classList.add('PD022-Basket');
        });
      },
    },
  };

  Exp.init();
};

export default Run;
