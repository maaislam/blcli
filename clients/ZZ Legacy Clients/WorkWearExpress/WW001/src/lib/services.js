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

function injectSubtotalBlock(props){
  const subTotal = props.subTotal;
  const element = document.createElement('div');
  element.classList.add(`${ID}_subtotalWrap`);
  element.innerHTML = `
    <div class="${ID}_subtotal">
      <p class="${ID}_subtotal__title">Sub-total(ex. VAT): <strong>£${subTotal}</strong></p>
      <span class="${ID}_subtotal__info">(excl. personalisation and logo setup fees)</span>
    </div>
  `;
  if (device.type !== 'mobile') {
    document.querySelector('.basket_contents').insertAdjacentElement('afterend', element);
  } else if (device.type === 'mobile'){
    const tr = document.createElement('tr');
    tr.classList.add('subtotal-container');
    document.querySelector('.basket_contents tfoot').insertAdjacentElement('afterbegin', tr);
    document.querySelector('.subtotal-container').insertAdjacentElement('afterbegin', element);
  }
}

function reArrangeCartTotal(){
  if(document.querySelector('.remove-customisation')){
    const element = document.querySelector('#basket_summary tbody');
    element.setAttribute('style', 'display:none;');
    const fields = element.querySelectorAll('td');
    const newTbody = document.createElement('tbody');
    newTbody.classList.add(`${ID}_basketBody`)
    let tbodyContent = `
      <tr class="${ID}_subTotal">
        <th>Sub-total (ex. VAT)</th>
        <td></td>
      </tr>
      <tr class="${ID}_setupCharge">
        <th>Logo Setup Charge</th>
        <td></td>
      </tr>
      <tr class="${ID}_persTot">
        <th>Personalisation Total</th>
        <td></td>
      </tr>
      <tr class="unitcosts" style="display:none;">
        <th>Unit Cost Total (ex. VAT)</th>
        <td></td>
      </tr>
      <tr class="${ID}_delivery">
        <th>Delivery</th>
        <td></td>
      </tr>
      <tr class="${ID}_discount" style="display:none;">
        <th>Discount</th>
        <td></td>
      </tr>
      <tr class="${ID}_vat">
        <th>VAT</th>
        <td></td>
      </tr>
      <tr class="${ID}_ordTot">
        <th>Order Total</th>
        <td></td>
      </tr>
    `;
    newTbody.innerHTML = tbodyContent;
    document.querySelector('#basket_summary').insertAdjacentElement('afterbegin', newTbody);
    if(document.querySelector('#vouchercodeinfo')){
      Array.from(fields).forEach((field, i) => {
        console.log('worfhor');
        const curEl = field;
        const fieldContent = curEl.innerHTML;
        switch (i){
          case 0:
          document.querySelector(`.${ID}_basketBody .${ID}_setupCharge td`).innerHTML = fieldContent;
          break;
          case 1:
          document.querySelector(`.${ID}_basketBody .${ID}_persTot td`).innerHTML = fieldContent;
          break;
          case 2:
          document.querySelector(`.${ID}_basketBody .unitcosts td`).innerHTML = fieldContent;
          break;
          case 3:
          document.querySelector(`.${ID}_basketBody .${ID}_subTotal td`).innerHTML = fieldContent;
          break;
          case 4:
          document.querySelector(`.${ID}_basketBody .${ID}_delivery td`).innerHTML = fieldContent;
          break;
          case 5:
          document.querySelector(`.${ID}_basketBody .${ID}_discount`).removeAttribute('style');
          document.querySelector(`.${ID}_basketBody .${ID}_discount td`).innerHTML = fieldContent;
          break;
          case 6:
          document.querySelector(`.${ID}_basketBody .${ID}_vat td`).innerHTML = fieldContent;
          break;
          case 7:
          document.querySelector(`.${ID}_basketBody .${ID}_ordTot td`).innerHTML = fieldContent;
          break;
          default:
          break;
        }
      });
    } else{
      Array.from(fields).forEach((field, i) => {
        const curEl = field;
        const fieldContent = curEl.innerHTML;
        switch (i){
          case 0:
          document.querySelector(`.${ID}_basketBody .${ID}_setupCharge td`).innerHTML = fieldContent;
          break;
          case 1:
          document.querySelector(`.${ID}_basketBody .${ID}_persTot td`).innerHTML = fieldContent;
          break;
          case 2:
          document.querySelector(`.${ID}_basketBody .unitcosts td`).innerHTML = fieldContent;
          break;
          case 3:
          document.querySelector(`.${ID}_basketBody .${ID}_subTotal td`).innerHTML = fieldContent;
          break;
          case 4:
          document.querySelector(`.${ID}_basketBody .${ID}_delivery td`).innerHTML = fieldContent;
          break;
          case 5:
          document.querySelector(`.${ID}_basketBody .${ID}_vat td`).innerHTML = fieldContent;
          break;
          case 6:
          document.querySelector(`.${ID}_basketBody .${ID}_ordTot td`).innerHTML = fieldContent;
          break;
          default:
          break;
        }
      });
    }
    //element.remove();
  }
}

export {
  setup,
  injectSubtotalBlock,
  reArrangeCartTotal,
}; // eslint-disable-line
