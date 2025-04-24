import { formatGBP } from '../helpers/utils';

export const checkoutSummary = (id, priceInformation) => {
  const html = `
        <div class="checkout-summary__container">
            <div class="checkout-summary__row">
                <span class="checkout-summary__label">Sub total <small>(inc. VAT)</small></span>
                <span class="checkout-summary__value">${formatGBP(priceInformation.subTotalIncVat)}</span>
            </div>

            <div class="checkout-summary__row">
                <span class="checkout-summary__label">Delivery <small>(inc. VAT)</small></span>
                <span class="checkout-summary__value checkout-summary__value--free">${formatGBP(
                  priceInformation.discountTotalIncVat
                )}</span>
            </div>

            <hr class="checkout-summary__divider" />

            <div class="checkout-summary__row checkout-summary__row--total">
                <span class="checkout-summary__label">Total <small>(inc. VAT)</small></span>
                <span class="checkout-summary__value">${formatGBP(priceInformation.totalIncVat)}</span>
            </div>

            <button class="checkout-summary__btn checkout-summary__btn--primary">Checkout securely</button>
            <button class="checkout-summary__btn checkout-summary__btn--secondary">Continue shopping</button>

            <div class="checkout-summary__payment-icons">
                <img src="visa.png" alt="Visa" class="checkout-summary__icon" />
                <img src="mastercard.png" alt="Mastercard" class="checkout-summary__icon" />
                <img src="amex.png" alt="Amex" class="checkout-summary__icon" />
            </div>
        </div>

    `;
  return html.trim();
};
