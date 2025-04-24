import shared from "../../../../../../core-files/shared";

const { ID } = shared;
export const modalClickEvent = () => {
  // Adding events after modal appeared! Modal clsoes.
  const promotionalModalMainContainer = document.querySelector(`.${ID}-promotional-modal-mainContainer`);
  promotionalModalMainContainer?.addEventListener("click", (e) => {
    if (e.target.matches(`.${ID}-closeButton a`) || e.target.closest(`.${ID}-closeButton a`) || e.target.matches(`.${ID}-overlay`)) {
      promotionalModalMainContainer?.querySelector(`.${ID}-promotional-modal-container`)?.classList.contains(`${ID}-x--animation`) &&
        promotionalModalMainContainer?.querySelector(`.${ID}-promotional-modal-container`)?.classList.remove(`${ID}-x--animation`);
      setTimeout(() => {
        promotionalModalMainContainer.innerHTML = ``;
        // window[ID]?.length >= 3 && (window[ID] = []);
        window[ID] = [];
        console.log(window[ID]);
      }, 500);
    }
  });
};
