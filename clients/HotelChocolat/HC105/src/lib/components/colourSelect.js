import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const colourSelect = (initial, callback) => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-colour-select`);
  el.innerHTML = /* HTML */ `
    <h3 class="${ID}-colour-select__heading">Choose your Velvetiser colour:</h3>
    <ul class="${ID}-colour-select__list">
      <li class="${ID}-colour-select__list-item">
        <button
          class="${ID}-colour-select__button"
          data-colour-select-button
          data-colour="charcoal"
          data-sku="472727"
          data-product-name="The Velvetiser - Charcoal Edition"
        >
          <span class="${ID}-visually-hidden">Charcoal</span>
        </button>
      </li>
      <li class="${ID}-colour-select__list-item">
        <button
          class="${ID}-colour-select__button"
          data-colour-select-button
          data-colour="copper"
          data-sku="472726"
          data-product-name="The Velvetiser - Copper Edition"
        >
          <span class="${ID}-visually-hidden">Copper</span>
        </button>
      </li>
      <li class="${ID}-colour-select__list-item">
        <button
          class="${ID}-colour-select__button"
          data-colour-select-button
          data-colour="white"
          data-sku="472725"
          data-product-name="The Velvetiser - White Edition"
        >
          <span class="${ID}-visually-hidden">White</span>
        </button>
      </li>
      <li class="${ID}-colour-select__list-item">
        <button
          class="${ID}-colour-select__button"
          data-colour-select-button
          data-colour="platinum"
          data-sku="472809"
          data-product-name="The Velvetiser - Platinum Edition"
        >
          <span class="${ID}-visually-hidden">Platinum</span>
        </button>
      </li>
    </ul>
  `;

  const buttons = el.querySelectorAll("[data-colour-select-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", callback);

    if (button.dataset.colour === initial) {
      button.classList.add(`${ID}-active`);
    }
  });

  return el;
};

export default colourSelect;
