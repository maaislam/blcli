import settings from '../settings';
import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  const id = settings.ID;

  const orderSummaryBox = () => {
    const summaryBox = document.createElement('div');
    summaryBox.classList.add(`${id}-summaryBox`);
    summaryBox.innerHTML = `
    <div class="${id}-subtotal">Subtotal: <span></span></div>
    <div class="${id}-delivery">
      <div class="${id}-delivery_price">Delivery: <span></span></div>
    </div>
    <div class="${id}-deliveryDate">
      <div class="${id}-delivery_Date">Estimated Delivery date: <span></span></div>
    </div>
    <div class="${id}-promoCode">
      <div class="${id}-promo_code">Promo Code: <span></span></div>
    </div>
    <div class="${id}-giftWrapping">
      <div class="${id}-gift_price">Gift wrapping: <span></span></div>
    </div>
    <div class="${id}-totalBox"></div>
    <div class="${id}-checkout_CTA"></div>`;

    document.querySelector('.basket-table').insertAdjacentElement('afterend', summaryBox);

    const orderSummary = document.querySelector('.order-summary__container');
    document.querySelector(`.${id}-totalBox`).appendChild(orderSummary);
  };
  orderSummaryBox();

  const deliveryDate = () => {
    const estimatedData = window.digitalData.cart.item;
    for (let index = 0; index < estimatedData.length; index += 1) {
      const element = estimatedData[index];
      if (element.productInfo.estimatedDelivery) {
        const newDate = new Date(element.productInfo.estimatedDelivery);
        const formattedDate = newDate.toJSON().slice(0, 10)
          .split('-')
          .reverse()
          .join('/');

        document.querySelector(`.${id}-delivery_Date span`).textContent = formattedDate;
      }
    }
  };
  if (document.querySelectorAll('.product-summary').length <= 3) {
    /* eslint-disable */
    deliveryDate();
    /* eslint-enable */
  } else {
    document.querySelector(`.${id}-deliveryDate`).style.display = 'none';
  }

  const addPricesToNewBox = () => {
    const subtotalBox = document.querySelector(`.${id}-subtotal`);
    const subtotalPrice = document.querySelector('.order-summary__total-value').textContent;
    subtotalBox.querySelector('span').textContent = subtotalPrice;

    const newDeliveryPriceBox = document.querySelector(`.${id}-delivery_price`);
    const promoPriceBox = document.querySelector(`.${id}-promo_code`);
    const allValues = document.querySelectorAll('.order-summary__item-value');
    for (let index = 0; index < allValues.length; index += 1) {
      const element = allValues[index];
      if (element.textContent.indexOf('-') > -1) {
        promoPriceBox.querySelector('span').textContent = element.textContent;
        promoPriceBox.parentNode.classList.add(`${id}-hasPromo`);
      }
      newDeliveryPriceBox.querySelector('span').textContent = element.textContent;
    }
  };
  addPricesToNewBox();

  const checkoutButtons = () => {
    const checkoutButtonsBottom = document.getElementById('lower-button-group');
    document.querySelector(`.${id}-checkout_CTA`).appendChild(checkoutButtonsBottom);

    // add card payment images
    const cards = [
      'https://service.maxymiser.net/cm/images-us/1/1/2/B5EF6E0DFFDC1EF9F481F0FDFDEED33506EF58680EFDF3A501C4354C8875761C/ernestjones-co-uk/EJ024---Basket-Iteration/icon-visa.gif',
      'https://service.maxymiser.net/cm/images-us/1/1/2/E05EF3FE54DC5517F41EE85CCF4811062BAA4DFC9E847D564514E85307BB2924/ernestjones-co-uk/EJ024---Basket-Iteration/icon-visa-electron.gif',
      'https://service.maxymiser.net/cm/images-us/1/1/2/D8BEECBE7B367086599D648B2478A9947776FEE2990E08CFCDBF1CB2A4C3CEAD/ernestjones-co-uk/EJ024---Basket-Iteration/icon-mastercard.gif',
      'https://service.maxymiser.net/cm/images-us/1/1/2/A70F89F4EC0F1A096D6A75AAB21A21D64A4DD020805A3095DF42775C9257E0DB/ernestjones-co-uk/EJ024---Basket-Iteration/icon-maestro.gif',
      'https://service.maxymiser.net/cm/images-us/1/1/2/E02C301691BA6153CEE12ED1E6663077E3045833E5287BE97619B9667BB666E4/ernestjones-co-uk/EJ024---Basket-Iteration/icon-american-express.gif',
    ];

    const cardPaymentWrapper = document.createElement('div');
    cardPaymentWrapper.classList.add(`${id}-cardPayment_wrap`);
    document.querySelector('#lower-button-group .basket__cta-form').insertAdjacentElement('afterend', cardPaymentWrapper);

    for (let index = 0; index < cards.length; index += 1) {
      const element = cards[index];
      const cardType = document.createElement('div');
      cardType.classList.add(`${id}-card-type`);
      cardType.style = `background-image: url('${element}')`;

      document.querySelector(`.${id}-cardPayment_wrap`).appendChild(cardType);
    }
  };
  checkoutButtons();

  const financeBox = () => {
    const financeBoxSummary = document.querySelector('#ifcPaymentContainer');
    if (financeBoxSummary) {
      document.querySelector('.page-title').insertAdjacentElement('afterend', financeBoxSummary);
      document.querySelector(`.${id}-cardPayment_wrap`).remove();

      const financeSummaryInner = document.querySelector('#ifcPaymentPlan');
      financeSummaryInner.querySelector('caption').innerHTML = '<p><span>0%</span>You have selected to pay with 0% Interest Free Credit</p>';
    }
  };
  financeBox();

  const giftWrappingPrice = () => {
    const giftWrapperSelected = document.querySelector('.order-summary__item-value.fs-hide');
    const giftWrapperBox = document.querySelector(`.${id}-giftWrap`);
    const newGiftWrap = document.querySelector(`.${id}-giftWrapping`);
    if (giftWrapperSelected) {
      newGiftWrap.classList.add(`${id}-giftWrappingPrice_show`);
      newGiftWrap.querySelector(`.${id}-gift_price span`).textContent = giftWrapperSelected.textContent;
      giftWrapperBox.click();
    } else {
      newGiftWrap.classList.remove(`${id}-giftWrappingPrice_show`);
    }
  };
  pollerLite([`.${id}-giftwrap`], () => {
    giftWrappingPrice();
  });
};
