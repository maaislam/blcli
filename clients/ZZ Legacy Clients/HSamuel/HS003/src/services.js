import Experiment from './experiment';
import { fullStory, events } from '../../../../lib/utils';

/**
 * @desc Inits all page level tracking
 */
export function tracking() {
  const { settings } = Experiment;
  fullStory(settings.ID, `Variation ${settings.VARIATION}`);
  events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
}

/**
 * @desc Caches elements to be used in the experiment
 */
export function cacheElements() {
  const { elements } = Experiment;
  elements.header = document.querySelector('#siteHeader');
  elements.topBar = elements.header.querySelector('.topBar');
  elements.dropdownNav = document.querySelector('#footerNav');
  elements.nav = document.querySelector('.siteNavigation');
  elements.logo = elements.header.querySelector('.logo');
  elements.miniBasket = elements.header.querySelector('.basketIcon');
  elements.search = elements.header.querySelector('#search');
  elements.searchResults = document.querySelector('#ui-id-1');
}

/**
 * @desc Populates all global variables in the experiment (located in Experiment.globals)
 */
export function populateGlobals() {
  const { globals } = Experiment;
  const { dropdownNav } = Experiment.elements;
  globals.isLoggedIn = !!dropdownNav.querySelector('.js-moveToListTwo');
}

/**
 * @desc Runs all setup functions
 */
export function setup() {
  const { settings } = Experiment;
  tracking();
  cacheElements();
  populateGlobals();
  document.body.classList.add(settings.ID);
  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
}

/**
 * @desc Helper function to create an li element for navigations
 * @param {String} label innerText of the link
 * @param {String} url href for the 'a' element
 * @returns {HTMLElement}
 */
export function createLink(label, url) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = url;
  a.innerText = label;
  li.appendChild(a);
  return li;
}

/**
 * @desc Wraps nodes in an element
 * @param {HTMLElement} node Nodes to wrap in element
 * @param {String} classes String containing the classes to add
 */
export function wrap(node, classes) {
  const wrapEl = document.createElement('div');
  wrapEl.className = classes;
  wrapEl.appendChild(node);
  return wrapEl;
}
