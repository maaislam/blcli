import cache from '../cache';
import settings from '../settings';
import pubSub from '../PublishSubscribe';
import { getTextNodesRecursive } from '../dom';

/**
 * @param {String} className
 * @param {Object} values 
 * @access private
 */
const createDeliveryMessage = (className, values = {}) => {
  const div = document.createElement('div');
  div.classList.add(className);

  for(let label in values) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `
      ${label}: ${values[label]}
    `;

    div.appendChild(paragraph);
  }

  return div;
};

/**
 * Helper show delivery message at top of page
 *
 * @access public
 */
export const showDeliveryMessages = () => {
  const textNodes = getTextNodesRecursive(
    cache.get('#deliveryServiceList .deliveryOptionLabel')
  );

  const message1Values = {};
  const message2Values = {};
  if(textNodes[0]) {
    message1Values['Delivery Method'] = textNodes[0];
  }
  if(textNodes[1]) {
    message1Values['Delivery Cost'] = textNodes[1];
  }
  if(textNodes[2]) {
    message2Values['Delivery Date'] = textNodes[3];
  }

  const message1 = createDeliveryMessage(`${settings.ID}-message1`, message1Values);
  const message2 = createDeliveryMessage(`${settings.ID}-message2`, message2Values);

  cache.get('#checkoutContent').insertAdjacentElement('beforebegin', message1);
  cache.get('#checkoutContent').insertAdjacentElement('beforebegin', message2);

  pubSub.publish('did-show-message');
};
