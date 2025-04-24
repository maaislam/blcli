import { formatPrice } from '../helpers/utils';
import discount from './discount';

const pdpPriceMsg = (id, newPrice, vatText, oldPrice, discountVal) => {
  const htmlStr = `
    <div class="${id}__priceMsg">
        ${discount(id, discountVal)}
        <div class="${id}__priceMsg--newprice">${formatPrice(newPrice)}</div>
        <div class="${id}__priceMsg--vatstate">${vatText}</div>
        <div class="${id}__priceMsg--oldprice">${formatPrice(oldPrice)}</div>
    </div>`;
  return htmlStr.trim();
};

export default pdpPriceMsg;
