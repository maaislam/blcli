import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import getChildrenValues from './helpers/getChildrenValues';
import { observeDOM } from './helpers/utils';
import checkoutPage from './pages/checkout';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 250;
const isMobile = window.matchMedia('(max-width: 767px)').matches;

const roomType = {
  'double room': 'Standard Room King size',
  'superroom double': 'SuperRoom King size',
  '2 superroom doubles': '2 SuperRoom King size',
}

const bedOptions = {
  '1': '& 1 pull out bed',
  '2': '& 2 pull out beds',
}

const setKingSizeBed = (card, findMoreElem) => {
  const bedTypeHtml = `<div class='${ID}__bedType'>King size bed</div>`;

  findMoreElem.insertAdjacentHTML('afterend', bedTypeHtml);
  findMoreElem.classList.add(`${ID}__findMore`);

  const bedTypeElem = card.querySelector(`.${ID}__bedType`);

  const imgPadElem = card.querySelector('.img-pad');
  const compStyles = window.getComputedStyle(imgPadElem);
  const bgColor = compStyles.getPropertyValue('background-color');

  if (bgColor === 'rgb(31, 122, 117)') {
    bedTypeElem.classList.add('text-white');
  }

  const firstColumn = imgPadElem.querySelector('.col-8.float-start');
  const lastColumn = bedTypeElem.closest('.col-4.float-end');
  firstColumn.classList.add(`${ID}__firstColumn`);
  lastColumn.classList.add(`${ID}__lastColumn`);
};

const setRoomType = () => {
  let roomTypeElems;

  if (isMobile) { //mobile
    roomTypeElems = document.querySelectorAll('.sticky-inner-container .room-type');
    //sticky label updates
    const roomTypeLabelElem = document.querySelector('.sticky-inner-container .roomType');
    const roomTypeLabelText = roomTypeLabelElem.innerText.toLowerCase();
    const isRoomLabelMatch = roomType[roomTypeLabelText];
    if (isRoomLabelMatch) {
      roomTypeLabelElem.innerText = roomType[roomTypeLabelText];
    }

  } else { //desktop
    roomTypeElems = document.querySelectorAll('#bookingSummary .room-type');
  }

  roomTypeElems.forEach((roomTypeElem) => {
    const roomTypeText = roomTypeElem.innerText.toLowerCase();

    const isRoomTypeMatch = roomType[roomTypeText];
    if (!isRoomTypeMatch) return;
    roomTypeElem.innerText = roomType[roomTypeText];
  });
}

const setBedType = (selectedOption, cardElem) => {
  //remove existing pull out bed element if exists
  const isPullOutBedExist = cardElem.querySelector(`.${ID}__pullOutBed`);
  isPullOutBedExist && isPullOutBedExist.remove();

  const roomTitle = cardElem.querySelector('.room-details');
  const bedTypeElem = cardElem.querySelector(`.${ID}__bedType`);

  const roomTitleText = roomTitle.innerText.toLowerCase();
  const isFamilyRoomSelected = roomTitleText.includes('family');

  if (!isFamilyRoomSelected && !bedTypeElem) return;

  const bedOptionText = bedOptions[selectedOption];
  const pullOutBedHtml = `<span class='${ID}__pullOutBed'>${bedOptionText}</span>`;
  bedTypeElem.insertAdjacentHTML('afterend', pullOutBedHtml);
};

const init = () => {
  const styleElem = document.createElement('style');
  styleElem.innerHTML = `.TRAV-329 .checkout-booking-summary .room-title br{display:none}#rebase .img-pad .TRAV-329__bedType{margin-top:16px;font-family:"FS Albert Bold";font-size:16px;color:#494949}.TRAV-329__pullOutBed{margin-bottom:10px;font-family:"FS Albert";font-size:16px!important;font-weight:300;color:#494949}.TRAV-329__findMore.float-end{float:left!important}.TRAV-329__firstColumn.col-8{width:61.66667%}.TRAV-329__lastColumn.col-4{width:39.33333%;margin-right:-10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}`;
  document.head.appendChild(styleElem);

  if (window.location.pathname.includes('checkout')) {
    checkoutPage(roomType);
    return;
  }

  const findMoreElems = document.querySelectorAll('.img-pad .find-more');

  findMoreElems.forEach((findMoreElem) => {
    const card = findMoreElem.closest('.card-top');
    const firstKeyPoint = card.querySelector('.room-key-point-container .room-key-point');

    const isKingSizeBedExist = firstKeyPoint.textContent.toLowerCase().includes('king size');

    if (card.querySelector(`.${ID}__findMore`) || !isKingSizeBedExist) return;

    setKingSizeBed(card, findMoreElem);

    const roomKeyPointContainer = card.querySelector('.room-key-point-container');
    roomKeyPointContainer.insertAdjacentElement('afterend', findMoreElem);
  });

  const roomCards = document.querySelectorAll('.rateGroups')
  roomCards.forEach((roomCard, index) => {
    const selectElem = roomCard.querySelector('.extra-bed-select select');

    const childrens = getChildrenValues();

    //if no selected option and childrens exist
    if (!selectElem && childrens.length > 0) {
      const pullOutOption = childrens[index].toString();
      
      //must be greater than 0, if 0 then no children
      if (childrens[index] > 0) {
        setBedType(pullOutOption, roomCard);
      }
      return
    }

    const selectText = selectElem ? selectElem.textContent : '';
    const isPullOut = selectText.includes('pull-out') || selectText.includes('pull out');
    //if pull-out option exist on select element
    if (!isPullOut) return;

    const selectedOptionValue = selectElem.value;
    setBedType(selectedOptionValue, roomCard);
  });

  //set room type
  setRoomType();
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  init();

  //change event listener for extra bed select
  const extraBedSelects = document.querySelectorAll('.extra-bed-select');
  if (extraBedSelects.length > 0) {
    extraBedSelects.forEach((extraBedSelect) => {
      const selectText = extraBedSelect.textContent;
      const isPullOut = selectText.includes('pull-out') || selectText.includes('pull out');

      extraBedSelect.addEventListener('change', (e) => {
        setTimeout(() => {
          init();

          if (!isPullOut) return;
          const selectedOption = e.target.value;
          const cardElem = extraBedSelect.closest('.rateGroups');
          setBedType(selectedOption, cardElem); // set bed type based on selected option
        }, DOM_RENDER_DELAY);
      });
    });
  }

  //observe DOM changes for room selection
  observeDOM('.fixedButton-wrapper', () => {
    setRoomType();
  });
};
