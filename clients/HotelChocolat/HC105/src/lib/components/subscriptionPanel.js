import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const subscriptionPanel = () => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-subscription-panel`);
  el.innerHTML = /* HTML */ `
    <p class="${ID}-subscription-panel__intro">
      Buy your Velvetiser™ for <strong>£49.95</strong> (saving £50) with a 6-or
      12-month Drinking Chocolate Subscription (from £13 / month).
    </p>
    <div class="${ID}-subscription-panel__info">
      <h4 class="${ID}-subscription-panel__info-heading">Why subscribe?</h4>
      <ul>
        <li>Easily swap recipes</li>
        <li>Includes <strong>free Standard UK Delivery</strong></li>
        <li>Enjoy a £15 voucher for every tenth subscription item</li>
      </ul>
    </div>
    <a
      href="https://www.hotelchocolat.com/uk/choose-your-machine?step=Machines"
      class="${ID}-subscription-panel__cta"
      >Proceed</a
    >
  `;

  return el;
};

export default subscriptionPanel;
