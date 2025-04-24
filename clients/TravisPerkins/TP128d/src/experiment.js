import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{TP128d}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP128d',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      const priceWrap = bodyVar.querySelector('.tpInfoWrapper .prices_holder');
      const vatPrice = priceWrap.querySelector('.price_inc_vat_section .includedVAT').textContent;
      const exvatPrice = priceWrap.querySelector('.product_price_section .price_value').textContent;

      let exVAT;
      let incVAT;

      return {
        doc,
        bodyVar,
        priceWrap,
        vatPrice,
        exvatPrice,
        exVAT,
        incVAT,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.toggleVAT();
      components.checkDiscountPrices();
      components.perPackCheck();
      components.events();
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
        Exp.cache.priceWrap.insertAdjacentHTML('afterend', `
          <div class="TP128d_price_wrap">
            <div class="TP128d_ex-vat-price TP128d_active"><span>${Exp.cache.exvatPrice}</span></div>
            <div class="TP128d_vat-price"><span>${Exp.cache.vatPrice}</span></div>
            <div class="TP128d_toggle-wrap">
              <span>ex VAT</span>
              <div class="TP128d_toggle-innerwrap">
                <span class="TP128d_toggle-pin"></span>
              </div>
              <span>inc VAT</span>
            </div>
          </div>
        `);

        Exp.cache.exVAT = Exp.cache.bodyVar.querySelector('.TP128d_ex-vat-price');
        Exp.cache.incVAT = Exp.cache.bodyVar.querySelector('.TP128d_vat-price');
      },
      checkDiscountPrices() {
        pollerLite([
          '.product_price_section .TP021_rrp',
          '.price_inc_vat_section .TP021_rrp',
        ], () => {
          let wasExVAT = Exp.cache.priceWrap.querySelector('.product_price_section .TP021_rrp');
          let wasIncVAT = Exp.cache.priceWrap.querySelector('.price_inc_vat_section .TP021_rrp');

          wasExVAT = `<span class="TP128d_pre-price">${wasExVAT.textContent}</span>`;
          wasIncVAT = `<span class="TP128d_pre-price">${wasIncVAT.textContent}</span>`;

          Exp.cache.exVAT.insertAdjacentHTML('afterbegin', wasExVAT);
          Exp.cache.incVAT.insertAdjacentHTML('afterbegin', wasIncVAT);
        });
      },
      toggleVAT() {
         const togglePin = Exp.cache.bodyVar.querySelector('.TP128d_toggle-pin');

         togglePin.addEventListener('click', () => {
           events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on the VAT toggle', { sendOnce: true });
           if (togglePin.classList.contains('TP128d_active')) {
            togglePin.classList.remove('TP128d_active');
            Exp.cache.incVAT.classList.remove('TP128d_active');
            Exp.cache.exVAT.classList.add('TP128d_active');
           } else {
            togglePin.classList.add('TP128d_active');
            Exp.cache.incVAT.classList.add('TP128d_active');
            Exp.cache.exVAT.classList.remove('TP128d_active');
           }
         });
      },
      perPackCheck() {
        pollerLite([
          '.price_info_holder.uom_value',
        ], () => {
          const perPack = Exp.cache.priceWrap.querySelector('.price_info_holder.uom_value');
          Exp.cache.incVAT.insertAdjacentHTML('afterend', '<div class="TP128d_perpack">' + perPack.textContent + '</div>');
        });
      },
      events() {
        const addForDelivery = Exp.cache.doc.getElementById('addToCartButton');
        const addForCollection = Exp.cache.doc.getElementById('addForCollectButton');

        if (addForDelivery) {
          addForDelivery.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on Add for Delivery', { sendOnce: true });
          });
        }

        if (addForCollection) {
          addForCollection.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'Click', 'User clicked on Add for Collection', { sendOnce: true });
          });
        }
      },
    },
  };
  if (!document.body.classList.contains('TP128d')) {
    Exp.init();
  }
};

export default Run;
