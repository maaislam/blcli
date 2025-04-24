import shared from '../../../../../../core-files/shared';
import discount from '../components/discount';
import { getPercentageDiscount } from './utils';

const plpChanges = () => {
  const { ID } = shared;
  const productCards = document.querySelectorAll('[data-qaid="product-grid"] > div');

  productCards.forEach((card) => {
    const waspriceWrapper = card.querySelector('[data-qaid="productCard-was-price"]');

    if (!waspriceWrapper) {
      card.classList.add(`${ID}__no-discount-card`);
      return;
    }

    const controlDiscountMsg = waspriceWrapper.querySelector('.bjo_G0');
    const wasPrice = waspriceWrapper.querySelector('.AEeIwz');
    const waspriceText = wasPrice.innerText.split(' ')[1];
    const discountPercentage = getPercentageDiscount(controlDiscountMsg.innerText);
    const anchorElem = card.querySelector('[data-qaid="price"]');

    card.classList.add(`${ID}__discount-card`);

    wasPrice.innerText = waspriceText;
    wasPrice.classList.add(`${ID}__wasprice`);

    controlDiscountMsg.classList.add(`${ID}__hide`);
    anchorElem.insertAdjacentHTML('beforebegin', discount(ID, discountPercentage));
  });
};
export default plpChanges;
