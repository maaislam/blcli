/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
//import brandUSPs from "./data";

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
  const genericUSPSection = () => {
      const mainImage = document.querySelector(".gallery-placeholder img").getAttribute("src");

      const markup = `
      <div class="${ID}-xmas-usps-section">
        <div class="${ID}-container">
          <h3>Dress to impress, not blend in...</h3>
          <div class="${ID}-xmas-usps-section-inner">
            <div class="${ID}-xmas-usps-section-inner-left">
              <h3>Dress to impress, not blend in...</h3>
              <div class="${ID}-usp">
                <div class="${ID}-usp-icon" style="background-image: url('https://editor-assets.abtasty.com/49254/6310c8aa122d81662044330.png')"></div>
                <div class="${ID}-usp-text">
                  <p><span>Be unique and stand out from the crowd</span> - Don't settle for a boring mass market Christmas Jumpers this year</p>
                </div>
              </div>
              <div class="${ID}-usp">
                <div class="${ID}-usp-icon" style="background-image: url('https://editor-assets.abtasty.com/49254/6310c8b7ee2791662044343.png')"></div>
                <div class="${ID}-usp-text">
                  <p><span>It's easier to impress at your office Christmas Party</span> wearing this jumper than it is to take off your head and recite Shakespearean quotations</p>
                </div>
              </div>
              <div class="${ID}-usp">
                <div class="${ID}-usp-icon" style="background-image: url('https://editor-assets.abtasty.com/49254/6310c8c888be11662044360.png')"></div>
                <div class="${ID}-usp-text">
                  <p><span>Treat for you or the perfect gift?</span> Either way this fully knitted jumper is guaranteed to keep you or someone special toasty this winter. </p>
                </div>
              </div>
            </div>
            <div class="${ID}-xmas-usps-section-inner-right">
              <div class="${ID}-prod-image" style="background-image:url('${mainImage}')"></div>
            </div>
          </div>
        </div>
      </div>`;

      document.querySelector("#maincontent").insertAdjacentHTML("afterend", markup);
  };

  const brandedContent = () => {

    const PDPurl = window.location.pathname.replace(/\/+$/, '').replace('/uk/', '');
    

    if(window.brandUSPs[PDPurl]) {

      const brandData = window.brandUSPs[PDPurl];
      const brandMarkup = `
      <div class="${ID}-branded-content-section" style="${window.innerWidth > 767 ? `background-image: url(${brandData.desktopBackground})` : `background-image: url(${brandData.mobileBackground})`}">
        <div class="${ID}-container">
          <div class="${ID}-branded-content-section-inner">
              <div class="${ID}-content">
                <h3>${brandData.title}</h3>
                <p>${brandData.text}</p>
                <a href="${brandData.link}">${brandData.linkText}</a>
              </div>
              <div class="${ID}-brand-usps">
              ${brandData.usps.map(
                (item) =>
                  `<div class="${ID}-brandUSP">
                  <p>${item}</p>
                </div>`
              ).join('')}
            </div>
          </div>
        </div>
      </div>`;

      document.querySelector("#maincontent").insertAdjacentHTML("afterend", brandMarkup);
    }
  };

  if(VARIATION === '1' || VARIATION === '3') {
    genericUSPSection();  
  }

  if(VARIATION === '2' || VARIATION === '3') {
    brandedContent();
  }
}
  
