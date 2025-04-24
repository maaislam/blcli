import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{TP113}} - {{Test Description}}
 */
const Run = () => {
  // let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP113',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      const checkoutBtn = bodyVar.querySelector('.tpCheckoutButton a');

      return {
        doc,
        bodyVar,
        checkoutBtn,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.modalBindings();
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
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
          <div class="TP113_pop-up_modal">
            <div class="TP113_body_click"></div>
            <div class="TP113_inner_div">
            <a class="TP113_close_btn">✕</a>
              <h2>Got an online account?</h2>
              <div class="TP113_overflow_fix">
                <p>If so, why not log in before you buy? It typically takes...</p>
                <div class="TP113_click-block">
                  <span class="TP113_click-num">8</span>
                  <p><span>clicks</span> to go through the checkout if you log in now</p>
                </div>
                <div class="TP113_click-block">
                  <span class="TP113_click-num">16</span>
                  <p><span>clicks</span> to check out if you need to reset your password</p>
                </div>
                <div class="TP113_click-block">
                  <span class="TP113_click-num">23</span>
                  <p><span>clicks</span> to check out if you don't log in</p>
                </div>
                <div class="TP113_half">
                  <a class="TP113_yes">Yes <span>I want to log in and save time</span></a>
                  <p>Don't worry, you will automatically return to this <br /> page after you log in</p>
                </div>
                <div class="TP113_half">
                  <a class="TP113_no">No <span>I do not have an account</span></a>
                </div>
              </div>
            </div>
          </div>
        `);
      },
      modalBindings() {
        const modal = $('.TP113_pop-up_modal');
        const yesBtn = $('.TP113_yes');
        const noBtn = $('.TP113_no');
        const checkoutTop = Exp.cache.doc.getElementById('upperCheckoutButton');

        // const modalBG = modal.find('.TP113_body_click');

        checkoutTop.addEventListener('click', (e) => {
          e.preventDefault();
          modal.fadeIn();
          sessionStorage.setItem('TP113', 'Seen Modal');
          Exp.cache.bodyVar.classList.add('TP113_scroll-fix');
        });

        poller([
          '.basket_ctas .linkForOtherCustomer a.checkoutButton:not(#upperCheckoutButton)',
        ], () => {
          const checkoutBottom = Exp.cache.doc.querySelector('.basket_ctas .linkForOtherCustomer a.checkoutButton:not(#upperCheckoutButton)');
          checkoutBottom.addEventListener('click', (e) => {
            e.preventDefault();
            modal.fadeIn();
            sessionStorage.setItem('TP113', 'Seen Modal');
            Exp.cache.bodyVar.classList.add('TP113_scroll-fix');
          });
        });

        yesBtn.on('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User Clicked Yes on modal', { sendOnce: true });
          window.location.pathname = '/login';
        });

        noBtn.on('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User Clicked No on modal', { sendOnce: true });
          window.location.pathname = '/checkout/guest/delivery_details';
        });

        // modal.find('.TP113_close_btn').on('click', (e) => {
        //   if (slideQ === false) {
        //     slideQ = true;
        //     e.preventDefault();
        //     modal.fadeOut('slow', () => {
        //       modal.removeClass('active');
        //       slideQ = false;
        //     });
        //   }
        // });

        // modalBG.on('click', () => {
        //   if (slideQ === false) {
        //     modal.fadeOut('slow', () => {
        //       modal.removeClass('active');
        //       slideQ = false;
        //     });
        //   }
        // });
      },
    },
  };

  Exp.init();
};

export default Run;
