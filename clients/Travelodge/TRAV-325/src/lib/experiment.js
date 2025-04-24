/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { VARIATION } = shared;

const formatNumber = (num) => {
  if (num % 1 === 0) {
    return num.toFixed(2).replace(/\.00$/, '');
  } else {
    const number = num.toFixed(2);
    const [whole, decimal] = number.split('.');
    return `<span class="rate-int">${whole}</span><span class="rate-dec">${decimal === '00' ? '' : `.${decimal}`}</span>`;
  }
};

const reset = () => {
  // Get all cloned buttons
  const clonedButtons = document.querySelectorAll('button.cloned-btn');

  // Remove each cloned button
  clonedButtons.forEach((clonedBtn) => {
    clonedBtn.remove();
  });

  // Show the original radio buttons
  const radioButtons = document.querySelectorAll('button[data-room-rate]');
  radioButtons.forEach((radioButton) => {
    radioButton.style.display = '';
  });
};

const init = () => {
  //get rooms

  const rooms = document.querySelectorAll('.rateGroups');

  rooms.forEach((room) => {
    //get each radio button
    const radioButtons = room.querySelectorAll('button[data-room-rate]');
    //createa cloned version of each radio button

    //place cloned buttons underneath the original buttons
    radioButtons.forEach((radioButton, index) => {
      const clonedBtn = radioButton.cloneNode(true);

      const clonedBtnPriceText = clonedBtn.textContent.trim();
      const clonedBtnPriceNum = parseFloat(clonedBtnPriceText.replace(/[£,]/g, ''));
      clonedBtn.setAttribute('data-price', clonedBtnPriceNum);
      radioButton.after(clonedBtn);
      //add a class to cloned btn
      clonedBtn.classList.add('cloned-btn');
      //hide original btns
      radioButton.style.display = 'none';

      const clonedBtnClickHandler = ({ target }) => {
        {
          if (!target.closest('.cloned-btn')) return;
          //get the original radio button
          const originalRadioButton = radioButtons[index];
          //click the original radio button
          originalRadioButton.click();

          //getPice from original btn

          const priceText = originalRadioButton.textContent.trim();
          const priceNum = parseFloat(priceText.replace(/[£,]/g, ''));

          //get the price difference for each cloned btn

          const clonedBtns = room.querySelectorAll('button[data-price]');
          clonedBtns.forEach((clonedBtn) => {
            const clonedBtnPrice = parseFloat(clonedBtn.getAttribute('data-price'));
            const priceDifference = clonedBtnPrice - priceNum;
            //console.log('🚀 ~ clonedBtns.forEach ~ priceDifference:', priceDifference, clonedBtn);

            const priceDifferenceText = `${priceDifference < 0 ? '-' : '+'}£${formatNumber(Math.abs(priceDifference))}`;

            clonedBtn.innerHTML = `${priceDifference === 0 ? `£${formatNumber(clonedBtnPrice)}` : priceDifferenceText}`;
          });
        }
      };

      clonedBtn.removeEventListener('click', clonedBtnClickHandler);

      clonedBtn.addEventListener('click', clonedBtnClickHandler);
    });
  });

  setTimeout(() => {
    document.querySelectorAll('.rateGroups').forEach((group) => {
      group.querySelector('.cloned-btn')?.click();
    });
  }, 500);
};

export default () => {
  setup();
  fireEvent('Conditions Met');
  setTimeout(init, 0);

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    //console.log('🚀 ~ document.body.addEventListener ~ target:', target);
    if (target.closest('[data-room-rate-type-name="Flexible"]')) {
      fireEvent('user clicks on flex rate');
    } else if (target.closest('[data-room-rate-type-name="Saver"]')) {
      fireEvent('user clicks on saver rate');
    } else if (target.closest('.bookNow')) {
      fireEvent('user clicks on proceed to extras');
    }
  });

  const bedSelects = document.querySelectorAll('.js-switchExtraRooms');

  bedSelects.forEach((bedSelect) => {
    bedSelect.addEventListener('change', () => {
      //console.log('🚀 ~ bedSelect.addEventListener ~ change:');
      reset();
      setTimeout(init, 0);
    });
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
