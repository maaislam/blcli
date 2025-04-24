import settings from '../settings';

export default () => {
  // get the product type by pulling it from the product title.
  const productName = document.querySelector('.buying-info__name');
  const getLastWord = productName.textContent.trim().split(' ').length - 1;
  const productType = productName.textContent.trim().split(' ')[getLastWord].toLowerCase();

  // get the finance start price from the finance text
  const financePrice = document.querySelector('.bujying-buttons-ifc__message');
  const priceBlock = document.querySelector('.buying-info__pricing');

  if (financePrice && productType) {
    const newFinanceMessage = document.createElement('div');
    newFinanceMessage.classList.add(`${settings.ID}-financeText`);
    newFinanceMessage.innerHTML = `<p>Interest Free Credit Available. Get this ${productType} from <span>${financePrice.textContent.match(/[£](\d+(?:\.\d{1,2})?)/)[0]}</span> per month</p>`;

    priceBlock.appendChild(newFinanceMessage);
  }
};

