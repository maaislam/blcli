import shared from "../../../../../core-files/shared";

const { ID } = shared;
export function viewDetailsModal() {
  !document.querySelector(`.${ID}-avoneeSectionModal`).classList.contains(`x-show`) &&
    document.querySelector(`.${ID}-avoneeSectionModal`).classList.add(`x-show`);
  !document.querySelector(`.${ID}-avoneeSectionModal-wrapper`).classList.contains(`x-animation`) &&
    document.querySelector(`.${ID}-avoneeSectionModal-wrapper`).classList.add(`x-animation`);
}
export function hideDetailsModal() {
  document.querySelector(`.${ID}-avoneeSectionModal-wrapper`).classList.contains(`x-animation`) &&
    document.querySelector(`.${ID}-avoneeSectionModal-wrapper`).classList.remove(`x-animation`);
  setTimeout(() => {
    document.querySelector(`.${ID}-avoneeSectionModal`).classList.contains(`x-show`) &&
      document.querySelector(`.${ID}-avoneeSectionModal`).classList.remove(`x-show`);
  }, 200);
}
