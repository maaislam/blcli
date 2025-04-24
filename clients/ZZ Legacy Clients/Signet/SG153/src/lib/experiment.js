/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertBeforeElement } from "../../../../../lib/utils";
import navData from "./data";

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION === "control") {
    return;
  }

  const navLinks = document.querySelectorAll(
    ".main-nav__item.main-nav__item--top "
  );

  navLinks[1].querySelector(":scope > a > span").innerText = "All Watches";

  navData.forEach((entry) => {
    const navLinks = document.querySelectorAll(
      ".main-nav__item.main-nav__item--top "
    );

    const item = document.createElement("li");
    item.classList.add("main-nav__item", "main-nav__item--top");
    item.setAttribute("data-new-link", "");

    const label = document.createElement("a");
    label.classList.add("main-nav__link");
    label.href = entry.url;

    const labelLink = document.createElement("span");
    labelLink.classList.add("main-nav__text-wrapper");
    labelLink.innerText = entry.title;

    label.appendChild(labelLink);

    const labelCross =
      '<svg class="main-nav__svg main-nav__svg--cross" width="16" height="16" xmlns="http://www.w3.org/2000/svg"> <path d="M8 0v16m8-8H0" stroke="#5C5C5C" stroke-width="2" fill="none" fill-rule="evenodd"></path> </svg>';

    const labelChevron =
      '<svg class="main-nav__svg main-nav__svg--chevron" width="11" height="20" xmlns="http://www.w3.org/2000/svg"> <path d="M0 .925L.768778 0 11 10 .768778 20 0 19.075 9.284 10z" fill="#000" fill-rule="nonzero"></path> </svg>';

    [labelCross, labelChevron].forEach((icon) =>
      label.insertAdjacentHTML("beforeend", icon)
    );

    item.appendChild(label);

    const secondLevelList = document.createElement("ul");
    secondLevelList.classList.add(
      "main-nav__sub-nav",
      "main-nav__second-level"
    );

    item.appendChild(secondLevelList);

    entry.collections.forEach((collection) => {
      const secondLevelItem = document.createElement("li");
      secondLevelItem.classList.add("main-nav__second-level-item");

      secondLevelList.appendChild(secondLevelItem);

      const secondLevelTitle = document.createElement("span");
      secondLevelTitle.classList.add("main-nav__title");
      secondLevelTitle.innerText = collection.title;

      [labelCross, labelChevron].forEach((icon) =>
        secondLevelTitle.insertAdjacentHTML("beforeend", icon)
      );

      secondLevelItem.appendChild(secondLevelTitle);

      const thirdLevel = document.createElement("ul");
      thirdLevel.classList.add("main-nav__sub-nav", "main-nav__third-level");

      secondLevelItem.appendChild(thirdLevel);

      collection.links.forEach((link) => {
        const thirdLevelItem = document.createElement("li");
        thirdLevelItem.classList.add("main-nav__item");

        thirdLevel.appendChild(thirdLevelItem);

        const thirdLevelLabel = document.createElement("a");
        thirdLevelLabel.classList.add("main-nav__link");
        thirdLevelLabel.href = link.url;
        thirdLevelLabel.innerText = link.title;

        thirdLevelItem.appendChild(thirdLevelLabel);
      });
    });

    insertBeforeElement(navLinks[0], item);
  });

  const newLinks = document.querySelectorAll("[data-new-link]");

  const openNav = (el) => {
    const handleNavOpen = (element) => {
      const navHeader = element.children[0];
      const navDrawer = element.children[1];

      element.addEventListener("click", (e) => {
        e.stopPropagation();

        if (window.innerWidth < 1024) {
          if (e.target.parentElement.hasAttribute("data-new-link")) {
            e.preventDefault();
          }

          const handleSiblings = (method) => {
            const siblings = element.parentElement.querySelectorAll(
              ":scope > li:not(.main-nav__user-status, .main-nav__extended-container, .show)"
            );
            if (method === "remove") {
              return siblings.forEach((sib) => sib.classList.remove("hide"));
            }

            siblings.forEach((sib) => sib.classList.add("hide"));
          };

          if (
            element.classList.contains("show") &&
            e.target === navHeader &&
            e.target.parentElement === element
          ) {
            element.classList.remove("show");
            navHeader.classList.remove("main-nav--active-item");
            navDrawer.classList.remove("main-nav__sub-nav--open");

            const allHeaders = element.querySelectorAll(
              ".main-nav--active-item"
            );
            const allDrawers = element.querySelectorAll(
              ".main-nav__sub-nav--open"
            );

            const allHidden = element.querySelectorAll(".hide");
            const allShow = element.querySelectorAll(".show");

            allHeaders.forEach((header) =>
              header.classList.remove("main-nav--active-item")
            );
            allDrawers.forEach((drawer) =>
              drawer.classList.remove("main-nav__sub-nav--open")
            );
            allHidden.forEach((hidden) => hidden.classList.remove("hide"));
            allShow.forEach((show) => show.classList.remove("show"));

            handleSiblings("remove");
            return;
          }
          element.classList.add("show");
          navHeader.classList.add("main-nav--active-item");
          navDrawer.classList.add("main-nav__sub-nav--open");

          handleSiblings("add");
        }
      });

      const childrenLists = navDrawer.querySelectorAll(
        ".main-nav__second-level-item"
      );

      childrenLists.forEach((list) => {
        handleNavOpen(list);
      });
    };

    handleNavOpen(el);
  };

  newLinks.forEach((link) => {
    openNav(link);
    // Tracking Start
    link.addEventListener("click", () => fireEvent("New nav item clicked"));
    // Tracking End
  });
};
