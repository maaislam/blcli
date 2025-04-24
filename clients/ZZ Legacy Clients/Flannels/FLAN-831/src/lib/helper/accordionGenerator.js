import shared from "../../../../../../core-files/shared";
import { arrowSvg } from "../assets/icons";

const { ID } = shared;
export const accordionGenerator = (element) => {
  const { title, productDetails } = element;
  const accordion = `<div class="${ID}-accordion ${ID}-${title.replaceAll(" ", "-")}">
      <div class="${ID}-accordion-toggle">
        <a href="javascript:void(0)"><h2 class="expandable-title">${title}</h2><span class="arrow-down">${arrowSvg}</span></a>
      </div>
      <div class="${ID}-accordion-inner ${ID}-${title}">
        ${productDetails.outerHTML}
        ${element.productCode ? `<div class="u-form__row">${element.productCode.outerHTML}</div>` : ``}
      </div>
    </div>`;
  // console.log(title);
  return accordion;
};
