/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { Accordion } from "./Accordion";

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
  const entryElement = document.querySelector(
    "ul.prd-Product_InfoItems.js-Accordion_Items"
  );

  const newElementMarkup = /* html */ `
	<details class="${ID}-accordion">
    <summary>
      <h4 class="prd-ProductInfoItem_Title">Ingredients & Nutritional Information</h4>
			<div class="prd-ProductInfoItem_IconWrapper">
				<div class="prd-ProductInfoItem_Icon">
					<span class="prd-ProductInfoItem_Line prd-ProductInfoItem_Line-1"></span>
					<span class="prd-ProductInfoItem_Line prd-ProductInfoItem_Line-2"></span>
				</div>
			</div>
    </summary>
    <div class="${ID}-content"></div>
  </details>
	`;

  entryElement.insertAdjacentHTML("afterbegin", newElementMarkup);

  const newElement = document.querySelector(`.${ID}-accordion`);
  new Accordion(newElement);

  const contentToMove = document.querySelector(".prd-Ingredients_Columns");
  contentToMove.closest(".sec-Section.sec-Section-borderTop").remove();

  const newElementContentSlot = document.querySelector(`.${ID}-content`);

  newElementContentSlot.append(contentToMove);

  const otherAccordions = document.querySelectorAll(
    ".prd-ProductInfoItem.js-Accordion_Item h4.prd-ProductInfoItem_Title"
  );

  otherAccordions.forEach((a) => {
    a.addEventListener("click", () => {
      const newEl = document.querySelector(`.${ID}-accordion summary`);

      if (newEl.parentElement.hasAttribute("open")) {
        newEl.click();
      }
    });
  });

  // Hover Tracking
  let timer = 0;
  let interval;
  const INTERVAL = 100;

  newElement.addEventListener("mouseenter", () => {
    timer = 0;
    interval = setInterval(() => {
      timer += INTERVAL;
    }, INTERVAL);
  });

  newElement.addEventListener("mouseleave", () => {
    clearInterval(interval);
    fireEvent(
      `Element (${
        newElement.hasAttribute("open") ? "Expanded" : "Closed"
      }) hovered for ${timer} milliseconds`
    );
  });

  new IntersectionObserver((i) => {
    if (i[0].isIntersecting) {
      fireEvent(
        `Element in view (${
          newElement.hasAttribute("open") ? "Expanded" : "Closed"
        })`
      );
    }
  }).observe(newElement);
};
