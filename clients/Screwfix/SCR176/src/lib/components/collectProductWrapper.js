import { productCard } from './productCard';

export const collectProductWrapper = (id, branchName, items) => {
  const html = `
        <div class="${id}__container">
            <h3 class="${id}__title">CLICK & COLLECT from ${branchName}</h3>
            <div class="${id}__peoductsWrapper">
              ${items
                .map((item) => {
                  return productCard(id, item);
                })
                .join('\n')}  
            </div>
        </div>

    `;
  return html.trim();
};
