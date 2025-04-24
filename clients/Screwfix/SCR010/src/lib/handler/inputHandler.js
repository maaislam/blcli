import { fireEvent } from "../../../../../../core-files/services";

export const inputHandler = (target) => {
  // Interaction with sticky sort by
  if (target.closest(`header .filters-mobile select#sortby_mobile`)) {
    // console.log(`Interaction with sticky sort by`);
    fireEvent(`Interaction with sticky sort by`);
  }
  // Interaction with non sticky sort by
  else if (target.closest(`.sticky-left select#sortby_mobile`)) {
    // console.log(`Interaction with non sticky sort by`);
    fireEvent(`Interaction with non sticky sort by`);
  }
};
