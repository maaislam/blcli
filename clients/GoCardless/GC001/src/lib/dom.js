/*
* @fileoverview A helper to get dom panels without the use of CSS classes.
The landing pages use generated classes which may change from time to time.
This helper allows us to use data attributes and order of panels instead.
* @author: Jakub Wawszczyk
*/

// All main content panels present on the landing pages.
const domPanels = {
  hero: null,
  video: null,
  features1: null,
  report: null,
  process: null,
  features2: null,
  benchmark1: null,
  trustedBy: null,
  quote: null,
  benchmark2: null,
  sources: null,
};

const essentialPanels = [
  '[data-testid="heroSlice"]',
  '[data-testid="mediaAndInfoSlice"]',
  '[data-testid="moduleFeaturesSlice"]',
  '[data-testid="moduleSlice"]',
];

const getPanels = () => {
  domPanels.hero = document.querySelector('[data-testid="heroSlice"]');

  // Few of these exist.
  const mediaAndInfoSlices = document.querySelectorAll(
    '[data-testid="mediaAndInfoSlice"]'
  );
  if (mediaAndInfoSlices) {
    if (mediaAndInfoSlices[0]) domPanels.video = mediaAndInfoSlices[0];
    if (mediaAndInfoSlices[1]) domPanels.report = mediaAndInfoSlices[1];
    if (mediaAndInfoSlices[2]) domPanels.process = mediaAndInfoSlices[2];
    if (mediaAndInfoSlices[3]) domPanels.trustedBy = mediaAndInfoSlices[3];
    if (mediaAndInfoSlices[4]) domPanels.sources = mediaAndInfoSlices[4];
  }

  // 2 of these exist.
  const featuresSlies = document.querySelectorAll(
    '[data-testid="moduleFeaturesSlice"]'
  );
  if (featuresSlies) {
    if (featuresSlies[0]) domPanels.features1 = featuresSlies[0];
    if (featuresSlies[1]) domPanels.features2 = featuresSlies[1];
  }

  // 3 of these exist.
  const moduleSlice = document.querySelectorAll('[data-testid="moduleSlice"]');
  if (moduleSlice) {
    if (moduleSlice[0]) domPanels.benchmark1 = moduleSlice[0];
    if (moduleSlice[1]) domPanels.quote = moduleSlice[1];
    if (moduleSlice[2]) domPanels.benchmark2 = moduleSlice[2];
  }

  return domPanels;
};

const hasPanels = (panelList) => {
  let answer = true;
  panelList.forEach((panel) => {
    if (!domPanels[panel]) answer = false;
  });

  return answer;
};

export { getPanels, hasPanels, essentialPanels };
