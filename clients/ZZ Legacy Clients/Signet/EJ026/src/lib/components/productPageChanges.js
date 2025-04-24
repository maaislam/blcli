import settings from '../../lib/settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default () => {
  /**
   * Create the new review section
   */
  const addReviewLink = () => {
    const reviewStars = document.querySelector('.BVRRRatingNormalImage .BVImgOrSprite');
    const infoReview = document.querySelector('.ratings-images');
    const numberOfReviews = window.digitalData.product[0].productInfo.ratingCount;
    const newReviewContent = document.createElement('div');
    newReviewContent.classList.add(`${ID}-productReviews`);
    newReviewContent.innerHTML = `<div class="${ID}-reviewStars"><img src="${reviewStars.getAttribute('src')}"/></div><div class="${ID}-reviewText">See all <span>${numberOfReviews}</span> reviews</div>`;

    document.querySelector('.buying-info__pricing').insertAdjacentElement('afterend', newReviewContent);

    newReviewContent.addEventListener('click', () => {
      infoReview.querySelector('img').click();
    });
  };

  pollerLite(['.BVRRRatingNormalImage .BVImgOrSprite'], () => {
    addReviewLink();
  });

  /**
   * In stock message
   */
  const addInStockMessage = () => {
    const inStock = window.digitalData.product[0].productInfo.stock;
    if (inStock === 'yes') {
      const stockMessage = document.createElement('div');
      stockMessage.classList.add(`${settings.ID}-stockMessage`);
      stockMessage.innerHTML = '<span>In stock</span>';
      document.querySelector('.buying-info__pricing').appendChild(stockMessage);
    }
  };
  addInStockMessage();

  const addInStoreButton = () => {
    const storeButton = document.createElement('div');
    storeButton.classList.add(`${settings.ID}-storeAppointment`);
    storeButton.innerHTML = '<a href="/webstore/in-store-appointment.cdo?icid=ej-fn-appointment">Book an in-store appointment</a>';
    document.querySelector('.buying-buttons').insertAdjacentElement('afterend', storeButton);

    const buyButton = document.querySelector('.buying-buttons #buy');
    buyButton.value = 'Buy Now';
  };
  addInStoreButton();

  const changeFinanceMessage = () => {
    const basketItemLength = parseInt(document.querySelector('.basket-icon__counter').textContent, 10);
    const financeMessage = document.querySelector('.buying-buttons-ifc__message');
    const financeWrap = document.querySelector('.buying-buttons-ifc');
    if (financeMessage) {
      const price = financeMessage.textContent.match(/.+(£[\d\.]+).+/)[1];
      const newFinanceMessage = document.createElement('div');
      newFinanceMessage.classList.add(`${settings.ID}-financeMessage`);
      if (basketItemLength === 0) {
        newFinanceMessage.innerHTML = `Interest free credit available from <span>${price} per month</span><div class="${ID}-finance_tooltip"></div>`;
      } else {
        newFinanceMessage.innerHTML = `Interest free credit available from <span>${price} per month</span> (1 item only)<div class="${ID}-finance_tooltip"></div>`;
      }
      financeWrap.appendChild(newFinanceMessage);
    }
  };

  const financeTooltip = () => {
    const financeTool = document.createElement('div');
    financeTool.classList.add(`${ID}-finance_box`);
    financeTool.innerHTML = `
    <div class="${ID}-financeInfo">
      <span></span>
      When you shop online from Ernest Jones Limited you have the choice of applying for Interest Free Credit to purchase your item (subject to minimum spend of £300). This is only applicable to orders that contain 1 item. To apply for Interest Free Credit, please add the item to your basket and select this as your preferred payment option.
    </div>`;

    const financeWrap = document.querySelector('#js-ifc-modal');
    financeWrap.insertAdjacentElement('beforebegin', financeTool);

    // on click of the finance message
    document.querySelector(`.${ID}-financeMessage`).addEventListener('click', () => {
      if (financeTool.classList.contains(`${ID}-financeMessage_show`)) {
        financeTool.classList.remove(`${ID}-financeMessage_show`);
      } else {
        financeTool.classList.add(`${ID}-financeMessage_show`);
      }
    });

    financeTool.querySelector('span').addEventListener('click', () => {
      if (financeTool.classList.contains(`${ID}-financeMessage_show`)) {
        financeTool.classList.remove(`${ID}-financeMessage_show`);
      } else {
        financeTool.classList.add(`${ID}-financeMessage_show`);
      }
    });
  };

  const financeMessage = document.querySelector('.buying-buttons-ifc__message');
  if (financeMessage) {
    changeFinanceMessage();
    financeTooltip();
  }

  const moveCompareButton = () => {
    const compareButton = document.querySelector('.container.pdpContent .compare-wish');
    const footer = document.querySelector('.email-sign-up');
    footer.insertAdjacentElement('beforebegin', compareButton);
  };
  moveCompareButton();

  const makeSalePriceRed = () => {
    const wasPrice = document.querySelector('.buying-info__price .buying-info__price--was');
    const productPrice = document.querySelector('.buying-info__price--current');
    if (wasPrice) {
      productPrice.style = 'color: #dd213b';
    }
  };
  makeSalePriceRed();
};
