import { pollerLite } from '../../../../../../lib/utils';

const renderShippingChanges = (ID) => {
  pollerLite(['.shipment-container'], () => {
    document.body.classList.add(`${ID}__shippingAddress`);
    const shippingContainers = document.querySelectorAll('.shipment-container');

    shippingContainers.forEach((shippingContainer) => {
      //change tab text content..
      const deliveryTabElem = shippingContainer.querySelector('[data-delivery-type="home"] a');
      const collectTabElem = shippingContainer.querySelector('[data-delivery-type="clickandcollect"] a');

      if (deliveryTabElem) deliveryTabElem.textContent = 'Delivery';
      if (collectTabElem) collectTabElem.textContent = 'Click & Collect';
    });
  });
};

export default renderShippingChanges;
