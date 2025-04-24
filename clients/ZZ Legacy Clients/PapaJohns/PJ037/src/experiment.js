import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TestID}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PJ037',
      VARIATION: '1',
    },
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      return {
        doc,
        bodyVar,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);

      /* eslint-disable */
      window.prm.add_endRequest(function (sender, error) {
        const target = sender._postBackSettings.asyncTarget;
      try {
        if (target === 'ctl00$_objHeader$lbOneClickCheckoutMobile'){
          services.tracking();
          components.contentBuilder();
          components.basketItems();
          components.addPaymentText();
          components.changeCtaText();
        }
      } catch (e) { 
      }
     });
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
      contentBuilder: () => {
        const newTitle = 'Get pizza faster with Speedipay';
        const title = Exp.cache.doc.querySelector('#ctl00__objHeader__objOneClickPopup_updConfirmPay .title');
        const closePay = title.querySelector('a').outerHTML;
        title.innerHTML = `<div>${newTitle}${closePay}</div>`;
      },
      /**
       * @desc recreate the basket items
       */
      basketItems: () => {
        const basketItems = Exp.cache.doc.querySelector('.fancyContainer.basket-cont-m .intBasket').outerHTML;
        Exp.cache.doc.querySelector('.ocBasketCont .bx-wrapper').insertAdjacentHTML('beforebegin', basketItems);
        
        if (Exp.cache.doc.querySelector('.ocBasketCont #ctl00__objHeader_trDiscount')) {
          const basketDiscount = Exp.cache.doc.querySelector('.ocBasketCont #ctl00__objHeader_trDiscount').nextElementSibling;
          basketDiscount.classList.add('PJ037-code');
          const discountNoCode = basketDiscount.querySelector('.item').textContent.replace(/\(.*?\)/g,'').trim();
          basketDiscount.querySelector('.item').textContent = discountNoCode;
        }
        // remove IDs
        const textFields = Exp.cache.doc.querySelectorAll('.ocBasketCont .intBasket .txtField');
        
        for (let index = 0; index < textFields.length; index += 1) {
          const element = textFields[index];
          element.removeAttribute('id');
          
        }
      },
      changeCtaText: () => {
        const ctaText = Exp.cache.doc.querySelector('.alignRight.amountCharged');
        const newMessage = 'By clicking to proceed you will be taken to payment gateway';
        ctaText.textContent = newMessage;
      },
      addPaymentText: () => {
        const newPaymentTitle = document.createElement('div');
        newPaymentTitle.classList.add('PJ037-payment_text');
        newPaymentTitle.innerHTML = 'Checkout even quicker with our trusted payment gateways';

        document.querySelector('.paymentOptions').insertAdjacentElement('beforebegin', newPaymentTitle);
      }
    },
  };

  Exp.init();
};

export default Run;
