/**
 * Top bar component for Ernest Jones
 *
 * @version 1.0.1
 * @author [Lewis Needham - User Conversion]
 */
import Experiment from '../../experiment';
import data from './data';
import { createLink } from '../../services';

export default {
  /**
   * @returns {HTMLElement} Returns component
   */
  create() {
    const { elements } = Experiment;

    const component = document.createElement('div');
    component.classList.add('HS003_topBar');
    component.classList.add('HS003_col-12');
    const ul = document.createElement('ul');

    // Create an element from each link in the data
    data.forEach((linkData) => {
      const { label, url } = linkData;
      ul.appendChild(createLink(label, url));
    });

    /*
     * Login / Logout links need to be created dynamically as they can change
     * depending on the session status (e.g. if a user is logged in/out or if
     * a user is idle for a while)
     */
    const loggedInBtns = elements.dropdownNav.querySelector('.js-moveToListTwo');
    if (loggedInBtns) {
      const links = [].filter.call(loggedInBtns.children, node => node.nodeName === 'A');
      links.forEach((link) => {
        const url = link.href;
        const text = link.innerText.trim();
        ul.appendChild(createLink(text, url));
      });

      // Log out - Sometimes this doesn't exist
      const logOutForm = loggedInBtns.querySelector('form[action="/webstore/logout"]');
      if (logOutForm) {
        const logOut = createLink('Logout', '');
        logOut.addEventListener('click', (e) => {
          e.preventDefault();
          logOutForm.submit();
        });
        ul.appendChild(logOut);
      }
    } else {
      // User is not logged in - create login link
      ul.appendChild(createLink('Sign in or Register', '/webstore/secure/authenticated/account/checkSignedIn.sdo'));
    }

    component.appendChild(ul);
    component.appendChild(elements.miniBasket);
    return component;
  },

  /**
   * @param {HTMLElement} component Instance of the component
   * @returns {HTMLElement} Returns self
   */
  bindEvents(component) {
    return component;
  },

  /**
   * @returns {HTMLElement} Returns component
   */
  init() {
    const component = this.create();
    this.bindEvents(component);
    return component;
  },
};
