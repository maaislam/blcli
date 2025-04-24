import { pollerLite } from "../../../../../../lib/utils";
import shared from "../../../../../../core-files/shared";
import { clearButton, closeButton } from "./assets";
import { fireEvent } from "../../../../../../core-files/services";

const { ID } = shared;

const sd_774_var_1 = () => {
  // const styles = ["color: white", "background: #07090F", "font-size: 20px", "border: 3px solid red", "text-shadow: 1px 1px black", "padding: 5px"].join(";");
  // console.log("%cVariation 1", styles);
  pollerLite([".ToplinksGroup .search #txtSearch", ".dvSearch .TextBoxClear", ".ToplinksGroup #mobSearchContainer #mobileSearchTriggerBtn"], () => {
    const searchInput = document.querySelector(".ToplinksGroup .search #txtSearch");
    const closeElem = document.querySelector(".ToplinksGroup #mobSearchContainer #mobileSearchTriggerBtn");
    searchInput.insertAdjacentHTML("afterend", clearButton);
    closeElem.insertAdjacentHTML("beforeend", closeButton);
    const clear = document.querySelector(".dvSearch .TextBoxClear");
    pollerLite([`.${ID}-input--clear-button`], () => {
      let clearInputButton = document.querySelector(`.${ID}-input--clear-button`);
      searchInput.addEventListener("focus", (e) => {
        // console.log("focus", searchInput.value);
        if (searchInput.value !== "") {
          clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.remove(`${ID}-x--hidden`);
        } else {
          !clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.add(`${ID}-x--hidden`);
        }
        !searchInput.onkeyup &&
          (searchInput.onkeyup = () => {
            if (searchInput.value !== "") {
              clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.remove(`${ID}-x--hidden`);
            } else {
              !clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.add(`${ID}-x--hidden`);
            }
          });
      });

      // Search Cleared
      clearInputButton.addEventListener("click", () => {
        if (searchInput.value !== "") fireEvent("Search Cleared");
        clear.click();
        !clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.add(`${ID}-x--hidden`);
      });
      closeElem.addEventListener("click", (e) => {
        // searchInput.value = "";
        // e.preventDefault();
        // e.stopPropagation();
        !clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.add(`${ID}-x--hidden`);
      });
      closeElem.addEventListener("touchend", (e) => {
        // searchInput.value = "";
        // e.preventDefault();
        // e.stopPropagation();
        !clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.add(`${ID}-x--hidden`);
      });
      document.addEventListener("click", () => {
        if (searchInput !== document.activeElement)
          // !clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.add(`${ID}-x--hidden`);
          closeElem.click();
      });
      document.addEventListener("touchend", () => {
        if (searchInput !== document.activeElement)
          // !clearInputButton.classList.contains(`${ID}-x--hidden`) && clearInputButton.classList.add(`${ID}-x--hidden`);
          closeElem.click();
      });
    });
  });
};

export default sd_774_var_1;
