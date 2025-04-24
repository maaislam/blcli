/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertAfterElement } from "../../../../../lib/utils";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem(`${ID}`) !== "Fired") {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, "Fired");
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION === "control") {
    return;
  }

  const entryElement = document.querySelector("#header");
  const rootElement = document.createElement("div");
  rootElement.classList.add(`${ID}-root`);
  rootElement.innerHTML = /* HTML */ `
    <div>
      <div class="algolia-ac-col keywords" id="algolia-ac-col-keywords">
        <p id="algolia-ac-title-keywords" class="algolia-ac-title">
          Popular search terms
        </p>
        <ul class="algolia-ac-keywords">
          <li>
            <a
              href="/sitesearch?searchTerm=vitamin%2020c"
              class="algolia-ac-qs-link"
            >
              vitamin c
            </a>
          </li>
          <li>
            <a href="/sitesearch?searchTerm=shampoo" class="algolia-ac-qs-link">
              shampoo
            </a>
          </li>
          <li>
            <a href="/sitesearch?searchTerm=mascara" class="algolia-ac-qs-link">
              mascara
            </a>
          </li>
          <li>
            <a
              href="/sitesearch?searchTerm=electric%20toothbrush"
              class="algolia-ac-qs-link"
            >
              electric toothbrush
            </a>
          </li>
          <li>
            <a
              href="/sitesearch?searchTerm=face%20masks"
              class="algolia-ac-qs-link"
            >
              face masks
            </a>
          </li>
          <li>
            <a
              href="/sitesearch?searchTerm=concealer"
              class="algolia-ac-qs-link"
            >
              concealer
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="${ID}-popular-products">
      <h4 class="${ID}-heading">Popular products</h4>
      <ul>
        <li>
          <a
            href="https://www.boots.com/huda-beauty-about-last-night-star-gift-set-10302198"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10302198?op_sharpen=1"
              alt="Huda Beauty About Last Night Star Gift Set"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>Huda Beauty About Last Night Star Gift Set</h5>
            <a
              href="https://www.boots.com/huda-beauty-about-last-night-star-gift-set-10302198"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/no7-the-ultimate-skincare-collection-10297951"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10297951?op_sharpen=1"
              alt="No7 The Ultimate Skincare Collection"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>No7 The Ultimate Skincare Collection</h5>
            <a
              href="https://www.boots.com/no7-the-ultimate-skincare-collection-10297951"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/oral-b-pro-3-3900--black-and-pink-electric-toothbrushes-designed-by-braun-10297731"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10297731?op_sharpen=1"
              alt="Oral-B Pro 3 - 3900 - Black & Pink Electric Toothbrushes Designed By Braun"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>
              Oral-B Pro 3 - 3900 - Black & Pink Electric Toothbrushes Designed
              By Braun
            </h5>
            <a
              href="https://www.boots.com/oral-b-pro-3-3900--black-and-pink-electric-toothbrushes-designed-by-braun-10297731"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/estee-lauder-double-wear-stay-in-place-makeup-spf-10-30ml-10249140"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10249140?op_sharpen=1"
              alt="Estée Lauder Double Wear Stay-in-Place Foundation SPF 10 30ml"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>
              Estée Lauder Double Wear Stay-in-Place Foundation SPF 10 30ml
            </h5>
            <a
              href="https://www.boots.com/estee-lauder-double-wear-stay-in-place-makeup-spf-10-30ml-10249140"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/estee-lauder-double-wear-stay-in-place-makeup-spf-10-30ml-10249140"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10292473?op_sharpen=1"
              alt="Boots Protective FFP2 NR Face Masks 5 Single Use Respirators"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>
              Boots Protective FFP2 NR Face Masks 5 Single Use Respirators
            </h5>
            <a
              href="https://www.boots.com/estee-lauder-double-wear-stay-in-place-makeup-spf-10-30ml-10249140"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/olay-vitamin-c-plus-aha24-day-gel-face-cream-for-bright-and-even-tone-50ml-10305489"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10305489?op_sharpen=1"
              alt="Olay Vitamin C + AHA24 Day Gel Face Cream For Bright And Even Tone 50ml"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>
              Olay Vitamin C + AHA24 Day Gel Face Cream For Bright And Even Tone
              50ml
            </h5>
            <a
              href="https://www.boots.com/olay-vitamin-c-plus-aha24-day-gel-face-cream-for-bright-and-even-tone-50ml-10305489"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/soap-and-glory-a-printly-glorious-selection-10298228"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10298228?op_sharpen=1"
              alt="Soap & Glory X Zeena A Printly Glorious Selection Gift Set"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>Soap & Glory X Zeena A Printly Glorious Selection Gift Set</h5>
            <a
              href="https://www.boots.com/soap-and-glory-a-printly-glorious-selection-10298228"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/no7-protect-and-perfect-intense-advanced-collection-10289338"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10289338?op_sharpen=1"
              alt="No7 Protect & Perfect Intense ADVANCED Collection"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>No7 Protect & Perfect Intense ADVANCED Collection</h5>
            <a
              href="https://www.boots.com/no7-protect-and-perfect-intense-advanced-collection-10289338"
              >Shop now</a
            >
          </div>
        </li>
        <li>
          <a
            href="https://www.boots.com/dyson-corrale-straightener-special-edition-10304932"
            class="${ID}-faux-link"
          ></a>
          <div class="${ID}-popular-products-image">
            <img
              src="https://boots.scene7.com/is/image/Boots/10304932?op_sharpen=1"
              alt="Dyson Corrale™ Straightener Special Edition - Prussian Blue/Rich Copper"
            />
          </div>
          <div class="${ID}-popular-products-content">
            <h5>
              Dyson Corrale™ Straightener Special Edition - Prussian Blue/Rich
              Copper
            </h5>
            <a
              href="https://www.boots.com/dyson-corrale-straightener-special-edition-10304932"
              >Shop now</a
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="${ID}-popular-brands">
      <h4 class="${ID}-heading">Popular brands</h4>
      <ul>
        <li class="${ID}-brand">
          <a href="https://www.boots.com/no7">
            <span>No7</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/image%204.png"
              alt="No7"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a href="https://www.boots.com/olay">
            <span>Olay</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/Olay.png"
              alt="Olay"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a href="https://www.boots.com/cerave">
            <span>CeraVe</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/cerave.png"
              alt="CeraVe"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a href="https://www.boots.com/la-roche-posay">
            <span>La Roche Posay</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/la-roche-posay.png"
              alt="La Roche Posay"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a
            href="https://www.boots.com/SearchDisplay?sType=SimpleSearch&pageId=1603259&categoryId=&pageView=&showResultsPage=true&beginIndex=0&searchSource=Q&resultCatEntryType=2&pageSize=24&manufacturer=Kiehl%27s&storeId=11352&isA2ZBrand=Y"
          >
            <span>Kiehls</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/image%203.png"
              alt="Kiehls"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a href="https://www.boots.com/maybelline">
            <span>Maybelline</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/maybelline.png"
              alt="Maybelline"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a
            href="https://www.boots.com/SearchDisplay?sType=SimpleSearch&pageId=1603259&categoryId=&pageView=&showResultsPage=true&beginIndex=0&searchSource=Q&resultCatEntryType=2&pageSize=24&manufacturer=M.A.C&storeId=11352&isA2ZBrand=Y"
          >
            <span>M.A.C</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/image%205.png"
              alt="M.A.C"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a href="https://www.boots.com/dior">
            <span>Dior</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/image%206.png"
              alt="Dior"
            />
          </a>
        </li>
        <li class="${ID}-brand">
          <a href="https://www.boots.com/chanel">
            <span>Chanel</span>
            <img
              src="https://blcro.fra1.digitaloceanspaces.com/BO163/Chanel.png"
              alt="Chanel"
            />
          </a>
        </li>
      </ul>
    </div>
  `;

  const renderExperiment = () => {
    const el = document.querySelector(`${ID}-root`);

    if (!el) insertAfterElement(entryElement, rootElement);
  };

  const destroyExperiment = () => {
    rootElement.remove();
  };

  const searchContainer = document.querySelector("#search_container");
  const searchOverlay = document.querySelector("#overlay");

  const mutationObserver = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.target.style.display === "block" &&
        entry.attributeName === "style" &&
        entryElement.classList.contains("active") &&
        searchContainer.style.display === "block"
      ) {
        renderExperiment();
      } else if (entry.attributeName === "style") {
        destroyExperiment();
      }
    });
  });

  mutationObserver.observe(searchOverlay, { attributes: true });

  const foundItemsContainer = document.querySelector(
    ".algolia-search-container"
  );

  const inputMutationObserver = new MutationObserver((entries) => {
    entries.forEach(() => {
      const foundItems = foundItemsContainer.querySelectorAll(
        "#algolia-ac-products > a"
      );

      if (
        foundItems.length === 0 &&
        document
          .querySelector("#overlay")
          .classList.contains("mobile_header_opened_overlay")
      ) {
        renderExperiment();
      } else if (
        foundItemsContainer.classList.contains("closed") &&
        document
          .querySelector("#overlay")
          .classList.contains("mobile_header_opened_overlay")
      ) {
        renderExperiment();
      } else {
        destroyExperiment();
      }
    });
  });

  inputMutationObserver.observe(foundItemsContainer, {
    childList: true,
    subtree: true,
    attributes: true,
  });
};
