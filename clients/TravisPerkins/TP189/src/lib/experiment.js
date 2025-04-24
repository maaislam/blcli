/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events, observer, pollerLite } from "../../../../../lib/utils";
import data from "./data";
import { setup } from "./services";
import shared from "./shared";

const { ID } = shared;
let hasObserver = false;

const getViewAll = (categoryLink) => {
  return data[categoryLink] || false;
};

const makeMobileMenuLink = (data) => {
  return `
    <div class="${ID}_link">
      <a href="${data.viewAll}">View All ${data.name}</a>
    </div>
  `;
};

const makeSidebarLink = (data) => {
  return `
  <a class="${ID}_sidebarLink" href="${data.viewAll}">
    <div>View All ${data.name}</div>
    <svg data-test-id="styled-svg" fill="white" class="sc-fzozJi bWQTwj"><use xlink:href="#right"></use></svg>
  </a>
  `;
};

const makeCategoryCard = (data) => {
  return `
  <a href="${data.viewAll}" class="${ID}_cardWrapper">
    <div class="${ID}_cardContent">
      <p>
        View All ${data.name}
      </p>
    </div>
  </a>
  `;
};

const init = () => {
  // Mobile menu.
  const menuBtn = document.querySelector(
    '[data-test-id="animated-header-menu-button"]'
  );

  if (menuBtn && !hasObserver) {
    hasObserver = true;
    observer.connect(
      menuBtn,
      () => {
        setTimeout(() => {
          const menu = document.querySelector('[data-test-id="header-menu"]');
          const link = document.querySelector(`.${ID}_link`);

          if (menu && !link) {
            // Detect which tab is open.
            const categoryTitle = menu.querySelector(
              '[data-test-id="categories-header-title"] a'
            );
            if (categoryTitle) {
              const categoryLink = categoryTitle.getAttribute("href");
              const categoriesList = menu.querySelector(
                '[data-test-id="categories-list"]'
              );

              // See if we wanna add a View All link
              const viewAllLink = getViewAll(categoryLink);
              if (viewAllLink) {
                // Add link
                categoriesList.insertAdjacentHTML(
                  "afterbegin",
                  makeMobileMenuLink(viewAllLink)
                );

                // Track seen link.
                events.send(ID, "View Menu Link", viewAllLink.name);
                if (link) {
                  link.addEventListener("click", () => {
                    // Track clicked link.
                    events.send(ID, "Click Menu Link", viewAllLink.name);
                  });
                }
              }
            }
          }
        }, 100);
      },
      {
        config: {
          attributes: false,
          childList: true,
          subtree: true,
        },
      }
    );
  }

  // Categories pages.
  // Is it a category page & Run on this category page?
  const page = window.location.pathname;
  const viewAllLink = getViewAll(page);
  const link = document.querySelector(`.${ID}_sidebarLink`);

  if (viewAllLink && !link) {
    // Add link to sidebar
    const categorySidebar = document.querySelector(
      '[class*="CategoryNav__CategoriesList"]'
    );
    if (categorySidebar) {
      categorySidebar.insertAdjacentHTML(
        "afterbegin",
        makeSidebarLink(viewAllLink)
      );

      if (link) {
        link.addEventListener("click", () => {
          // Track clicked link.
          events.send(ID, "Click Sidebar Link", viewAllLink.name);
        });
      }
    }
  }

  const card = document.querySelector(`.${ID}_cardWrapper`);
  if (viewAllLink && !card) {
    // Add card to page content
    const categoryCards = document.querySelector(
      '[class*="CategoryList__ListWrapper"]'
    );

    if (categoryCards) {
      categoryCards.insertAdjacentHTML(
        "afterbegin",
        makeCategoryCard(viewAllLink)
      );

      if (card) {
        card.addEventListener("click", () => {
          // Track clicked link.
          events.send(ID, "Click Card Link", viewAllLink.name);
        });
      }
    }
  }
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(["#app-container"], () => {
    const appContainer = document.querySelector("#app-container");

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 2000);
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
