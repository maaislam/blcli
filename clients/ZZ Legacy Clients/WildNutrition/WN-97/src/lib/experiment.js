/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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

  const filterData = [
    {
      text: "Featured",
      param: "sort_by=manual",
    },
    {
      text: "Best Selling",
      param: "sort_by=best-selling",
    },
    {
      text: "Alphabetically, A-Z",
      param: "sort_by=title-ascending",
    },
    {
      text: "Alphabetically, Z-A",
      param: "sort_by=title-descending",
    },
    {
      text: "Price, low to high",
      param: "sort_by=price-ascending",
    },
    {
      text: "Price, high to low",
      param: "sort_by=price-descending",
    },
    {
      text: "Date, new to old",
      param: "sort_by=created-descending",
    },
    {
      text: "Date, old to new",
      param: "sort_by=created-ascending",
    },
  ];

  const entryElement = document.querySelector("div.clc-List");
  const Dropdown = /* html */ `
		<div class="${ID}-root">
			<div class="${ID}-dropdown">
				<button class="${ID}-dropdown-toggle">
					Sort by
					<span>
						<svg viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 1H.5a.5.5 0 010-1h13a.5.5 0 010 1zM.5 4h9a.5.5 0 010 1h-9a.5.5 0 010-1zm0 3.999h13a.5.5 0 010 1H.5a.5.5 0 010-1zM.5 12H8a.5.5 0 010 1H.5a.5.5 0 010-1z" fill="#3A3836" fill-rule="nonzero"></path></svg>
					</span>
				</button>
				<ul>
					${filterData
            .map(
              (filter) => /* html */ `
						<li class="${ID}-dropdown-item ${
                window.location.href.includes(filter.param)
                  ? `${ID}-active`
                  : ""
              }">
							<button data-param="${filter.param}">${filter.text}</button>
						</li>`
            )
            .join("")}
				</ul>
			</div>
		</div>
	`;

  function toggleDropdown(el) {
    if (el.hasAttribute("open")) {
      el.removeAttribute("open");
    } else {
      el.setAttribute("open", "");
    }
  }

  function redirectWindow(param) {
    window.location.href = window.location.pathname + "?" + param;
  }

  entryElement.insertAdjacentHTML("afterbegin", Dropdown);

  const toggle = document.querySelector(`.${ID}-dropdown-toggle`);

  toggle.addEventListener("click", (e) => {
    fireEvent("Sort Opened");
    e.stopPropagation();
    toggleDropdown(e.target);
  });

  document.querySelectorAll(`.${ID}-dropdown-item button`).forEach((button) => {
    button.addEventListener("click", (e) => {
      fireEvent(`${e.target.textContent} clicked`);
      redirectWindow(e.target.getAttribute("data-param"));
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !document.querySelector(`.${ID}-dropdown`).contains(e.target) &&
      toggle.hasAttribute("open")
    ) {
      toggle.removeAttribute("open");
    }
  });
};
