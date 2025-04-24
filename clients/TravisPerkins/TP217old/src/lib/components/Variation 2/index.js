/* eslint-disable import/prefer-default-export */
export const Variation2 = () => {
  const productList = document.querySelector('[data-test-id="plp-list"]');
  const productListItems = productList.querySelectorAll(
    '[data-test-id="product"]',
  );

  const deliveryMessage = (list) => {
    debugger;
    try {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].querySelector(
            '[data-test-id="collection-availability-message"]',
          )
        ) {
          if (
            list[i].querySelector(
              '[data-test-id="collection-availability-message"]',
            ).innerHTML === 'Select type'
          ) {
            continue;
          }
        }
        if (list[i].querySelector('[data-test-id="primary-btn"]')) {
          if (
            list[i].querySelector('[data-test-id="primary-btn"] span')
              .innerHTML === 'Add for hire'
          ) {
            continue;
          }
        }
        let deliveryMessageText = '';
        const deliveryAvailability = !!list[i].querySelector(
          '[data-test-id="add-to-delivery-btn"]',
        ).attributes.disabled;

        const collectionAvailability = !!list[i].querySelector(
          '[data-test-id="add-to-collection-btn"]',
        ).attributes.disabled;

        const stock = list[i]
          .querySelector('[data-test-id="collection-availability-message"]')
          .innerHTML.replace(/[^0-9]/g, '');

        const removeButtons = () => {
          list[i]
            .querySelector('[data-test-id="add-to-delivery-btn"]')
            .parentElement.parentElement.remove();
        };
        const productUrl = list[i]
          .querySelector('[data-test-id="product-card-code"]')
          .innerHTML.replace(/[^0-9]/g, '');

        const viewProduct = `
      <div class="OrderButtons__ButtonWrapper">
        <button id="viewProductButton" onclick="location.href='/p/${productUrl}';">
          <span color="text-default">
          View Product
          </span>
        </button>
      `;

        const insertMessage = () => {
          const quantitySelector = list[i].querySelector(
            '[data-test-id="qty-selector"]',
          ).parentElement.parentElement;
          quantitySelector.insertAdjacentHTML(
            'afterend',
            `${viewProduct}
            <div class="deliveryMessage">${deliveryMessageText}</div>`,
          );
        };

        if (!deliveryAvailability && !collectionAvailability && stock) {
          deliveryMessageText = `Delivery and collection options available (${stock} in stock)`;
          removeButtons();
          insertMessage();
        }
        if (deliveryAvailability && !collectionAvailability) {
          deliveryMessageText = 'Only available for delivery';
          removeButtons();
          insertMessage();
        }
        if (!deliveryAvailability && collectionAvailability && stock) {
          deliveryMessageText = `Only available for collection (${stock} in stock)`;
          removeButtons();
          insertMessage();
        }
        if (!deliveryAvailability && !collectionAvailability && !stock) {
          deliveryMessageText = 'Enter postcode for delivery and collection options)';
          removeButtons();
          insertMessage();
        }
        if (deliveryAvailability && collectionAvailability) {
          deliveryMessageText = 'Not available for collection or delivery';
          removeButtons();
          insertMessage();
        }
      }
    } catch (error) {
      throw error;
    }
  };
  deliveryMessage(productListItems);
};
