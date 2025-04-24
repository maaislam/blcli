import settings from "../settings";

/* Add the input price boxes for V2 */

export default () => {
  const newPriceBoxes = document.createElement('div');
  newPriceBoxes.classList.add(`${settings.ID}-priceBoxes`);
  newPriceBoxes.innerHTML = `
  £<input type="tel" name="lowLimit" step="50" maxlength="5" pattern="[0-9]+" title="Numbers between 0 - 99999" value="">
  <span>to</span>
  £<input id="highLimit" type="tel" name="highLimit" step="50" maxlength="5" pattern="[0-9]+" title="Numbers between 0 - 99999" value="">`;

  document.querySelector(`.${settings.ID}-priceInputs`).appendChild(newPriceBoxes);
};
