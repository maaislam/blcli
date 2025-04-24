/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { observer } from "../../../../../lib/utils";
import { hasPanels, getPanels } from "./dom";
import { __ } from "./helpers";
import { setup } from "./services";
import shared from "./shared";

export default () => {
  setup();

  const { ID } = shared;

  const url = window.location.href;
  const panels = getPanels();

  // generate top content based on URL
  const topContent = () => {
    let content;
    if (
      url.indexOf("break-the-cycle") > -1 ||
      url.indexOf("briser-la-spirale") > -1
    ) {
      content = `<h1>${__(
        "Collect over 97% of payments on the 1st attempt"
      )}</h1>
      <p class="${ID}-paragraph">${__(
        "Half of all businesses see more than 7% of payments fail, leading to bad debt, higher churn and loss of revenue."
      )}</p>
      <p class="${ID}-paragraph">${__(
        "Speak with us today to get a free benchmark of your all-important business payments."
      )}</p>`;
    }

    if (
      url.indexOf("take-the-bite-out-of-failed-payments") > -1 ||
      url.indexOf("protegez-vous-des-echecs-de-paiement") > -1 ||
      url.indexOf("zahlungserfolg-ohne-drama") > -1
    ) {
      content = `<h1>${__(
        "Increase payment collection to as high as 99.5% with Success+"
      )}</h1>
      <p class="${ID}-paragraph">${__(
        "And automatically recover 76% of those payments that do fail."
      )}</p>
      <p class="${ID}-paragraph">${__(
        "Speak with us today to get a free benchmark of your payment operations and learn how Go-Cardless can help your business."
      )}</p>`;
    }

    return content;
  };

  // add new content
  const changeContent = () => {
    if (!panels.hero) return;
    const heading = panels.hero.querySelector('[data-testid="heroSliceText"]');
    const newHeading = document.createElement("div");
    newHeading.classList.add(`${ID}-heading`);
    newHeading.innerHTML = topContent();

    if (heading) heading.insertAdjacentElement("afterbegin", newHeading);
  };

  // add new hero image
  const addImage = () => {
    if (!panels.hero) return;

    let image;
    if (
      url.indexOf("break-the-cycle") > -1 ||
      url.indexOf("briser-la-spirale") > -1
    ) {
      image =
        "//images.ctfassets.net/40w0m41bmydz/4q1qCS4WwVmgnAPWLNJMr3/2c35320bb539c2816f918dfd5cf38f3b/nwe-en-platform-light_2x.png?w=1400&h=1424&q=50";
    } else if (
      url.indexOf("take-the-bite-out-of-failed-payments") > -1 ||
      url.indexOf("protegez-vous-des-echecs-de-paiement") > -1 ||
      url.indexOf("zahlungserfolg-ohne-drama") > -1
    ) {
      image =
        "https://images.ctfassets.net/40w0m41bmydz/2wY7eEcAANl5rhMcdCJN3Y/644bae4785ff53683ee564ce0adaf0d0/nwe-en-uk-subscription-checkout-small-custom_2.5x.jpg?w=1980&q=50";
    }

    const imageBlock = panels.hero.querySelector(
      '[data-testid="heroSliceMedia"]'
    );
    const newImage = document.createElement("div");
    newImage.classList.add(`${ID}-image`);
    newImage.innerHTML = `<img src="${image}"/>`;

    if (imageBlock) imageBlock.appendChild(newImage);
  };

  // add video overlay
  const videoContent = () => {
    if (!panels.video) return;

    let videoSrc;
    if (url.indexOf("fr-fr") > -1) {
      videoSrc = "//fast.wistia.net/embed/iframe/98wtpe2jy5";
    } else if (url.indexOf("de-de") > -1) {
      videoSrc = "//fast.wistia.net/embed/iframe/da51hkcm4n";
    } else {
      videoSrc = "//fast.wistia.net/embed/iframe/olx2if4ppg";
    }

    const overlay = `<div class="${ID}-videoOverlay"></div>`;
    const videoBox = document.createElement("div");
    videoBox.classList.add(`${ID}-videoBox`);
    videoBox.innerHTML = `
    <div class="${ID}-close">x</div>
    <div class="${ID}-video">
      <iframe src="${videoSrc}" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" width="100%" height="100%"></iframe>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", overlay);
    document.body.appendChild(videoBox);

    panels.video.classList.add(`${ID}_videoPanel`);

    const openVideo = () => {
      document
        .querySelector(`.${ID}-videoOverlay`)
        .classList.add(`${ID}-overlayShow`);
      document
        .querySelector(`.${ID}-videoBox`)
        .classList.add(`${ID}-videoShow`);
      document.querySelector(
        `.${ID}-videoBox iframe`
      ).src = document.querySelector(`.${ID}-videoBox iframe`).src;
    };

    const closeVideo = () => {
      document
        .querySelector(`.${ID}-videoOverlay`)
        .classList.remove(`${ID}-overlayShow`);
      document
        .querySelector(`.${ID}-videoBox`)
        .classList.remove(`${ID}-videoShow`);
      document.querySelector(
        `.${ID}-videoBox iframe`
      ).src = document.querySelector(`.${ID}-videoBox iframe`).src;
    };

    const videoLink = panels.video.querySelector("a");
    if (videoLink) {
      videoLink.addEventListener("click", (e) => {
        e.preventDefault();
        openVideo();
      });
    }

    // open video
    const videoTriggers = panels.video.querySelectorAll(
      ".gatsby-image-wrapper"
    );
    if (videoTriggers) {
      videoTriggers.forEach((trig) => {
        trig.addEventListener("click", () => {
          openVideo();
        });
      });
    }

    // close video
    document
      .querySelector(`.${ID}-videoOverlay`)
      .addEventListener("click", () => {
        closeVideo();
      });
    document.querySelector(`.${ID}-close`).addEventListener("click", () => {
      closeVideo();
    });
  };

  // change benchmark text
  const bottomContent = () => {
    const { benchmark1, benchmark2 } = panels;
    const heading = `${__(
      "Understand how GoCardless can improve your payment metrics"
    )}`;
    const subtext = `${__(
      "Have a 15-minute payments health check with one of our team to benchmark your payment operations."
    )}`;
    const buttonText = `${__("Get a free payments health check")}`;

    // First panel
    if (benchmark1) {
      benchmark1.classList.add(`${ID}_benchmark1`);

      benchmark1.querySelector("h2").textContent = heading;
      const bench1Text = benchmark1.querySelectorAll("p");
      if (bench1Text) bench1Text[1].textContent = subtext;
      const buttons1 = benchmark1.querySelectorAll("button");
      if (buttons1) {
        buttons1.forEach((btn) => {
          btn.querySelector("span").textContent = buttonText;
        });
      }

      // move first benchmark block up
      if (panels.report) {
        panels.report.insertAdjacentElement("beforebegin", benchmark1);
      }
    }

    if (benchmark2) {
      benchmark2.classList.add(`${ID}_benchmark2`);
      // Second panel
      benchmark2.querySelector("h2").textContent = heading;
      const bench2Text = benchmark1.querySelectorAll("p");
      if (bench2Text) bench2Text[1].textContent = subtext;
      const buttons2 = benchmark2.querySelectorAll("button");
      if (buttons2) {
        buttons2.forEach((btn) => {
          btn.querySelector("span").textContent = buttonText;
        });
      }
    }
  };

  const addSpace = () => {
    if (!panels.report) return;

    const paraTexts = panels.report.querySelectorAll("p");
    const lastPara = paraTexts ? paraTexts[paraTexts.length - 2] : null;
    const link = paraTexts ? paraTexts[paraTexts.length - 1] : null;
    if (lastPara) {
      lastPara.classList.add(`${ID}_hidden`);
    }
    if (link) {
      link.classList.add(`${ID}_reportLink`);
    }
  };

  // remove all elements when page refreshes
  const removeAll = () => {
    const textBlock = document.querySelector(`.${ID}-heading`);
    const imageEl = document.querySelector(`.${ID}-image`);
    const videoEL = document.querySelector(`.${ID}-videoOverlay`);
    const videoBg = document.querySelector(`.${ID}-videoBox`);

    if (textBlock) {
      textBlock.remove();
    }
    if (imageEl) {
      imageEl.remove();
    }
    if (videoEL) {
      videoEL.remove();
    }
    if (videoBg) {
      videoBg.remove();
    }
  };

  observer.connect(
    document.querySelector("#mainContent"),
    () => {
      getPanels();

      console.log(panels);
      if (!window.gc002_running) {
        if (hasPanels(["hero", "video", "report", "benchmark1"])) {
          removeAll();
          changeContent();
          addImage();
          videoContent();
          bottomContent();
          addSpace();
        }
      }
    },
    {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    }
  );
};
