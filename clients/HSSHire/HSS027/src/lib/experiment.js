/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from "../../../../../lib/utils";
import products from "./products";
import { getCodeFromUrl, setup } from "./services";
import shared from "./shared";

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  if (VARIATION === "1") {
    const makeProductGrid = () => {
      const productList = products[getCodeFromUrl()];
      return productList
        .map((product) => {
          return `
        <div class="col-xs-6 col-sm-4 col-md-2 prod_list_outer">
          <div
            class="prod_list"
          >
            <div class="prod_inner">
              <div class="thumb">
              <a href="${
                product.url
              }" class="${ID}_track" data-label="${product.name.trim()}">
                <img
                  src="${product.image}"
                />
                </a>
              </div>
              <div class="details">
                <a href="${
                  product.url
                }" class="${ID}_track" data-label="${product.name.trim()}">
                  <div class="title considered">
                    <h2>${product.name}</h2>
                  </div>
                </a>
              </div>
              <div class="${ID}_trustpilot-widget" data-locale="en-US" data-template-id="54d39695764ea907c0f34825" data-businessunit-id="4bebbd1c00006400050b13eb" data-style-height="24px" data-style-width="100%" data-theme="light" data-sku="${
            product.code
          }">
                    <a href="https://www.trustpilot.com/review/www.hss.com" target="_blank" rel="noopener">Trustpilot</a>
              </div>
              <div class="cart">
                <p class="price">${product.price}</p>
              </div>
            </div>

            <div>
              <a
                href="${product.url}"
                style="text-decoration: none"
                class="btn btn-primary ${ID}_cta ${ID}_track" data-label="${product.name.trim()}"
              >
                Buy Now
              </a>
              </div>
          </div>

        </div>
      `;
        })
        .join("");
    };

    // Inject into the page
    const anchor = document.getElementById("main");
    if (anchor) {
      anchor.insertAdjacentHTML(
        "afterend",
        `
    <aside class="${ID}_wrapper">
      <div class="container white_container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="${ID}_title">HSS Recommends</h2>
          </div>
        </div>
        <div class="row row-eq-height">
          ${makeProductGrid()}
        </div>
      </div>
    </aside>
  `
      );

      // Load Trustpilot widgets.
      const widgets = document.querySelectorAll(`.${ID}_trustpilot-widget`);
      if (widgets) {
        widgets.forEach((widget) => {
          window.Trustpilot.loadFromElement(widget);
        });
      }
    }

    // Tracking
    let viewTracked = false;
    const track = document.querySelectorAll(`.${ID}_track`);
    if (track) {
      track.forEach((btn) => {
        btn.addEventListener("click", () => {
          const label = btn.dataset.label;
          events.send(ID, "Click", label);
        });
      });
    }

    const $wrapper = document.querySelector(`.${ID}_wrapper`);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true && !viewTracked) {
          events.send(ID, "View", "Visitor has seen the panel");
          viewTracked = true;
          observer.unobserve($wrapper);
        }
      },
      { threshold: [0] }
    );

    observer.observe($wrapper);
  }
};
