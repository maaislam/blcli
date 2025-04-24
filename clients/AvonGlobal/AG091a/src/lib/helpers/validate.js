const validateInputs = (id, newInputWrapper, fireEvent) => {
  const name = newInputWrapper.querySelector('input[type="text"]');
  const email = newInputWrapper.querySelector('input[type="email"]');
  const phone = newInputWrapper.querySelector('input[type="number"]');

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.value !== '' ? re.test(String(email.value).toLowerCase()) : false;
  };
  const isNumberValid = (inputtxt) => {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return inputtxt.value.length > 0;
  };

  const isNameValid = (nameStr) => {
    return nameStr.value.length > 2;
  };

  const updateDom = (checkerFunc, elem, errMsg, type) => {
    if (!checkerFunc(elem)) {
      elem.closest(`div`).classList.add(`${id}_error`);
      elem.closest(`div`).querySelector('span')?.remove();
      elem.insertAdjacentHTML('afterend', `<span class="${id}_err-msg">${errMsg}</span>`);
      fireEvent(`${type.charAt(0).toUpperCase() + type.slice(1)} Errors`);
    } else {
      elem.classList.remove(`${id}_error`);
      elem.closest(`.${id}_${type}-block`).querySelector('span')?.remove();
    }
  };

  updateDom(isEmailValid, email, 'Please enter a valid email address', 'email');
  updateDom(isNameValid, name, 'Name must have more than 2 characters', 'name');
  updateDom(isNumberValid, phone, 'Must enter a contact number', 'number');

  return isEmailValid(email) && isNumberValid(name) && isNameValid(name);
};

export default validateInputs;
