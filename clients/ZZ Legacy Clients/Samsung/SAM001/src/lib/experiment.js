/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const init = (mutation) => {
  setup();

  const cartPage = document.querySelector('body');
  const cartContainer = document.querySelector('.cart-page-container');
  const freeDelMsg = document.querySelector('.free-delivery-text');
  const cartSummaryWrapper = document.querySelector('.cart-summary');
  const rewardsInfo = document.querySelector('.rewards-benefits-info.payment-mode-info');

  cartPage.classList.add(`${ID}__cart--page`);
  cartContainer.classList.add(`${ID}__cart--container`);
  freeDelMsg.classList.add(`${ID}__free-delivery`);
  cartSummaryWrapper.classList.add(`${ID}__cart--summary-wrapper`);
  rewardsInfo.classList.add(`${ID}__rewards--info`);

  cartSummaryWrapper.querySelectorAll(`.${ID}__rewards--info`).forEach((item) => {
    item.remove();
  });
  cartSummaryWrapper.append(rewardsInfo);

  const positionFreeDelMsg = () => {
    const msgContainer = document.querySelector(`.${ID}__free-delivery`).closest('.yComponentWrapper');
    const newBlock = document.querySelector('.delivery-block').closest('.yCmsContentSlot');
    newBlock.prepend(msgContainer);
  };

  const reOrderCartTotals = () => {
    const cartRows = document.querySelector(`.${ID}__cart--container .cart-totals`).children;
    [...cartRows].forEach((cartRow, index) => {
      cartRow.classList.add(`${ID}__cart--row-${index + 1}`);
    });
  };

  const addMinus = () => {
    if (document.querySelector(`.${ID}__minus--added`)) {
      return;
    }
    const discountContainer = document.querySelector(`.${ID}__cart--row-9 > div.total-right-value`);
    if (discountContainer) {
      discountContainer.classList.add(`${ID}__minus--added`);
      discountContainer.innerText = '-' + discountContainer.innerText;
    }
  };

  const checkFreeGift = () => {
    const productRows = document.querySelectorAll('[id^="product-uid"]');

    productRows.forEach((row) => {
      const hasDiscount = !!row.querySelector('.item-discount-price');
      const isFreeGift = row.querySelector('.item-price').innerText.trim() === 'GRATIS';
      const grandTotal = document.querySelector(`.${ID}__cart--row-6`);
      const freeDel = document.querySelector(`.${ID}__cart--row-4`);
      if (!hasDiscount && !isFreeGift) {
        grandTotal.classList.add(`${ID}__no-offer`);
        if (freeDel.innerText.trim().indexOf('Gratis') !== -1) {
          freeDel.classList.add(`${ID}__no-offer`);
        } else {
          document.querySelector(`.${ID}__cart--row-5`).classList.add(`${ID}__no-offer`);
        }
        return;
      }
      grandTotal.classList.remove(`${ID}__no-offer`);
      freeDel.classList.remove(`${ID}__no-offer`);
      document.querySelector(`.${ID}__cart--row-5`).classList.remove(`${ID}__no-offer`);
      const itemPriceBlock = row.querySelector('.item-price');
      itemPriceBlock.classList.add(`${ID}__color-discount`);

      if (hasDiscount) {
        row.querySelector(`.${ID}__prev-price`)?.remove();
        const prevPrice = parseFloat(row.getAttribute('data-modelprice')) * parseFloat(row.getAttribute('data-modelunit'));
        const discountBlock = row.querySelector('.item-discount-price');
        const discountAmount = discountBlock.innerText;
        const discountTextBlock = row.querySelector('.item-discount-text');
        const htmlStr = `<span style="display:block; text-decoration-line: line-through; color:#000" class="${ID}__prev-price">€ ${prevPrice},-</span>`;
        const htmlStrDisc = `<span class="${ID}__disc-text ${ID}__color-discount">Je bespaart ${
          discountAmount.split('-')[1]
        }</span>`;
        discountBlock.classList.add(`${ID}__hide`);
        itemPriceBlock.insertAdjacentHTML('afterbegin', htmlStr);
        discountTextBlock.innerHTML = htmlStrDisc;
      }

      if (isFreeGift) {
        row.querySelector(`.${ID}__freegift`)?.closest('.col-xs-12').remove();
        const giftLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4.2449 0.891803C3.70068 0.891803 3.26531 1.31148 3.26531 1.83607C3.26531 2.09836 3.37415 2.36066 3.59184 2.57049H7.18367C6.58503 2.15082 6.04082 1.78361 5.55102 1.46885L5.4966 1.41639C5.33333 1.31148 5.17007 1.20656 5.0068 1.1541L4.95238 1.10164C4.89796 1.04918 4.84354 1.04918 4.84354 1.04918L4.78912 0.996722C4.57143 0.944263 4.40816 0.891803 4.2449 0.891803ZM11.7551 0.891803C11.5918 0.891803 11.4286 0.944263 11.2653 0.996722H11.2109C11.2109 0.996722 11.1565 1.04918 11.0476 1.10164C10.9388 1.1541 10.7755 1.25902 10.5578 1.36393L10.5034 1.41639C10.0136 1.73115 9.46939 2.09836 8.81633 2.57049H12.4082C12.6258 2.41312 12.7347 2.15082 12.7347 1.83607C12.7347 1.36393 12.2993 0.891803 11.7551 0.891803ZM15.0748 3.51475H10.3946V6.71475H15.0748V3.51475ZM9.46939 3.51475H6.53061V6.71475H9.46939V3.51475ZM5.55102 3.51475H0.92517V6.71475H5.60544V3.51475H5.55102ZM13.551 7.65902H10.449V15.1607H13.551V7.65902ZM9.46939 7.65902H6.53061V15.1607H9.46939V7.65902ZM5.55102 7.65902H2.44898V15.1607H5.55102V7.65902ZM11.7551 0C12.8435 0 13.7143 0.839344 13.7143 1.88852C13.7143 2.15082 13.6599 2.36066 13.551 2.62295H15.3469C15.7279 2.62295 16 2.88525 16 3.25246V3.30492V6.97705C16 7.34426 15.7279 7.60656 15.3469 7.60656H15.2925H14.5306V15.3705C14.5306 15.7377 14.2585 16 13.8776 16H13.8231H2.17687C1.79592 16 1.52381 15.7377 1.52381 15.3705V15.318V7.65902H0.653061C0.272109 7.65902 0 7.39672 0 7.02951V6.97705V3.25246C0 2.88525 0.272109 2.62295 0.653061 2.62295H0.707483H2.5034C2.39456 2.41312 2.34014 2.15082 2.34014 1.88852C2.34014 0.839344 3.21088 0 4.29932 0C4.62585 0 4.95238 0.104918 5.22449 0.209836H5.27891L5.33333 0.262295L5.38775 0.314754C5.55102 0.367213 5.71428 0.52459 5.98639 0.629508L6.04082 0.681967C6.58503 1.04918 7.29252 1.46885 8.05442 2.0459L8 2.09836L8.27211 1.94098C8.92517 1.46885 9.52381 1.10164 10.0136 0.786886L10.1224 0.734426C10.449 0.52459 10.7211 0.419672 10.8299 0.314754L10.8844 0.262295H10.9388C11.2109 0.104918 11.483 0.0524592 11.8095 0.0524592L11.7551 0Z" fill="white"/>
        </svg>`;
        const htmlStr = `<div class="${ID}__hide col-xs-12"><div class="${ID}__freegift"><div class="logo">${giftLogo}</div><div class="text">Gratis geschenk</div></div></div>`;
        row.insertAdjacentHTML('afterbegin', htmlStr);
      }
    });
  };
  positionFreeDelMsg();
  reOrderCartTotals();

  //quick fix
  const cartTotals = document.querySelector(`.${ID}__cart--summary-wrapper .cart-totals`);
  if (cartTotals) {
    const rightVal = cartTotals.querySelectorAll('.total-right-value');
    const infoMsg = cartTotals.querySelectorAll('.info-message');
    rightVal.forEach((item) => {
      console.log(item);
      if (item.innerText.trim() === 'Gratis') {
        item.classList.add(`${ID}__color-discount-right`);
      } else if (item.classList.contains('grand-total')) {
        item.closest('.row.totals').classList.add(`${ID}__cart--row-grand-total`);
      }
    });
    infoMsg.forEach((item) => {
      const lastItemIndx = infoMsg.length - 1;
      const rightValue = infoMsg[lastItemIndx].closest('.row');
      if (rightValue && rightValue.innerText.indexOf('Totaal voordeel') !== -1) {
        rightValue.querySelector('.total-right-value').classList.add(`${ID}__color-discount-right`);
        // renderTotalPlusVat(rightValue.querySelector('.total-right-value'));
      }
    });
  }
  document.querySelector(`[data-an-la="proceed to checkout"]`).style.marginBottom = '34px';
  //addMinus();
  checkFreeGift();
};

export default () => {
  // Poll and re-run init
  setup();

  if (location.pathname === '/nl/checkout/multi/delivery-address/add' && document.referrer.indexOf('/nl/cart') !== -1) {
    fireEvent('User clicked through to the checkout', true);
    return;
  }
  fireEvent('Conditions Met');

  const checkFreeGift = () => {
    const productRows = document.querySelectorAll('[id^="product-uid"]');

    productRows.forEach((row) => {
      const hasDiscount = !!row.querySelector('.item-discount-price');
      const isFreeGift = row.querySelector('.item-price').innerText.trim() === 'GRATIS';

      if (!hasDiscount && !isFreeGift) {
        return;
      }
      fireEvent('User sees promotional information', true);
      if (hasDiscount) {
        fireEvent('User sees discount message', true);
      }
      if (isFreeGift) {
        fireEvent('User sees free product message', true);
      }
    });
  };
  setTimeout(() => {
    checkFreeGift();
  }, 1000);

  if (VARIATION == 'control') {
    return;
  }

  pollerLite(['.cart-page-container'], () => {
    setup();
    setTimeout(() => {
      init();
    }, 1000);
    const appContainer = document.querySelector('.cart-page-container .cart-product-list');

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        setTimeout(() => {
          init();
        }, 1000);
      });
    });

    const config = {
      childList: true,
      attributes: true,
    };

    observer.observe(appContainer, config);
  });
};
