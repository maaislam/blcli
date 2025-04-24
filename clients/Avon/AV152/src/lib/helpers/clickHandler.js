/*eslint-disable implicit-arrow-linebreak */

const clickHandler = (id, attachingElem, trckingHelper) => {
  const { shared, fireEvent } = trckingHelper;
  attachingElem.addEventListener('click', (e) => {
    const { target } = e;
    const targetMatched = (targetSelector) => target.matches(targetSelector) || target.closest(targetSelector);
    const parentElm = target.closest(`.${id}__banner-block`);
    const inputBox = target.closest(`.${id}__productactions`)?.querySelector('input');
    if (targetMatched(`.${id}__plus-btn`)) {
      inputBox.value = parseInt(inputBox.value) + 1;
      fireEvent('Interactions with quantity', shared);
    } else if (targetMatched(`.${id}__minus-btn`)) {
      inputBox.value = parseInt(inputBox.value <= 1 ? 2 : inputBox.value) - 1;
      fireEvent('Interactions with quantity', shared);
    }
  });
};

export default clickHandler;
