/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { VARIATION, ID } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION === "control") {
    return;
  }

  const targetElement = document.getElementById("payment-method-braintree-lpm");

  targetElement.style.display = "block";

  pollerLite(["#braintree"], () => {
    const localPaymentRadio = document.getElementById(
      "braintree_local_payment"
    );
    const creditCardRadio = document.getElementById("braintree");
    localPaymentRadio.checked = false;
    creditCardRadio.checked = false;

    const localPaymentSection = document.getElementById(
      "payment-method-braintree-lpm"
    );
    const creditCardSection = document.getElementsByClassName(
      "payment-method-braintree"
    )[0];

    localPaymentSection.classList.remove("_active");
    creditCardSection.classList.remove("_active");

    [localPaymentSection, creditCardSection].forEach((section) => {
      const input = section.querySelector("input");

      input.addEventListener("click", () => section.classList.add("_active"));
    });

    const localPaymentHeader =
      localPaymentSection.querySelector(":scope > div");
    const creditCardHeader = creditCardSection.querySelector(":scope > div");

    const generatePaymentsDisplay = (paymentTypes) => {
      const paymentsDisplay = document.createElement("div");
      paymentsDisplay.classList.add(`${ID}-payment-logos`);
      paymentsDisplay.innerHTML = /* HTML */ `
        <ul>
          ${paymentTypes
            .map(
              (type) =>
                `<li><img src="${type.image}" alt="Pay with ${type.name}" /></li>`
            )
            .join("")}
        </ul>
      `;

      return paymentsDisplay;
    };

    const localPaymentData = [
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/giropay.svg",
        name: "Giropay",
      },
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/sofort.svg",
        name: "Sofort",
      },
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/sepa.svg",
        name: "SEPA",
      },
    ];

    const creditCardData = [
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/VI.png",
        name: "Visa",
      },
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/MC.png",
        name: "Mastercard",
      },
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/DI.png",
        name: "Discover",
      },
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/DN.png",
        name: "Diners Club International",
      },
      {
        image:
          "https://www.merchoid.com/static/version1644584414/frontend/Merchoid/merchoid2/en_US/Magento_Braintree/images/cc/MI.png",
        name: "Maestro",
      },
    ];

    localPaymentHeader.appendChild(generatePaymentsDisplay(localPaymentData));
    creditCardHeader.appendChild(generatePaymentsDisplay(creditCardData));
  });

  //Added customer message

  const textHTML = `<p class=ME320-cx-msg>Please Select Payment Method</p>`
  const checkoutBox = document.querySelector('.checkout-agreements-block');
  checkoutBox.insertAdjacentHTML('beforebegin', textHTML);
  
  // Tracking Start
  targetElement.addEventListener("click", () =>
    fireEvent("Click inside of new element")
  );

  const buttons = targetElement.querySelectorAll(".primary > button");

  buttons.forEach((button) => {
    button.addEventListener("click", () =>
      fireEvent(
        `The '${
          button.classList[button.classList.length - 1]
        }' payment method was clicked`
      )
    );
  });
  // Tracking End
};
