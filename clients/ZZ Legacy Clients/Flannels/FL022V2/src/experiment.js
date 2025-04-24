import { fullStory, events } from '../../../../lib/utils';

/**
 * {{FL022}} - {{Test Description}}
 */
const Run = () => {
  const $ = window.jQuery;
  let slideQ = false;
  let formRequest = false;
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL022',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;
      /* eslint-disable-next-line */
      let formData = null;

      return {
        doc,
        bodyVar,
        formData,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.revealToggle();
      components.submitForm();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'Error', 'User got a voucher error', { sendOnce: true });
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder() {
        Exp.cache.bodyVar.querySelector('.col-xs-12.ExitLinks').insertAdjacentHTML(
          'afterend',
          `<div class="FL022_form-voucher">
            <a class="FL022_reveal-btn">Enter voucher code</a>
            <div class="FL022_form-reveal">
              <input type="text" />
              <a class="FL022_submit">Apply</a>
            </div>
          </div>`,
        );
      },
      revealToggle() {
        const revealBtn = Exp.cache.bodyVar.querySelector('.FL022_reveal-btn');
        const revealSection = Exp.cache.bodyVar.querySelector('.FL022_form-reveal');

        revealBtn.addEventListener('click', () => {
          if (slideQ === false) {
            slideQ = true;
            revealSection.classList.toggle('FL022_slide');
            Exp.components.ajaxForm();
            setTimeout(() => {
              slideQ = false;
            }, 400);
          }
        });
      },
      submitForm() {
        const submitBtn = Exp.cache.bodyVar.querySelector('.FL022_submit');
        const input = Exp.cache.bodyVar.querySelector('.FL022_form-reveal input');

        submitBtn.addEventListener('click', () => {
          const val = input.value;
          if (val) {
            Exp.components.postVoucher(val);
          }
        });
      },
      ajaxForm() {
        if (formRequest === false) {
          const URL = 'https://www.flannels.com/checkout/usevoucher';
          formRequest = true;
          $.ajax({
            type: 'GET',
            url: URL,
            success: (data) => {
              const div = Exp.cache.doc.createElement('div');
              div.insertAdjacentHTML('afterbegin', data);

              const formRef = div.querySelector('#Form');
              const action = formRef.getAttribute('action');
              const enctype = formRef.getAttribute('enctype');
              const aspNet = formRef.querySelector('.aspNetHidden:first-child').cloneNode(true);
              const inputHidden = formRef.querySelector('input[id*="PromoCodeApplication_txtCode"]').cloneNode(true);
              const inputHidden2 = formRef.querySelector('input[name*="PromoCodeApplication$btnApply"]').cloneNode(true);

              Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
                <form class="FL022_form" method="post" action="${action}" enctype="${enctype}">
                </form>
              `);

              Exp.cache.formData = Exp.cache.bodyVar.querySelector('.FL022_form');
              Exp.cache.formData.appendChild(aspNet);
              Exp.cache.formData.appendChild(inputHidden);
              Exp.cache.formData.appendChild(inputHidden2);
            },
          });
        }
      },
      postVoucher(val) {
        const hiddenVal = Exp.cache.bodyVar.querySelector('input[id*="PromoCodeApplication_txtCode"]');
        const formPost = new FormData(Exp.cache.formData);

        hiddenVal.value = val;

        $.ajax({
          type: 'post',
          data: formPost,
          success: (data) => {
            const div = Exp.cache.doc.createElement('div');
            div.insertAdjacentHTML('afterbegin', data);
          },
          cache: false,
          contentType: false,
          processData: false,
          url: '/checkout/usevoucher',
        });
      },
    },
  };

  Exp.init();
};

export default Run;
