/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getPageName, setup } from "./services";
import shared from "./shared";
import pageContent from "./content";
import { events } from "../../../../../lib/utils";
import stickyNav from "./stickyNav";

export default () => {
  setup();
  const { ID, VARIATION } = shared;
  const $window = $(window);

  const trackedState = {
    "first-parallax-seen": false,
    "last-usp-seen": false,
  };

  // Detect if element is in view and track.
  const trackElementInView = (elementName, eventAction, trackStickyNav) => {
    const wrapper = $(`#${ID}${elementName}`);
    if (wrapper.length) {
      const topOfElement = wrapper.offset().top;
      const bottomOfElement = wrapper.offset().top + wrapper.outerHeight();
      const bottomOfScreen = $window.scrollTop() + $window.innerHeight();
      const topOfScreen = $window.scrollTop();

      // In view!
      if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
        if (!trackedState[eventAction]) {
          trackedState[eventAction] = true;
          events.send(`${ID}-${VARIATION}`, eventAction);
        }
      }

      // Near top of screen
      if (trackStickyNav) {
        if (topOfElement - topOfScreen < 250) {
          if (!document.body.classList.contains(`${ID}_stickyNav`)) {
            document.body.classList.add(`${ID}_stickyNav`);
          }
        } else if (document.body.classList.contains(`${ID}_stickyNav`)) {
          document.body.classList.remove(`${ID}_stickyNav`);
        }
      }
    }
  };

  const starsImage = (type) => {
    if (type === "light")
      return "https://service.maxymiser.net/cm/images-eu/avon-mas/57F1838471EDC7EF2B524DF888D2DB39B53D73613EE9F6B777E1EDDF60556D4E.svg?meta=/AV055---Avon-Hero-PDP/stars.svg";
    return "https://service.maxymiser.net/cm/images-eu/avon-mas/5468356A056185981FBED25A9A72DC441E3203BCFD7F8A610BB7F39640D41099.svg?meta=/AV055---Avon-Hero-PDP/stars_dark.svg";
  };

  /** Make all changes */
  const init = () => {
    // Match page.
    const thisPage = getPageName();
    if (!thisPage) return;
    const content = pageContent[thisPage];

    // Prevent duplicates.
    if ($(`.${ID}_wrapper`).length) return;

    // Stycky nav.
    stickyNav();

    $("#product-tabs-mobile").before(`
    <div class="col-12">
      <div class="${ID}_wrapper ${ID}_${thisPage}">
        <div class="${ID}_parallaxWrapper" id="${ID}_parallaxWrapper1" style="background-image: url('${
      content.parallax1.bgImage
    }')">
          <div class="${ID}_parallaxContent">
            <h2>${content.parallax1.title}</h2>
            <p>${content.parallax1.text}</p>
          </div>
        </div>
        <div class="${ID}_textImageWrapper" style="background-color: #${
      content.textImage1.bgColor
    }">
          <div class="${ID}_content">
            <div class="${ID}_imageWrapper">
              <img class="${ID}_slide" src="${content.textImage1.image}" />
            </div>
            <div class="${ID}_textWrapper">
              <h3>${content.textImage1.title}</h3>
              <p>${content.textImage1.text}</p>
            </div>
          </div>
        </div>
        <div class="${ID}_textImageWrapper" style="background-color: #${
      content.textImage2.bgColor
    }">
          <div class="${ID}_content">
            <div class="${ID}_textWrapper ${ID}_textRight">
              <h3>${content.textImage2.title}</h3>
              <p>${content.textImage2.text}</p>
            </div>
            <div class="${ID}_imageWrapper">
              <img class="${ID}_slide ${ID}_slide_right" src="${
      content.textImage2.image
    }" />
            </div>
          </div>
        </div>
        <div class="${ID}_parallaxWrapper ${ID}_parallaxWrapperBottom" style="background-image: url('${
      content.parallax2.bgImage
    }')">
            <h2>${content.parallax2.title}</h2>
            <p>${content.parallax2.text}</p>
            <div class="${ID}_starsWrapper">
              <img src="${
                thisPage === "gelShine"
                  ? starsImage("dark")
                  : starsImage("light")
              }" />
            </div>
        </div>
        <div class="${ID}_textImageWrapper" id="${ID}_textWrapper3" style="background-color: #${
      content.textImage3.bgColor
    }">
          <div class="${ID}_content">
            <div class="${ID}_imageWrapper">
              <img class="${ID}_slide" src="${content.textImage3.image}" />
            </div>
            <div class="${ID}_textWrapper">
              <h3>${content.textImage3.title}</h3>
              <p>${content.textImage3.text}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      `);

    // Detect scroll to fire tracking events.
    const scrollCallback = () => {
      trackElementInView("_parallaxWrapper1", "first-parallax-seen", true);
      trackElementInView("_textWrapper3", "last-usp-seen");
    };
    $window.scroll(scrollCallback);

    // Slide in image on scroll into view.
    const $animationElements = $(`.${ID}_slide`);
    const checkInView = () => {
      const windowHeight = $window.height();
      const windowTopPos = $window.scrollTop();
      const windowBotPos = windowTopPos + windowHeight;

      $.each($animationElements, function () {
        const $element = $(this);
        const elementHeight = $element.outerHeight();
        const elementTopPos = $element.offset().top;
        const elementBotPos = elementTopPos + elementHeight;
        if (elementBotPos >= windowTopPos && elementTopPos <= windowBotPos)
          $element.addClass(`${ID}_hasSlid`);
      });
    };
    $window.on("scroll resize", checkInView);
  };
  /*
    Re-run this when browser is resized to simulate layout change check.
  */
  $window.resize(init);

  init();
};
