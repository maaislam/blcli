import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const banner = () => {
  const el = document.createElement("header");
  el.classList.add(`${ID}-banner`);
  el.innerHTML = /* HTML */ `
    <div class="${ID}-banner__container">
      <img
        class="${ID}-banner__desktop-image ${ID}-banner__desktop-image--left"
        src="https://blcro.fra1.digitaloceanspaces.com/ME328/desktop-left.png"
        alt=""
      />
      <div class="${ID}-banner__logo-container">
        <p>Merchoid presents</p>
        <img
          class="${ID}-banner__logo-image"
          src="https://blcro.fra1.digitaloceanspaces.com/ME328/logo.png"
          alt="Loungefly"
        />
        <p>Officially licensed</p>
      </div>
      <img
        class="${ID}-banner__desktop-image ${ID}-banner__desktop-image--right"
        src="https://blcro.fra1.digitaloceanspaces.com/ME328/desktop-right.png"
        alt=""
      />
      <img
        class="${ID}-banner__mobile-image"
        src="https://blcro.fra1.digitaloceanspaces.com/ME328/mobile.png"
        alt=""
      />
    </div>
  `;

  return el;
};

export default banner;
