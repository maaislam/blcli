import { observer } from '../../../../../../lib/uc-lib';
import { removeBasket, showBasket } from './hideBasket';
import proceedToCheckout from './proceedToCheckout';
import settings from '../settings';

export default () => {
  const addToBag = document.querySelector('.addToCartButton');
  const currentProcessingButton = document.querySelector('.background-overlay .loading-overlay');
  const addTocartForm = document.querySelector('#addToCartForm');
  const addToBagIcon = document.querySelector('.basket_badge.badge');
  const miniBag = document.querySelector('#iconBag');


  // When process button is hidden show the added to bag button
  const addedToBagButton = () => {
    addToBag.classList.remove('MP145-processing');
    addToBag.classList.add('MP145-added');
    const newAddedButton = document.createElement('div');
    newAddedButton.classList.add('MP145-added_button');
    newAddedButton.innerHTML = '<span>Added to bag</span>';

    addTocartForm.appendChild(newAddedButton);
    addToBagIcon.style = 'animation: MP145-shake 0.82s cubic-bezier(.36,.07,.19,.97) both';
    setTimeout(() => {
      newAddedButton.remove();
      addToBag.classList.remove('MP145-added');
      addToBagIcon.removeAttribute('style');

      if (settings.VARIATION === '2') {
        proceedToCheckout();
      }
    }, 4000);
  };

  // Loading button to be shown on add to bag click
  const processingButton = () => {
    currentProcessingButton.classList.add('MP145-processing_current');
    addToBag.classList.add('MP145-processing');
    const newProcessingButton = document.createElement('div');
    newProcessingButton.classList.add('MP145-processing_button');
    newProcessingButton.innerHTML = '<span>Processing</span>';

    addTocartForm.appendChild(newProcessingButton);

    setTimeout(() => {
      newProcessingButton.remove();
      addedToBagButton();
      currentProcessingButton.classList.remove('MP145-processing_current');
    }, 2000);
  };

  addToBag.addEventListener('click', () => {
    processingButton();
    observer.connect(addTocartForm, () => {
      removeBasket();
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
    });
  });

  // show the basket when the mini bag is clicked
  miniBag.addEventListener('click', () => {
    showBasket();
  });
};
