import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
import formData from '../data/data';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function getProducts() {
  const basketContent = document.querySelector('#ctl00__objHeader_upHeaderBasketMobile .intBasket table tbody');
  const basketList = basketContent.children;
  let discountPrice;
  let foodQuantity;
  let foodName;
  let foodPrice;
  const cartOBJ = [];
  Array.from(basketList).forEach((child) => {
    if (!child.getAttribute('id')) {
      foodName = child.querySelector('.pizza-title-b').textContent;
      foodQuantity = child.querySelector('.quantity .aspNetDisabled.txtField').value;
      foodPrice = child.querySelector('.valBeforeDiscount').parentElement.textContent.replace(/ /g, '').replace('Remove', '').replace(/\n/g, '');
      /*
      Create an array of objects in the local storage
      to be retrieved later
      */
      cartOBJ.push({
        name: foodName,
        quantity: foodQuantity,
        price: foodPrice,
      });
    }
  });
  if (basketContent.querySelector('#ctl00__objHeader_trDiscount .value')) {
    discountPrice = basketContent.querySelector('#ctl00__objHeader_trDiscount td span.value').textContent.replace(/ /g, '').replace(/\n/g, '');
  }
  const totalPrice = basketContent.querySelector('#ctl00__objHeader_trBasketTotalMobile').childNodes[3].textContent;
  cartOBJ.push({ discount: discountPrice, total: totalPrice });
  localStorage.setItem('basketList', JSON.stringify(cartOBJ));
}
function getDeliveryTime() {
  const clone = document.querySelector('#ctl00_cphBody_pnlWhenFor').innerHTML;
  return clone;
}
function paymentMethod(logged) {
  const actionButton = document.querySelector(`.${ID}_actionButton`);
  const methods = document.querySelectorAll(`.${ID}_checkOutBlockWrap--payment-method .${ID}_checkOutBlock__formLabel`);
  Array.from(methods).map(method => method.addEventListener('click', (e) => {
    const basket = JSON.parse(localStorage.getItem('basketList'));
    const totals = basket.slice(-1);
    const total = totals[0].total;
    const price = total;
    const methodName = e.target.getAttribute('for');
    const donationTotal = localStorage.getItem('charity');
    const isDonating = localStorage.getItem('isWillingToDonate');
    document.querySelector(`.${ID}_actionButton`).classList.remove('disabled');
    switch (methodName) {
      case 'card':
        actionButton.textContent = '';
        actionButton.textContent = `CHECKOUT SECURELY (${isDonating === 'true' ? `£${donationTotal}` : price})`;
        actionButton.addEventListener('click', () => {
          if (logged) {
            document.querySelector('#panel-3').click();
          } else {
            document.querySelector('#panel-4').click();
          }
          document.querySelector('.saveMethod').classList.remove('isHidden');
          document.querySelector('.optionsCont').classList.remove('isHidden');
        });
        document.querySelector(`#${ID}_paymentType`).textContent = 'Pay by card';
        break;
      case 'visa':
        actionButton.textContent = '';
        actionButton.textContent = `VISA CHECKOUT (${isDonating === 'true' ? `£${donationTotal}` : price})`;
        break;
      case 'cash':
        actionButton.textContent = '';
        actionButton.textContent = `PAY WITH CASH (${isDonating === 'true' ? `£${donationTotal}` : price})`;
        actionButton.addEventListener('click', () => {
          if (logged) {
            document.querySelector('#panel-3').click();
          } else {
            document.querySelector('#panel-4').click();
          }
          document.querySelector('.optionsCont').classList.add('isHidden');
          document.querySelector('.saveMethod').classList.add('isHidden');
        });
        document.querySelector(`#${ID}_paymentType`).textContent = 'Pay by cash';
        break;
      case 'amazon':
        break;
      case 'paypal':
        actionButton.textContent = '';
        actionButton.textContent = `PayPal CHECKOUT (${isDonating === 'true' ? `£${donationTotal}` : price})`;
        break;
      default:
        break;
    }
  }));
}
function addCharity() {
  const basket = JSON.parse(localStorage.getItem('basketList'));
  const totals = basket.slice(-1);
  const total = totals[0].total;
  let tot = total;
  const newTotal = tot.replace('£', '');
  tot = newTotal;
  const charityTotal = Math.ceil(tot);
  const charityAmount = Number(`${Math.round(`${charityTotal - newTotal}e2`)}e-2`);
  if (!localStorage.getItem('charity')) {
    //if not in localStorage create it
    localStorage.setItem('charity', charityTotal);
  } else {
    // if already in localStorage update it
    localStorage.setItem('charity', charityTotal);
  }
  document.querySelector('.actionButton--charity .continueToAddressBut').innerHTML = `YES DONATE £${charityAmount}`;
  document.querySelector('.actionButton--charity').addEventListener('click', () => {
    document.querySelector('.actionButton--charity .actionButton').classList.toggle('active');
    let donating = localStorage.getItem('isWillingToDonate');
    if (donating === null || donating === undefined) {
      donating = false;
      localStorage.setItem('isWillingToDonate', donating);
    } else {
      donating = JSON.parse(donating);
    }
    donating = !donating;
    localStorage.setItem('isWillingToDonate', donating);
  });
}
function generateSteps(logged) {
  return `
      <li class="${ID}_checkOut__listItem current" data-step="firstStep">
        <div class="${ID}_checkOut__listItem__content">
          <img src="http://i64.tinypic.com/2cndz10.png">
          <span>${logged ? formData.UserSteps[0] : formData.GuestSteps[0]}</span>
        </div>
      </li>
      <!--end item-->
      <li class="${ID}_checkOut__listItem" data-step="secondStep">
        <div class="${ID}_checkOut__listItem__content">
          <img src="http://i63.tinypic.com/r0a93s.png">
          <span>${logged ? formData.UserSteps[1] : formData.GuestSteps[1]}</span>
        </div>
      </li>
      <!--end item-->
      <li class="${ID}_checkOut__listItem" data-step="thirdStep">
        <div class="${ID}_checkOut__listItem__content">
          <img src="http://i63.tinypic.com/r0a93s.png">
          <span>${logged ? formData.UserSteps[2] : formData.GuestSteps[2]}</span>
        </div>
      </li>
      <!--end item-->
  `;
}
function manageSteps(curStep) {
  const steps = document.querySelectorAll(`.${ID}_checkOut__listItem`);
  Array.from(steps).map((step) => {
    const dataStep = step.getAttribute('data-step');
    const hasClass = step.classList.contains('current');
    if (dataStep !== curStep && hasClass) {
      step.classList.remove('current');
      step.classList.add('completed');
      step.querySelector('img').setAttribute('src', 'http://i64.tinypic.com/vilabr.png');
    } else if (dataStep === curStep && !hasClass) {
      step.classList.add('current');
      step.querySelector('img').setAttribute('src', 'http://i64.tinypic.com/2cndz10.png');
    }
  });
}
function calculatePapaPoints() {
  const basket = JSON.parse(localStorage.getItem('basketList'));
  const totals = basket.slice(-1);
  const total = totals[0].total;
  let tot = total;
  const newTotal = tot.replace('£', '');
  tot = newTotal;
  const papaPoints = Math.round(tot / 4);
  document.querySelector(`.${ID}_orderSummary__rewards__points`).setAttribute('data-points', papaPoints);
  document.querySelector(`.${ID}_orderSummary__rewards__notice`).innerHTML = `You will earn <span class="papa-rewards">${papaPoints} points</span> with your order`;
}

export {
  setup,
  getProducts,
  getDeliveryTime,
  paymentMethod,
  generateSteps,
  addCharity,
  manageSteps,
  calculatePapaPoints,
}; // eslint-disable-line
