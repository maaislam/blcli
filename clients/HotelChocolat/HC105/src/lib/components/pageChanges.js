import shared from "../../../../../../core-files/shared";

const { ID } = shared;

export default () => {
  // change into text
  const introText = document.querySelector("#page_heading h3");
  if (introText) {
    introText.textContent =
      "In-home hot chocolate machine. Imagined by Hotel Chocolat, engineered by Dualit. Select your colour - Velvetise your world!";
  }

  // add YT video
  const video = `<div class="${ID}-video"><div id="player"></div></div>`;
  document.querySelector(`.${ID}-vid`).insertAdjacentHTML("afterbegin", video);

  // remove ingredients on mobile
  const mobileTab = document.querySelectorAll(".tab-mobile-title");
  if (mobileTab) {
    for (let index = 0; index < mobileTab.length; index += 1) {
      const element = mobileTab[index];
      if (element.textContent.trim() === "INGREDIENTS") {
        element.style.display = "none";
      }
    }
  }
};
