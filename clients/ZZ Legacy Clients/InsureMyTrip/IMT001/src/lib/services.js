import { fullStory } from "../../../../../lib/utils";
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

export const getCodeFromUrl = () => {
  const url = window.location.href;
  if (url.indexOf("/hire/p/edging-sander-240v") !== -1) return 5422;
  if (url.indexOf("/hire/p/concrete-mixer-tip-up-110v") !== -1) return 42141;
  if (url.indexOf("/hire/p/floor-and-edge-sander-hire-pack") !== -1)
    return 5429;
  if (url.indexOf("/hire/p/floor-sander-240v") !== -1) return 5412;
  if (url.indexOf("/hire/p/wallpaper-stripper-240v") !== -1) return 61132;
  if (url.indexOf("/hire/p/drill-hammer-36v-battery") !== -1) return 2343;

  return false;
};
