import { fireEvent } from '../../../../../../core-files/services';
import { dispatchHandler, urlHandler } from './utils';

export const validateInput = (qtyInput, maxLength, qtyMin) => {
  var qty = qtyInput.value.replace(/\D/g, ''); // Remove any non-digit characters
  if (qty.length > maxLength) {
    qty = qty.slice(0, maxLength);
  }
  qtyInput.value = qty;
  toggleButtons(qtyInput, qtyMin);
};

export const toggleButtons = (qtyInput, qtyMin) => {
  const minusBtn = document.querySelector('.qty-count--minus');
  const addBtn = document.querySelector('.qty-count--add');
  minusBtn.disabled = parseInt(qtyInput.value) <= qtyMin;
  addBtn.disabled = parseInt(qtyInput.value) === 9999;
};

export const inputValidation = (ID) => {
  const qtyContainer = document.querySelector('.qty-input');
  const qtyInput = qtyContainer.querySelector('.product-qty');
  const qtyMin = parseInt(qtyInput.getAttribute('min'));
  const maxLength = parseInt(qtyInput.getAttribute('maxlength'));

  const inputListener = () => {
    fireEvent('User interacts with quantity by typing');
    validateInput(qtyInput, maxLength, qtyMin);
    dispatchHandler(qtyInput.value);
    urlHandler(ID, window?.utag?.data.prodSku[0], qtyInput.value);
  };

  qtyInput.removeEventListener('input', inputListener);
  qtyInput.addEventListener('input', inputListener);

  validateInput(qtyInput, maxLength, qtyMin);
};
