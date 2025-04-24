/**
 * New header component for H Samuel
 *
 * @version 1.0.1
 * @author [Lewis Needham - User Conversion]
 */
import Experiment from '../../experiment';
import Navigation from '../Navigation/component';
import TopBar from '../TopBar/component';
import { wrap } from '../../services';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default {
  /**
   * @returns {HTMLElement} Returns component
   */
  create() {
    const component = document.createElement('div');
    component.classList.add('HS003_Header');

    // Top row
    const topBar = wrap(TopBar.init(), 'HS003_topBarContainer');
    component.appendChild(topBar);

    // Second row
    const {
      logo,
      search,
      searchResults,
    } = Experiment.elements;
    const navContainer = document.createElement('div');
    navContainer.classList.add('HS003_navRow');

    const logoWrap = wrap(logo, 'HS003_col-2 HS003_logoWrap');
    navContainer.appendChild(logoWrap);

    const nav = wrap(Navigation.init(), 'HS003_col-6');
    navContainer.appendChild(nav);

    const searchWrap = wrap(search, 'HS003_col-4 HS003_searchWrap');
    if (searchResults) {
      search.appendChild(searchResults);
    } else {
      pollerLite(['#ui-id-1'], () => {
        const searchResultsEl = document.querySelector('#ui-id-1');
        Experiment.elements.searchResults = searchResultsEl;
        search.appendChild(searchResultsEl);
      });
    }
    navContainer.appendChild(searchWrap);

    const navWrap = wrap(navContainer, 'HS003_navRowContainer');

    component.appendChild(navWrap);

    return component;
  },

  /**
   * @param {HTMLElement} component Instance of the component
   * @returns {HTMLElement} Returns self
   */
  bindEvents(component) {
    // Mobile header fix (allows resizing)
    const {
      logo,
      search,
      miniBasket,
      topBar,
    } = Experiment.elements;
    let screenSize = window.innerWidth < 900 ? 'small' : 'large';

    /**
     * @desc Moves minibag, logo and search elements to new header
     */
    const moveElementsToNew = () => {
      component.querySelector('.HS003_logoWrap').appendChild(logo);
      component.querySelector('.HS003_searchWrap').appendChild(search);
      component.querySelector('.HS003_topBar').appendChild(miniBasket);
    };

    /**
     * @desc Moves minibag, logo and search elements back to old header
     */
    const moveElementsToOld = () => {
      topBar.parentElement.insertBefore(logo, topBar);
      topBar.appendChild(search);
      topBar.insertBefore(miniBasket, topBar.firstChild);
    };

    /**
     * @desc Checks if it should show mobile or desktop header and
     * moves elements around if needed
     */
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 900 && screenSize === 'large') {
        screenSize = 'small';
        moveElementsToOld();
      } else if (width >= 900 && screenSize === 'small') {
        // Is desktop
        screenSize = 'large';
        moveElementsToNew();
      }
    };

    window.addEventListener('resize', checkScreenSize);

    return component;
  },

  /**
   * @param {HTMLElement} component Instance of the component
   * @returns {HTMLElement} Returns self
   */
  render(component) {
    const { elements } = Experiment;
    elements.header.parentElement.insertBefore(component, elements.header);

    return component;
  },

  /**
   * @returns {HTMLElement} Returns component
   */
  init() {
    const component = this.create();
    this.bindEvents(component);
    this.render(component);

    return component;
  },
};
