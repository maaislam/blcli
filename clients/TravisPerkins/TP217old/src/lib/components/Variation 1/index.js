import { resolve } from 'promise-polyfill';
import {
  getStock,
  getEligibility,
  getCustomerLocation,
  getProduct,
} from '../../../../../Utils/Apis';

/* eslint-disable import/prefer-default-export */
export const Variation1 = () => {
  debugger;
  const productdata = document.querySelector('[data-test-id="plp-list"]');
  const productdataItems = productdata.querySelectorAll(
    '[data-test-id="product"]',
  );

  const getProductData = async () => {
    debugger;
    const productIds = [];
    const customerLocation = getCustomerLocation();
    productdataItems.forEach((product) => {
      productIds.push(
        product
          .querySelector('[data-test-id="product-card-code"]')
          .innerHTML.replace(/[^0-9]/g, ''),
      );
    });

    const items = productIds.map(product => ({
      productCode: product,
      quantity: 1,
    }));

    // Load in products for other steps
    const promises = [];
    productIds.forEach((sku) => {
      promises.push(getProduct(sku));
    });

    return Promise.allSettled(promises).then((results) => {
      const returnedData = [];
      // Stock requires location data.
      if (customerLocation) {
        getEligibility(items, customerLocation).then((eligibility) => {
          getStock([customerLocation.collectionBranchId], productIds).then(
            (stock) => {
              results.forEach((result, i) => {
                if (result.value.product) {
                  returnedData.push({
                    Product: result.value.product,
                    Eligibility: eligibility[i],
                    Stock: stock[i].quantity,
                    ProductMarkup: productdataItems,
                    PostCode: customerLocation.deliveryPostcode,
                  });
                }
              });
              return returnedData;
            },
          );
        });
      }
    });
  };


  const deliveryMessage = async () => {
    debugger;
    const data = Promise.allSettled(getProductData().then(results => results));
    
    if (data.length > 0) {
      try {
        for (let i = 0; i < data.ProductMarkup.length; i++) {
          if (
            data[i].ProductMarkup.querySelector(
              '[data-test-id="collection-availability-message"]',
            )
          ) {
            if (
              data[i].ProductMarkup.querySelector(
                '[data-test-id="collection-availability-message"]',
              ).innerHTML === 'Select type'
            ) {
              continue;
            }
          }
          if (
            data[i].ProductMarkup.querySelector('[data-test-id="primary-btn"]')
          ) {
            if (
              data[i].ProductMarkup.querySelector(
                '[data-test-id="primary-btn"] span',
              ).innerHTML === 'Add for hire'
            ) {
              continue;
            }
          }
          let deliveryMessageText = '';
          const deliveryAvailability = data[i].Eligibility.collectionAvailability.status;
          const collectionAvailability = data[i].Eligibility.deliveryAvailability.status;

          // const stock = products
          //   .querySelector('[data-test-id="collection-availability-message"]')
          //   .innerHTML.replace(/[^0-9]/g, '');

          const removeButtons = () => {
            data[i].ProductMarkup.querySelector(
              '[data-test-id="add-to-delivery-btn"]',
            ).parentElement.parentElement.style.display = 'none';
          };

          const insertMessage = () => {
            const quantitySelector = data[i].ProductMarkup.querySelector(
              '[data-test-id="qty-selector"]',
            ).parentElement.parentElement;
            quantitySelector.insertAdjacentHTML(
              'afterend',
              `<div class="deliveryMessage">${deliveryMessageText}</div>`,
            );
          };

          if (deliveryAvailability && collectionAvailability && data[i].Stock) {
            deliveryMessageText = `Delivery and collection options available (${data[i].Stock} in stock)`;
            removeButtons();
            insertMessage();
          }
          if (!deliveryAvailability && collectionAvailability) {
            deliveryMessageText = 'Only available for delivery';
            removeButtons();
            insertMessage();
          }
          if (
            !deliveryAvailability
            && !collectionAvailability
            && data[i].Stock
          ) {
            deliveryMessageText = `Only available for collection (${data[i].Stock} in stock)`;
            removeButtons();
            insertMessage();
          }
          if (!deliveryAvailability && !collectionAvailability) {
            deliveryMessageText = 'Not available for collection or delivery';
            removeButtons();
            insertMessage();
          }
          if (!data[i].PostCode) {
            deliveryMessageText = 'Enter postcode for delivery and collection options';
            removeButtons();
            insertMessage();
          }
        }
      } catch (error) {
        throw error;
      }
    }
  };
  deliveryMessage();
};
