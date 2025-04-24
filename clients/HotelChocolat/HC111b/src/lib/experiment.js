import { setup, fireEvent } from "../../../../../core-files/services";
// import { pollerLite } from "./../../../../../lib/utils";
// import { countdown } from "../../../../../lib/uc-lib";
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

  let countDownDate;

  const countdownEl = document.createElement("p");
  countdownEl.classList.add(`${ID}__countdownText`);
  countdownEl.innerHTML = /* HTML */ `
    FREE Easter Express Delivery when you spend £40 or more. Hurry offer ends in
    <span class="${ID}__countdown">
      <p><span class="days"></span></p>
      <p><span class="hours"></span></p>
      <p><span class="minutes"></span></p>
    </span>
  `;

  document
    .querySelector("#add-to-cart")
    .insertAdjacentElement("afterend", countdownEl);

  function isDateBeforeToday(date) {
    return new Date(date) < new Date(new Date());
  }

  if (isDateBeforeToday(new Date("Apr 14, 2022 18:00:00")) === false) {
    countDownDate = new Date("Apr 14, 2022 18:00:00").getTime();
  } else {
    document.querySelector(`.${ID}__countdownText`).remove();
  }

  setInterval(function () {
    const now = new Date().getTime();
    const timeleft = countDownDate - now;

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

    document.querySelector(`.${ID}__countdown .days`).innerHTML = days + "d ";
    document.querySelector(`.${ID}__countdown .hours`).innerHTML = hours + "h ";
    document.querySelector(`.${ID}__countdown .minutes`).innerHTML =
      minutes + "m ";
  }, 1000);
};
