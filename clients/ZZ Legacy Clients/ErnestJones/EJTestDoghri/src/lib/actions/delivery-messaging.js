/**
 * @access private
 */
const createDeliveryMessage = (className, values) => {
  const div = document.createElement('div');
  div.classList.add(className);

  for (let label in values) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `${label}: ${values[label]}`;

    div.appendChild(paragraph);
  }

  return div;
}

/**
 * @access public
 */
export const showDeliveryMessaging = () => {
  const textNodes = getTextNodeRecursively(
    cache.get('#deliveryServiceList .deliveryOptionLabel')
  );

  const message1Values = {};
  const message2Values = {};

  if (textNodes[0]) {
    message1Values['Delivery Method'] = textNodes[0];
  }

  if (textNodes[1]) {
    message2Values['Delivery Cost'] = textNodes[1];
  }

  if (textNodes[3]) {
    message2Values['Delivery Date'] = textNodes[3];
  }

  const message1 = createDeliveryMessage(`${settings.ID}-message1`, message1Values);
  const message2 = createDeliveryMessage(`${settings.ID}-message2`, message2Values);

  cache.get('#checkout')
};