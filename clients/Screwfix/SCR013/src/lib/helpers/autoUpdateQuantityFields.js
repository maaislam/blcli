import shared from "../../../../../../core-files/shared";

const { ID } = shared;
export const autoUpdateQuantityFields = () => {
  const qtyInputField = document.querySelector(`.${ID}-sizeSelect .qty-option .number input`);
  const quantityInputFields = document.querySelectorAll(`.pr__qty > input`);
  qtyInputField?.addEventListener("keyup", function (e) {
    const value = this.value;
    quantityInputFields.length > 0 &&
      quantityInputFields.forEach((field) => {
        field.value = value;
      });
  });
  quantityInputFields.length > 0 &&
    quantityInputFields.forEach((field) => {
      field.addEventListener(`keyup`, function (e) {
        qtyInputField.value = this.value;
      });
    });
};
