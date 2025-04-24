import { formatPrice } from '../helpers/utils';
import paymentIcons from './paymentIcons';

export const stickyWrapper = (id, basketInfo, VARIATION, className) => {
  const { subTotalValue, totalSavingsAmount, totalBasketValue, totalItemCount, currencySymbol, totalPoints } = basketInfo;
  const html = `
       <div class="${id}__stickyWrapper ${className ? `${className}` : ''}">
        <div class="oct-basket-totals ${id}__oct-basket-totals"
     data-message-type="notification-banner">
     ${VARIATION === '2' ? `<span class="${id}__details">See detailed breakdown</span>` : ''}
    <div class="oct-basket-totals__topDescription">
        <div class="oct-basket-totals__header">
            <p class="oct-text oct-text--standard oct-text--size_m oct-basket-totals__description"
               data-testid="text">Subtotal</p>
            <p class="oct-text oct-text--standard oct-text--size_m oct-basket-totals__descriptionEnd ${id}__subtotal"
               data-testid="text">${!currencySymbol ? formatPrice(subTotalValue) : `${subTotalValue} points`}</p>
        </div>
        <div class="oct-basket-totals__red oct-basket-totals__offers-displayed">
            <p class="oct-text oct-text--standard oct-text--size_s oct-basket-totals__description"
               data-testid="text">Savings</p>
            <p class="oct-text oct-text--standard oct-text--size_s oct-basket-totals__descriptionEnd ${id}__totalSavingsAmount"
               data-testid="text">-${!currencySymbol ? formatPrice(totalSavingsAmount) : `${totalSavingsAmount} points`}</p>
        </div>
    </div>
    <div class="oct-basket-totals__row">
        <p class="oct-text oct-text--bold oct-text--size_m oct-basket-totals__description ${id}__totalItemCount"
           data-testid="text">Total (${totalItemCount} items)</p>
        <p class="oct-text oct-text--standard oct-text--size_m oct-basket-totals__descriptionEnd ${id}__totalBasketValue"
           data-testid="text">${!currencySymbol ? formatPrice(totalBasketValue) : `${totalBasketValue} points`}</p>
    </div>
    <div class="oct-basket-totals__delivery-header">
        <p class="oct-text oct-text--standard oct-text--size_xs oct-basket-totals__subText"
           data-testid="text">Excludes delivery</p>
        ${
          totalPoints
            ? `
                 <p class="oct-text oct-text--standard oct-text--size_xs oct-basket-totals__points oct-basket-totals__textEnd ${id}__points"
           data-testid="text">${totalPoints ? `+${totalPoints} POINTS` : ''}</p>
            `
            : ''
        }
       
    </div>
    <div class="oct-basket-footer">
        <div class="oct-basket-footer-actions">
            <div class="oct-basket-footer-actions__buttons-container">
                <div class=""
                     data-testid="checkout-now-cta-container">
                    <div class="oct-payment-button__button-container ${id}__checkout-button"><button data-testid="button"
                                class="oct-button oct-button--ellipses oct-button--cta oct-button--cta-default oct-button--cta-default-primaryTransparent oct-button--cta-default-responsive oct-payment-button__checkout-button oct-button--cta-midnight-blue-primary"
                                id="checkout-now-cta"
                                type="button"
                                data-element="Basket checkout button">
                            <div class="oct-button__content">CHECKOUT NOW</div>
                        </button></div>
                </div>
            </div>
            ${paymentIcons(id)}
            <div class="oct-basket-footer-actions__express-checkout-section">
                <div
                     class="oct-basket-footer-actions__express-checkout-buttons-container oct-basket-footer-actions__buttons-container--guestUser oct-basket-footer-actions__buttons-container--column">
                </div>
            </div>
        </div>
    </div>
    <div class="oct-payment-order__terms"
         data-testid="agreement-wrapper"><label
               class="oct-text oct-text--light oct-text--size_xs oct-payment-order__agreement"
               data-testid="text"
               for="agreement">By checking out, I agree to Boots <a href="#"
               class="oct-link oct-link--theme-text oct-color--boots-blue synthetix_link undefined"
               syn-trigger="T_AND_C_BASKET">Terms &amp; Conditions</a> and accept Boots <a href="#"
               class="oct-link oct-link--theme-text oct-color--boots-blue synthetix_link undefined"
               syn-trigger="PRIVACY_POLICY_BASKET">Privacy Policy</a>.</label></div>
</div>
</div>
    `;
  return html.trim();
};

export const stickyWrapperAnother = (id, basketInfo, VARIATION, className) => {
  const { subTotalValue, totalSavingsAmount, totalBasketValue, totalItemCount, currencySymbol, totalPoints } = basketInfo;
  const html = `
         <div class="${id}__stickyWrapperAnother ${className ? `${className}` : ''}">
          <div class="oct-basket-totals ${id}__oct-basket-totals"
       data-message-type="notification-banner">
       ${VARIATION === '2' ? `<span class="${id}__details">See detailed breakdown</span>` : ''}
      <div class="oct-basket-totals__topDescription">
          <div class="oct-basket-totals__header">
              <p class="oct-text oct-text--standard oct-text--size_m oct-basket-totals__description"
                 data-testid="text">Subtotal</p>
              <p class="oct-text oct-text--standard oct-text--size_m oct-basket-totals__descriptionEnd ${id}__subtotal"
                 data-testid="text">${!currencySymbol ? formatPrice(subTotalValue) : `${subTotalValue} points`}</p>
          </div>
          <div class="oct-basket-totals__red oct-basket-totals__offers-displayed">
              <p class="oct-text oct-text--standard oct-text--size_s oct-basket-totals__description"
                 data-testid="text">Savings</p>
              <p class="oct-text oct-text--standard oct-text--size_s oct-basket-totals__descriptionEnd ${id}__totalSavingsAmount"
                 data-testid="text">-${!currencySymbol ? formatPrice(totalSavingsAmount) : `${totalSavingsAmount} points`}</p>
          </div>
      </div>
      <div class="oct-basket-totals__row">
          <p class="oct-text oct-text--bold oct-text--size_m oct-basket-totals__description ${id}__totalItemCount"
             data-testid="text">Total (${totalItemCount} items)</p>
          <p class="oct-text oct-text--standard oct-text--size_m oct-basket-totals__descriptionEnd ${id}__totalBasketValue"
             data-testid="text">${!currencySymbol ? formatPrice(totalBasketValue) : `${totalBasketValue} points`}</p>
      </div>
      <div class="oct-basket-totals__delivery-header">
          <p class="oct-text oct-text--standard oct-text--size_xs oct-basket-totals__subText"
             data-testid="text">Excludes delivery</p>
          ${
            totalPoints
              ? `
                   <p class="oct-text oct-text--standard oct-text--size_xs oct-basket-totals__points oct-basket-totals__textEnd ${id}__points"
             data-testid="text">${totalPoints ? `+${totalPoints} POINTS` : ''}</p>
              `
              : ''
          }
         
      </div>
      <div class="oct-basket-footer">
          <div class="oct-basket-footer-actions">
              <div class="oct-basket-footer-actions__buttons-container">
                  <div class=""
                       data-testid="checkout-now-cta-container">
                      <div class="oct-payment-button__button-container ${id}__checkout-button"><button data-testid="button"
                                  class="oct-button oct-button--ellipses oct-button--cta oct-button--cta-default oct-button--cta-default-primaryTransparent oct-button--cta-default-responsive oct-payment-button__checkout-button oct-button--cta-midnight-blue-primary"
                                  id="checkout-now-cta"
                                  type="button"
                                  data-element="Basket checkout button">
                              <div class="oct-button__content">CHECKOUT NOW</div>
                          </button></div>
                  </div>
              </div>
              ${paymentIcons(id)}
              <div class="oct-basket-footer-actions__express-checkout-section">
                  <div
                       class="oct-basket-footer-actions__express-checkout-buttons-container oct-basket-footer-actions__buttons-container--guestUser oct-basket-footer-actions__buttons-container--column">
                  </div>
              </div>
          </div>
      </div>
      <div class="oct-payment-order__terms"
           data-testid="agreement-wrapper"><label
                 class="oct-text oct-text--light oct-text--size_xs oct-payment-order__agreement"
                 data-testid="text"
                 for="agreement">By checking out, I agree to Boots <a href="#"
                 class="oct-link oct-link--theme-text oct-color--boots-blue synthetix_link undefined"
                 syn-trigger="T_AND_C_BASKET">Terms &amp; Conditions</a> and accept Boots <a href="#"
                 class="oct-link oct-link--theme-text oct-color--boots-blue synthetix_link undefined"
                 syn-trigger="PRIVACY_POLICY_BASKET">Privacy Policy</a>.</label></div>
  </div>
  </div>
      `;
  return html.trim();
};
