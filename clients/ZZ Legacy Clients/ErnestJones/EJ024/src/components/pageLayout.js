import settings from '../settings';

export default () => {
  const id = settings.ID;

  /* Rearrange product overview */
  const productOverview = () => {
    const basketproduct = document.querySelectorAll('.product-summary');
    for (let index = 0; index < basketproduct.length; index += 1) {
      const element = basketproduct[index];

      // put price before image
      if (window.innerWidth < 1024) {
        if (element.querySelector('.product-summary__right')) {
          const productPrice = element.querySelector('.product-summary__right');
          const productImage = element.querySelector('.product-summary__left');
          productImage.insertAdjacentElement('afterend', productPrice);
        }
      }

      // move the remove button
      const removeButton = element.querySelector('.product-summary__remove-form');
      if (removeButton) {
        element.querySelector('.product-summary__right').appendChild(removeButton);
      }

      // add the stock if it matches the product sku and is in stock
      const productSkuText = element.querySelector('.product-summary__sku');
      const productData = window.digitalData.cart.item;
      if (productSkuText) {
        const productSkuNo = productSkuText.textContent.match(/\d+/g);
        [].forEach.call(productData, (data) => {
          const dataID = data.productInfo.productID;
          if (dataID === productSkuNo[0]) {
            const stockInfo = data.productInfo.stock;
            if (stockInfo !== 'no' && !element.querySelector(`.${id}-stock`)) {
              const stockAmount = document.createElement('div');
              stockAmount.classList.add(`${id}-stock`);
              stockAmount.innerHTML = 'In stock';
              element.querySelector('.product-summary__center .product-summary__content-wrapper').appendChild(stockAmount);
            }
          }
        });
      }
    }
  };
  const underBasketLinks = () => {
    const giftWrapBox = document.querySelector('.product-summary:last-child');

    const underBasketWrapperLinks = document.createElement('div');
    underBasketWrapperLinks.classList.add(`${id}-underBasket_links`);
    underBasketWrapperLinks.innerHTML = `
    <div class="${id}-link ${id}-giftWrap">Gift Wrap Order + £3</div>`;

    giftWrapBox.insertAdjacentElement('beforebegin', underBasketWrapperLinks);
  };

  const showGiftwrap = () => {
    const giftwrapLink = document.querySelector(`.${id}-underBasket_links .${id}-giftWrap`);
    const giftWrapBox = document.querySelector('.product-summary:last-child');
    giftWrapBox.classList.add(`${id}-giftwrap`);
    giftwrapLink.addEventListener('click', () => {
      if (giftWrapBox.classList.contains(`${id}-giftWrap_active`)) {
        giftWrapBox.classList.remove(`${id}-giftWrap_active`);
      } else {
        giftWrapBox.classList.add(`${id}-giftWrap_active`);
      }
    });
  };

  const voucherMessage = () => {
    const voucherApplied = document.querySelector('.product-summary__discount-description');
    if (voucherApplied) {
      document.querySelector('.page-title').insertAdjacentElement('afterend', voucherApplied);
    }
  };

  const v2Message = () => {
    const paymentOption = document.createElement('div');
    paymentOption.classList.add(`${id}-choosePayment`);
    paymentOption.innerHTML = '<span>Great Choice! Please choose the most suitable payment method to continue</span>';

    if (!document.querySelector('#ifcPaymentContainer')) {
      document.querySelector('.page-title').insertAdjacentElement('afterend', paymentOption);
    }
  };

  const addContinueShopping = () => {
    const continueShoppingLink = document.createElement('div');
    continueShoppingLink.classList.add(`${id}-continue_link`);
    continueShoppingLink.innerHTML = '<a href="/">Continue Shopping</a>';
    const topOfTable = document.querySelector('.basket-table');
    topOfTable.insertAdjacentElement('beforebegin', continueShoppingLink);
  };

  productOverview();
  underBasketLinks();
  showGiftwrap();
  voucherMessage();
  addContinueShopping();

  if (settings.VARIATION === '2') {
    v2Message();
  }
};
