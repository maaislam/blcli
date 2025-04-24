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
  const localeUrl = document.querySelector(".home-link").getAttribute("href");

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

  const addEventTracking = (wrapper, menuLabel, selector = "a") => {
    // Event tracking
    const menuItem = document.getElementById(wrapper);
    const links = menuItem.querySelectorAll(selector);
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", () => {
        events.send(shared.ID, "Click", `${menuLabel} tab menu item`);
      });
    }
  };

  /**
   * Recursively build sub navigations
   * @param {Array.<{
   *  title: string,
   *  url: string,
   *  children: Array
   * }>} navItems Array of any menu items for this level
   *  Must follow the same structure as the parent item (title, url and optional children)
   */
  const createMenuDesktopMarkup = (navItems, mainTitle = "") => {
    /* eslint-disable indent */

    // Support for Gifts / simple non-nested menu addition [scope change]
    let FormattedNavItems = navItems;
    if (!navItems[0].children) {
      FormattedNavItems = [
        {
          title: mainTitle,
          children: navItems,
        },
      ];
    }

    const markup = `
      ${FormattedNavItems.map((navItem) => {
        let { title, url, children } = navItem;

        return `
          <div class="column">
            ${
              url
                ? `
                <a class="list-heading" href="${url}" data-submenu-path="category-">
                  ${title}
                </a>
              `
                : `
                <span class="list-heading" data-submenu-path="category-">
                  ${title}
                </span>
              `
            }
            ${
              children
                ? `
                <ul>
                  ${children
                    .map((child) => {
                      let { title, url } = child;
                      return `
                      <li>
                        <a href="${url}">${title}</a>
                      </li>
                    `;
                    })
                    .join("")}
                </ul>
              `
                : ""
            }
          </div>
        `;
      }).join("")}
    `;

    return markup;
    /* eslint-enable indent */
  };

  /**
   * Recursively build sub navigations
   * @param {Array.<{
   *  title: string,
   *  url: string,
   *  children: Array
   * }>} navItems Array of any menu items for this level
   *  Must follow the same structure as the parent item (title, url and optional children)
   */
  const createMenuMobileMarkup = (navItems) => {
    /* eslint-disable indent */
    const markup = `
      ${navItems
        .map((navItem) => {
          let { title, url, children } = navItem;

          const id = title.replace(/\s/g, "_").toLowerCase();

          // Non-nested
          if (url) {
            return `
              <div class="accordion-group">
                <div class="accordion-heading">
                  <a href="${url}" class="${shared.ID}_trackClick">
                    ${title}
                  </a>
                </div>
              </div>
            `;
          }

          return `
          <div class="accordion-group">
            <div class="accordion-heading">
              <a class="accordion-toggle" data-toggle="collapse" data-parent="#mobilesitemenu-beauty-accordion" href="#mobilesitemenu-${id}-menu">
                ${title} <i class="icon icon-caret-right"></i>
              </a>
            </div>
            <div class="accordion-body collapse" id="mobilesitemenu-${id}-menu">
              <ul>
                ${children
                  .map((child) => {
                    let { title, url } = child;
                    return `
                    <li>
                      <a href="${url}" class="${shared.ID}_trackClick">
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
        })
        .join("")}
    `;

    return markup;
    /* eslint-enable indent */
  };

  const changeDesktopMenu = () => {
    if (document.getElementById(`${shared.ID}_custommenu0`)) return;

    // Loop through each new menu item and generate it's markup.
    for (let index = navData.length - 1; index >= 0; index--) {
      let beautyItem = findMenuElement("#sitemenu ul li");
      if (!beautyItem) {
        beautyItem = document.querySelector("#sitemenu ul li:nth-child(5)");
      }

      // Insert new menu item.
      beautyItem.insertAdjacentHTML(
        "afterend",
        `
        <li>
          <a data-menu-path="custom${index}">
            ${navData[index].title}
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
        }_custommenu${index}" class="navmenu hide" data-menu-root-path="custom${index}">
          <div class="submenu-wrapper hidden-menu">
            <div class="container">
              <div class="row-fluid menu-inner">
                <div class="span9">
                  ${createMenuDesktopMarkup(
                    navData[index].children,
                    navData[index].title
                  )}
                </div>
                <div class="span3">
                  <a class="menu-img" href="${localeUrl}christmas/">
                    <img class="lazyload" data-src="${navData[index].imageUrl}">
                    ${navData[index].imageLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="submenu-fade"></div>
        </div>
      `
      );

      addEventTracking(
        `${shared.ID}_custommenu${index}`,
        navData[index].title,
        "a"
      );
    }
  };

  const changeMobileMenu = () => {
    if (document.getElementById(`${shared.ID}_custommobilemenu0`)) return;

    for (let index = navData.length - 1; index >= 0; index--) {
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
        <div class="accordion-group" id="${shared.ID}_custommobilemenu${index}">
          <div class="accordion-heading">
            <a class="accordion-toggle" data-toggle="collapse" data-parent="#mobilesitemenu-accordion" href="#custom-menu-${index}">
              ${navData[index].title} <i class="icon icon-caret-right"></i>
            </a>
          </div>
          <div class="accordion-body collapse" id="custom-menu-${index}">
            <ul>
              <div class="accordion toggle-carets" id="custom-menu-accordion-${index}">
                ${createMenuMobileMarkup(navData[index].children)}
              </div>
            </ul>
          </div>
        </div>
      `
      );

      addEventTracking(
        `${shared.ID}_custommobilemenu${index}`,
        navData[index].title,
        `a.${shared.ID}_trackClick`
      );
    }
  };

  const init = () => {
    pollerLite([".on-desktop", "#sitemenu"], () => {
      changeDesktopMenu();
    });

    pollerLite(["body:not(.on-desktop)", "#mobilesitemenu-accordion"], () => {
      changeMobileMenu();
    });

    setup();
  };

  init();
};
