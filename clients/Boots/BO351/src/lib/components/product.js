import { minusIcon, plusIcon } from '../assets/icons.js';
import dropdown from './dropdown.js';

const formatPrice = (amount, code = 'en-GB', currency = 'GBP') =>
  new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);

const productCard = (id, data, partNumber, sku, varCode, quantity) => {
  const { actionURL, offerName, hasVariants, currentPrice } = data[0];
  const totalPrice = Number(currentPrice) * Number(quantity);

  const productImg = `https://boots.scene7.com/is/image/Boots/${sku}${varCode || ''}?wid=114&hei=114&op_sharpen=1`;

  const htmlStr = `
    <div class="${id}__cardWrapper" id="${id}__recentlyAddedProduct">
        <div class="${id}__card">
            <div class="${id}__cardBody">
                <img src="${productImg}" alt="${offerName}" class="card-img">
                <div class="${id}__productInfo">
                    <div class="${id}__productBaseInfo">
                        <a class="${id}__productName" href="${actionURL}">${offerName}</a>
                        <div class="${id}__productId">${partNumber}</div>
                    </div>

                    <div class="${id}__productDetails">
                        ${
                          hasVariants
                            ? `
                            <p class="colour-text"><strong>Colour</strong></p>
                            ${dropdown(id, data[0].variants, sku, varCode)}
                        `
                            : ''
                        }
                        
                        <p class='${id}__quantityLabel'><strong>Quantity</strong></p>
                        <div class="${id}__actions">
                            <div class="${id}__quantityWrapper" data-partnumber="${partNumber}">
                                <button class="${id}__quantityBtn ${id}__minusQtyBtn">${minusIcon}</button>
                                <input type="text" class="${id}__quantityInput" value="${quantity}" readonly min="1">
                                <button class="${id}__quantityBtn ${id}__plusQtyBtn">${plusIcon}</button>
                            </div>
                            
                            <div class="${id}__price">${formatPrice(totalPrice)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="${id}__loaderWrapper">
        <div class="${id}__loader"></div>
        <div class="${id}__loader"></div>
    </div>
    `;

  return htmlStr;
};
export default productCard;
