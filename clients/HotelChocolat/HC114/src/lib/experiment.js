import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const amount = document.querySelector(
    ".cart-total .order-subtotal td:last-of-type"
  );
  const parsedAmount = parseFloat(amount.textContent.replace("£", "")).toFixed(
    2
  );

  const amountToSpend = (pricePoint) => {
    const spendSum = (pricePoint - parsedAmount).toFixed(2);
    return spendSum;
  };

  const addBanner = (amount) => {
    const banner = `
    <div class="${ID}-savingBanner">
      <div class="${ID}-container">
        <p>Spend <b>£${amount}</b> more to get FREE Easter Express Delivery</p>
      </div>
    </div>`;

    document
      .querySelector(".shopping-bag-slot-wrapper")
      .insertAdjacentHTML("afterend", banner);
  };

  if (parsedAmount < 40) {
    addBanner(amountToSpend(40));
  }
};
