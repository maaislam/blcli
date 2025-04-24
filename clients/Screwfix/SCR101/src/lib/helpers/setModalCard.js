import { pollerLite } from '../../../../../../lib/utils';
import modalCard from '../components/modalCard';
import addFreeProduct from './addFreeProduct';
import removeFreeProduct from './removeFreeProduct';

const setModalCard = (ID, quantity) => {
  pollerLite(['[data-qaid="promotion-content"]'], () => {
    const promotionContent = document.querySelector('[data-qaid="promotion-content"]');

    const promoCheckbox = promotionContent.querySelector('[for="checkbox_promoCheckbox"]');
    const controlPromoCheckbox = document.querySelector('#checkbox_promoCheckbox');

    if (controlPromoCheckbox.checked) {
      promoCheckbox.click();
    }

    promotionContent.classList.add(`${ID}__hide`);

    if (!document.querySelector(`.${ID}__modalCard`)) {
      promotionContent.insertAdjacentHTML('afterend', modalCard(ID, quantity));
    }

    const checkBoxElem = document.querySelector(`.${ID}__modalCard .${ID}__checkbox`);
    const checkBoxContainerElem = document.querySelector(`.${ID}__modalCard .${ID}__checkbox-container`);
    const claimOfferMsg = document.querySelector(`.${ID}__modalCard .${ID}__offerContainer`);
    const prdQty = quantity || 1;
    const DELAY = 500;

    const checkboxLabel = document.querySelector(`.${ID}__modalCard .${ID}__checkbox-container .checkbox-label`);

    checkBoxElem.addEventListener('change', () => {
      if (checkBoxElem.checked) {
        addFreeProduct(ID, checkBoxContainerElem, prdQty);
        claimOfferMsg.classList.add(`${ID}__invisible`);

        //update label
        checkboxLabel.innerHTML = `You’ve added ${quantity} Flomasta TRV <span>(602HN)</span> to the basket`;
      } else {
        removeFreeProduct(ID, checkBoxContainerElem, prdQty);
        claimOfferMsg.classList.remove(`${ID}__invisible`);
        //update label
        checkboxLabel.innerHTML = `Add ${quantity} Flomasta TRV <span>(602HN)</span> to the basket`;
      }
    });

    if (window.bundleBtnClick && !checkBoxElem.checked) {
      checkBoxElem.checked = true;
      window.bundleBtnClick = false;

      claimOfferMsg.classList.add(`${ID}__invisible`);
    } else if (window.bundleBtnClick && checkBoxElem.checked) {
      window.bundleBtnClick = false;

      claimOfferMsg.classList.add(`${ID}__invisible`);
    } else if (!window.bundleBtnClick && checkBoxElem.checked) {
      claimOfferMsg.classList.add(`${ID}__invisible`);
    } else if (!window.bundleBtnClick && !checkBoxElem.checked) {
      claimOfferMsg.classList.remove(`${ID}__invisible`);
    }

    setTimeout(() => {
      if (checkBoxElem.checked) {
        addFreeProduct(ID, checkBoxContainerElem, prdQty);
      }
    }, DELAY);
  });
};

export default setModalCard;
