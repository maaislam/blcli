import { formatGBP } from '../helpers/utils';

export const productCard = (id, item) => {
  const { price, product, quantity } = item;
  const html = `
            <div class="${id}__card">
                <div class="${id}__product-info">
                <div class="${id}__image-placeholder">
                  <img src="${product.imageUrl}" alt="${product.name}" class="${id}__image" />
                </div>
                <div class="${id}__details">
                    <p class="${id}__product-name">${product.name}</p>
                    <p class="${id}__sku">(${product.sku})</p>
                </div>
                </div>
                <div class="${id}__price-info">
                   <input class="${id}__quantity-input" type="number" value="${quantity}" />
                    <p class="${id}__price">${formatGBP(price.originalPriceIncVat)}</p>
                </div>
                <div class="${id}__actions">
                <a href="#" class="${id}__link">Update</a>
                <a href="#" class="${id}__link">Remove</a>
                <a href="#" class="${id}__link">Move to saved list</a>
                </div>

                <div class="${id}__availability">
                <p>3 in stock to <strong>Collect Today</strong></p>
                <p>Available for Delivery <strong>Next Day*</strong></p>
                </div>

                <div class="${id}__buttons">
                <button class="${id}__btn ${id}__btn--primary">Collect <span>✔</span></button>
                <button class="${id}__btn ${id}__btn--secondary">Deliver</button>
                </div>

                <p class="${id}__error">
                ❌ Harrow doesn’t have enough stock to fulfill your order. Please select from one of the options below
                </p>

                <div class="${id}__options">
                <label><input type="radio" name="collect-option"> All items Collect <strong>Next Day*</strong></label><br>
                <label><input type="radio" name="collect-option"> 3 x Collect Today, 9996 x Collect <strong>Next Day*</strong></label>
                </div>
            </div>
    `;
  return html.trim();
};
