import { fireEvent } from "../../../../../../core-files/services";

export const quantityHandler = () => {
  const selectedQuantityInputField = document.querySelector(`.pr__qty input#qty`);
  const selectedStickyQuantityInputField = document.querySelector(`.pr__qty input#sticky_qty`);
  if (selectedQuantityInputField && selectedStickyQuantityInputField) {
    selectedQuantityInputField.addEventListener("keyup", function (e) {
      // console.log(`User interacts with quantity on pdp`);
      fireEvent(`User interacts with quantity on pdp`);
    });
    selectedStickyQuantityInputField.addEventListener("keyup", function (e) {
      // console.log(`User interacts with quantity on pdp`);
      fireEvent(`User interacts with quantity on pdp`);
    });
  }
};
