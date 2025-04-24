/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import createTemplate from "./templates";
import ag073_data from "../testdata";
import { events } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;
let panels = {}; // Holds our panels and DOM refs.

// Helpers.
const clearPanels = () => {
  const prevPanels = document.querySelectorAll(`.${ID}_wrap`);
  const prevPanelsClear = document.querySelectorAll(`.${ID}_clear`);
  if (prevPanels.length > 0) {
    prevPanels.forEach((panel) => panel.remove());
  }
  if (prevPanelsClear.length > 0) {
    prevPanelsClear.forEach((panel) => panel.remove());
  }
  panels = {};
};

/**
 * Get the page number if on a PLP
 * @returns {number}
 */
export const getPageNumber = () => {
  return $(".ProductListTools").scope().ProductListState.PageCurrent;
};

// Add to the current page?
const pageMatch = (panelPage) => {
  return panelPage === getPageNumber();
};

/** Make all changes - can be re-run on page re-render / App_LayoutChanged */
const init = () => {
  fireEvent("Conditions Met");

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // Create panels using the provided data.
  if (ag073_data && ag073_data.panels) {
    const products = document.querySelectorAll(".ProductList .ProductListCell");

    // Inject new panels first, then move products.
    ag073_data.panels.forEach((panel, id) => {
      if (!pageMatch(panel.page)) return;

      // Make a new element
      const elm = createTemplate(panel.type, panel.content);

      // Make a wrapper for it.
      const wrapper = document.createElement("div");
      wrapper.classList.add(`${ID}_wrap`);
      panels[`panel_${id}`] = wrapper;

      wrapper.insertAdjacentElement("afterbegin", elm);
      const anchor = products.item(panel.position);
      if (anchor) {
        anchor.insertAdjacentElement("beforebegin", wrapper);
      }
    });

    // Now we have the panels in the right DOM position, move products around.
    ag073_data.panels.forEach((panel, id) => {
      if (!pageMatch(panel.page)) return;
      const wrapper = panels[`panel_${id}`];
      const pos = panel.position;
      const productsWrap = document.createElement("div");
      productsWrap.classList.add(`${ID}_productsWrap`);

      const wrapProducts =
        pos % 2 === 0
          ? { first: pos, second: pos + 1 }
          : { first: pos - 1, second: pos };

      if (pos % 2 === 0) {
        wrapper.insertAdjacentElement("beforeend", productsWrap);
      } else {
        wrapper.insertAdjacentElement("afterbegin", productsWrap);
      }
      if (products.item(wrapProducts.first)) {
        productsWrap.insertAdjacentElement(
          "beforeend",
          products.item(wrapProducts.first)
        );
      }
      if (products.item(wrapProducts.second)) {
        productsWrap.insertAdjacentElement(
          "beforeend",
          products.item(wrapProducts.second)
        );
      }

      // Add event listener.
      const cta = wrapper.querySelector(`.${ID}_button`);
      if (cta && panel.content.button) {
        cta.addEventListener("click", () => {
          events.send(
            `${ID} - Promotional tile click`,
            panel.type,
            panel.content.button.url
          );
        });
      }

      // Sort out layout styles on the list.
      wrapper.insertAdjacentHTML("afterend", `<div class="${ID}_clear"></div>`);
    });
  }
};

export default () => {
  setup();
  const { rootScope } = shared;

  setTimeout(init, 1500);

  // Observe for page changes.
  rootScope.$on("ProductListUI.FilteringFinished", () => {
    clearPanels();
    setTimeout(init, 1500);
  });
};
