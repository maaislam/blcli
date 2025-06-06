const clickHandler = (target, fireEvent, shared) => {
  const { ID } = shared;
  const clickedElm = (selector) => target.closest(selector);
  if (clickedElm(`.${ID}__deliverydate`)) {
    //remove already selected
    document.querySelectorAll(`.${ID}__deliverydate`).forEach((elm) => {
      elm.classList.remove('selected-date');
    });
    const clickElement = clickedElm(`.${ID}__deliverydate`);
    const clickedDateIndex = clickElement.dataset.dateindex;

    clickedElm(`.${ID}__deliverydate`).classList.add('selected-date');
    sessionStorage.setItem(`${ID}__selected-delivery-date`, clickedDateIndex);
    sessionStorage.removeItem(`${ID}__date-selected-at-checkout`);
    fireEvent('User chooses a date at PDP');
  } else if (clickedElm('[data-test-id="add-to-basket"]')) {
    fireEvent('User interacts with Add to Basket CTA');
  } else if (clickedElm('[data-test-id="add-to-collection-btn"]')) {
    fireEvent('User interacts with Collection CTA');
  } else if (clickedElm('[data-test-id="calendar-slot"]') && window.location.pathname === '/tc/basket') {
    const dateSelected = target
      .closest('[data-test-id="calendar-slot"]')
      .querySelector("[data-test-id='slot-date']").innerText;
    sessionStorage.setItem(`${ID}__date-selected-at-checkout`, dateSelected);
    sessionStorage.removeItem(`${ID}__selected-delivery-date`);
    fireEvent('User chooses a date at checkout');
  } else if (clickedElm('[data-test-id="frequently-bought-together-wrapper"]')) {
    fireEvent('User interact with frequently bought together products carousel');
  }
};

export default clickHandler;
