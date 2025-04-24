import settings from '../../settings';
import { updateUrlParameter } from '../../../../../../../lib/utils';

const { ID } = settings;

const eventListener = null;

const fn = (e) => {

  if (document.querySelector(`.${ID}-priceError`)) {
    document.querySelector(`.${ID}-priceError`).remove();
  }

  const lowPrice = jQuery('#lowLimit').val();
  const highPrice = jQuery('#highLimit').val();

  const addPriceError = () => {
    const minPrice = document.querySelector(`.${ID}-price-select`);
    minPrice.classList.add(`${ID}-minError`);
    const errorPrice = document.createElement('div');
    errorPrice.classList.add(`${ID}-priceError`);
    errorPrice.innerHTML = '<span>Minimum price must not exceed maxium price</span>';

    document.querySelector(`.${ID}_priceDropdown`).appendChild(errorPrice);
  };

  // if minimum price is higher than lower price
  if (highPrice < lowPrice) {
    addPriceError();
    return;
  }

  let url = window.location.href;

  if (lowPrice === '' && highPrice !== '') { // if low price empty, high price entered
    url = updateUrlParameter(url, 'Nf', `P_Current_Price%7CBTWN+0+${highPrice}`);
  } else if (highPrice === '' && lowPrice !== '') { // if high price empty, low price entered
    url = updateUrlParameter(url, 'Nf', `P_Current_Price%7CBTWN+${lowPrice}+9999`);
  } else if (highPrice === '' && lowPrice === '') { // if both entered
    url = updateUrlParameter(url, 'Nf', 'P_Current_Price%7CBTWN+0+9999');
  } else { // if none entered
    url = updateUrlParameter(url, 'Nf', `P_Current_Price%7CBTWN+${lowPrice}+${highPrice}`);
  }
  window.location.href = url;
};

export default () => {
  const applyPriceButtons = document.querySelectorAll(`.${ID}-applyPrice`);

  for (let index = 0; index < applyPriceButtons.length; index += 1) {
    const element = applyPriceButtons[index];
    jQuery(element).off('click');
    jQuery(element).on('click', fn);
  }
};
