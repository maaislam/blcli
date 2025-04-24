/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;


  const cvMessage = document.createElement('div');
  cvMessage.classList.add(`${ID}-orderStatus_message`);
  cvMessage.innerHTML = `As the coronavirus situation develops the health of our customer and employees is our top priority and respecting social distancing may result in a drop in our packing capacity. Rest assured we are doing everything to make sure you get your order as quickly as we can. <a href="https://www.hsamuel.co.uk/webstore/faq.cdo">View FAQ's</a>`;

  const orderForm = document.querySelector('.container.accountSection .singleInputForm #searchOrders');
  if(orderForm) {
    //orderForm.insertAdjacentElement('beforebegin', cvMessage);
    document.querySelector('.panelLeft.order h2').textContent = 'Order Status';
  }

  

  // change delivery status
  const allOrderDetails = document.querySelectorAll('.detailLists dl dt');
  if(allOrderDetails) {
    for (let index = 0; index < allOrderDetails.length; index += 1) {
      const element = allOrderDetails[index];
      if(element.textContent === 'Order status:') {
        element.nextElementSibling.textContent = 'In Transit';
        break;
      }
    }
  }

};
