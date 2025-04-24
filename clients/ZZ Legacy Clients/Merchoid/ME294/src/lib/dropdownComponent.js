import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer, eventFire } from './../../../../../lib/utils';

const { ID, VARIATION } = shared;

let jQuery = null;
jQuery = window.jQuery || window.$;

export const generateDropdown = () => {
  const allProducts = document.querySelectorAll(`#shopping-cart-table tbody.cart.item`);
  [].forEach.call(allProducts, (prod) => {
    let numOfProducts = prod.querySelector('input.input-text.qty').getAttribute('value');

    const dropdown = `<select class="${ID}-dropdown">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>`;

    if (!prod.querySelector(`.${ID}-dropdown`)) {
      prod.querySelector('.col.qty').insertAdjacentHTML('afterbegin', dropdown);
    }
    
    prod.querySelector(`select.${ID}-dropdown option[value="${numOfProducts}"]`).selected = 'selected';


    prod.querySelector(`select.${ID}-dropdown`).addEventListener('change', (e) => {
      let opt;
      for (let i = 0; i < prod.querySelector(`select.${ID}-dropdown`).length; i += 1) {
        opt = prod.querySelector(`select.${ID}-dropdown`).options[i];

        if (opt.selected) {
          prod.querySelector('input.input-text.qty').setAttribute('value', opt.value);
          prod.querySelector('button.custom-update-cart').click();

          break;
        }
      }
    });

  });  
  
}