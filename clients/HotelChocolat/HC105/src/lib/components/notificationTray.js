import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const notificationTray = () => {
  if (document.querySelector(`.${ID}-notification`)) {
    document.querySelector(`.${ID}-notification`).remove();
  }
  const el = document.createElement("div");
  el.classList.add(`${ID}-notification`, `${ID}-notification--closed`);
  el.innerHTML = /* HTML */ `
    <button class="${ID}-notification__close" data-notification-close></button>
    <button
      class="${ID}-notification__toggle"
      data-notification-extras-toggle
    ></button>
    <div
      class="${ID}-notification__product-container"
      data-notification-product
    ></div>
    <div
      class="${ID}-notification__extras-container ${ID}-open"
      data-notification-extras-container
    ></div>
  `;

  const toggleExtrasButton = el.querySelector(
    "[data-notification-extras-toggle]"
  );

  const extrasContainer = el.querySelector(
    "[data-notification-extras-container]"
  );

  toggleExtrasButton.addEventListener("click", () => {
    extrasContainer.classList.toggle(`${ID}-open`);
    toggleExtrasButton.classList.toggle(`${ID}-open`);
  });

  return el;
};

export default notificationTray;
