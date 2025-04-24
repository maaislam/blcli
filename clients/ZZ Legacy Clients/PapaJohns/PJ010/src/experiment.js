import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ010',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const addLightbox = () => {
      if (!localStorage.getItem('PJ010-lightboxClose') && !localStorage.getItem('PJ010-voucherApplied')) {
        components.lightbox();
        const applyDeal = document.querySelector('.PJ010-applyVoucher');
        applyDeal.addEventListener('click', () => {
          components.applyVoucher();
          document.querySelector('.PJ010-lightbox_wrapper').classList.remove('PJ010-lightbox_active');
          document.querySelector('.PJ010-lightboxfade').classList.remove('PJ010-lightbox-fade_active');

          events.send('PJ010 v1', 'Apply Deal button click', 'PJ010 Apply deal button click', { sendOnce: true });

          observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), () => {
            // if error message do nothing
            const error = document.querySelector('.ctl00_cphBody__pnlPromoError');
            if (!error && !localStorage.getItem('PJ010-offerApplied')) {
              components.voucherSuccess();
              localStorage.setItem('PJ010-voucherApplied', 1);
            }
          }, {
            config: { attributes: true, childList: true, subtree: false },
            throttle: 1000,
          });
        });
      }
    };
    const onInactive = (ms, cb) => {
      console.log('inactive');
      let wait = setTimeout(cb, ms);
      const idleTime = () => {
        clearTimeout(wait);
        wait = setTimeout(cb, ms);
      };
      document.addEventListener('mousemove', idleTime);
      document.addEventListener('mousedown', idleTime);
      document.addEventListener('mouseup', idleTime);
      document.addEventListener('onkeydown', idleTime);
      document.addEventListener('onkeyup', idleTime);
    };
    const voucherExist = document.querySelector('.discountRow td');
    if (!voucherExist && !localStorage.getItem('PJ010-lightbox-shown')) {
      onInactive(45000, () => {
        addLightbox();
      });
    }

    observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), () => {
      if (!voucherExist && !localStorage.getItem('PJ010-successShown')) {
        onInactive(45000, () => {
          addLightbox();
        });
      }
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
    });
  },
  /* put outside functions in here */
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Creates the lightbox
     */
    lightbox: function lightbox() {
      const lightboxWrapper = document.createElement('div');
      lightboxWrapper.classList.add('PJ010-lightbox');
      lightboxWrapper.innerHTML = `<div class="PJ010-lightboxfade"></div>
      <div class="PJ010-lightbox_wrapper">
          <div class="PJ010-lightboxExit">&times;</div>
          <div class="PJ010-overlayRibbon">Our most popular Deal</div>
          <div class="PJ010-background">
            <div class="PJ010-innermessage">
              <div class="PJ010-title">We love a bargain. Our best deals come direct from us.</div>
              <p>33% off pizzas online</p>
              <h4>AALDN33</h4>
              <div class="PJ010-applyVoucher">Apply to my order</div>
            </div>
          </div>
      </div>`;
      document.body.appendChild(lightboxWrapper);
      document.querySelector('.PJ010-lightbox_wrapper').classList.add('PJ010-lightbox_active');
      document.querySelector('.PJ010-lightboxfade').classList.add('PJ010-lightbox-fade_active');

      localStorage.setItem('PJ010-lightbox-shown', 1);

      const lightboxClose = () => {
        document.querySelector('.PJ010-lightboxfade').classList.remove('PJ010-lightbox-fade_active');
        document.querySelector('.PJ010-lightbox_wrapper').classList.remove('PJ010-lightbox_active');
        localStorage.setItem('PJ010-lightboxClose', 1);
        events.send('PJ010 v1', 'Closed lightbox', 'PJ010 lightbox closed', { sendOnce: true });
      };

      const exit = document.querySelector('.PJ010-lightboxExit');
      const overlay = document.querySelector('.PJ010-lightboxfade');
      exit.addEventListener('click', () => {
        lightboxClose();
      });
      overlay.addEventListener('click', () => {
        lightboxClose();
      });
    },
    /**
     * @desc Adds the voucher in the background
     */
    applyVoucher: function applyVoucher() {
      const voucherText = document.getElementById('ctl00_cphBody_txtPromocode');
      voucherText.value = 'AALDN33';
      /* eslint-disable */
      __doPostBack('ctl00$cphBody$lbApplyCode','');
      /* eslint-enable */
    },
    /**
     * @desc voucher success
     */
    voucherSuccess: function voucherSuccess() {
      const basketColumn = document.querySelector('.leftColumn');
      const voucherAdded = document.createElement('div');
      voucherAdded.classList.add('PJ010-voucher_added');
      voucherAdded.innerHTML = '<p>This offer has been applied to your order</p>';
      basketColumn.insertBefore(voucherAdded, basketColumn.firstChild);
      localStorage.setItem('PJ010-successShown', 1);

      setTimeout(() => {
        voucherAdded.remove();
      }, 10000);
    },
  },
};

export default Experiment;
