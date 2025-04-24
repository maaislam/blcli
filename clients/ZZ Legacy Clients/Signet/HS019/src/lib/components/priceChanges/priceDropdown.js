import settings from '../../settings';

const { ID } = settings;

export default class PriceDropdown {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_priceDropdown`);

    element.innerHTML =
    `<h4>Price:</h4>
    <select name="${ID}-price_min" class="${ID}-price-select">
      <option selected="selected" disabled="disabled" value="none">Min</option>
      <option value="0">£0</option>
      <option value="100">£100</option>
      <option value="200">£200</option>
      <option value="300">£300</option>
      <option value="400">£400</option>
      <option value="500">£500</option>
      <option value="600">£600</option>
      <option value="700">£700</option>
      <option value="800">£800</option>
      <option value="900">£900</option>
      <option value="9999">£1000+</option>
    </select>
    <select name="${ID}-price_max" class="${ID}-price-select">
      <option selected="selected" disabled="disabled" value="none">Max</option>
      <option value="100">£100</option>
      <option value="200">£200</option>
      <option value="300">£300</option>
      <option value="400">£400</option>
      <option value="500">£500</option>
      <option value="600">£600</option>
      <option value="700">£700</option>
      <option value="800">£800</option>
      <option value="900">£900</option>
      <option value="9999">£1000+</option>
    </select>`;

    this.component = element;
  }

  render() {
    const { component } = this;
    const priceBlock = document.querySelector(`#refinement-price .filters-panel__refinement-section-container .${ID}-applyPrice`);
    if (priceBlock) {
      priceBlock.insertAdjacentElement('afterend', component);
    }

    // add the apply button
    const applyButton = document.createElement('div');
    applyButton.classList.add(`${ID}-applyPrice`);
    applyButton.innerHTML = '<span>Apply</span>';

    component.insertAdjacentElement('afterend', applyButton);
  }
}
