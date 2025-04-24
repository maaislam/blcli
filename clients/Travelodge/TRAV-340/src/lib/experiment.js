import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const cancelSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M11.339 14.5715C12.2611 12.9744 13.607 11.6634 15.2277 10.7834C16.8484 9.90338 18.6809 9.48872 20.5226 9.58524C22.3643 9.68176 24.1435 10.2857 25.6633 11.3303C27.1832 12.3749 28.3846 13.8194 29.1347 15.5042M9.03906 11.4657L9.95083 15.4152C10.1061 16.0878 10.7773 16.5072 11.45 16.3519L15.3994 15.4402M28.6596 24.5714C27.7375 26.1685 26.3917 27.4796 24.7709 28.3596C23.1502 29.2396 21.3177 29.6542 19.476 29.5577C17.6343 29.4612 15.8551 28.8572 14.3353 27.8127C12.8154 26.7681 11.614 25.3235 10.8639 23.6388M30.9596 27.6772L30.0478 23.7278C29.8925 23.0551 29.2213 22.6357 28.5486 22.791L24.5992 23.7028" stroke="#2B3F6C" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const refundSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
  <path d="M18.75 4.125C18.75 5.85089 14.8325 7.25 10 7.25C5.16751 7.25 1.25 5.85089 1.25 4.125M18.75 4.125C18.75 2.39911 14.8325 1 10 1C5.16751 1 1.25 2.39911 1.25 4.125M18.75 4.125V19.125C18.75 20.8509 14.8325 22.25 10 22.25C5.16751 22.25 1.25 20.8509 1.25 19.125V4.125M18.75 9.125C18.75 10.8509 14.8325 12.25 10 12.25C5.16751 12.25 1.25 10.8509 1.25 9.125M18.75 14.125C18.75 15.8509 14.8325 17.25 10 17.25C5.16751 17.25 1.25 15.8509 1.25 14.125" stroke="#2B3F6C" stroke-width="1.875"/>
</svg>
`;

const lockSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
  <rect x="1" y="9.25" width="20" height="15" rx="5" stroke="#2B3F6C" stroke-width="1.875"/>
  <path d="M11 18L11 15.5" stroke="#2B3F6C" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.3334 4.42786C14.6294 4.85271 15.2137 4.95719 15.6385 4.66123C16.0634 4.36528 16.1679 3.78095 15.8719 3.35611L14.3334 4.42786ZM6.34774 3.06078C6.02603 3.46647 6.09411 4.05614 6.4998 4.37786C6.90549 4.69957 7.49516 4.63149 7.81687 4.2258L6.34774 3.06078ZM6.9375 9.25V6.75H5.0625V9.25H6.9375ZM6.9375 6.75C6.9375 4.50634 8.75634 2.6875 11 2.6875V0.8125C7.72081 0.8125 5.0625 3.47081 5.0625 6.75H6.9375ZM15.8719 3.35611C15.1638 2.33962 14.1555 1.57008 12.9882 1.15526L12.3603 2.92202C13.159 3.20584 13.8489 3.73237 14.3334 4.42786L15.8719 3.35611ZM12.9882 1.15526C11.8209 0.740445 10.553 0.701132 9.36229 1.04283L9.87946 2.84509C10.6942 2.6113 11.5616 2.6382 12.3603 2.92202L12.9882 1.15526ZM9.36229 1.04283C8.17153 1.38453 7.11747 2.09012 6.34774 3.06078L7.81687 4.2258C8.34353 3.56166 9.06473 3.07889 9.87946 2.84509L9.36229 1.04283Z" fill="#2B3F6C"/>
</svg>
`;

const calcRateDifference = () => {
  const extractPrice = (text) => {
    const price = parseFloat(text.match(/[\d.,]+/)[0]);
    // console.log('🚀 ~ extractPrice ~ price:', price);
    return price;
  };

  // const maxPossiblePriceText = window.globalDataLayer.flexibleRateAmount;
  const rates = window.roomRateObj.getRoom(0).rateGroup.rates;
  const maxPossiblePrice = rates.find((rate) => rate.name === 'Flexible rate').price.value;
  // const maxPossiblePrice = maxPossiblePriceText
  //   .split(';')
  //   .map((price) => extractPrice(price))
  //   .reduce((acc, curr) => acc + curr, 0);

  const totalPriceText = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText.trim();
  const totalPrice = extractPrice(totalPriceText);

  const rateDifference = Number(maxPossiblePrice) - totalPrice;

  return rateDifference;
};

const flexiHtml = (rateDifference) => {
  // let flexiDifference = 18;
  // const currTotalDummy = 100;
  const formatPrice = (number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(number);
  return `
  
  <div class="${ID}-flexi-container">
    <div class="${ID}-flexi-container-head">
      <h2>Before you move on, did you know we offer flexible rates?</h2>
      <button class="${ID}-flexi-container-head-skip">Skip</button>
    </div>
    <div class="${ID}-flexi-container-body">
      <div class="${ID}-flexi-container-body-left ${ID}-flexi-container-body-section">
        <h3>Don't risk losing money if plans change!</h3>
        <p>${cancelSVG} Cancel until 12pm on arrival day</p>
        <p>${refundSVG} Get a total refund or amend for FREE</p>
        <p>${lockSVG} Rates fluctuate daily - lock them in now</p>
        <button class="${ID}-add-flexi">Continue with flexible rate | + ${formatPrice(rateDifference)}</button>
      </div>
      <div class="${ID}-flexi-container-body-right ${ID}-flexi-container-body-section">
        <img src="https://media.travelodge.co.uk/image/upload/Testing/travelodge-flexi-rate.png" alt="Travelodge flexible rate">
      </div>
    </div>
  </div>
`;
};

// const formatNumber = (num) => {
//   if (num % 1 === 0) {
//     return num.toFixed(2).replace(/\.00$/, '');
//   } else {
//     const number = num.toFixed(2);
//     const [whole, decimal] = number.split('.');
//     return `<span class="rate-int">${whole}</span><span class="rate-dec">${decimal === '00' ? '' : `.${decimal}`}</span>`;
//   }
// };

// const reset = () => {
//   // Get all cloned buttons
//   const clonedButtons = document.querySelectorAll('button.cloned-btn');

//   // Remove each cloned button
//   clonedButtons.forEach((clonedBtn) => {
//     clonedBtn.remove();
//   });

//   // Show the original radio buttons
//   const radioButtons = document.querySelectorAll('button[data-room-rate]');
//   radioButtons.forEach((radioButton) => {
//     radioButton.style.display = '';
//   });
// };

// const init = () => {
//   //get rooms
//   if (VARIATION == 'control') {
//     return;
//   }

//   const rooms = document.querySelectorAll('.rateGroups');

//   rooms.forEach((room) => {
//     //get each radio button
//     const radioButtons = room.querySelectorAll('button[data-room-rate]');
//     //createa cloned version of each radio button

//     //place cloned buttons underneath the original buttons
//     radioButtons.forEach((radioButton, index) => {
//       const clonedBtn = radioButton.cloneNode(true);

//       const clonedBtnPriceText = clonedBtn.textContent.trim();
//       const clonedBtnPriceNum = parseFloat(clonedBtnPriceText.replace(/[£,]/g, ''));
//       clonedBtn.setAttribute('data-price', clonedBtnPriceNum);
//       radioButton.after(clonedBtn);
//       //add a class to cloned btn
//       clonedBtn.classList.add('cloned-btn');
//       //hide original btns
//       radioButton.style.display = 'none';

//       const clonedBtnClickHandler = ({ target }) => {
//         {
//           //if (!target.closest('.cloned-btn')) return;
//           //get the original radio button
//           const originalRadioButton = radioButtons[index];
//           //click the original radio button
//           originalRadioButton.click();

//           //getPice from original btn

//           const priceText = originalRadioButton.textContent.trim();
//           const priceNum = parseFloat(priceText.replace(/[£,]/g, ''));

//           //get the price difference for each cloned btn

//           const clonedBtns = room.querySelectorAll('button[data-price]');
//           clonedBtns.forEach((clonedBtn) => {
//             const clonedBtnPrice = parseFloat(clonedBtn.getAttribute('data-price'));
//             const priceDifference = clonedBtnPrice - priceNum;

//             const priceDifferenceText = `${priceDifference < 0 ? '-' : '+'}£${formatNumber(Math.abs(priceDifference))}`;

//             clonedBtn.innerHTML = `${priceDifference === 0 ? `£${formatNumber(clonedBtnPrice)}` : priceDifferenceText}`;
//           });
//         }
//       };

//       clonedBtn.removeEventListener('click', clonedBtnClickHandler);

//       clonedBtn.addEventListener('click', clonedBtnClickHandler);
//     });
//   });

//   setTimeout(() => {
//     document.querySelectorAll('.rateGroups').forEach((group) => {
//       group.querySelector('.cloned-btn')?.click();
//     });
//   }, 500);
// };

const renderRateDifference = () => {
  const rateDifference = calcRateDifference();

  const currTotal = document.querySelector('.rebaseFixedButton .js-room-total-amount').innerText.trim();

  const flexRate = flexiHtml(rateDifference, currTotal);

  //remove if already there
  const existingFlexRate = document.querySelector(`.${ID}-flexi-container`);
  if (existingFlexRate) {
    existingFlexRate.remove();
  }

  const attachPoint = document.querySelector('#extraModal .modal-body');
  if (rateDifference > 0) {
    attachPoint.insertAdjacentHTML('afterbegin', flexRate);
    document.body.classList.add(`${ID}__flexi-rate-active`);
  }
};

export default () => {
  setup();
  fireEvent('Conditions Met');
  //setTimeout(init, 0);

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('[data-room-rate-type-name="Flexible"]')) {
      fireEvent('user clicks on flex rate');
      setTimeout(() => {
        window.roomRateObj.bindSelectedPrice()
        renderRateDifference();
      }, 1000);
    } else if (target.closest('[data-room-rate-type-name="Saver"]')) {
      fireEvent('user clicks on saver rate');
      setTimeout(() => {
        window.roomRateObj.bindSelectedPrice()
        renderRateDifference();
      }, 1000);
    } else if (target.closest('.bookNow')) {
      fireEvent('user clicks on proceed to extras');
    } else if (target.closest(`.${ID}-add-flexi`)) {
      fireEvent('user clicks on flex rate button');
      //const originalBookNow = document.querySelector('.pgHotel .main .c-section .db-view .bookNow');
      const flexiContainerElem = document.querySelector(`.${ID}-flexi-container`);
      // const flexiOverlay = document.querySelector(`.${ID}-flexi-container-overlay`);

      const saverRateSelectedBtn = document.querySelector('[data-room-rate-type-name="Saver"].selected');
      const cardParent = saverRateSelectedBtn.closest('.card-pad');
      const flexibleRateBtns = cardParent.querySelectorAll('[data-room-rate-type-name="Flexible"]');
      flexibleRateBtns.forEach((flexibleRateBtn) => {
        flexibleRateBtn.click();
      });

      flexiContainerElem.classList.add(`${ID}__hide`);
      document.body.classList.remove(`${ID}__flexi-rate-active`);
      // flexiOverlay.classList.add(`${ID}__hide`);

      // originalBookNow.click();
    } else if (target.closest(`.${ID}-flexi-container-head-skip`)) {
      //const originalBookNow = document.querySelector('.pgHotel .main .c-section .db-view .bookNow');
      const flexiContainerElem = document.querySelector(`.${ID}-flexi-container`);

      flexiContainerElem.classList.add(`${ID}__hide`);
      document.body.classList.remove(`${ID}__flexi-rate-active`);
      // originalBookNow.click();
    }
  });
  if (VARIATION == 'control') {
    return;
  }

  //const bedSelects = document.querySelectorAll('.js-switchExtraRooms');

  // bedSelects.forEach((bedSelect) => {
  //   bedSelect.addEventListener('change', () => {
  //     //reset();
  //     //setTimeout(init, 0);
  //   });
  // });

  renderRateDifference();
};
