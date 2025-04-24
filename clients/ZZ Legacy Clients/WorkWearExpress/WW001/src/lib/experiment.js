import {
  setup,
  injectSubtotalBlock,
  reArrangeCartTotal,
} from './services';
import curDevice from '../lib/curDevice';
import settings from './settings';
import { events } from '../../../../../lib/utils';

const {
  ID,
  VARIATION
} = settings;

const activate = () => {
  setup();
  curDevice(); // Detects the current device, The website use an adaptive approach providing CSS files based on the current device.
  reArrangeCartTotal(); // Rearrange the basket fields to match the design
  if (document.querySelector('#the_basket_form')) {
    document.querySelector('#the_basket_form thead th:last-child').textContent = 'Total';
    // Rename THEAD {Price} to {Price (each)}
    document.querySelector('#the_basket_form thead th:nth-child(6)').textContent = 'Price (each)';
    const rows = document.querySelectorAll('.basket_contents tbody tr');
    const pricesArray = [];
    /**
     * - Moves REMOVE button under the image
     * - Wrap the button in a div for easy tracking
     * - $onClick removes the item from the cart 
     * */
    Array.from(rows).forEach((row) => {
      if (row.classList.contains('customisationrow')) {
        // Rename {remove} to {remove logo} if a logo or a costumisation is applied
        if (row.querySelector('.customisation_info .remove-customisation')) {
          row.querySelector('.remove-customisation').textContent = 'remove logo'
        }
        const text = row.querySelector('td:nth-child(5)').textContent;
        const textBlock = row.querySelector('td:nth-child(5)');
        const newText = text.trim().replace('£', '+£');
        textBlock.innerHTML = '';
        if (device.type !== 'mobile') {
          textBlock.innerHTML = `${newText}`;
          const persFee = document.createElement('div');
          persFee.classList.add('pers-fee');
          persFee.innerHTML = `
            <strong>Personalisation fee per item:</strong><span>(Total for all locations entered)</span>
          `;
          row.querySelector('td:nth-child(4)').insertAdjacentElement('afterbegin', persFee);
        } else if (device.type === 'mobile') {
          const persFreeWrap = document.createElement('div');
          persFreeWrap.classList.add('pers-feeWrap');
          persFreeWrap.innerHTML = `
          <div class="pers-free">
            <span>Personalisation fee per item:</span>
            <strong>${newText}</strong>
            <div>(Total for all locations entered)</div>
          </div>
          `;
          if (row.querySelector('.customisation_info')) {
            row.querySelector('.customisation_info').insertAdjacentElement('beforeend', persFreeWrap);
          }
          // Adds a proper element with text inside, the previous one was a before
          const costumisationText = document.createElement('div');
          costumisationText.classList.add(`${ID}_costumisation-text`);
          costumisationText.textContent = 'Your Customisations';
          row.querySelector('.customisation_info').insertAdjacentElement('beforebegin', costumisationText);
        }
      } else {
        if (device.type !== 'mobile') {
          // get the button and perform actions to it
          row.querySelector('.remove span').classList.add(`${ID}_remove`);
          const removeButton = row.querySelector('.remove').innerHTML;
          row.querySelector('.remove').innerHTML = '';
          row.querySelector(':first-child').classList.add(`${ID}_product-image`);
          const wrapper = document.createElement('div');
          wrapper.classList.add(`${ID}_removeWrap`);
          wrapper.innerHTML = removeButton
          // insert the new markup into the image TD
          row.querySelector(`.${ID}_product-image`).insertAdjacentElement('beforeend', wrapper);
          // perform actions on the click
          row.querySelector(`.${ID}_remove`).addEventListener('click', (e) => {
            events.send(ID, 'Remove-Button', 'is-clicked');
            window.dataLayer.push({
              'event': 'removeFromCart',
              'ecommerce': {
                'remove': {
                  'products': [{
                    'name': jQuery(e.target).attr('data-gaName'),
                    'id': jQuery(e.target).attr('data-gaId'),
                    'price': jQuery(e.target).attr('data-gaPrice'),
                    'brand': jQuery(e.target).attr('data-gaBrand'),
                    'category': jQuery(e.target).attr('data-gaCategory'),
                    'variant': jQuery(e.target).attr('data-gaVariant'),
                    'quantity': jQuery(e.target).attr('data-gaQuantity')
                  }]
                }
              }
            });

            jQuery(e.target).closest('.productrow').find('input[type=number]').val(0);
            jQuery(e.target).closest('form').submit();
          });
        }
        /**
         * Add Total to the column where the REMOVE button was
         */
        const productQuantity = row.querySelector('.basket_quantity').getAttribute('value');
        const productPrice = row.querySelector('td:nth-child(6) strong').textContent.trim().replace('£', '').replace(',', '');
        const totalPrice = parseFloat(Math.round((productPrice * productQuantity) * 100) / 100).toFixed(2);
        pricesArray.push(parseFloat(totalPrice));
        if (device.type !== 'mobile') {
          row.querySelector('.remove').textContent = `£${totalPrice}`;
        } else if (device.type === 'mobile') {
          row.querySelector('td:nth-child(6)').classList.add(`${ID}_price`);
          const totPrice = document.createElement('span');
          totPrice.classList.add('tot-price');
          totPrice.innerHTML = `Total: <strong>£${totalPrice}</strong>`;
          const priceEachContent = row.querySelector('td:nth-child(6) strong').textContent.trim();
          row.querySelector(`.${ID}_price strong`).remove();
          const priceEach = document.createElement('span');
          priceEach.classList.add('price-each');
          priceEach.innerHTML = `Price (Each): <strong>${priceEachContent}</strong>`;
          const priceWrap = document.createElement('div');
          priceWrap.classList.add(`${ID}_priceWrap`);
          row.querySelector(`.${ID}_price`).insertAdjacentElement('beforeend', priceWrap);
          row.querySelector(`.${ID}_priceWrap`).insertAdjacentElement('beforeend', priceEach);
          row.querySelector(`.${ID}_priceWrap`).insertAdjacentElement('beforeend', totPrice);
        }
      }
    });
    /**
     * Sum every price into the array
     */
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = pricesArray.reduce(reducer);
    injectSubtotalBlock({
      subTotal: parseFloat(Math.round(sum * 100) / 100).toFixed(2)
    });
    if(document.querySelector(`.${ID}_subTotal td`)){
      document.querySelector(`.${ID}_subTotal td`).textContent = `£${parseFloat(Math.round(sum * 100) / 100).toFixed(2)}`;
    }
  }

};

export default activate;
