import settings from '../../lib/settings';

const { ID } = settings;

export default () => {
  const quantityBox = document.querySelector('#quantityChange');
  quantityBox.insertAdjacentHTML('beforebegin', `<button class="${ID}-decrease ${ID}-qty_button" type="button" title="Decrease Quantity"></button>`);
  quantityBox.insertAdjacentHTML('afterend', `<button class="${ID}-increase ${ID}-qty_button" type="button" title="Increase Quantity"></button>`);

  let value;
  let quantity = document.getElementsByClassName('quality');

  const createBindings = () => {
    const quantityAmount = document.querySelector('#quantityChange');
    const increase = document.querySelector(`.${ID}-increase`);
    const decrease = document.querySelector(`.${ID}-decrease`);
    // stop decrease going to 0
    decrease.classList.add(`${ID}-inactive`);

    increase.addEventListener('click', (e) => {
      increaseValue(e, quantityAmount);
      document.querySelector(`.${ID}-decrease`).classList.remove(`${ID}-inactive`);
    });
    decrease.addEventListener('click', (e) => {
      decreaseValue(e, quantityAmount);
      document.querySelector(`.${ID}-increase`).classList.remove(`${ID}-inactive`);
    });
  };

  const init = () => {
    for (let i = 0; i < quantity.length; i += 1) {
      createBindings(quantity[i]);
    }
  };

  const increaseValue = (event, quantityAmount) => {
    value = parseInt(quantityAmount.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    quantityAmount.value = value;
    if (value === 9) {
      document.querySelector(`.${ID}-increase`).classList.add(`${ID}-inactive`);
    }
  };

  const decreaseValue = (event, quantityAmount) => {
    value = parseInt(quantityAmount.value, 10);
    value = isNaN(value) ? 0 : value;
    if (value > 0) value--;
    quantityAmount.value = value;
    if (value === 1) {
      document.querySelector(`.${ID}-decrease`).classList.add(`${ID}-inactive`);
    }
  };

  init();
};
