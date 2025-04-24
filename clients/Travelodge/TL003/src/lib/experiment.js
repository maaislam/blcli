/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");


  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Search widget
  // -----------------------------
  // 
  if(window.location.href.indexOf('/checkout') === -1) {

    const addSearchButton = (el, position) => {
      const fakeSearchBtn = document.createElement("div");
      fakeSearchBtn.className = `fieldCTA ${ID}-search`;
      fakeSearchBtn.innerHTML = `<div class="${ID}-searchBtn btn btn-primary">Search</div>`;
      el.insertAdjacentElement(position, fakeSearchBtn);
    };

    const addRadioButtons = (el, position) => {
      const travelPurpose = document.createElement("div");
      travelPurpose.className = `${ID}-purpose col-sm-4 col-md-8`;
      travelPurpose.innerHTML = `
      <label>What is the purpose of your stay?</label>
        <div class="${ID}-radios">
          <div class="${ID}-radio">
            <input id="radio-business" type="radio" name="purpose" class="radioBtn" value="Business" ${sessionStorage.getItem('TL-purpose') && sessionStorage.getItem('TL-purpose') === 'Business' ? 'checked' : ''} >
            <label class="control-label required" for="radio-business">Business</label>
          </div>
          <div class="${ID}-radio">
            <input id="radio-leisure" type="radio" name="purpose" class="radioBtn" value="Leisure" ${sessionStorage.getItem('TL-purpose') && sessionStorage.getItem('TL-purpose') === 'Leisure' ? 'checked' : ''} >
            <label class="control-label required" for="radio-leisure">Leisure</label>
          </div>
        </div>
        <p class="error-msg">Please select the purpose of your stay<p>
      `;

      el.insertAdjacentElement(position, travelPurpose);
    };

    // Observer functions
    const moveRadioButtons = () => {
      document.querySelector("#modalSearch .rooms").insertAdjacentElement("afterend", document.querySelector(`.${ID}-purpose`));
    };
    const moveSearchButton = () => {
      document.querySelector("#modalSearch .col-12.form-group.submit-panel").insertAdjacentElement("beforebegin", document.querySelector(`.${ID}-search`));
    };

    // Different places due to different buttons
    if (window.innerWidth > 767) {
      addRadioButtons(document.querySelector(".searchWidget fieldset.row"), "beforeend");
    } else {
      addRadioButtons(document.querySelector(".fieldCTA.fieldCTA1"), "beforebegin");
    }

    if (window.innerWidth >= 767 && window.innerWidth < 1024) {
      addSearchButton(document.querySelector(".fieldCTA.fieldCTA2"), "beforebegin");
    } else {
      addSearchButton(document.querySelector(".fieldCTA.fieldCTA1"), "beforebegin");
    }


    const searchValidation = () => {
      document.querySelector(`.${ID}-searchBtn`).addEventListener("click", () => {
        if(!document.querySelector(`.${ID}-purpose input[name="purpose"]:checked`)) {
          // none selected
          document.querySelector(`.${ID}-purpose`).classList.add("error");
          fireEvent(`Customer searched, no option selected`);
        } else {
          document.querySelector(`.${ID}-purpose`).classList.remove("error");

          const purposeValue = document.querySelector(`.${ID}-purpose input[name="purpose"]:checked`).value;
          sessionStorage.setItem("TL-purpose", purposeValue);
          fireEvent(`Searched for ${purposeValue}`);

          document.querySelector(".fieldCTA.fieldCTA1 button").click();
        }
      });
    }

    const removeValidation = () => {
      document.querySelectorAll(`.${ID}-radio`).forEach((el) => {
        el.addEventListener("click", () => {
          document.querySelector(`.${ID}-purpose`).classList.remove("error");
        });
      });
    }
    searchValidation();
    removeValidation();

    // Observe for mobile search
    observer.connect(
      document.querySelector("#modal"),
      () => {
        moveRadioButtons();
        moveSearchButton();
        searchValidation();
      },
      {
        throttle: 500,
        config: {
          attributes: true,
          childList: false,
          subtree: false,
        },
      }
    );
  } else {

    // -----------------------------
    // Checkout
    // -----------------------------
    // 
    if(sessionStorage.getItem('TL-purpose')) {
      const purpose = sessionStorage.getItem('TL-purpose');
      if(purpose === 'Lesiure') {
        document.querySelector('#customerDetails_purposeOfStay_0').checked = true;
      } else {
        document.querySelector('#customerDetails_purposeOfStay_1').checked = true;
      }
    }

  }
 
};
