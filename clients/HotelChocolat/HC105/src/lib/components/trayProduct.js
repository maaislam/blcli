import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const notificationTray = (image, product, price, onContinue) => {
  if (document.querySelector(`.${ID}-notification-product`)) {
    document.querySelector(`.${ID}-notification-product`).remove();
  }

  const el = document.createElement("div");
  el.classList.add(`${ID}-notification-product`);
  el.innerHTML = /* HTML */ `
    <div class="${ID}-notification-product__success-container">
      <div class="${ID}-notification-product__image-container">
        <img src="${image}" alt="" />
      </div>
      <div class="${ID}-notification-product__content">
        <div class="${ID}-notification-product__content-container">
          <img
            src="https://blcro.fra1.digitaloceanspaces.com/HC105/output-onlinepngtools.png"
            alt=""
          />
          <div class="${ID}-notification-product__content-items">
            <h6>You've successfully added to bag:</h6>
            <p>${product}</p>
            <p>£${price}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="${ID}-notification-product__buttons">
      <a
        class="${ID}-notification-product__buttons-view-bag"
        href="https://www.hotelchocolat.com/uk/basket"
        >View bag</a
      >
      <button data-success-on-continue>Continue shopping</button>
    </div>
  `;

  el.querySelector("[data-success-on-continue]").addEventListener(
    "click",
    (e) => onContinue(e)
  );

  return el;
};

export default notificationTray;
