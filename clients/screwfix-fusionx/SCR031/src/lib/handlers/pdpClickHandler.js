import { fireEvent } from '../../../../../../core-files/services';
//import shared from '../../../../../../core-files/shared';

const pdpClickHandler = (event) => {
  //const { ID } = shared;
  const { target } = event;

  const hasDiscount = document.querySelector('[data-qaid="pdp-save-price"]');
  const discountText = hasDiscount ? 'a' : 'no';
  if (target.closest('[data-qaid="pdp-button-deliver"]')) {
    fireEvent(`User clicks on deliver button on PDP with ${discountText} discount`);
  } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
    fireEvent(`User clicks on deliver button on PDP with ${discountText} discount`);
  }
};

export default pdpClickHandler;
