/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from "../../../../../core-files/services";
import { throttle } from "../../../../../lib/uc-lib";
import shared from "../../../../../core-files/shared";
import { observePageChange } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;
let wrapper,
  bar = null;

const formatPercentage = (amount) => {
  return Math.round(Math.abs(amount * 100)) + "%";
};

const processScroll = () => {
  const article = document.querySelector('[data-module-name="articleContent"]');
  const viewportSize = 0.5 * window.innerHeight;
  const scrolledBy = article.getBoundingClientRect().top - viewportSize;
  let perc = formatPercentage(scrolledBy / article.offsetHeight);

  if (scrolledBy > 0 || window.scrollY < 150) {
    perc = 0;
    wrapper.style.setProperty("top", "-64px");
  } else {
    wrapper.style.setProperty("top", "0");
  }
  bar.style.setProperty("width", perc);
};

const matchTestPages = () => {
  const incPages = [
    "https://gocardless.com/direct-debit/",
    "https://gocardless.com/guides/",
    "https://gocardless.com/fr/guides/",
    "https://gocardless.com/en-us/guides/",
    "https://gocardless.com/en-au/guides/",
  ];

  const url = window.location.href;
  let match = false;
  incPages.forEach((inc) => {
    if (url.indexOf(inc) !== -1) match = true;
  });

  return match;
};

const clearTest = () => {
  // Clear out
  if (document.querySelector(`.${ID}_wrapper`)) {
    document.querySelector(`.${ID}_wrapper`).remove();
  }
};

const runChanges = () => {
  if (!matchTestPages()) {
    clearTest();
    return;
  }

  fireEvent("Conditions Met");

  if (VARIATION === "control") {
    return;
  }

  clearTest();

  // Add the bar
  const title = document.querySelector("h1");
  let titleText = "";
  if (title) {
    titleText = title.textContent.trim();
  }
  wrapper = document.createElement("aside");
  wrapper.classList.add(`${ID}_wrapper`);
  document.body.insertAdjacentElement("afterbegin", wrapper);
  wrapper.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${ID}_content">
      ${titleText}
    </div>
  `
  );
  bar = document.createElement("aside");
  bar.classList.add(`${ID}_progress-bar`);
  wrapper.insertAdjacentElement("beforeend", bar);

  // Update it's width on scroll
  document.addEventListener("scroll", throttle(processScroll, 20));
};

const observePageChanges = () => {
  // On title change, update the progress bar title.
  const gatsbyWrapper = document.getElementById("gatsby-focus-wrapper");
  if (gatsbyWrapper) {
    observePageChange(gatsbyWrapper, () => {
      runChanges();
    });
  }
};

export default () => {
  setup();
  observePageChanges();
  runChanges();
};
