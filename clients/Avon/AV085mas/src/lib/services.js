import { events, fullStory } from "./../../../../../lib/utils";
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

/**
 * Get the page type
 * @returns {Promise}
 */
export const getPageType = () =>
  new Promise((resolve, reject) => {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    pollerLite([".Controller_Category"], () => {
      resolve("PLP");
    });

    pollerLite([".Controller_Group"], () => {
      resolve("PLP");
    });
  });
