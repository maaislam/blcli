export const currentDelCost = () => {
  const deliveryText = document.querySelector('.benefit-bar .o-unit-1of3--m .benefits-bar__content span');
  if (!deliveryText) {
    console.warn('delivery rate set at £79. DO001.');
    return;
  }

  const val = deliveryText.textContent.match(/\d+$/i);
  console.log(val);
}