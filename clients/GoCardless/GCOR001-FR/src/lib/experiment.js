/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import { throttle } from "../../../../../lib/uc-lib";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const docHeight = document.body.offsetHeight;

const v2Copy = `60 000 entreprises dans le monde utilisent GoCardless pour faciliter la collecte de leurs paiements. Essayez gratuitement.`;

// Is it a short or long page?
const pageType = (content) => {
  if (content.offsetHeight > 3000) {
    return "long";
  }
  return "short";
};

const trackScroll = (cb) => {
  const throttledListener = throttle(() => {
    const scrollTop = window.scrollY;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);

    cb(scrollPercentRounded);
  }, 100);
  window.addEventListener("scroll", throttledListener);
};

const stickyCta = () => {
  if (document.querySelector(`.${ID}_sticky`)) return;

  const sticky = document.createElement("div");
  sticky.classList.add(`${ID}_sticky`);
  sticky.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="${ID}_stickyContent">
        <p>
          <span class="${ID}_hideDesktop">Une meilleure façon de collecter vos paiements</span>
          <span class="${ID}_hideMobile">Découvrez une meilleure façon de collecter vos paiements avec GoCardless. Essayez gratuitement.</span>
        </p>
        <div class="${ID}_buttons">
          <a class="${ID}_buttonSecondary" href="https://gocardless.com/fr-fr/contactez-nous/?widget=publication-cta">Nous contacter</a>
          <a class="${ID}_buttonPrimary" href="https://manage.gocardless.com/signup?lang=fr ">S'inscrire</a>
        </div>
      </div>
  `
  );
  document.body.insertAdjacentElement("beforeend", sticky);

  // Show trigger button on scroll (mobile)
  const banner = document.querySelector(
    "#mainContent article > div:first-child"
  );
  if (banner) {
    const bannerHeight = banner.offsetHeight - 100;
    const winHeight = window.innerHeight;
    const bannerHeightPerc = Math.round(
      (bannerHeight / (docHeight - winHeight)) * 100
    );

    // Hide trigger button after banner.
    const cb = (percScrolled) => {
      if (percScrolled > bannerHeightPerc) {
        sticky.classList.add(`${ID}_active`);
      } else {
        sticky.classList.remove(`${ID}_active`);
      }
    };

    trackScroll(cb);
  }

  document
    .querySelector(`.${ID}_buttonPrimary`)
    .addEventListener("click", () => {
      fireEvent("Click - Sign Up");
    });
  document
    .querySelector(`.${ID}_buttonSecondary`)
    .addEventListener("click", () => {
      fireEvent("Click - Learn More");
    });
};

const newCtaMiddle = () => {
  if (document.querySelector(`.${ID}_ctaWrapperMiddle`)) return;

  return `
     <div class="${ID}_ctaWrapper ${ID}_ctaWrapperMiddle">
        <picture>
          <source
            media="(max-width: 768px)"
            srcset="https://ucds.ams3.digitaloceanspaces.com/GCOR001-FR/bot-mobile-3d-fr@2x.png">
          <source
              media="(min-width: 769px)"
              srcset="https://ucds.ams3.digitaloceanspaces.com/GCOR001-FR/bot-desktop-3d-fr@2x.png">
          <img src="https://ucds.ams3.digitaloceanspaces.com/GCOR001-FR/bot-desktop-3d-fr@2x.png" alt="dashboard" />
        </picture>
        <div class="${ID}_ctaContent">
          <p>${v2Copy}</p>
          <div class="${ID}_buttons">
            <a class="${ID}_buttonPrimary" href="https://manage.gocardless.com/signup?lang=fr">S'inscrire</a>
            <a class="${ID}_buttonSecondary" href="https://gocardless.com/fr-fr/contactez-nous/?widget=publication-cta">Nous contacter</a>
          </div>
        </div>
      </div>
  `;
};

const newCtaBottom = () => {
  if (document.querySelector(`.${ID}_ctaWrapperBottom`)) return;

  return `
     <div class="${ID}_ctaWrapper ${ID}_ctaWrapperBottom">
        <picture>
          <source
            media="(max-width: 768px)"
            srcset="https://ucds.ams3.digitaloceanspaces.com/GCOR001-FR/bot-mobile-fr@2x.png">
          <source
              media="(min-width: 769px)"
              srcset="https://ucds.ams3.digitaloceanspaces.com/GCOR001-FR/bot-desktop-fr@2x.png">
          <img src="https://ucds.ams3.digitaloceanspaces.com/GCOR001-FR/bot-desktop-fr@2x.png" alt="dashboard" />
        </picture>
        <div class="${ID}_ctaContent">
          <p>${v2Copy}</p>
          <div class="${ID}_buttons">
            <a class="${ID}_buttonPrimary" href="https://manage.gocardless.com/signup?lang=fr ">S'inscrire</a>
            <a class="${ID}_buttonSecondary" href="https://gocardless.com/fr-fr/contactez-nous/?widget=publication-cta">Nous contacter</a>
          </div>
        </div>
      </div>
  `;
};

export default () => {
  setup();

  fireEvent("Conditions Met");

  const init = () => {
    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == "control") {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...
    let contentWrapper = document.querySelector(
      "#mainContent article > div:last-child > div > div > div:last-child"
    );
    if (!contentWrapper) {
      fireEvent("Error - page structure changed");
      return;
    }

    // On some articles, there is a child div which has all content.
    if (contentWrapper.childNodes.length < 2) {
      contentWrapper = contentWrapper.childNodes[0];
    }

    // There are 2 styles of middle cta, sometimes it's same as bottom cta
    let bottomCta = document.querySelectorAll(
      '[data-testid="linkCTASecondaryLink"]'
    );
    let middleCta = null;
    if (bottomCta && bottomCta.length > 1) {
      middleCta = bottomCta[0];
      bottomCta = bottomCta[1];
    } else if (bottomCta && bottomCta.length === 1) {
      bottomCta = bottomCta[0];

      // Different middle CTA, or no middle cta on this page.
      middleCta = document.querySelector('[data-testid="linkCTABody"]');
    }

    // We want the wrapper of the CTAs.
    if (bottomCta && bottomCta.closest) {
      bottomCta = bottomCta.closest('[data-reading-optimized="true"]');
      bottomCta.classList.add(`${ID}_bottomCta`);
    }
    if (middleCta && middleCta.closest) {
      middleCta = middleCta.closest('[data-reading-optimized="true"]');
      middleCta.classList.add(`${ID}_middleCta`);
    }

    if (VARIATION === "1") {
      stickyCta();
    } else if (VARIATION === "2") {
      const page = pageType(contentWrapper);

      if (page === "long") {
        let thirdHeading = contentWrapper.querySelectorAll("h2");
        if (thirdHeading.length < 3) {
          thirdHeading = contentWrapper.querySelectorAll("h3");
        }
        if (thirdHeading && thirdHeading[2]) {
          thirdHeading[2].insertAdjacentHTML("beforebegin", newCtaMiddle());

          document
            .querySelector(`.${ID}_ctaWrapperMiddle .${ID}_buttonPrimary`)
            .addEventListener("click", () => {
              fireEvent("Click - Sign Up (middle CTA)");
            });

          document
            .querySelector(`.${ID}_ctaWrapperMiddle .${ID}_buttonSecondary`)
            .addEventListener("click", () => {
              fireEvent("Click - Learn More (middle CTA)");
            });
        }
      }

      // Add to long & short
      contentWrapper.lastChild.insertAdjacentHTML(
        "beforebegin",
        newCtaBottom()
      );

      document
        .querySelector(`.${ID}_ctaWrapperBottom .${ID}_buttonPrimary`)
        .addEventListener("click", () => {
          fireEvent("Click - Sign Up (bottom CTA)");
        });

      document
        .querySelector(`.${ID}_ctaWrapperBottom .${ID}_buttonSecondary`)
        .addEventListener("click", () => {
          fireEvent("Click - Learn More (bottom CTA)");
        });
    }
  };

  setTimeout(init, 1000);
};
