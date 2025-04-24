import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;
export const checkboxClickEvents = (page) => {
  if (page != "after checkout") {
    let allCheckboxes;
    if (page == "checkout") {
      const hiddenCheckbox = document.querySelector('input[name="checkout[buyer_accepts_marketing]"]');
      if (hiddenCheckbox.value == "0") {
        localStorage.setItem(`${ID}-opt-in`, "No");
      } else {
        localStorage.setItem(`${ID}-opt-in`, "Yes");
      }
      allCheckboxes = document.querySelectorAll(".checkbox__input input.input-checkbox");
    } else allCheckboxes = document.querySelectorAll('label.checkbox > input[type="checkbox"]:first-child');
    allCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function (e) {
        setTimeout(() => {
          let labelText;
          if (page == "checkout") labelText = this.closest(`.checkbox-wrapper`)?.querySelector(`label.checkbox__label`)?.textContent?.trim();
          else labelText = this.closest(`label.checkbox`)?.textContent?.trim();
          const msgArr = ["Email", "SMS", "Post from NEOM", "Post from other trusted retailers"];
          const msg = msgArr.filter((text) => text == labelText || text.includes(labelText))?.[0];
          if (this.checked == true) {
            if (msg) {
              fireEvent(`Click - Checkbox select (opt out) - ${msg}`);
              if (msg == "Email" && page == "checkout") {
                localStorage.setItem(`${ID}-opt-in`, "No");
              }
            }
          } else {
            if (msg) {
              fireEvent(`Click - Checkbox select (opt in) - ${msg}`);
              if (msg == "Email" && page == "checkout") {
                localStorage.setItem(`${ID}-opt-in`, "Yes");
              }
            }
          }
        }, 500);
      });
    });
  } else {
    let userSelection = localStorage.getItem(`${ID}-opt-in`);
    fireEvent(`Conditions Met - Opt-in - ${userSelection}`);
    localStorage.removeItem(`${ID}-opt-in`);
  }
};
