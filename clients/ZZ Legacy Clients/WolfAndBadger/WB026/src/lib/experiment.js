/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { scrollTo } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // Selected values.
  let priceFrom = "1";
  let priceTo = "999";
  let selectedCat = "for-him/";
  const baseUrl = "https://www.wolfandbadger.com/uk/category/gifts/";
  let giftUrl = baseUrl;

  // Markup.
  const categorySelectorMarkup = () => {
    return `
      <div class="${ID}_categoriesWrapper">
        <p class="${ID}_label">1. Who are you shopping for today?</p>
        <div class="${ID}_categories">
          <div class="${ID}_category" data-url="for-him/">FOR HIM</div>
          <div class="${ID}_category" data-url="for-her/">FOR HER</div>
          <div class="${ID}_category" data-url="for-them/">UNISEX</div>
          <div class="${ID}_category" data-url="home-for-christmas/">FOR THE HOME</div>
        </div>
      </div>
    `;
  };

  const priceSelectorMarkup = () => {
    return `
      <div class="${ID}_priceWrapper">
        <p class="${ID}_label">2. What is Your price range?</p>
        <div class="${ID}_content">
          <div class="${ID}_slider"></div>
          <div class="${ID}_prices">
          <div class="${ID}_sliderLower">£999</div>
          <div class="${ID}_sliderUpper">£1</div>
          </div>
          <div class="${ID}_next">NEXT</div>
        </div>
      </div>
    `;
  };

  const coloursSelectorMarkup = () => {
    const colours = [
      {
        label: "Black",
        url: "colour=Black",
      },
      {
        label: "Blue",
        url: "colour=Blue",
      },
      {
        label: "Brown",
        url: "colour=Brown",
      },
      {
        label: "Gold",
        url: "colour=Gold",
      },
      {
        label: "Green",
        url: "colour=Green",
      },
      {
        label: "Grey",
        url: "colour=Grey",
      },
      {
        label: "Multicolour",
        url: "colour=Multicolour",
      },
      {
        label: "Neutrals",
        url: "colour=Neutrals",
      },
      {
        label: "Pink & Purple",
        url: "colour=Pink+%26+Purple",
      },
      {
        label: "Red",
        url: "colour=Red",
      },
      {
        label: "Rose Gold",
        url: "colour=Rose",
      },
      {
        label: "Silver",
        url: "colour=Silver",
      },
      {
        label: "White",
        url: "colour=White",
      },
      {
        label: "Yellow & Orange",
        url: "colour=Yellow+%26+Orange",
      },
    ];
    return `
    <div class="${ID}_colours">
      <p class="${ID}_label">3. What Colours would you like to shop?</p>
      <div class="${ID}_content">
        <ul class="${ID}_colours">
          <li class="${ID}_colour">
            <span class="${ID}_checkbox"></span>
            <span class="${ID}_checkboxLabel" data-url=""><strong>I Don't Mind</strong></span>
          </li>
        ${colours
          .map((colour) => {
            return `
            <li class="${ID}_colour" data-url="${colour.url}">
              <span class="${ID}_checkbox"></span>
              <span class="${ID}_checkboxLabel">${colour.label}</span>
            </li>
          `;
          })
          .join("")}
        </ul>
        <div class="${ID}_filter">SHOW ME GIFTS</div>
      </div>
    </div>
  `;
  };

  // Show start/results heading.
  const addPanel = () => {
    // Vars.
    const state =
      window.location.href.indexOf("wbstatus=results") !== -1
        ? "results"
        : "start";
    const titleStart = "need help finding the perfect Gift?";
    const titleResults = "your curated gifts are below";
    const title = state === "start" ? titleStart : titleResults;

    // Markup.
    const markup = `
      <div class="${ID}_container">
        <div class="${ID}_header">
        <div class="${ID}_content">
          <h2 class="${ID}_title">${title}</h2>
          <p class="${ID}_introText">
            Find the perfect gift for her or him with our range of sustainably and ethically produced jewellery, fashion, accessories, homeware and beauty.
          </p>
          <div class="${ID}_start ${
      state === "start" ? `${ID}_trackStart` : `${ID}_trackRestart`
    }">${state === "start" ? "YES PLEASE" : "START AGAIN"}</div>
        </div>
      </div>

        <div class="${ID}_fields">
          ${categorySelectorMarkup()}
          ${priceSelectorMarkup()}
          ${coloursSelectorMarkup()}
        </div>
      </div>
    `;

    // Add to DOM.
    const anchor = document.querySelector(".product-list");
    if (anchor) {
      anchor.insertAdjacentHTML("afterbegin", markup);
    }
  };

  const updateGiftUrl = () => {
    giftUrl = `${baseUrl}${selectedCat}?wbstatus=results&price_min=${priceFrom}&price_max=${priceTo}`;

    // Get selected colours.
    const selectedColours = document.querySelectorAll(
      `.${ID}_colour.${ID}_active`
    );
    if (selectedColours) {
      selectedColours.forEach((col) => {
        const colUrl = col.getAttribute("data-url");
        if (colUrl) giftUrl += `&${colUrl}`;
      });
    }
  };

  const bindEvents = () => {
    // Start the stepper.
    const start = document.querySelector(`.${ID}_start`);
    if (start) {
      start.addEventListener("click", () => {
        // Update title and intro.
        document.querySelector(`.${ID}_fields`).classList.add(`${ID}_open`);
        document.querySelector(`.${ID}_title`).textContent =
          "Let’s find the perfect Gift";
        document.querySelector(`.${ID}_introText`).classList.add(`${ID}_open`);
        start.remove();
      });
    }

    // Select category.
    const cats = document.querySelectorAll(`.${ID}_category`);
    if (cats) {
      const categoryCallback = (i) => {
        // remove current active classes.
        const active = document.querySelector(`.${ID}_active.${ID}_category`);
        if (active) active.classList.remove(`${ID}_active`);

        // add active class
        const price = document.querySelector(`.${ID}_priceWrapper`);
        if (price) {
          price.classList.add(`${ID}_open`);

          // Scroll to price.
          setTimeout(() => {
            scrollTo(price.getBoundingClientRect().top + window.scrollY - 120);
          }, 250);
        }

        cats[i].classList.add(`${ID}_active`);
        selectedCat = cats[i].getAttribute("data-url");
      };
      for (let i = 0; i < cats.length; i++) {
        cats[i].addEventListener("click", () => categoryCallback(i));
      }
    }

    // Select pricing.
    const next = document.querySelector(`.${ID}_next`);
    if (next) {
      next.addEventListener("click", () => {
        const colours = document.querySelector(`.${ID}_colours`);
        if (colours) {
          colours.classList.add(`${ID}_open`);
          next.remove();
          setTimeout(() => {
            scrollTo(colours.getBoundingClientRect().top + window.scrollY - 80);
          }, 250);
        }
      });
    }

    // Select colours.
    const cols = document.querySelectorAll(`.${ID}_colour`);
    const cta = document.querySelector(`.${ID}_filter`);
    if (cols) {
      for (let i = 0; i < cols.length; i++) {
        cols[i].addEventListener("click", () => {
          cols[i].classList.toggle(`${ID}_active`);
          cta.classList.add(`${ID}_active`);
        });
      }
    }

    // Run the filters!
    const filter = document.querySelector(`.${ID}_filter`);
    if (filter) {
      filter.addEventListener("click", () => {
        updateGiftUrl();
        fireEvent("Click - Show me my gifts");
        window.location.href = giftUrl;
      });
    }

    // Event tracking.
    const trackStart = document.querySelector(`.${ID}_trackStart`);
    const trackRestart = document.querySelector(`.${ID}_trackRestart`);
    if (trackStart) {
      trackStart.addEventListener("click", () => {
        fireEvent("Click - Yes please");
      });
    }
    if (trackRestart) {
      trackRestart.addEventListener("click", () => {
        fireEvent("Click - Start again");
      });
    }
  };

  const makePriceSlider = () => {
    // Load slider
    var s = document.createElement("script");
    document.getElementsByTagName("head")[0].appendChild(s);
    s.src = `https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.7.0/nouislider.min.js`;
    s.type = "text/javascript";
    s.async = false;
    s.onload = () => {
      const slider = document.querySelector(`.${ID}_slider`);
      if (window.noUiSlider) {
        window.noUiSlider.create(slider, {
          start: [1, 999],
          range: {
            min: 1,
            max: 999,
          },
        });

        const upper = document.querySelector(`.${ID}_sliderUpper`);
        const lower = document.querySelector(`.${ID}_sliderLower`);
        slider.noUiSlider.on("update", (values, handle) => {
          const value = values[handle];

          if (handle) {
            // Upper
            upper.textContent = `£${Math.round(value)}`;
            priceTo = Math.round(value);
          } else {
            // Lower
            lower.textContent = `£${Math.round(value)}`;
            priceFrom = Math.round(value);
          }
        });
      }
    };
  };

  const init = () => {
    if (document.querySelector(`.${ID}_container`)) return;
    addPanel();
    makePriceSlider();
    bindEvents();
  };

  init();
};
