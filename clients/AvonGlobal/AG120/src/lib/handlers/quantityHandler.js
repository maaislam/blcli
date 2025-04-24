const quantityHandler = (id, target) => {
  const parentElem = target.closest(`.${id}__productcard`);
  const atbBtn = parentElem.querySelector(`.${id}__addtocart-block`);
  if (target.closest(`.${id}__quantity-plus`)) {
    const quantityValue = parentElem.querySelector(`.${id}__quantity-val`);
    let currentValue = parseInt(quantityValue.innerText);
    currentValue = currentValue + 1;
    quantityValue.innerText = currentValue;
    atbBtn.setAttribute('data-quantity', currentValue);
    parentElem.querySelector(`.${id}__quantity-minus`).classList.add('enabled');
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
  }
  return null;
};
export default quantityHandler;
