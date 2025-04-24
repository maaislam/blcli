import { formatPrice, isPDP } from '../helpers/utils';

const newPrice = (id, newPrice, perItemText) => {
  return `<div class="${id}__newprice"><h2 class="${isPDP() ? 'big-font' : ''}">${formatPrice(newPrice)}</h2><span class="${
    perItemText.length > 4 ? `push-down` : ''
  }">${perItemText}</span></div>`;
};
export default newPrice;
