import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP114}} - {{Test Description}}
 */
const Run = () => {
  // let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP114',
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
        if (!document.querySelector('.TP114_pop-up_modal')) {
          Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
            <div class="TP114_pop-up_modal">
              <div class="TP114_body_click"></div>
              <div class="TP114_inner_div">
              <a class="TP114_close_btn">✕</a>
                <h2>Got an online account?</h2>
                <div class="TP114_overflow_fix">
                  <p>If so, why not log in before you buy? It typically takes...</p>
                  <div class="TP114_click-block">
                    <span class="TP114_click-num">8</span>
                    <p><span>clicks</span> to go through the checkout if you log in now</p>
                  </div>
                  <div class="TP114_click-block">
                    <span class="TP114_click-num">16</span>
                    <p><span>clicks</span> to check out if you need to reset your password</p>
                  </div>
                  <div class="TP114_click-block">
                    <span class="TP114_click-num">23</span>
                    <p><span>clicks</span> to check out if you don't log in</p>
                  </div>
                  <a href="/login" class="TP114_yes">Yes <span>I want to log in and save time</span></a>
                  <p>Don't worry, you will automatically return to this <br /> page after you log in</p>
                  <a href="/checkout/guest/delivery_details" class="TP114_no">No <span>I do not have an account</span></a>
                </div>
              </div>
            </div>
          `);
        }
      },
      modalBindings() {
        const modal = $('.TP114_pop-up_modal');
        const yesBtn = Exp.cache.bodyVar.querySelector('.TP114_yes');
        const noBtn = Exp.cache.bodyVar.querySelector('.TP114_no');
        // const modalBG = modal.find('.TP114_body_click');

        Exp.cache.checkoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          modal.fadeIn();
          sessionStorage.setItem('TP114', 'Seen Modal');
        });

        yesBtn.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User Clicked Yes on modal');
        });

        noBtn.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User Clicked No on modal');
        });

        // modal.find('.TP114_close_btn').on('click', (e) => {
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
