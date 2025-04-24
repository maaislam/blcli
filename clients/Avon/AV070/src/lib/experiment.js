/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getPLPType, getLayoutName } from "./services";
import shared from "./shared";
import { events } from "../../../../../lib/utils";

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;
  const data = {
    variation1: {
      face: {
        title: "FLAWLESS IN 5",
        text:
          "This hydrating foundation with SPF15 uses Blue Colour IQ technology to create a beautiful, full-coverage finish without the cakey feel.",
        name: "Flawless Liquid Foundation",
        price: "£7.00",
        previousPrice: "£10.00",
        ctaLabel: "View Shades",
        image:
          "https://service.maxymiser.net/cm/images-eu/avon-mas/34DF6BD306E8E86290EA0721D307ACD4B380BC06BAB394CCE5135940D189A66E.png?meta=/AV049---Brochure-style-Product-Promotion/Group9.png",
        backgroundImage:
          "url('https://service.maxymiser.net/cm/images-eu/avon-mas/7B7DFB039972F8CA21B5E78B9D577AA6AC0D39A3753B171BD06DFD58628DA9DD.png?meta=/AV049---Brochure-style-Product-Promotion/face_background.png')",
        url: `${window.location.origin}/product/5498/avon-true-flawless-liquid-foundation-spf15`,
      },
      nails: {
        title: "MANI MUST-HAVE",
        text:
          "Enjoy high-shine, high-impact salon-ready nails with our Gel Shine Nail Enamel. Our new and improved formula provides intense plump colour without a UV lamp!",
        name: "Gel Shine Nail Enamel",
        price: "£3.50",
        previousPrice: "£4.00",
        ctaLabel: "View Colours",
        image:
          "https://service.maxymiser.net/cm/images-eu/avon-mas/4306BCC0C140FF6B450CB0293C53FD894401C7A3C8B245AAF55191ED8EB3AFAC.png?meta=/AV049---Brochure-style-Product-Promotion/Group11.png",
        backgroundImage:
          "linear-gradient(180deg, #FCFEFF 0%, rgba(252, 254, 255, 0) 100%), url('https://service.maxymiser.net/cm/images-eu/avon-mas/146F4274A786A59CBF364B3E180F9FD1929968570EBEEE692B919A64E9E0F810.png?meta=/AV049---Brochure-style-Product-Promotion/nails_background.png')",
        url: `${window.location.origin}/product/14047/gel-shine-nail-enamel`,
      },
    },
    variation2: {
      face: {
        title: "a luxuriously flawless finish",
        text:
          "Give your look a luminous base with our buildable, cashmere-soft foundation. The lightweight formula glides on beautifully for a flawless finish.",
        name: "Lisa Armstrong SKINvisible Foundation",
        price: "£16.00",
        ctaLabel: "VIEW SHADES",
        image:
          "https://service.maxymiser.net/cm/images-eu/avon-mas/64BC6FAE0523B010BD1B4AABDD9C4DF2FF4FC50D028C26F932C57ED9437AE678.png?meta=/AV070---New-Products/face2_product.png",
        backgroundImage:
          "url('https://service.maxymiser.net/cm/images-eu/avon-mas/502B6DC8331571980B15230872A226465B2EB6DBB12324944A8F5F07D7A56960.png?meta=/AV070---New-Products/face2_backgrund.png')",
        url: `${window.location.origin}/product/15073/lisa-armstrong-skinvisible-foundation`,
      },
      nails: {
        title: "PERFECT FOR THOSE SHORT ON TIME",
        text:
          "Try our True Colour Lipstick, a rich and hydrating lip colour that’s infused with shea butter and vitamin E for lips that feel smooth, soft and moisturised all-day.",
        name: "Avon True Colour Lipstick",
        price: "£5.00",
        previousPrice: "£7.50",
        ctaLabel: "VIEW SHADES",
        image:
          "https://service.maxymiser.net/cm/images-eu/avon-mas/8A906883409704AAFFE5668DEC835FA634322F483502D04FDC6B1E3B47A37F45.png?meta=/AV070---New-Products/nails2_product.png",
        backgroundImage:
          "url('https://service.maxymiser.net/cm/images-eu/avon-mas/344B9974299FB2C0F426241C13A3D40C78F2434C85FDFBF42DB7DE61EED8E772.png?meta=/AV070---New-Products/nails2_background.png')",
        url: `${window.location.origin}/product/3907/avon-true-colour-lipstick`,
        white: true,
      },
    },
  };

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    sessionStorage.setItem(`${ID}-init`, "1");
    if (getLayoutName() === "Phone") {
      const $elm = $(`#${ID}_swipe`);
      const $header = $("#HeaderPlaceholder");

      if ($elm.length > 0) {
        setTimeout(() => {
          const topPos = $header.position().top + $header.outerHeight(true);
          $elm.css("top", `${topPos}px`);
        }, 500);
        return;
      }

      const pageType = getPLPType();
      const variation = `variation${VARIATION}`;
      const content = data[variation][pageType];

      const headerBottom = $header.position().top + $header.outerHeight(true);
      $("body").addClass(`${ID}_noscroll`);

      // Wait for header to fully load it before finding out it's position
      setTimeout(() => {
        const topPos = $header.position().top + $header.outerHeight(true);
        $(`.${ID}_wrapper`).css("top", `${topPos}px`);
      }, 1000);

      const popup = `
        <aside style="top: ${headerBottom}px; background-image: ${
        content.backgroundImage
      };" class="${ID}_wrapper ${
        content.white ? `${ID}_white` : ""
      }" id="${ID}_swipe">
          <div class="${ID}_content">
            <div class="${ID}_header">
              <p class="${ID}_label">Bestseller</p>
              <div class="${ID}_close-button ${
        content.white ? `${ID}_white` : ""
      }"></div>
            </div>
            <h4 class="${ID}_title ${ID}_link">${content.title}</h4>
            <div class="${ID}_description">${content.text}</div>
            <div class="${ID}_product-details">
              <div class="${ID}_details-left">
                <h5 class="${ID}_product-name">${content.name}</h5>
                ${
                  content.previousPrice
                    ? `<p class="${ID}_previousPrice">WAS: <em>${content.previousPrice}</em></p>`
                    : ""
                }
                <p class="${ID}_currentPrice">NOW: <em>${content.price}</em></p>
              </div>
              <div class="${ID}_details-right ${ID}_link" style="background-image: url('${
        content.image
      }')"></div>
            </div>
            <div class="${ID}_cta ${ID}_link Button vi-btn vi-btn--primary">${
        content.ctaLabel
      }</div>
            <div class="${ID}_scroll-label-wrapper">
              <div class="${ID}_scroll-label">
              <span class="${
                content.white ? `${ID}_white` : ""
              }">Swipe down for products</span>
              </div>
            </div>
          </div>
        </aside>
      `;

      setTimeout(() => {
        const topPos = $header.position().top + $header.outerHeight(true);
        $(`.${ID}_wrapper`).css("top", `${topPos}px`);
      }, 1000);

      // Add to the DOM
      $header.after(popup);

      const closeModal = (animate) => {
        if (animate) {
          $(`.${ID}_wrapper`).slideUp();
        } else {
          $(`.${ID}_wrapper`).hide();
        }
        $("body").removeClass(`${ID}_noscroll`);

        // Track.
        if (window.usabilla_live)
          window.usabilla_live("trigger", "Variation negative");
      };

      // Handle close.
      $(document).on("click", `.${ID}_close-button`, () => {
        closeModal(true);
      });

      // Open PDP
      $(`.${ID}_link`).click(() => {
        window.location.href = content.url;

        // Track click.
        events.send(`${ID}-${VARIATION}`, "Click", "PDP");
        if (window.usabilla_live)
          window.usabilla_live("trigger", "Variation positive");
      });

      // On swipe
      const touchsurface = document.getElementById(`${ID}_swipe`);
      let startX;
      let startY;
      let dist;
      const threshold = 75; // required min distance traveled to be considered swipe
      const allowedTime = 400; // maximum time allowed to travel that distance
      let elapsedTime;
      let startTime;

      const handleswipe = (hasSwiped) => {
        if (hasSwiped) closeModal(true);
      };

      touchsurface.addEventListener("touchstart", (e) => {
        const touchobj = e.changedTouches[0];
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
      });

      touchsurface.addEventListener("touchmove", (e) => {
        e.preventDefault(); // prevent scrolling when inside DIV
      });

      touchsurface.addEventListener("touchend", (e) => {
        const touchobj = e.changedTouches[0];

        dist = startY - touchobj.pageY; // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        // check that elapsed time is within specified, vertical dist traveled >= threshold, and horizontal dist traveled <= 100
        const swipeUp =
          elapsedTime <= allowedTime &&
          dist >= threshold &&
          Math.abs(touchobj.pageX - startX) <= 100;
        handleswipe(swipeUp);
      });
    } else {
      $(`.${ID}_wrapper`).hide();
      $("body").removeClass(`${ID}_noscroll`);
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on("NotificationService.DismissCookiePolicy", () => {
    setTimeout(init, 500);
  });

  setTimeout(init, 1500);
};
