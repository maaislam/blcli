import { __ } from "../helpers";
import shared from "../shared";
const { ID } = shared;

export default () => {
  const accordionData = {
    step1: {
      label: "01",
      title: __("One-time payment set up"),
      copy: __(
        "Whether you're setting up your recurring payments or setting up your customers for invoice payments, it's quick, easy, and you'll only have to do it once."
      ),
      img: __(
        "https://images.ctfassets.net/40w0m41bmydz/6oU0vTrqG7RCcZo56b5OTh/de6522c32932a23164ce7f90fc26afc2/nwe-en-uk-subscription-big-how1_2.5x.jpg"
      ),
    },
    step2: {
      label: "02",
      title: __("Flexible Payment Schedules"),
      copy: __(
        "Benefit from flexible payment schedules; you can collect payments whenever they are due or enable customers to set their own collection dates and payment schedules."
      ),
      img: __(
        "https://images.ctfassets.net/40w0m41bmydz/2xJsQzSvK7kiFMb4zISwYQ/7741ade33caf346b1b9035199a5a90ee/nwe-en-uk-subscription-big-how2_2.5x.jpg"
      ),
    },
    step3: {
      label: "03",
      title: __("Automatic Payment Collection"),
      copy: __(
        "Get paid or collect payments automatically, depending on your set up."
      ),
      img: __(
        "https://images.ctfassets.net/40w0m41bmydz/5o7DFB64h3ZE3Arsju01oq/c9f90cd8176ff02309b2dbae10737c7e/nwe-en-uk-subscription-big-how3_2.5x.png"
      ),
    },
    step4: {
      label: "04",
      title: __("Manage Subscriptions"),
      copy: __(
        "Keep track of your payments with real-time insights, easily manage your subscriptions and amend plans on our userfriendly platform."
      ),
      img: __(
        "https://images.ctfassets.net/40w0m41bmydz/6jTsRyhYfZsJnOFzGtQ8gQ/61705ff62629e624be0356f096093751/nwe-en-uk-subscription-big-how4_2.5x.jpg"
      ),
    },
  };

  const enterprise = document.querySelector(`.${ID}-enterprise`);

  // Already exists?
  const accordionPanel = document.querySelector(`.${ID}-accordion`);
  if (accordionPanel) {
    enterprise.insertAdjacentElement("afterend", accordionPanel);
    return;
  }

  const makeImages = () => {
    return Object.keys(accordionData)
      .map((i) => {
        return `
      <div class="${ID}-accordion-image ${
          i === "step1" ? `${ID}-active` : ""
        }" data-tab="${i}"><img src="${accordionData[i].img}" /></div>`;
      })
      .join("");
  };

  const makeAccordion = () => {
    return Object.keys(accordionData)
      .map((i) => {
        return `<div class="${ID}-accordion-item ${
          i === "step1" ? `${ID}-active` : ""
        }" data-tab="${i}"><div class="${ID}-accordion-content"><div class="${ID}-accordion-header"><p class="${ID}-accordion-label">${
          accordionData[i].label
        }</p><p class="${ID}-accordion-title">${
          accordionData[i].title
        }</p></div><div class="${ID}-accordion-body"><p class="${ID}-accordion-copy">${
          accordionData[i].copy
        }</p><img src="${accordionData[i].img}" /></div></div></div>`;
      })
      .join("");
  };

  const addEvents = () => {
    const accordionToggles = document.querySelectorAll(`.${ID}-accordion-item`);

    // Toggle image / body
    if (accordionToggles) {
      accordionToggles.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
          const tab = e.currentTarget.dataset.tab;
          if (typeof ga !== "undefined" && ga) {
            ga("gtm3.send", "event", "BL_test_2", "How_It_Works_Clicks");
          }

          // Hide open image.
          // Show new image.
          const hideImg = document.querySelector(
            `.${ID}-accordion-image.${ID}-active`
          );
          if (hideImg) hideImg.classList.remove(`${ID}-active`);

          const showImg = document.querySelector(
            `.${ID}-accordion-image[data-tab="${tab}"]`
          );
          if (showImg) showImg.classList.add(`${ID}-active`);

          // Hide open tab, show new.
          const hideTab = document.querySelector(
            `.${ID}-accordion-item.${ID}-active`
          );
          if (hideTab) hideTab.classList.remove(`${ID}-active`);

          const showTab = document.querySelector(
            `.${ID}-accordion-item[data-tab="${tab}"]`
          );
          if (showTab) showTab.classList.add(`${ID}-active`);
        });
      });
    }
  };

  const markup = `<div class="${ID}-accordion"><div class="${ID}-accordion-wrapper"><div class="${ID}-accordion-images-wrapper">${makeImages()}</div><div class="${ID}-accordion-content-wrapper">  <h2>${__(
    "How it Works"
  )}</h2><div class="${ID}-accordion-accordion">${makeAccordion()}</div></div></div></div>`;

  enterprise.insertAdjacentHTML("afterend", markup);
  addEvents();
};
