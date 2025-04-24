import { productCard } from './productCard';

export const deliveryProductWrapper = (id) => {
  const html = `
        <div class="${id}__container">
            <h3 class="${id}__title">For Delivery</h3>
            <div class="${id}__peoductsWrapper">
              ${productCard(id)}
            </div>
        </div>
    `;
  return html.trim();
};
