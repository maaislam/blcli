/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    if (document.querySelector(`.ME333-box-container`)) {
      window.addEventListener("scroll", () => {
        if (isScrolledIntoView(document.querySelector(`.ME333-box-container`))) {
          fireEvent("Featured In would have visible", true);
        }
      });
    } else {
      window.addEventListener("scroll", () => {
        if (isScrolledIntoView(document.querySelector(`.merchoid-product-reasons`))) {
          fireEvent("Featured In would have visible");
        }
      });
    }
  } else {
    // V1/3 brand content
    const reviewContent = {
      uk: {
        logo: "https://editor-assets.abtasty.com/49254/63629cd343c1e1667407059.png",
        content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lectus tellus, mollis vel lacus in, blandit tincidunt eros. Aliquam commodo odio in quam congue, at vulputate ligula venenatis."',
      },
      row: {
        logo: "https://www.merchoid.com/media/wysiwyg/independent1.png",
        content: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lectus tellus, mollis vel lacus in, blandit tincidunt eros. Aliquam commodo odio in quam congue, at vulputate ligula venenatis."',
      },
    };

    // V2 brands
    const allBrands = [
      // Change logos
      "https://editor-assets.abtasty.com/49254/63629ce81b1861667407080.png",
      "https://editor-assets.abtasty.com/49254/63629cd343c1e1667407059.png",
      "https://editor-assets.abtasty.com/49254/63629b89a5fff1667406729.png",
      "https://editor-assets.abtasty.com/49254/63629b957e3c91667406741.png",
      "https://editor-assets.abtasty.com/49254/63629ba2ae5ba1667406754.png",
      "https://editor-assets.abtasty.com/49254/63629bb326c741667406771.png",
      "https://editor-assets.abtasty.com/49254/63629bbebd5961667406782.png",
    ];

    const featuredSection = document.createElement("div");
    featuredSection.classList.add(`${ID}-featuredIn`);
    featuredSection.innerHTML = `
    <div class="${ID}-featuredIn__inner">
      <h3>We're proud to have been featured in ...</h3>
      <div class="${ID}-brandsContent">
      </div>
    </div>`;

    document.querySelector(".product-secondary-tabs-wrapper").insertAdjacentElement("afterend", featuredSection);

    const brandReview = () => {
      let brandLogo;
      let brandContent;

      if (VARIATION === "1") {
        brandLogo = reviewContent["uk"].logo;
        brandContent = reviewContent["uk"].content;
      } else if (VARIATION === "3") {
        if (window.location.href.indexOf("/uk/") > -1) {
          brandLogo = reviewContent["uk"].logo;
          brandContent = reviewContent["uk"].content;
        } else {
          brandLogo = reviewContent["row"].logo;
          brandContent = reviewContent["row"].content;
        }
      }

      const review = `
    <div class="${ID}-brandLogo"><div class="${ID}-logo" style="background-image:url(${brandLogo})"></div></div>
    <div class="${ID}-brandReview"><p>${brandContent}</p></div>`;

      document.querySelector(`.${ID}-brandsContent`).innerHTML = review;
    };

    const addBrandLogos = () => {
      for (let index = 0; index < allBrands.length; index += 1) {
        const element = allBrands[index];
        const brandEl = document.createElement("div");
        brandEl.classList.add(`${ID}-brandLogo`);
        brandEl.innerHTML = `<img class="${ID}-logo" src="${element}"/>`;

        document.querySelector(`.${ID}-brandsContent`).appendChild(brandEl);
      }
    };

    if (VARIATION === "1" || VARIATION === "3") {
      brandReview();
    }
    if (VARIATION === "2") {
      addBrandLogos();
    }

    window.addEventListener("scroll", () => {
      if (isScrolledIntoView(document.querySelector(`.${ID}-featuredIn`))) {
        fireEvent("Featured In visible", true);
      }
    });
  }

  
};
