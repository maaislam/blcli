import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  // console.log(`%cVIP Member Found`, `font-size: 30px;`);
  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  // common
  localStorage.setItem(`${ID}-FromVelvetiser`, true);
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  };
  let isFired = false;
  const wouldHaveSeen = () => {
    const targetDOM = document.querySelector(`.HC129-accordionStep.HC129-colours`);
    let bottomOff = targetDOM?.getBoundingClientRect().bottom;
    let topOff = targetDOM?.getBoundingClientRect().top;
    let compareVal = 50;
    if (window.innerWidth < 768) {
      compareVal = 120;
    }
    // console.log(targetDOM?.getBoundingClientRect());
    if (bottomOff < window.innerHeight && topOff > compareVal) {
      fireEvent(`User would have seen the VIP message on ${getDeviceType()} device`);
      // console.log(`User would have seen the VIP message on ${getDeviceType()} device`);
      isFired = true;
    }
  };
  pollerLite([`.HC129-topContent`], () => {
    wouldHaveSeen();
    window.addEventListener("scroll", function (e) {
      if (!isFired) {
        wouldHaveSeen();
      }
    });
    document.querySelector(`.HC129-right`).addEventListener("click", function ({ target }) {
      if (target.closest(`a.${ID}-vipme-text-secondary-link`)) {
        const label = target.textContent?.trim();
        // console.log(`Click - User clicks to ${label}`);
        fireEvent(`Click - User clicks to ${label}`);
      } else if (target.closest(`.HC129-add.HC129-buttonShow`)) {
        // console.log(`Click - User clicks Add to bag`);
        fireEvent(`Click - User clicks Add to bag`);
      }
    });
  });
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
  pollerLite([`.HC129-topContent`], () => {
    const link = `https://www.hotelchocolat.com/uk/my-account/login?TargetPipeline=VipMeSignUp-Show`;
    const vipMe = `<div class="${ID}-vipme-wrapper"><p class="${ID}-vipme-text"><span class="${ID}-vipme-text-main">VIP.ME</span>&nbsp;&nbsp;<span class="${ID}-vipme-text-secondary"><span class="${ID}-vipme-text-secondary-symbol">£</span><span class="${ID}-vipme-text-secondary-price">69.95</span> members-only price. <a href="${link}" class="${ID}-vipme-text-secondary-link">Join</a> or <a href="${link}" class="${ID}-vipme-text-secondary-link">log in</a></span></p></div>`;
    document.querySelector(`.HC129-accordionStep.HC129-colours`).insertAdjacentHTML("beforebegin", vipMe);
  });
};
