/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from "../../../../../lib/utils";
import { setup } from "./services";
import shared from "./shared";

export default () => {
  setup();
  const { ID } = shared;
  const results = document.querySelector("#aisSearchContainer");
  let clickedLink = false;
  let trackedScroll = false;
  const twoHours = 1000 * 60 * 60 * 2;

  const showOverlay = () => {
    document.body.classList.add(`${ID}_active`);
  };

  const hideOverlay = () => {
    document.body.classList.remove(`${ID}_active`);
  };

  const canShowOverlay = () => {
    return !results.classList.contains("active");
  };

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const init = (list) => {
    if (list) {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
          <div class="${ID}_wrapper">
            <div class="${ID}_content">
              <div class="content__wrapper">
                <div class="row limited-row">

                </div>
              </div>
            </div>
          </div>
        `
      );
      const wrapper = document.querySelector(`.${ID}_wrapper`);
      const row = wrapper.querySelector(".row");

      const cats = `
          <h3>Popular searches</h3>
          <div class="${ID}_cats">
          <a href="https://www.printerland.co.uk/printers/laser/colour/a4">A4 Colour Laser Printers</a>
          <a href="https://www.printerland.co.uk/printers/laser/colour/a3">A3 Colour Laser Printers</a>
          <a href="https://www.printerland.co.uk/printers/multifunction/colour">All In One Colour Printers</a>
          <a href="https://www.printerland.co.uk/printers/inkjet">Inket Printers</a>
          </div>
          <h3>Most popular printers</h3>
          `;

      row.insertAdjacentHTML("afterbegin", cats);
      row.insertAdjacentHTML("beforeend", list);

      // Event tracking.
      const catLinks = document.querySelectorAll(`.${ID}_cats a`);
      catLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.stopPropagation();
          clickedLink = true;
          const label = link.innerText.trim();
          events.send(ID, "click", `Quick Link - ${label}`);
        });
      });

      const viewLinks = row.querySelectorAll(".btn.btn--yellow");
      viewLinks.forEach((link) => {
        link.addEventListener("click", function () {
          clickedLink = true;
          events.send(ID, "click", `View button`);
        });
      });

      const titleLinks = row.querySelectorAll(".header__text");
      titleLinks.forEach((link) => {
        link.addEventListener("click", function () {
          clickedLink = true;
          events.send(ID, "click", `Printer name`);
        });
      });

      const imgLinks = row.querySelectorAll(".product-item__img");
      imgLinks.forEach((link) => {
        link.addEventListener("click", function () {
          clickedLink = true;
          events.send(ID, "click", `Printer image`);
        });
      });

      const content = $(`.${ID}_content`);
      content.scroll(() => {
        if (!trackedScroll) {
          events.send(ID, "scroll", `Overlay scrolled`);
          trackedScroll = true;
        }
      });

      $("#search input").focus(() => {
        if (canShowOverlay()) {
          showOverlay();
        }
      });

      $("#search input").blur(() => {
        // Set timeout so clicks on links in the panel are not front-run
        setTimeout(() => {
          if (!clickedLink) {
            hideOverlay();
          }
        }, 300);
      });

      const observer = new MutationObserver(() => {
        if (!canShowOverlay()) hideOverlay();
      });

      const config = {
        attributes: true,
      };
      observer.observe(results, config);
    }
    window.SetRatings();
  };

  const loadProducts = () => {
    fetch("https://www.printerland.co.uk")
      .then((response) => {
        // The API call was successful!
        return response.text();
      })
      .then((html) => {
        // Convert the HTML string into a document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const list = doc.querySelector("ul.product__items");
        setWithExpiry(`${ID}_list`, list.outerHTML, twoHours);

        init(list.outerHTML);
      })
      .catch((err) => {
        // There was an error
        console.warn("Something went wrong.", err);
      });
  };

  // Check if list is chached
  const cachedList = getWithExpiry(`${ID}_list`);
  if (cachedList) {
    init(cachedList);
  } else {
    loadProducts();
  }
};
