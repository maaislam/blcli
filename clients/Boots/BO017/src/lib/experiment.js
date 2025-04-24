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


  const deliveryMessage = () => {
    const message = document.createElement('div');
    message.classList.add(`${shared.ID}-deliveryInfo`);

    const loggedIn = document.querySelector('#loggedIn_dropDown');
    if(loggedIn && loggedIn.querySelector('#loggedIn_name') && loggedIn.innerText.indexOf('Hello') > -1) {
      message.innerHTML = `<div class="${shared.ID}-messageInner"><h3>Order & Collect update</h3><p>You can now collect your order in selected stores. Please reselect any saved stores as it may not yet offer the service. Don't forget, you can still have your parcel delivered to your door.</p></div>`;
    } else {
      message.innerHTML = `<div class="${shared.ID}-messageInner"><h3>Delivery services update</h3><p>You can now collect your order from selected stores but don't forget, you can also have it delivered to your door!</p></div>`;
    }

    return message;
  }

  document.querySelector('#order_summary_container').parentNode.insertAdjacentElement('afterend', deliveryMessage());
};

