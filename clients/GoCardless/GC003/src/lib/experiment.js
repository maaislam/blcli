/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 */
import { observer } from "../../../../../lib/utils";
import { getPanels, hasPanels } from "./dom";
import { __ } from "./helpers";
import { setup } from "./services";
import shared from "./shared";

export default () => {
  setup();

  const { ID } = shared;

  const hasGA = typeof ga !== "undefined" && ga;
  const panels = getPanels();

  function throttle(callback, limit) {
    var waiting = false; // Initially, we're not waiting
    return function () {
      // We return a throttled function
      if (!waiting) {
        // If we're not waiting
        callback.apply(this, arguments); // Execute users function
        waiting = true; // Prevent future invocations
        setTimeout(function () {
          // After a period of time
          waiting = false; // And allow future invocations
        }, limit);
      }
    };
  }

  const url = window.location.href;
  // generate top content based on URL

  // Update hero
  const updateHero = () => {
    if (!panels.hero) return;

    // Update button copy
    const button = panels.hero.querySelector("a");
    if (!button) return;

    button.innerText = __("3 ways we maximize payments");
    button.href = `https://content.gocardless.com/reduce-failed-payments-anz/3-ways-gocardless-helps-maximize-payment-success?xs=217170`;
    button.classList.add(`${ID}_primaryCta`);

    const secondary = panels.hero.querySelector(`.${ID}_secondaryCta`);
    if (!secondary) {
      const secondaryElm = document.createElement(`button`);
      secondaryElm.classList.add(`${ID}_secondaryCta`);
      secondaryElm.innerHTML = `<span class="css-11qjisw"><span class="css-1neyat6">Contact sales</span></span>`;
      button.insertAdjacentElement("afterend", secondaryElm);

      secondaryElm.addEventListener("click", () => {
        const chatTrigger = document.querySelector(
          '[data-testid="moduleSlice"] button[data-testid="pardotButtonTrigger"]'
        );
        if (!chatTrigger) return;

        chatTrigger.click();
        if (hasGA) {
          // ga("gtm3.send", "event", "BL_test_3", "Spotlight_Sales_Click");
        }
      });
    }
  };

  const updateFeatures = () => {
    const featuresLists = document.querySelectorAll(
      "[data-testid='moduleFeaturesSlice'] ul"
    );
    const hasCtas = document.querySelector(`.${ID}_featuresCta`);

    if (featuresLists && !hasCtas) {
      if (featuresLists.length > 1) {
        // Add case study link to first list, and content CTA to second
        featuresLists[0].insertAdjacentHTML(
          "afterend",
          `<div class="${ID}_featuresCta">
            <a href="https://content.gocardless.com/reduce-failed-payments-anz/docusign?xs=2508">View Case Study</a>
          </div>`
        );

        featuresLists[1].insertAdjacentHTML(
          "afterend",
          `<div class="${ID}_featuresCta">
            <a href="https://content.gocardless.com/reduce-failed-payments-anz/3-ways-gocardless-helps-maximize-payment-success?xs=217170">3 ways we maximize payments</a>
          </div>`
        );
      } else {
        // Only add the content CTA
        featuresLists[0].insertAdjacentHTML(
          "afterend",
          `<div class="${ID}_featuresCta">
            <a href="https://content.gocardless.com/reduce-failed-payments-anz/3-ways-gocardless-helps-maximize-payment-success?xs=217170">3 ways we maximize payments</a>
          </div>`
        );
      }
    }
  };

  const addImageLinks = () => {
    if (!panels.video) return;

    // Video
    const vidImages = panels.video.querySelectorAll(".gatsby-image-wrapper");
    const hasVidLink = document.querySelector(`.${ID}_videoLink`);

    if (vidImages && !hasVidLink) {
      vidImages.forEach((img) => {
        // Wrap in a link
        const link = document.createElement("a");
        link.classList.add(`${ID}_videoLink`);
        link.href = `https://content.gocardless.com/reduce-failed-payments-anz/olx2if4ppg?xs=217175`;

        img.insertAdjacentElement("beforebegin", link);
        link.insertAdjacentElement("afterbegin", img);
      });
    }

    if (!panels.report) return;
    // Report
    const reportImages = panels.report.querySelectorAll(
      ".gatsby-image-wrapper"
    );
    const hasReportLink = document.querySelector(`.${ID}_reportLink`);

    if (reportImages && !hasReportLink) {
      reportImages.forEach((img) => {
        // Wrap in a link
        const link = document.createElement("a");
        link.classList.add(`${ID}_reportLink`);
        link.href = `https://content.gocardless.com/reduce-failed-payments-us-ca/recurring-payment-friction-in-the-us`;

        img.insertAdjacentElement("beforebegin", link);
        link.insertAdjacentElement("afterbegin", img);
      });
    }
  };

  observer.connect(
    document.querySelector("#mainContent"),
    () => {
      try {
        getPanels();
        if (hasPanels(["hero", "features1", "video"])) {
          updateHero();
          updateFeatures();
          addImageLinks();
        }
      } catch (e) {
        console.log(e);
      }
    },
    {
      throttle: 100,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    }
  );
};
