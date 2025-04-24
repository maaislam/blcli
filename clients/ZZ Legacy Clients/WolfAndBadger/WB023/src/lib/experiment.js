/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite, events } from "../../../../../lib/utils";
import { setup } from "./services";
import shared from "./shared";
import navData from "./NavData";

export default () => {
  // get localeUrl for page URLs
  const { curations, guestedits, gifts, newIn } = navData;
  const tracking = {
    inspiration: false,
    inspirationTab: false,
  };
  let eventTrackingAdded = false;

  // Get the element we append ourselves after.
  const findMenuElement = (wrapperElement) => {
    // Menu item - find beauty menu item to append our template after.
    const menuItems = document.querySelectorAll(wrapperElement);
    const searchText = "/beauty/";

    // Find by menu item label.
    let beautyItem = null;
    for (let i = 0; i < menuItems.length; i++) {
      let link = menuItems[i].getElementsByTagName("a");
      if (link) link = link[0];
      if (link && link.href.toLowerCase().trim().indexOf(searchText) !== -1) {
        beautyItem = menuItems[i];
        break;
      }
    }

    return beautyItem;
  };

  // Event tracking
  const addEventTracking = () => {
    if (eventTrackingAdded) return;
    eventTrackingAdded = true;

    // Track Inspiration tab open (mobile)
    const trackMobileVisible = document.querySelector(
      `.${shared.ID}_trackVisible`
    );
    if (trackMobileVisible) {
      trackMobileVisible.addEventListener("click", () => {
        if (tracking.inspiration) return;
        events.send(shared.ID, "Open", "Inspiration menu tab");
        tracking.inspiration = true;
      });
    }
    // Track Inspiration tab open (desktop)
    const trackDesktopVisible = document.querySelector(
      `.${shared.ID}_trackVisibleDesktop`
    );
    if (trackDesktopVisible) {
      trackDesktopVisible.addEventListener("mouseenter", () => {
        if (tracking.inspiration) return;
        events.send(shared.ID, "Open", "Inspiration menu tab");
        events.send(shared.ID, "Open", "Inspiration submenu tab");
        tracking.inspiration = true;
      });
    }

    // Track Inspiration subtab open (mobile)
    const trackMobileTabVisible = document.querySelectorAll(
      `.${shared.ID}_trackTabVisible`
    );
    trackMobileTabVisible.forEach((item) => {
      item.addEventListener("click", () => {
        if (tracking.inspirationTab) return;
        events.send(shared.ID, "Open", "Inspiration submenu tab");
        tracking.inspirationTab = true;
      });
    });

    // Track box click
    const trackedBoxes = document.querySelectorAll(
      `.${shared.ID}_trackBoxClick`
    );
    trackedBoxes.forEach((item) => {
      item.addEventListener("click", () => {
        let label = item.dataset.label.toLowerCase();
        events.send(shared.ID, "Click", `Content block - ${label}`);
      });
    });

    // Track additional click
    const trackedAdditional = document.querySelectorAll(
      `.${shared.ID}_trackAdditionalClick`
    );
    trackedAdditional.forEach((item) => {
      item.addEventListener("click", () => {
        let label = item.dataset.label.toLowerCase();
        events.send(shared.ID, "Click", `Link - ${label}`);
      });
    });
  };

  // MARKUP HELPERS: Generate bits of markup

  const markupContentBox = (data) => {
    return `
    <div class="span3 ${shared.ID}_boxWrapper ${
      shared.ID
    }_trackBoxClick" data-label="${data.title.trim()}">
      <div class="column">
        <a class="menu-img ${shared.ID}_menu-img" href="${data.url}">
          <img class="lazyload" data-src="${data.image}" />
          ${data.title}
        </a>
      </div>
      </div>
    `;
  };

  const markupAdditionalLinks = (links, name, size) => {
    /* eslint-disable indent */
    const markup = `
      <div class="span${size}">
        <div class="column">
          <span class="list-heading ${
            shared.ID
          }_additionalHeading" data-submenu-path="category-">
            ${name || "MORE"}
          </span>
          <div class="${shared.ID}_additionalList">
            <ul>
            ${links
              .map((navItem, i) => {
                const breakColumn =
                  size === 12 && (i + 1) % 8 === 0 ? "</ul><ul>" : "";
                return `
              <li><a class="${
                shared.ID
              }_trackAdditionalClick" data-label="${navItem.title.trim()}" href="${
                  navItem.url
                }">${navItem.title}</a></li>${breakColumn}
              `;
              })
              .join("")}
            </ul>
          </div>
        </div>
      </div>
    `;

    return markup;
    /* eslint-enable indent */
  };

  const markupToggles = () => {
    return `
      <div class="${shared.ID}_toggle ${shared.ID}_trackTabVisibleDesktop ${shared.ID}_activeToggle" data-toggle="curations">OUR CURATIONS</div>
      <div class="${shared.ID}_toggle ${shared.ID}_trackTabVisibleDesktop" data-toggle="guestedits">GUEST EDITS</div>
      <div class="${shared.ID}_toggle ${shared.ID}_trackTabVisibleDesktop" data-toggle="gifts">GIFTS</div>
      <div class="${shared.ID}_toggle ${shared.ID}_trackTabVisibleDesktop" data-toggle="newIn">NEW IN</div>
    `;
  };

  const markupContentDesktop = (data, name, additionalSize) => {
    let markup = `
      <div class="${shared.ID}_content ${
      name === "curations" ? `${shared.ID}_active` : ""
    }" data-toggle-content="${name}">
        <div class="row-fluid">
    `;
    if (data.block1) markup = markup.concat(markupContentBox(data.block1));
    if (data.block2) markup = markup.concat(markupContentBox(data.block2));
    if (data.block3) markup = markup.concat(markupContentBox(data.block3));
    if (data.additional)
      markup = markup.concat(
        markupAdditionalLinks(
          data.additional,
          data.additionalLabel,
          additionalSize
        )
      );
    markup = markup.concat("</div></div>");
    return markup;
  };

  const markupMobileGroup = (data, title, name) => {
    /* eslint-disable indent */
    const markup = `
      <div class="accordion-group">
        <div class="accordion-heading">
          <a class="accordion-toggle ${
            shared.ID
          }_trackTabVisible" data-toggle="collapse" data-parent="#mobilesitemenu-beauty-accordion" href="#mobilesitemenu-${name}-menu">
            ${title} <i class="icon icon-caret-right"></i>
          </a>
        </div>
        <div class="accordion-body collapse" id="mobilesitemenu-${name}-menu">
          <ul>
            ${data.block1 ? markupContentBox(data.block1) : ""}
            ${data.block2 ? markupContentBox(data.block2) : ""}
            ${data.block3 ? markupContentBox(data.block3) : ""}
            ${data.additional
              .map((child) => {
                let { title, url } = child;
                return `
                <li>
                  <a href="${url}" class="${
                  shared.ID
                }_trackAdditionalClick" data-label="${title.trim()}">
                    ${title}
                  </a>
                </li>
                `;
              })
              .join("")}
          </ul>
        </div>
      </div>
    `;

    return markup;
    /* eslint-enable indent */
  };

  // INJECT: Combine and add markup to Menus

  const changeDesktopMenu = () => {
    if (document.getElementById(`${shared.ID}_inspirationsubmenu`)) return;

    let beautyItem = findMenuElement("#sitemenu ul li");
    if (!beautyItem)
      beautyItem = document.querySelector("#sitemenu ul li:nth-child(5)");

    // Insert new menu item.
    beautyItem.insertAdjacentHTML(
      "afterend",
      `
      <li>
        <a data-menu-path="inspiration" class="${shared.ID}_trackVisibleDesktop">
          ${navData.title}
        </a>
      </li>
    `
    );

    // Add submenu
    const submenus = document.getElementById("sitesubmenu");
    submenus.insertAdjacentHTML(
      "beforeend",
      `
      <div id="${
        shared.ID
      }_inspirationsubmenu" class="navmenu hide" data-menu-root-path="inspiration">
        <div class="submenu-wrapper hidden-menu">
          <div class="container">
            <div class="row-fluid menu-inner">
              <div class="span2 ${shared.ID}_togglesWrapper">
                ${markupToggles()}
              </div>
              <div class="span10 ${shared.ID}_contentWrapper">
                ${markupContentDesktop(curations, "curations", 3)}
                ${markupContentDesktop(guestedits, "guestedits", 3)}
                ${markupContentDesktop(gifts, "gifts", 12)}
                ${markupContentDesktop(newIn, "newIn", 12)}
              </div>
            </div>
          </div>
        </div>
        <div class="submenu-fade"></div>
      </div>
    `
    );

    // Add toggle functionality
    const toggles = document.querySelectorAll(`.${shared.ID}_toggle`);
    toggles.forEach((toggle) => {
      toggle.addEventListener("mouseenter", () => {
        // Active toggle state
        toggles.forEach((toggle) =>
          toggle.classList.remove(`${shared.ID}_activeToggle`)
        );
        toggle.classList.add(`${shared.ID}_activeToggle`);

        setTimeout(() => {
          // Hide other content.
          const other = document.querySelector(`.${shared.ID}_active`);
          if (other) other.classList.remove(`${shared.ID}_active`);

          // Open content
          const name = toggle.dataset.toggle;
          const menu = document.querySelector(
            `[data-toggle-content="${name}"]`
          );
          if (menu) menu.classList.add(`${shared.ID}_active`);
        }, 190);
      });
    });
  };

  const changeMobileMenu = () => {
    if (document.getElementById(`${shared.ID}_inspirationmobilemenu`)) return;

    let beautyItem = findMenuElement(
      "#mobilesitemenu-accordion .accordion-group"
    );
    if (!beautyItem)
      beautyItem = document.querySelector(
        "#mobilesitemenu-accordion .accordion-group:nth-child(5)"
      );

    beautyItem.insertAdjacentHTML(
      "afterend",
      `
      <div class="accordion-group" id="${shared.ID}_inspirationmobilemenu">
        <div class="accordion-heading">
          <a class="accordion-toggle ${
            shared.ID
          }_trackVisible" data-toggle="collapse" data-parent="#mobilesitemenu-accordion" href="#mobilesitemenu-inspiration-menu">
            ${navData.title} <i class="icon icon-caret-right"></i>
          </a>
        </div>
        <div class="accordion-body collapse" id="mobilesitemenu-inspiration-menu">
          <ul>
            <div class="accordion toggle-carets" id="mobilesitemenu-inspiration-accordion">
              ${markupMobileGroup(curations, "OUR CURATIONS", "curations")}
              ${markupMobileGroup(guestedits, "GUEST EDITS", "guestedits")}
              ${markupMobileGroup(gifts, "GIFTS", "gifts")}
              ${markupMobileGroup(newIn, "NEW IN", "newIn")}
            </div>
          </ul>
        </div>
      </div>
    `
    );
  };

  const init = () => {
    pollerLite(["body"], () => {
      changeDesktopMenu();
      changeMobileMenu();
      addEventTracking();
    });

    setup();
  };

  init();
};
