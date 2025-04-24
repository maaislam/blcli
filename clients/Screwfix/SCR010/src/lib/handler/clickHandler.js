import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";

const { ID } = shared;
export const clickHandler = (target) => {
  // interactionsWithCategoryQuickLinks
  if (target.closest(`.cls__mobile .ls__banner--container .rsb-suggestions .slick-slide a`)) {
    const brand = target.textContent?.trim();
    if (brand) {
      // console.log(`Interaction with category quicklinks : ${brand}`);
      fireEvent(`Interaction with category quicklinks : ${brand}`);
    }
  }
  // Interaction with navigation
  else if (target.closest(`.sh-header .btn-browse`)) {
    // console.log(`Interaction with navigation after viewing a PLP`);
    fireEvent(`Interaction with navigation after viewing a PLP`);
  }
  // Interaction with search
  else if (target.closest(`.sh-header li.search a`)) {
    // console.log(`Interaction with search after viewing a PLP`);
    fireEvent(`Interaction with search after viewing a PLP`);
  }
  // Interaction with non sticky filter
  else if (target.closest(`.sticky-left a.show-leftnav-popup`)) {
    // console.log(`Interaction with non sticky filter`);
    fireEvent(`Interaction with non sticky filter`);
  }
  // Interaction with sticky filter
  else if (target.closest(`header .filters-mobile a.show-leftnav-popup`)) {
    // console.log(`Interaction with sticky filter`);
    fireEvent(`Interaction with sticky filter`);
  }
};
