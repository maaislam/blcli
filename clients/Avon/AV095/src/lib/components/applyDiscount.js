const applyDiscount = (discountCode) => {
  const checkoutPage = window.location.pathname.includes('checkouts');

  if (checkoutPage) {
    const discountField = document.querySelector('#checkout_reduction_code');

    const submitBtn = discountField.closest('.field__input-btn-wrapper').querySelector('button');

    discountField.addEventListener('change', () => {
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.remove('btn--disabled');
      submitBtn.click();
    });

    let changeEvent = new Event('change');
    discountField.value = discountCode;
    discountField.dispatchEvent(changeEvent);
  }
};

export default applyDiscount;
