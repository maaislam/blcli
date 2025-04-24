import { events, fullStory } from "../../../../../lib/utils";
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
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  // set up events
  events.setDefaultCategory("Experimentation");
  events.setDefaultAction(CLIENT + " - " + ID);

  if (LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);
};

export const getPageName = () => {
  const slug = window.location.pathname;
  if (slug.indexOf("product/5072/") !== -1) return "skinSoSoft";
  if (slug.indexOf("product/563/") !== -1) return "foundation";
  if (slug.indexOf("product/18637/") !== -1) return "rossetto";
  if (slug.indexOf("product/15073/") !== -1) return "skinvisibleFoundation";
  if (slug.indexOf("product/3907/") !== -1) return "trueColourLipstick";
  if (slug.indexOf("product/13491") !== -1) return "mascara";
  return false;
};
