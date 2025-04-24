/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events, pollerLite } from "../../../../../lib/utils";
import { setup } from "./services";
import shared from "./shared";
import { getSlider } from "./slider";

const popupMarkup = () => {
  return `
    <div class="${shared.ID}_overlay">
    </div>
    <aside class="${shared.ID}_wrapper">
      <div class="${shared.ID}_close">
      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="https://www.w3.org/2000/svg">
        <line x1="2.06066" y1="1.93934" x2="22.0607" y2="21.9393" stroke="white" stroke-width="3"/>
        <line x1="1.42085" y1="21.9393" x2="21.4208" y2="1.93934" stroke="white" stroke-width="3"/>
      </svg>
      </div>

      <div class="${shared.ID}_arrow-left">
        <svg width="13" height="28" viewBox="0 0 13 28" fill="none" xmlns="https://www.w3.org/2000/svg">
          <path d="M11.5 27L2 14L11.5 1" stroke="#F3B337" stroke-width="2"/>
        </svg>
      </div>
      <div class="${shared.ID}_arrow-right">
        <svg width="12" height="28" viewBox="0 0 12 28" fill="none" xmlns="https://www.w3.org/2000/svg">
          <path d="M1 1L10.5 14L1 27" stroke="#F3B337" stroke-width="2"/>
        </svg>
      </div>

      <div class="${shared.ID}_content" id="${shared.ID}_slider">

        <div class="${shared.ID}_slide ${shared.ID}_slide1">
          <div class="${shared.ID}_copy">
            <div>
              <h2>Save Time. <br/> Work Smarter.</h2>
              <h3>DOWNLOAD</h3>
              <p>The Travis Perkins App and <strong>get 10% off your first order*</strong></p>
           </div>
          </div>
          <div class="${shared.ID}_images">
            <div class="${shared.ID}_image">
              <img src="//sb.monetate.net/img/1/581/3369131.png" />
            </div>
            <div class="${shared.ID}_appstore">
              <a href="https://apps.apple.com/gb/app/travis-perkins/id1511514158"><img class="${shared.ID}_apple" src="//sb.monetate.net/img/1/581/3369132.png" /></a>
              <a href="https://play.google.com/store/apps/details?id=com.travisperkins.tradeapp&gl=GB"><img class="${shared.ID}_google" src="//sb.monetate.net/img/1/581/3369127.png" /></a>
              <div class="${shared.ID}_legal">
                <p>*Maximum spend limit for offer is £1,000. Full <a href="https://www.travisperkins.co.uk/content/tp-app-discount-promotion-ts-&-cs">Terms and Conditions</a></p>
              </div>
            </div>
          </div>
        </div>

        <div class="${shared.ID}_slide ${shared.ID}_slide2">
          <div class="${shared.ID}_copy">
            <div>
              <p>Exclusive for <span>cash</span> and <span>credit</span> accounts</p>
            </div>
          </div>

          <div class="${shared.ID}_images">
            <div class="${shared.ID}_image">
              <img src="//sb.monetate.net/img/1/581/3369130.png" />
              <div class="${shared.ID}_appstore">
                <a href="https://apps.apple.com/gb/app/travis-perkins/id1511514158"><img class="${shared.ID}_apple" src="//sb.monetate.net/img/1/581/3369132.png" /></a>
                <a href="https://play.google.com/store/apps/details?id=com.travisperkins.tradeapp&gl=GB"><img class="${shared.ID}_google" src="//sb.monetate.net/img/1/581/3369127.png" /></a>
              </div>
            </div>
          </div>
        </div>

        <div class="${shared.ID}_slide ${shared.ID}_slide3">
          <div class="${shared.ID}_copy">
            <div>
              <p>Pay your invoices <span>online</span></p>
            </div>
          </div>

          <div class="${shared.ID}_images">
            <div class="${shared.ID}_image">
              <img src="//sb.monetate.net/img/1/581/3369129.png" />
              <div class="${shared.ID}_appstore">
                <a href="https://apps.apple.com/gb/app/travis-perkins/id1511514158"><img class="${shared.ID}_apple" src="//sb.monetate.net/img/1/581/3369132.png" /></a>
                <a href="https://play.google.com/store/apps/details?id=com.travisperkins.tradeapp&gl=GB"><img class="${shared.ID}_google" src="//sb.monetate.net/img/1/581/3369127.png" /></a>
              </div>
            </div>
          </div>
        </div>

        <div class="${shared.ID}_slide ${shared.ID}_slide4">
          <div class="${shared.ID}_copy">
            <div>
              <p>Shop <span>full catalogue</span> and create <span>personalised product</span> lists</p>
            </div>
          </div>

          <div class="${shared.ID}_images">
            <div class="${shared.ID}_image">
              <img src="//sb.monetate.net/img/1/581/3369128.png" />
              <div class="${shared.ID}_appstore">
                <a href="https://apps.apple.com/gb/app/travis-perkins/id1511514158"><img class="${shared.ID}_apple" src="//sb.monetate.net/img/1/581/3369132.png" /></a>
                <a href="https://play.google.com/store/apps/details?id=com.travisperkins.tradeapp&gl=GB"><img class="${shared.ID}_google" src="//sb.monetate.net/img/1/581/3369127.png" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="${shared.ID}_dots">
        <span class="${shared.ID}_dot1 ${shared.ID}_dot_active"></span>
        <span class="${shared.ID}_dot2"></span>
        <span class="${shared.ID}_dot3"></span>
        <span class="${shared.ID}_dot4"></span>
      </div>
    </aside>

  `;
};

const tracking = {
  slide1: false,
  slide2: false,
  slide3: false,
  slide4: false,
};

const init = () => {
  const componentAlreadyExists = document.querySelector(
    `.${shared.ID}_wrapper`
  );
  const userHasAccout = !!(
    localStorage.getItem("PreviousSuccessfulLogin") ||
    sessionStorage.getItem("loggedIn") === "Yes"
  );
  const shownDuringSession = sessionStorage.getItem(`${shared.ID}_disabled`);
  const postcodePopupActive = document.querySelector(
    '[data-test-id="delivery-address-popup"]'
  );

  if (
    componentAlreadyExists ||
    !userHasAccout ||
    postcodePopupActive ||
    shownDuringSession
  ) {
    return;
  }

  // Experiment Code...
  setup();

  // Add popup
  const page = document.getElementById("app-container");
  page.insertAdjacentHTML("afterbegin", popupMarkup());

  if (!tracking.slide1) {
    events.send(shared.ID, "seen", "Slide 1");
    tracking.slide1 = true;
  }

  // Only run once during a session
  sessionStorage.setItem(`${shared.ID}_disabled`, true);

  // set slide width
  const wrapper = document.querySelector(`.${shared.ID}_wrapper`);
  const overlay = document.querySelector(`.${shared.ID}_overlay`);

  // Start slider
  let slidingLeft = true;
  let dotIndex = 1;
  let clicked = false;
  const slider = getSlider({
    container: document.getElementById(`${shared.ID}_slider`),
    delay: 5,
    init: 0,
    end: 0,
    show: 1,
    prop: "opacity",
    unit: "",
    onChangeEnd: () => {
      if (!clicked) dotIndex = slider.currentIndex() + 1;
      const activeDots = document.querySelector(`.${shared.ID}_dot_active`);
      if (activeDots) activeDots.classList.remove(`${shared.ID}_dot_active`);

      const thisDot = document.querySelector(`.${shared.ID}_dot${dotIndex}`);
      if (thisDot) thisDot.classList.add(`${shared.ID}_dot_active`);

      if (!tracking[`slide${dotIndex}`]) {
        events.send(shared.ID, "seen", `Slide ${dotIndex}`);
        tracking[`slide${dotIndex}`] = true;
      }
    },
  });

  // Arrows
  const leftArrow = document.querySelector(`.${shared.ID}_arrow-left`);
  const rightArrow = document.querySelector(`.${shared.ID}_arrow-right`);
  const close = document.querySelector(`.${shared.ID}_close`);

  // Back (slide right)
  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      clicked = true;
      dotIndex = dotIndex - 1 < 1 ? 4 : dotIndex - 1;
      if (slidingLeft) {
        slider.reverse();
        slidingLeft = false;
      }
      slider.next();
      slider.pause();
    });
  }

  if (rightArrow) {
    // Forward (slide left)
    rightArrow.addEventListener("click", () => {
      clicked = true;
      dotIndex = dotIndex + 1 > 4 ? 1 : dotIndex + 1;
      if (!slidingLeft) {
        slider.reverse();
        slidingLeft = true;
      }
      slider.next();
      slider.pause();
    });
  }

  const closeModal = () => {
    if (overlay) overlay.remove();
    if (wrapper) wrapper.remove();
  };

  if (close) {
    close.addEventListener("click", () => {
      closeModal();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      closeModal();
    });
  }

  const appleLinks = document.querySelectorAll(`.${shared.ID}_apple`);
  const googleLinks = document.querySelectorAll(`.${shared.ID}_google`);

  appleLinks.forEach((item) => {
    item.addEventListener("click", () => {
      events.send(shared.ID, "click", "Apple app store");
    });
  });

  googleLinks.forEach((item) => {
    item.addEventListener("click", () => {
      events.send(shared.ID, "click", "Google app store");
    });
  });
};

export default () => {
  init();
};
