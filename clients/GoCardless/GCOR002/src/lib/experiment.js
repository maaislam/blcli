/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { observer } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

// DOM elements have data attribute IDs which we can use for targetting.
const panelIds = {
  us: {
    hero: "3ozxWwPHR1slaF0tWikXW1", // HeroSliceText
    featuresTop: "20h1Ag4IZjIwXmVJaHo09g", // ul
    featuresBottom: "1YGX4yH3jd82Bypd1Nw0Kd", // > div
  },
  uk: {
    hero: "1bllxbNEHJ90MNQw0DObGM", // HeroSliceText
    featuresTop: "20h1Ag4IZjIwXmVJaHo09g", // ul
    featuresBottom: "hVXU6DO52im0PTaig1Zbc", // > div
  },
  au: {
    hero: "6WnvYlt6sskkDFKrWgfG1m",
    featuresTop: "1I8h29jbAA4Fe6yNLsmsK5",
    featuresBottom: "7yY9vDZP7xb79rmIgD35h1",
  },
};

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  let loc = "uk";
  if (window.location.pathname.indexOf("en-us") !== -1) loc = "us";
  else if (window.location.pathname.indexOf("en-au") !== -1) loc = "au";

  const newCta = `
    <div class="${ID}_cta">
    <a href="https://manage.gocardless.com/signup">Get started</a>
    </div>
  `;

  const runChanges = () => {
    // Update hero panel
    const hero = document.querySelector(
      `[data-module-id="${panelIds[loc].hero}"]`
    );
    if (hero) {
      const h1 = hero.querySelector("h1");
      const intro = hero.querySelector("p");
      const cta = hero.querySelector('a[href*="signup"]');

      if (h1) {
        let title = "Chasing payments is stressful and time-consuming";
        if (VARIATION === "2") {
          title = "Your payments collected on time, with GoCardless";
        }
        h1.textContent = title;
      }
      if (intro) {
        intro.textContent = `Automate the collection of recurring and one-off payments in a few clicks. Join over 60,000 businesses who enjoy hassle-free payment collection, while lowering costs and reducing payments admin.`;
      }
      if (cta) {
        const ctaLabel = cta.querySelector("span");
        if (ctaLabel) ctaLabel.textContent = "Get started";
      }
    }

    // Update features panel
    const featuresTop = document.querySelector(
      `[data-module-id="${panelIds[loc].featuresTop}"]`
    );

    if (featuresTop) {
      const h2 = featuresTop.querySelector("h2");
      const items = featuresTop.querySelectorAll("li");

      if (h2) {
        h2.textContent = `78% of businesses using GoCardless say it reduced stress`;
      }
      if (items) {
        // Heading
        const firstHeading = items[0].querySelector("p:first-child");
        if (firstHeading) {
          firstHeading.textContent = `Say goodbye to late payments`;
        }

        // Content.
        const firstContent = items[0].querySelector("p:last-child");
        if (firstContent) {
          firstContent.textContent = `Automate the collection of recurring and one-off payments in a few clicks.`;
        }

        // Heading
        const secondHeading = items[1].querySelector("p:first-child");
        if (secondHeading) secondHeading.textContent = `Save hours of admin`;

        // Content.
        const secondContent = items[1].querySelector("p:last-child");
        if (secondContent) {
          secondContent.textContent = `Manage your payments without wasting time on tedious manual processes.`;
        }

        // Heading
        const thirdHeading = items[2].querySelector("p:first-child");
        if (thirdHeading) {
          thirdHeading.textContent = `No more payment failures`;
        }

        // Content.
        const thirdContent = items[2].querySelector("p:last-child");
        if (thirdContent) {
          thirdContent.textContent = `Failed payments turn into churned customers. We stop this at the source.`;
        }

        // Heading
        const fourthHeading = items[3].querySelector("p:first-child");
        if (fourthHeading) {
          fourthHeading.textContent = `Better for you, better for your customers`;
        }

        // Content.
        const fourthContent = items[3].querySelector("p:last-child");
        if (fourthContent) {
          fourthContent.textContent = `Just like you, your customers deserve a hassle-free and transparent payment method.`;
        }

        // Add ctas
        if (!featuresTop.querySelector(`.${ID}_cta`)) {
          items[0].parentElement.insertAdjacentHTML("afterend", newCta);
        }

        const featuresBottom = document.querySelector(
          `[data-module-id="${panelIds[loc].featuresBottom}"]`
        );
        if (featuresBottom && !featuresBottom.querySelector(`.${ID}_cta`)) {
          featuresBottom
            .querySelector("ul")
            .insertAdjacentHTML("afterend", newCta);
        }
      }
    }
  };

  observer.connect(
    document.querySelector("#mainContent"),
    () => {
      setTimeout(runChanges, 250);
    },
    {
      throttle: 300,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    }
  );
};
