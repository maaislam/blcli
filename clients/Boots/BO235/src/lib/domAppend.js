import shared from "../../../../../core-files/shared";
import { hideDetailsModal, viewDetailsModal } from "./clickHandler";
import { avoneeSection, avoneeSectionModal, babySection, babyAdviceSection, heroBannerSection, stepSection, quoteSection, shopPointBooster } from "./helper";

const { ID } = shared;
export const domAppend = () => {
  const mainContainer = document.querySelector(`.oct#main`);
  if (document.querySelector(`button.oct-accordion__toggle`)?.textContent?.includes(`Terms & Conditions`)) {
    const termsAndConditions = document.querySelector(`button.oct-accordion__toggle`)?.closest(`.oct-grid__row`);
    termsAndConditions.setAttribute("id", `${ID}-terms&conditions`);
  }
  document.querySelector(`.${ID}-mainHompageContainer`) && document.querySelector(`.${ID}-mainHompageContainer`).remove();
  document.querySelector(`.${ID}-avoneeSectionModal`) && document.querySelector(`.${ID}-avoneeSectionModal`).remove();
  const body = document.body;
  body.insertAdjacentHTML("afterbegin", avoneeSectionModal());
  const newHomapgeContent = `<div data-testid="row" class="${ID}-mainHompageContainer">
      ${heroBannerSection()}
      ${stepSection()}
      ${babySection()}
      ${babyAdviceSection()}
      ${quoteSection()}
      ${avoneeSection()}
      ${shopPointBooster()}
    </div>`;
  mainContainer.insertAdjacentHTML("afterbegin", newHomapgeContent);

  // Click handle
  if (document.querySelector(`.${ID}-mainHompageContainer`)) {
    body.addEventListener("click", function ({ target }) {
      if (target.closest(`.${ID}-avoneeSection a.avonee-read-more`)) {
        viewDetailsModal();
      } else if (target.closest(`.${ID}-avoneeSectionModal-crossButton a`) || target.closest(`.${ID}-avoneeSectionModal-overlay`)) {
        hideDetailsModal();
      } else if (target.closest(`.${ID}-stepSection-readMore`)) {
        const termsAndConditions = document.querySelector(`button.oct-accordion__toggle`)?.closest(`.oct-grid__row`);
        termsAndConditions?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        setTimeout(() => {
          if (!termsAndConditions?.querySelector(`button.oct-accordion__toggle`)?.classList.contains(`oct-accordion__toggle--open`)) {
            termsAndConditions?.querySelector(`button.oct-accordion__toggle`)?.click();
          }
        }, 100);
      }
    });
  }
};
