import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID } = shared;
export default () => {
  //   if (document.cookie.includes(`HC141-FromVelvetiser=true;`)) {
  //     // document.cookie = "HC141-FromVelvetiser= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  //     console.log(`cookie found`);
  //     pollerLite([`.global-tabs.login-column`], () => {
  //       const registerTab = document.querySelector(`div[id="tabs-2"]`);
  //       const inputFields = registerTab.querySelectorAll(`input.input-text`);
  //       const notListed = ["companyName", "address1", "address2", "city", "county", "postal"];
  //       inputFields.length > 0 &&
  //         inputFields.forEach((input) => {
  //           const index = notListed.filter((notRequired) => input.getAttribute("id")?.includes(notRequired));
  //           if (index.length == 0) {
  //             input.addEventListener("blur", function (e) {
  //               if (!input.classList.contains(`error`) || !input.classList.contains(`valid`)) {
  //                 const label = input.closest(`.form-row`)?.querySelector(`label`)?.textContent?.split("*")[0]?.trim();
  //                 if (label) {
  //                   console.log(`User inserted ${label}`);
  //                 }
  //               }
  //             });
  //           }
  //         });
  //       const countrySelect = document.querySelector(`.input-select.country`);
  //       countrySelect.addEventListener("change", function (e) {
  //         console.log(`User changed address to ${countrySelect.value}`);
  //       });
  //       registerTab.addEventListener("click", function ({ target }) {
  //         if (target.closest(`input.input-checkbox`)) {
  //           if (target.checked) {
  //             console.log(`User checked ${target.getAttribute(`data-field`).trim()}`);
  //           }
  //         } else if(target.closest(`button[value="Apply"]`)) {
  //             console.log(`User clicked creted my account`);
  //         }
  //       });
  //     });
  //   }
  if (localStorage.getItem(`${ID}-FromVelvetiser`)) {
    // console.log(`cookie found`);
    pollerLite([`.vipme-container`], () => {
      if (document.querySelector(`.vipme-container .step-1`)) {
        const forms = document.querySelectorAll(`.vipme-container .step-1 #tabs-2 form, .vipme-container .step-1 #tabs-1 form`);
        forms.forEach((form) => {
          form.addEventListener("submit", function (e) {
            // console.log(`User submitted step-1: Sign In/Register`);
            fireEvent(`User submitted step-1: Sign In/Register`);
          });
        });
      } else {
        // Step 2
        document.querySelector(`.vipme-container .step-2`).addEventListener("click", function ({ target }) {
          let button = target.closest(`button.vipme-button`);
          if (button.closest(`.step-2`)) {
            // console.log(`User submitted step-2: Already a member?`);
            fireEvent(`User submitted step-2: Already a member?`);
          }
        });
        document.querySelector(`.vipme-container .step-2 .barcode-submit`).addEventListener("submit", function (e) {
          //   console.log(`User submitted step-2: Already a member?`);
          fireEvent(`User submitted step-2: Already a member?`);
        });
        // Step 3
        let timeout;
        // document.querySelector(`.vipme-container .step-3 .vipme-signup`).addEventListener("submit", function (e) {
        document.querySelector(`.vipme-container .step-3 button.vipme-button`).addEventListener("click", function (e) {
          // console.log("step3 clicked!");
          const birthDaySelects = Array.from(document.querySelectorAll(`select.input-select`)).map((select) => select.value);
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            const ageRestriction = document.querySelector(`.age-restriction-note`).classList.contains(`active`);
            // console.log(ageRestriction);
            //   console.log(birthDaySelects);
            if (birthDaySelects.indexOf("") < 0 && !ageRestriction) {
              // console.log(`User completed step-3: Confirm and join`);
              fireEvent(`User completed step-3: Confirm and join`, true);
              localStorage.removeItem(`${ID}-FromVelvetiser`);
            }
          }, 100);
        });
      }
    });
    // document.body.addEventListener(`click`, function ({ target }) {
    //   if (target.closest(`div[id="tabs-2"] button[value="Apply"]`)) {
    //     const button = target.closest(`div[id="tabs-2"] button[value="Apply"]`);
    //     if (button.closest(`.step-1`)) {
    //       console.log(`User completed step-1: Sign In/Register`);
    //       fireEvent(`User completed step-1: Sign In/Register`);
    //     }
    //   } else if (target.closest(`button.vipme-button`)) {
    //     let button = target.closest(`button.vipme-button`);
    //     if (button.closest(`.step-2`)) {
    //       console.log(`User completed step-2: Already a member?`);
    //       fireEvent(`User completed step-2: Already a member?`);
    //     } else if (button.closest(`.step-3`)) {
    //       const birthDaySelects = Array.from(document.querySelectorAll(`select.input-select`)).map((select) => select.value);
    //       setTimeout(() => {
    //         const ageRestriction = document.querySelector(`.age-restriction-note`).classList.contains(`active`);
    //         // console.log(ageRestriction);
    //         //   console.log(birthDaySelects);
    //         if (birthDaySelects.indexOf("") < 0 && !ageRestriction) {
    //           console.log(`User completed step-3: Confirm & join`);
    //           fireEvent(`User completed step-3: Confirm & join`);
    //           localStorage.removeItem(`${ID}-FromVelvetiser`);
    //         }
    //       }, 100);
    //     }
    //   }
    // //   else if (target.closest(`button.shop-now.vipme-button`)) {
    // //     console.log(`User clicked shop now`);
    // //     fireEvent(`User clicked shop now`);
    // //   }
    // });
  }
};
