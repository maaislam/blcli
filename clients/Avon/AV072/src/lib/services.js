import { fullStory, pollerLite } from "../../../../../lib/utils";
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
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const getPageName = () => {
  const slug = window.location.pathname;
  if (slug.indexOf("skin-so-soft-original-dry-oil-spray") !== -1)
    return "skinSoSoft";
  if (slug.indexOf("true-colour-flawless-liquid-foundation") !== -1)
    return "foundation";
  if (slug.indexOf("/products/gel-shine-nail-enamel") !== -1) return "gelShine";
  if (slug.indexOf("/products/lisa-armstrong-skinvisible-foundation") !== -1)
    return "skinvisibleFoundation";

  return false;
};

export const getLabel = () => {
  const labels = {
    skinSoSoft: "Skin So Soft Original",
  };
  const page = getPageName();
  return page ? labels[page] : false;
};
