import { fireEvent } from '../../../../../../core-files/services';

const quantityHandler = (id, target) => {
  const parentElem = target.closest(`.${id}__quantitycontainer`);
  const setQty = (input, newVal) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    const inputEvent = new Event('input', { bubbles: true });

    nativeInputValueSetter.call(input, newVal); // Set a new value for the input
    input.dispatchEvent(inputEvent);
  };
  //console.log('🚀 ~ file: clickHandler.js:4 ~ quantityHandler ~ parentElem:', parentElem);

  if (target.closest(`.${id}__quantity-plus`)) {
    const quantityValue = parentElem.querySelector('[data-qaid="product-quantity"]');
    let currentValue = parseInt(quantityValue.value);
    currentValue = currentValue + 1;
    setQty(quantityValue, currentValue);
    //quantityValue.setAttribute('value', currentValue);
    //atbBtn.setAttribute('data-quantity', currentValue);
    parentElem.querySelector(`.${id}__quantity-minus`).classList.add('enabled');
    fireEvent('Customer clicks quantity increase button');
  }

  // Check if the clicked element is the decrease button
  if (target.closest(`.${id}__quantity-minus`)) {
    const quantityValue = parentElem.querySelector('[data-qaid="product-quantity"]');
    let currentValue = parseInt(quantityValue.value);
    if (currentValue > 1) {
      currentValue = currentValue - 1;
      setQty(quantityValue, currentValue);
      fireEvent('Customer clicks quantity decrease button');
    }
    if (currentValue === 1) {
      parentElem.querySelector(`.${id}__quantity-minus`).classList.remove('enabled');
    }
  }

  if (target.closest('[data-qaid="product-quantity"]')) {
    fireEvent('Customer clicks the quantity textbox');
  }
  return null;
};
export default quantityHandler;
