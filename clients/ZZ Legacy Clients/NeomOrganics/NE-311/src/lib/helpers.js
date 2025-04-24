import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const isReturningUser = () => {
  // return new Promise((res) => res());
  return new Promise((resolve, reject) => {
    window.ga(function (tracker) {
      let clientId = tracker.get("clientId");

      // For testing purposes - remove in production
      if (document.cookie.match(/ne311-force/)) {
        clientId = "1000253931.1613825795";
        console.log(`>>>Test - client ID: ${clientId}`);
      }

      fetch(
        "https://ab-test-sandbox.userconversion.com/neom-guid-checker/app.php?guid=" +
          clientId
      )
        .then((r) => r.json())
        .then((result) => {
          // Fire experiment if non-empty array ...
          if (result && result.length) {
            resolve();
          } else {
            reject();
          }
        });
    });
  });
};

export const validEmail = (email) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const clickSignupBtn = () => {
  document.querySelector(`.${ID}-signup__btn`).addEventListener("click", () => {
    document
      .querySelector(`.${ID}-email-box__wrapper`)
      .classList.remove("hide-delay");

    document.querySelector(`a.${ID}-privacy-link`).classList.add("show");
    document.querySelector(`.${ID}-email-input__wrapper`).classList.add("show");
    document
      .querySelector(`.${ID}-signup__btn`)
      .setAttribute("style", "display: none;");
  });
};

export const clickSignupBubble = () => {
  document
    .querySelector(`.${ID}-email-cta__container`)
    .addEventListener("click", () => {
      if (
        !document
          .querySelector(`.${ID}-email-box__wrapper`)
          .classList.contains("hidden")
      ) {
        setTimeout(() => {
          document
            .querySelector(`.${ID}-email-box__wrapper`)
            .classList.add("scale-in-br");

          fireEvent(`Click - Expand`);
        }, 500);
      } else {
        document
          .querySelector(`.${ID}-email-box__wrapper`)
          .classList.remove("hidden");
      }

      if (document.querySelector(`a.${ID}-privacy-link`)) {
        document.querySelector(`a.${ID}-privacy-link`).classList.add("show");
      }

      document
        .querySelector(`.${ID}-email-input__wrapper`)
        .classList.add("show");
      document
        .querySelector(`.${ID}-signup__btn`)
        .setAttribute("style", "display: none;");
    });
};

export const closeEmailBox = () => {
  document
    .querySelector(`.${ID}-email-box__wrapper .${ID}-close__icon`)
    .addEventListener("click", () => {
      document
        .querySelector(`.${ID}-email-box__wrapper`)
        .classList.remove("hide-delay");

      setTimeout(() => {
        document
          .querySelector(`.${ID}-email-box__wrapper`)
          .classList.add("hidden");
        document
          .querySelector(`.${ID}-email-cta__wrapper`)
          .classList.add("scale-in-br");
        fireEvent(`Click - Close`);
      }, 200);
    });
};

export const submitEmail = () => {
  const form = document.querySelector(`#${ID}-form`);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formElements = event.target.elements;

    const urlEncodedDataPairs = Object.keys(formElements).map((key) => {
      return (
        encodeURIComponent(formElements[key].name) +
        "=" +
        encodeURIComponent(formElements[key].value)
      );
    });

    let formBody = [];

    formBody = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

    const emailInput = document.querySelector(
      `.${ID}-email-input__submit-input`
    );
    const email = emailInput.value;

    if (validEmail(email)) {
      fetch("https://api.ometria.com/forms/signup/ajax", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
      }).then((r) => {
        if (!r.ok) {
          fireEvent(
            "Conditions Met - Error while submitting email - user email was not submitted"
          );
          throw new Error(r);
        } else {
          document
            .querySelector(`.${ID}-email-box__wrapper`)
            .classList.remove("hide-delay");
          updateEmailBox();
          fireEvent("Conditions Met - Email submitted successfully");
        }
      });
    } else {
      emailInput.classList.add("error");

      setTimeout(() => {
        emailInput.classList.remove("error");
      }, 3000);
    }
  });
};

export const updateEmailBox = () => {
  const emailBox = document.querySelector(`.${ID}-email-box__wrapper`);
  emailBox.querySelector(`h2`).innerText = "You're in!";
  emailBox.querySelector(`p`).innerText =
    "Check your inbox for your first email (and a little surprise from us to say thank you for signing up)";
  emailBox.querySelector(`a.${ID}-privacy-link`).classList.remove("show");
  emailBox.querySelector("input").setAttribute("style", "display: none;");
  document
    .querySelector(`.${ID}-signup__btn`)
    .setAttribute("style", "display: none;");

  emailBox.querySelector(
    `.button.${ID}-form-submit`
  ).outerHTML = `<button class="close ${ID}-form-close">Close</button>`;
  document.querySelector(`.${ID}-email-input__wrapper`).classList.add("show");

  emailBox.querySelector(`button.close`).addEventListener("click", () => {
    if (document.querySelector(`.${ID}-email-cta__wrapper`)) {
      document
        .querySelector(`.${ID}-email-cta__wrapper`)
        .parentElement.removeChild(
          document.querySelector(`.${ID}-email-cta__wrapper`)
        );
    }
    if (document.querySelector(`.${ID}-email-box__wrapper`)) {
      document
        .querySelector(`.${ID}-email-box__wrapper`)
        .parentElement.removeChild(
          document.querySelector(`.${ID}-email-box__wrapper`)
        );
    }
  });
  emailBox.querySelector(`.${ID}-close__icon`).addEventListener("click", () => {
    if (document.querySelector(`.${ID}-email-cta__wrapper`)) {
      document
        .querySelector(`.${ID}-email-cta__wrapper`)
        .parentElement.removeChild(
          document.querySelector(`.${ID}-email-cta__wrapper`)
        );
    }
    if (document.querySelector(`.${ID}-email-box__wrapper`)) {
      document
        .querySelector(`.${ID}-email-box__wrapper`)
        .parentElement.removeChild(
          document.querySelector(`.${ID}-email-box__wrapper`)
        );
    }
  });

  // --- Local Storage
  localStorage.setItem(`${ID}-email-sign-up-submitted`, true);
  localStorage.setItem(`${ID}-timestamp`, new Date().getTime());
};
