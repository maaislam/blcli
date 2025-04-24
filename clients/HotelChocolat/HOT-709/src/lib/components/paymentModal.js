import { closeSVG } from '../assets/icons';

const paymentModal = (ID) => {
  const html = `
    <div class="${ID}-ways-to-pay-slide" data-model="payment">
      <div class="${ID}-ways-to-pay-slide-close">
        ${closeSVG}
      </div>
      <div class="${ID}-ways-to-pay-slide-content">
        <h2>There's more than one way to pay</h2>
        <div class="${ID}-payment-options">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dwdc84cd99/payment-cards-icons/Pink-Klarna-Badge.png" alt="Klarna">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw3b871e32/payment-cards-icons/PayPal-icon-blue.png" alt="PayPal">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw39389ee9/payment-cards-icons/Visa-Card-Icon-transparent-bg.png" alt="Visa">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dwc9397051/payment-cards-icons/Mastercard-icon-sign.png" alt="Mastercard">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw3e8f964f/payment-cards-icons/maestro-sign-icon.png" alt="Maestro">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw3100084d/payment-cards-icons/Amex-Card-Icon-cropped.png" alt="American Express">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw7f1e508c/payment-cards-icons/amazonPay-icon.png" alt="Amazon Pay">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw3c339ce4/payment-cards-icons/ApplePay-Card-Icon.png" alt="Apple Pay">
          <img src="https://www.hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dw45f2ff94/payment-cards-icons/Gift-Card-Icon.png" alt="HotelChocolat Gift Card">
        </div>
        <p class="${ID}-following-options">For online orders, you can pay by the following payment options:</p>
        <ul>
          <li>Visa, Mastercard, Maestro, American Express</li>
          <li>Klarna</li>
          <li>PayPal</li>
          <li>Apple Pay</li>
          <li>Amazon Pay</li>
        </ul>
        <p>For orders over the telephone, you can pay by Visa, Mastercard, Maestro and American Express.</p>
        <div class="${ID}-continue-shopping">
          <a>return to shopping bag</a>
        </div>
      </div>
    </div>`;

  return html.trim();
};

export default paymentModal;
