/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
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

  // ORIGINAL
  // const content = [
  //   {
  //     heading: "Take our quiz",
  //     text: "Get personalised nutritionist recommendations in 60 seconds.",
  //   },
  //   {
  //     heading: "Need some help?",
  //     text: "Our expert nutritionists have created this quick quiz to share recommendations tailored to your health goals.",
  //   },
  // ];

  // const banner = /* html */ `
  // <li class="clc-List_Item js-LoadMore_Item ${ID}-root">
  // 	<div class="${ID}-banner">
  // 		<div class="${ID}-banner-content">
  // 			<h3>${VARIATION == 1 ? content[0].heading : content[1].heading}</h3>
  // 			<p>${VARIATION == 1 ? content[0].text : content[1].text}</p>
  // 			<a href="/pages/quiz-1" class="${ID}-banner-cta clc-Promotion_Button btn-Primary btn-Primary-white">Take our 60-second Quiz</a>
  // 		</div>
  // 	</div>
  // </li>
  // `;
  // END ORIGINAL

  // TEMPORARY
  const content = {
    2: {
      heading: "Take our quiz",
      text: "Get personalised nutritionist recommendations in 60 seconds.",
    },
    3: {
      heading: "Need some help?",
      text: "Our expert nutritionists have created this quick quiz to share recommendations tailored to your health goals.",
    },
  };

  const banner = /* html */ `
	<li class="clc-List_Item js-LoadMore_Item ${ID}-root">
		<div class="${ID}-banner">
			<div class="${ID}-banner-content">
				<h3>${content[VARIATION].heading}</h3>
				<p>${content[VARIATION].text}</p>
				<a href="/pages/quiz-1" class="${ID}-banner-cta clc-Promotion_Button btn-Primary btn-Primary-white">Take our 60-second Quiz</a>
			</div>
		</div>
	</li>
	`;
  // END TEMPORARY

  const mobileEntry = document.querySelector("ul .clc-List_Item:nth-child(2)");
  const desktopEntry = document.querySelector("ul .clc-List_Item:nth-child(3)");

  (function renderBanner() {
    if (window.innerWidth < 1201) {
      mobileEntry.insertAdjacentHTML("afterend", banner);
    } else {
      desktopEntry.insertAdjacentHTML("afterend", banner);
    }

    const root = document.querySelector(`.${ID}-banner`);

    // Tracking
    root.addEventListener("click", () => {
      fireEvent("Banner Clicked");
    });
  })();

  window.addEventListener("resize", () => {
    const el = document.querySelector(`.${ID}-root`);

    if (window.innerWidth < 1201) {
      mobileEntry.insertAdjacentElement("afterend", el);
    } else {
      desktopEntry.insertAdjacentElement("afterend", el);
    }
  });

  // Tracking
  new IntersectionObserver((e) => {
    if (e[0].isIntersecting) {
      fireEvent("Banner In View");
    }
  }).observe(document.querySelector(`.${ID}-root`));
};
