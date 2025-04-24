/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import Header from "./components/header";
import { h, render } from "preact";
import { getData } from "./data";
import MobileNavigation from "./components/mobileNav";
import DesktopNavigation from "./components/desktopNav";
import Search from "./components/search";
import { hideSearch, makeHeaderTransparent } from "./components/helpers";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf("ernestjones") > -1 ? "ernestjones" : "hsamuel";
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent("Conditions Met");

  const siteIdent = getSiteFromHostname();
  if (siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

  const checkSession = setInterval(function () {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if (sessionStorage.getItem("analyticsDataSentFor") && sessionStorage.getItem("analyticsDataSentFor") === window.location.pathname) {
      if (typeof s !== "undefined") {
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
      window._uxa = window._uxa || [];
      window._uxa.push(["trackDynamicVariable", { key: `${ID}`, value: `Variation ${VARIATION}` }]);
      clearInterval(checkCS);
    }
  }, 800);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION !== "control") {
    // Header restyle
    new Header();

    // overlay
    document.body.insertAdjacentHTML("beforeend", `<div class="${ID}-overlay"></div>`);
    document.body.insertAdjacentHTML("beforeend", `<div class="${ID}-searchoverlay"></div>`);

    // for watch quicklinks
    if (window.location.href.indexOf("watches") > -1 || window.location.href.indexOf("watch") > -1) {
      document.documentElement.classList.add(`${ID}-watches`);
    } else {
      document.documentElement.classList.remove(`${ID}-watches`);
    }

    /* Navigation */
    const navContainer = document.createElement("div");
    navContainer.classList.add(`${ID}-navigation`);
    document.body.appendChild(navContainer);

    const navigation = document.querySelector(`.${ID}-navigation`);
    const mobileAndTablet = window.innerWidth <= 1279;

    const openNav = () => {
      const burger = document.querySelector(`.${ID}-navToggle`);
      const navClose = document.querySelector(`.Nav__close`);
      const overlay = document.querySelector(`.${ID}-overlay`);
      if (burger) {
        burger.classList.add(`${ID}-hidden`);
        navClose.classList.add(`${ID}-visible`);
        navContainer.classList.add(`${ID}-open`);
        navContainer.classList.remove(`${ID}-closed`);
        overlay.classList.add(`${ID}-visible`);
        document.documentElement.classList.add(`${ID}-noScroll`);
      }
      if (VARIATION === "3") {
        makeHeaderTransparent(false);
      }

      fireEvent("Clicked open nav");
    };

    // For full bleed header
    if (VARIATION === "3") {
      if (window.location.href === "https://www.ernestjones.co.uk/" || window.location.href.indexOf("https://www.ernestjones.co.uk/?") > -1) {
        document.documentElement.classList.add(`${ID}-home`);
      } else {
        document.documentElement.classList.remove(`${ID}-home`);
      }
    }

    if (mobileAndTablet) {
      render(<MobileNavigation data={getData()}></MobileNavigation>, navigation);
    } else {
      render(<DesktopNavigation data={getData()}></DesktopNavigation>, navigation);
    }

    document.querySelector(`.${ID}-navToggle`).addEventListener("click", () => {
      if (VARIATION === "3") {
        makeHeaderTransparent(false);
      }

      openNav();
      hideSearch();
    });

    /* Search */
    new Search();

    const allTracking = () => {
      const allNavLinks = document.querySelectorAll(`.${ID}-navigation .Nav__level.Nav__level-1 a`);
      allNavLinks.forEach((element) => {
        element.addEventListener("click", (e) => {
    /* Search */
    new Search();

    const allTracking = () => {
      const allNavLinks = document.querySelectorAll(`.${ID}-navigation .Nav__level.Nav__level-1 a`);
      allNavLinks.forEach((element) => {
        element.addEventListener("click", (e) => {
          const elName = e.currentTarget.textContent;
          fireEvent("Clicked nav link " + elName);
        });
      });
    };

    allTracking();

    pollerLite([`.sg-cta.text-cta`], () => {
      const allQuickLinks = document.querySelectorAll(`.${ID}-quickLinks .sg-cta.text-cta`);
      for (let index = 0; index < allQuickLinks.length; index += 1) {
        const element = allQuickLinks[index];
        element.addEventListener('click', (e) => {
          const elName = e.currentTarget.textContent;
          fireEvent('Clicked quick view link '+elName);
        });
      }
    });

  } else {
    const search = document.querySelector(".site-search");
    search.shadowRoot.querySelector("form").addEventListener("submit", () => {
      const value = search.shadowRoot.querySelector("input").value;
      fireEvent("searched " + value);
    });

    const searchEl = search.shadowRoot;
    const input = searchEl.querySelector("#labelledby-site-search");
    input.addEventListener("click", () => {
      fireEvent("clicked search box");
    });
  }
};
