import { formatPrice } from '../helpers/utils';

const priceWrapper = (id, { sku, newPrice, oldPrice, quantity, skuSavePercent }) => {
  const totalNewPrice = Number(newPrice) * Number(quantity);
  const totalOldPrice = oldPrice ? Number(oldPrice) * Number(quantity) : null;

  const html = `
        <div class="${id}__priceWrapper" data-sku="${sku}">
            ${
              totalOldPrice
                ? `
                 <span class="${id}__oldPrice" aria-label="Original price ${formatPrice(totalOldPrice)}">
                    <s>${formatPrice(totalOldPrice)}</s>
                </span>       
                `
                : ''
            }
           
            <div class="${id}__newPriceWrapper">
                ${
                  skuSavePercent
                    ? `
                        <span class="${id}__savings" aria-label="You save 18%">
                            <span aria-hidden="true">-</span>${skuSavePercent}%
                        </span>       
                    `
                    : ''
                }
               
                <span class="${id}__newPrice" aria-label="New price ${formatPrice(totalNewPrice)}">
                ${formatPrice(totalNewPrice)}
                </span>
            </div>
        </div>

    `;

  return html.trim();
};

export default priceWrapper;
