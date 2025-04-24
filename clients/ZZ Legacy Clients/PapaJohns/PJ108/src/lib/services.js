import { fullStory, setCookie } from "../../../../../lib/utils";
import shared from "./shared";

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.documentElement.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const updateStep = (step) => {
  const { ID, VARIATION } = shared;

  setCookie(`${ID}_step`, step, 99);
  // Update DOM
  const wrapper = document.querySelector(`.${ID}_wrapper`);
  if (wrapper) {
    wrapper.setAttribute("data-step", step);
  }
};
