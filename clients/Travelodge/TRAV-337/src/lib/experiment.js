/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const extractPrice = () => {
  // Select the element containing the price
  const priceElement = document.querySelector('.pull-right .value');

  // Check if the element exists to avoid errors
  if (!priceElement) return null;

  // Extract the individual parts of the price
  //const currency = priceElement.querySelector('.rate-currency')?.textContent || '';
  const integerPart = priceElement.querySelector('.rate-int')?.textContent || '';
  const decimalPart = priceElement.querySelector('.rate-dec')?.textContent || '';
  const price = Number(`${integerPart}.${decimalPart}`);

  // Combine the parts into a full price string
  return price;
};

// Function to load PayPal script dynamically
const loadPayPalScript = (clientId, callback) => {
  const script = document.createElement('script');
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=messages`;
  script.onload = callback;
  document.head.appendChild(script);
};

// Function to render PayPal Messages
const renderPayPalMessages = (amount) => {
  const selector = isMobile() ? '.sticky-summary-container .room-details' : '.fixedButton-wrapper';
  window.paypal
    .Messages({
      amount,
      pageType: 'product',
      style: {
        layout: 'text',
        logo: {
          type: 'inline',
        },
      },
    })
    .render(selector);
};

// Usage
const clientId = 'AYXnOZypyvPmqk6tqAP7BgKdvCl98Dg04N6XTXduWH2oXrifhkjp9tgIZl9zdD8-KE9CY9IlAOKPTEb5';

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('.rate-btn')) {
      const amount = extractPrice();
      renderPayPalMessages(amount);
    }
  });

  const amount = extractPrice();

  loadPayPalScript(clientId, () => {
    renderPayPalMessages(amount);
  });
};
