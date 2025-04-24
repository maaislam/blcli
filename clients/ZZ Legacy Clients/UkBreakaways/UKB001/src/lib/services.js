import {
  fullStory
} from '../../../../../lib/utils';
import settings from './settings';

const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function moveField(curField, selector, form) {
  const fieldContent = curField.innerHTML;
  form.querySelector(selector).innerHTML = fieldContent;
  form.querySelector(selector).classList.add('field-row-wide');
  curField.remove();
}

function insertRequired(selector) {
  const labelText = document.querySelector(selector).innerText;
  document.querySelector(selector).innerHTML = labelText + '<sup>*</sup>';
}

function insertAdvice(selector) {
  let curText;
  switch (selector) {
    case 'cardNumber':
      curText = document.querySelector(`[data-field="${selector}"] label`).innerHTML;
      document.querySelector(`[data-field="${selector}"] label`).innerHTML = curText + '<small> (no spaces)</small>';
      break;
    case 'issueNum':
      curText = document.querySelector(`[data-field="${selector}"] label`).innerHTML;
      document.querySelector(`[data-field="${selector}"] label`).innerHTML = curText + '<small> (optional)</small>';
      break;
    case 'validity':
      curText = document.querySelector(`[data-field="${selector}"] label`).innerHTML;
      document.querySelector(`[data-field="${selector}"] label`).innerHTML = curText + '<small> (optional)</small>';
      break;
    default:
      break;
  }
}

function validateCreditCard(value) {
  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  var nCheck = 0,
    nDigit = 0,
    bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }
  if(nCheck % 10 == 0){
    if(document.querySelector(`.${ID}_fieldError`)){
      document.querySelector(`.${ID}_fieldError`).remove();
      document.querySelector('[data-field="cardNumber"]').removeAttribute('data-valid');
    }
    document.querySelector('.txtCardNo-wrap').setAttribute('data-validation', true);
  } else{
    document.querySelector('[data-field="cardNumber"]').setAttribute('data-valid', false);
    const element = document.createElement('span');
    element.classList.add(`${ID}_fieldError`);
    element.innerText = 'Please provide a valid card number';
    if(document.querySelector('.txtCardNo-wrap').getAttribute('data-validation')){
      document.querySelector('.txtCardNo-wrap').removeAttribute('data-validation');
    }
    if(!document.querySelector(`.${ID}_fieldError`)){
      document.querySelector('[data-field="cardNumber"] #txtCardNo').insertAdjacentElement('afterend', element);
    }
  }
}

export {
  setup,
  moveField,
  insertRequired,
  insertAdvice,
  validateCreditCard,
}; // eslint-disable-line
