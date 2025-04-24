import { fireEvent } from '../../../../../../core-files/services';

const quantityHandler = (id, target) => {
  const parentElem = target.closest(`.${id}__tradeProdItem`);
  if (!parentElem) return null;
  const atbBtn = parentElem.querySelector(`.${id}__atcContainer`);
  if (target.closest(`.${id}__quantity-plus`)) {
    const quantityValue = parentElem.querySelector(`.${id}__quantity-val`);
    let currentValue = parseInt(quantityValue.innerText);
    //console.log('🚀 ~ quantityHandler ~ currentValue:', currentValue);
    currentValue = currentValue + 1;
    quantityValue.innerText = currentValue;
    atbBtn.setAttribute('data-quantity', currentValue);
    parentElem.querySelector(`.${id}__quantity-minus`).classList.add('enabled');
    fireEvent('User interacts with quantity selector');
  }

  // Check if the clicked element is the decrease button
  if (target.closest(`.${id}__quantity-minus`)) {
    const quantityValue = parentElem.querySelector(`.${id}__quantity-val`);
    let currentValue = parseInt(quantityValue.innerText);
    if (currentValue > 1) {
      currentValue = currentValue - 1;
      quantityValue.innerText = currentValue;
      atbBtn.setAttribute('data-quantity', currentValue);
    }
    if (currentValue === 1) {
      parentElem.querySelector(`.${id}__quantity-minus`).classList.remove('enabled');
    }
    fireEvent('User interacts with quantity selector');
  }
  return null;
};
export default quantityHandler;
