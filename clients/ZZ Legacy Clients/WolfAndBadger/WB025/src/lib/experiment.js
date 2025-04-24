/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from "../../../../../lib/utils";
import { setup, fireEvent } from "./services";
import shared from "./shared";

export default () => {
  setup();

  const { ID } = shared;
  const detectOutsideClicks = {
    cats: false,
    cols: false,
  };
  const cta = document.createElement("a");

  const getCategories = () => {
    const catLinks = document.querySelectorAll("#facet-panel-1 .facet_link");
    if (!catLinks) return false;

    const formatted = [];
    catLinks.forEach((cat) => {
      formatted.push({
        url: cat.getAttribute("href"),
        name: cat.textContent.trim(),
      });
    });

    return formatted;
  };

  const getColours = () => {
    const colours = document.querySelectorAll("#facet-panel-4 .check-label");
    if (!colours) return false;

    const formatted = [];

    colours.forEach((col) => {
      const inp = col.querySelector("input");

      let url = inp.getAttribute("value");
      url = url.replace("colour=", "");
      formatted.push({
        url,
        name: col.textContent.trim(),
      });
    });
    return formatted;
  };

  const getSelectedCat = () => {
    const cat = document.querySelector(".breadcrumbs span");
    if (!cat) return false;
    return cat.textContent.trim();
  };

  const getSelectedCol = () => {
    const colours = document.querySelector("#facet-panel-4 .selected-facet");
    if (!colours) return false;
    if (colours.childNodes) return colours.childNodes[0].nodeValue;
  };

  const cats = getCategories();
  const cols = getColours();

  const catsOrColsEmpty = () => {
    if (cats.length < 1 || cols.length < 1) return true;
    return false;
  };

  const isResults = () => {
    return localStorage.getItem("WB025") === "results";
  };

  const makeLink = (cat = null, col = null) => {
    if (!cat) {
      cat = document.querySelector(`.${ID}_cats`).getAttribute("data-id");
    }
    if (!col) {
      col = document.querySelector(`.${ID}_cols`).getAttribute("data-id");
    }
    return `${cats[cat].url}?colour=${encodeURIComponent(cols[col].url)}`;
  };

  const makeClearAllButton = () => {
    let href = "";
    const crumbs = document.querySelectorAll(".breadcrumbs a");
    if (crumbs && crumbs[1]) href = crumbs[1].getAttribute("href");
    else {
      href = document.querySelector(".clear-all-button a").getAttribute("href");
    }
    return `<a class="${ID}_cta" onclick="localStorage.removeItem('WB025');" href="${href}">CLEAR ALL</a>`;
  };

  const outsideClickEvent = (elm, type) => {
    document.addEventListener("click", (evt) => {
      if (!detectOutsideClicks[type]) return;
      let targetElement = evt.target; // clicked element

      do {
        if (targetElement == elm) {
          return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);

      if (elm.classList.contains(`${ID}_open`)) {
        elm.classList.remove(`${ID}_open`);
        detectOutsideClicks[type] = false;
      }
    });
  };

  const makeDropdown = (data, container, type) => {
    // Wrapper setup
    const wrapper = document.createElement("div");
    const content = document.createElement("div");
    const dropdownDesktop = document.createElement("div");
    const dropdownMobile = document.createElement("select");
    content.insertAdjacentElement("afterbegin", dropdownDesktop);
    content.insertAdjacentElement("afterbegin", dropdownMobile);
    wrapper.insertAdjacentElement("afterbegin", content);
    content.classList.add(`${ID}_dropdownContent`);
    wrapper.classList.add(`${ID}_dropdownWrapper`);
    dropdownDesktop.classList.add(`${ID}_dropdownDesktop`);
    dropdownMobile.classList.add(`${ID}_dropdownMobile`, `${ID}_${type}`);
    dropdownMobile.insertAdjacentHTML(
      "afterend",
      `
        <span class="hidden-non-phone ${ID}_dropdownMobileIcon"><i class="icon icon-angle-down closed-icon"></i></span>
    `
    );

    // Selected option
    content.insertAdjacentHTML(
      "afterbegin",
      `
      <div data-id="0" class="${ID}_selected ${ID}_${type}">
        <span>${data[0].name}</span>
      </div>
    `
    );

    // Make options.
    let optionsDesktop = "";
    let optionsMobile = "";
    data.forEach((cat, id) => {
      optionsDesktop += `
        <div data-id="${id}" class="${ID}_item ${
        id === 0 ? `${ID}_active` : ``
      }">
          <span>${cat.name}</span>
        </div>
      `;

      optionsMobile += `
        <option value="${id}">${cat.name}</option>
      `;
    });

    // Add elements to their new homes
    dropdownDesktop.insertAdjacentHTML("beforeend", optionsDesktop);
    dropdownMobile.insertAdjacentHTML("beforeend", optionsMobile);
    container.insertAdjacentElement("beforeend", wrapper);

    content.insertAdjacentHTML(
      "beforeend",
      `
        <div class="${ID}_icon">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.70588 1.14702C4.55441 3.93811 6.15147 5.50296 9 8.29405L16.2941 1.14702" stroke="white" stroke-width="2"/>
          </svg>
        </div>
    `
    );

    // Label.
    if (type === "cats") {
      wrapper.insertAdjacentHTML(
        "afterbegin",
        `<span class="${ID}_label">SHOW ME</span>`
      );
    } else {
      wrapper.insertAdjacentHTML(
        "afterbegin",
        `<span class="${ID}_label">IN</span>`
      );
    }

    // Events.
    const items = dropdownDesktop.querySelectorAll(`.${ID}_item`);
    const selected = wrapper.querySelector(`.${ID}_selected`);

    // Open dropdown.
    content.addEventListener("click", (e) => {
      e.stopPropagation();

      const alreadyOpenMenu = document.querySelector(`.${ID}_open`);
      if (alreadyOpenMenu) {
        alreadyOpenMenu.classList.remove(`${ID}_open`);
      }

      detectOutsideClicks[type] = true;
      dropdownDesktop.classList.add(`${ID}_open`);
    });

    // Options - change selected.
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const itemID = item.getAttribute("data-id");

        // Update dropdown list item.
        dropdownDesktop
          .querySelector(`.${ID}_active`)
          .classList.remove(`${ID}_active`);
        item.classList.add(`${ID}_active`);

        // Change up the selected item.
        selected.setAttribute("data-id", itemID);
        selected.innerHTML = `<span>${data[itemID].name}</span>`;

        // Hide dropdown.
        setTimeout(() => {
          dropdownDesktop.classList.remove(`${ID}_open`);
        }, 100);

        // Update filter link href
        cta.setAttribute("href", makeLink());

        // Track event.
        events.send(
          ID,
          "Changed",
          `Dropdown - ${type === "cols" ? "Colour" : "Category"}`
        );
      });
    });

    // Select change
    dropdownMobile.addEventListener("change", function () {
      const cat = document.querySelector(`select.${ID}_cats`).value;
      const col = document.querySelector(`select.${ID}_cols`).value;
      cta.setAttribute("href", makeLink(cat, col));
    });

    // Close dropdown on click outside.
    outsideClickEvent(dropdownDesktop, type);
  };

  const testExists = () => {
    return !!document.querySelector(`.${ID}_wrapper`);
  };

  const addFilters = () => {
    if (!testExists()) {
      // Wrapper.
      const wrapper = document.createElement("div");
      wrapper.classList.add(`${ID}_wrapper`);
      const content = document.createElement("div");
      wrapper.insertAdjacentElement("afterbegin", content);

      // Show results box.
      if (isResults()) {
        events.send(ID, "Conditions met");

        // Collapse current filters.
        $(".facets .accordion-toggle:not('.collapsed')")
          .trigger("click")
          .find(".icon-caret-down")
          .removeClass("icon-caret-down")
          .addClass("icon-caret-right");

        // Unset this so it doesn't show on any subsequent filter/ pages.
        setTimeout(() => {
          localStorage.removeItem("WB025");
        }, 2000);

        const noresults = document.querySelector(".noproducts");
        if (noresults) {
          // If there are no results, show note.
          noresults.insertAdjacentElement("beforebegin", wrapper);
          content.insertAdjacentElement("afterbegin", noresults);

          noresults.insertAdjacentHTML("afterend", makeClearAllButton());
        } else {
          // Otherwise, show what filters are on
          const anchor = document.querySelector(".categoryinfo");
          anchor.insertAdjacentElement("afterend", wrapper);

          content.insertAdjacentHTML(
            "afterbegin",
            `
          <p>
            SHOWING <strong>${getSelectedCat()}</strong>
            IN <strong>${getSelectedCol()}</strong>
          </p>
          ${makeClearAllButton()}

        `
          );
        }
      } else if (!catsOrColsEmpty()) {
        // Show filters panel
        events.send(ID, "Conditions met");

        // Add new filters.
        const anchor = document.querySelector(".categoryinfo");
        anchor.insertAdjacentElement("afterend", wrapper);

        // Make dropdowns
        makeDropdown(cats, content, "cats");
        makeDropdown(cols, content, "cols");

        cta.classList.add(`${ID}_cta`);
        cta.textContent = "QUICK SHOP";
        cta.setAttribute("href", makeLink());
        cta.addEventListener("click", () => {
          localStorage.setItem("WB025", "results");
          events.send(ID, "Click", "CTA");
        });

        wrapper.insertAdjacentElement("beforeend", cta);
      }
    }
  };

  addFilters();
};
