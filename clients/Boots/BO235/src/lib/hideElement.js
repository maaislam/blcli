import shared from "../../../../../core-files/shared";

const { ID } = shared;
export function hideElements() {
  const octgridMain = document.querySelector(`.oct-grid__cell > a[data-element="AEM Asset"]`)?.closest(`.oct-grid__row`)?.closest(`.oct-grid.oct-aem-grid`);
  const hideElements = octgridMain.childNodes;
  for (let i = 0; i < hideElements.length; i++) {
    if (hideElements[i].querySelector(`.oct-grid__cell > a[data-element="AEM Asset"]`)) {
      hideElements[i].classList.add(`${ID}-x-hidden`);
      break;
    }
    hideElements[i].classList.add(`${ID}-x-hidden`);
  }
  document.querySelector(`.oct-breadcrumb__items-list`)?.closest(`.oct-grid__row`)?.classList.add(`${ID}-x-hidden`);
  document.querySelector(`.oct-decorative-panel__inner__heading`)?.classList.add(`${ID}-x-hidden`);
}
