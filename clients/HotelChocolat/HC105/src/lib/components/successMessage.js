import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const successMessage = (velvetiserName, bundleName, onContinue) => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-success-message`);
  el.innerHTML = /* HTML */ `
    <div class="${ID}-success-message__content">
      <h6>You've successfully added to bag:</h6>
      <div class="${ID}-success-message__content-container">
        <img
          src="https://blcro.fra1.digitaloceanspaces.com/HC105/output-onlinepngtools.png"
          alt=""
        />
        <div class="${ID}-success-message__content-items">
          <p>${velvetiserName}</p>
          ${bundleName !== 0 ? `<p>+ ${bundleName}</p>` : ""}
        </div>
      </div>
    </div>
    <div class="${ID}-success-message__buttons">
      <a
        class="${ID}-success-message__buttons-view-bag"
        href="https://www.hotelchocolat.com/uk/basket"
        >View bag</a
      >
      <button data-success-on-continue>Continue shopping</button>
    </div>
  `;

  el.querySelector("[data-success-on-continue]").addEventListener(
    "click",
    onContinue
  );

  return el;
};

export default successMessage;
