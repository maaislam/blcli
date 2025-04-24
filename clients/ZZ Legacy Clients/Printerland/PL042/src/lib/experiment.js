/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import { modal } from "./modal";
import shared from "./shared";

export default () => {
  setup();
  const { ID, VARIATION } = shared;

  const popupHTML = modal();

  const dropdown = document.querySelector("#sectionRelated");

  const dropdownTitle = dropdown?.querySelector("h2#listTitle");
  if (dropdownTitle) dropdownTitle.classList.add(`${ID}_title`);

  const brandName =
    window.pagebrand ||
    document
      .querySelector("meta[name\x3d'twitter:description']")
      .content.split(" ")[0];

  // Add USP list
  dropdownTitle.insertAdjacentHTML(
    "afterend",
    `
    <div class="PL042-USP">
      <ul>
        <li><span class="${ID}_tick"></span> <span class="${ID}_label">Genuine ${brandName} cartridges</span></li>
        <li><span class="${ID}_tick"></span> <span class="${ID}_label">Return unopened cartridges within 6 months</span></li>
        <li><span class="${ID}_tick"></span> <span class="${ID}_label">Free Next Day Delivery on all orders over £125</span></li>
        <li><span class="${ID}_tick"></span> <span class="${ID}_label">Protect your warranty</span></li>
      </ul>

      <button id="PL042-toggle">More info</button>
    </div>
  `
  );

  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const addedBtn = document.querySelector("button#PL042-toggle");
  addedBtn
    ? addedBtn.addEventListener("click", () =>
        document.body.classList.add("PL042-showModal")
      )
    : null;

  // Popoup controls
  const addedPopup = document.querySelector(".PL042-modal");
  const popupInner = document.querySelector(".PL042-modal .modal-dialog");
  const popupClose = document.querySelector(
    ".PL042-modal .modal-dialog .suppl button"
  );

  const closePopup = () => document.body.classList.remove("PL042-showModal");

  addedPopup.addEventListener("click", (e) => {
    if (!popupInner.contains(e.target)) {
      closePopup();
    }
  });

  popupClose.addEventListener("click", closePopup);
};
