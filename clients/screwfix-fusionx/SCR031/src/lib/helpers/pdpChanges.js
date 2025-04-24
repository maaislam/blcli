import shared from '../../../../../../core-files/shared';
import discount from '../components/discount';
import pdpPriceMsg from '../components/pdpPriceMsg';
import { findObject, getPercentageDiscount } from './utils';

const { ID } = shared;

const pdpChanges = () => {
  console.log('pdp changes');
  const pathname = window.location.pathname;
  const vatState = document.querySelector('[data-qaid="pdp-vat-toggle"]').innerText;
  const vatPriceConfig = {
    'EX VAT': {
      currentPrice: 'currentPriceExVat',
      wasPrice: 'wasPriceExVat',
      savings: 'savingsExVat',
    },
    'INC VAT': {
      currentPrice: 'currentPriceIncVat',
      wasPrice: 'wasPriceIncVat',
      savings: 'savingsIncVat',
    },
  };

  const sku = pathname.slice(pathname.lastIndexOf('/') + 1);
  const priceObj = findObject(window.__NEXT_DATA__, 'skuId', sku.toUpperCase());
  const priceInfo = priceObj.priceInformation;
  const vatGroup = vatPriceConfig[vatState];

  const price = priceInfo[vatGroup.currentPrice].amount;
  const wasPrice = priceInfo[vatGroup.wasPrice].amount;
  const savingsPercent = `${priceInfo.savingsPercent * 100}%`;

  const controlPriceBlock = document.querySelector('[data-qaid="pdp-price"]');
  controlPriceBlock.parentElement.parentElement.classList.add(`${ID}__hide`);
  console.log(wasPrice, price, savingsPercent);
  // render change
  if (savingsPercent && wasPrice && price) {
    document
      .querySelector('[data-qaid="pdp_sticky_product_footer"]')
      .insertAdjacentHTML('beforebegin', pdpPriceMsg(ID, price, vatState, wasPrice, savingsPercent));
  }
};

export default pdpChanges;
