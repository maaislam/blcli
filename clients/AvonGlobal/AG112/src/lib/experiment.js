import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { giftCheckbox } from './files/giftCheckbox';



export default () => {

  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  document.addEventListener("click", function (event) {
    event.stopPropagation();
    const { target } = event;
    //console.log(target);

    if (target.closest('.giftOnOrder')) {
      setTimeout(() => {

        if (
          document.querySelector('input#giftOnOrder').checked
        ) {
          fireEvent('Customer selects interacts with the tick box in the test');
        } else {
          fireEvent('Customer deselects the tick box in the test');

        }

      }, 500);

    }

    if (target.closest('.vi-btn--secondary') && target.closest('.ng-scope')) {
      fireEvent('User interacts with update bag cta');
    }
  })

  if (VARIATION == 'control') {
    return;
  }

  if (!document.querySelector(`.${ID}__gift-checbox`)) {
    document.querySelector('.Cart-ButtonsBottom')
      .insertAdjacentHTML('beforebegin', giftCheckbox(ID));
  }

};
