/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { getCookie, setCookie } from '../../../../../lib/utils';
import AddBasket from "./components/AddBasket/AddBasket";
import Basket from "./components/Basket/Basket";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  const STORE = `${ID}-basket`;

  if(window.location.href.indexOf('basketUserTest=true') > 1 && (!getCookie(`${ID}-bucketed`) || getCookie(`${ID}-bucketed`) == "false")) {
    setCookie(`${ID}-bucketed`, true);
  }

  if (window.location.href.indexOf('basketUserTest=false') > 1 && (!getCookie(`${ID}-bucketed`) || getCookie(`${ID}-bucketed`) == "true")) {
    setCookie(`${ID}-bucketed`, false);
  }

  if (!localStorage.getItem(`${ID}-basket`)) {
    localStorage.setItem(`${ID}-basket`, "[]");
  }

  function getBasketData() {
    return JSON.parse(localStorage.getItem(STORE));
  }

  function setBasketData(data) {
    return localStorage.setItem(STORE, JSON.stringify(data));
  }

  function addProductToBasket() {
    console.log("IUEAFIEAFNAEF");
    const sku = document.querySelector("span.sku").textContent;
    const brand = document.querySelector("h1 span.brand a").textContent;
    const name = document.querySelector("h1 span.name").textContent;
    const url = window.location.pathname;
    const price = document.querySelector(
      "span.product-formatted-price"
    ).textContent;

    let basketData = getBasketData();

    if (!basketData.find((p) => p.sku === sku)) {
      basketData = [
        ...basketData,
        {
          sku,
          brand,
          name,
          url,
          price,
        },
      ];

      return setBasketData(basketData);
    }
  }

  function removeProductFromBasket(e) {
    const sku = e.target.dataset.sku;
    const basketData = getBasketData().filter((product) => product.sku !== sku);

    setBasketData(basketData);

    document.querySelector(`.${ID}-basket li[data-key="${sku}"]`).remove();

    if (getBasketData().length === 0) {
      document.querySelector(`.${ID}-basket ul`).remove();
      document.querySelector(`.${ID}-basket h2`).insertAdjacentHTML(
        "afterend",
        /* html */ `
				<p>You don't have any saved items.</p>
			`
      );
    }
  }

  if (
    document.querySelector("div.ecomm-cta-wrapper") &&
    window.location.pathname.includes("/glasses/") &&
    getCookie(`${ID}-bucketed`) == "true"
  ) {
    document.documentElement.classList.add(`${ID}-exp-start`);
    const addToBasketEntry = document.querySelector("div.ecomm-cta-wrapper");
    addToBasketEntry.prepend(AddBasket(() => addProductToBasket("test")));

    const oldBasket = document.querySelector(`.frames-buy-online-button`);
    oldBasket.textContent = "Buy Now";
  }

  if (window.location.pathname.includes("/basket") && getCookie(`${ID}-bucketed`) == "true") {
    let basketEntry;
    document.documentElement.classList.add(`${ID}-exp-start`);
    if (document.querySelector(".pane-specsavers-cart")) {
      basketEntry = document.querySelector(
        ".pane-specsavers-cart"
      ).parentElement;
    } else if (document.querySelector("div.dev")) {
      basketEntry = document.querySelector("div.dev");
    }

    basketEntry.prepend(Basket(getBasketData(), removeProductFromBasket));

    // const regex = /glasses-images\/([0-9]*)-front/;
  }
};
