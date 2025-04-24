import shared from '../../shared';
import getHeaderMarkup from '../../getHeaderMarkup';
import { events } from '../../../../../../../lib/utils';

const { ID } = shared;

/**
 * This component creates a new version of the header
 * which will show as the user scrolls down the page
 */
export default class Header {
  /**
   * @param {number} profileType
   */
  constructor(profileType) {
    this.componentName = `${ID}_DesktopHeader`;
    this.profileType = profileType;

    this.create = this.create.bind(this);
    this.stick = this.stick.bind(this);
    this.unstick = this.unstick.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const { componentName, profileType } = this;

    const component = document.createElement('div');
    component.classList.add(componentName);
    component.innerHTML = `
      <div class="container-fluid visible-lg visible-md" id="top-nav" style="display:none;">
          <div class="row">
            ${getHeaderMarkup(profileType, componentName)}
          </div>
      </div>`;

    this.component = component;
  }

  /** Make header sticky */
  stick() {
    const { component, componentName } = this;
    const stickyClass = `${componentName}--stick`;
    const isSticky = component.classList.contains(stickyClass);

    if (!isSticky) {
      component.classList.add(`${componentName}--stick`);
    }
  }

  /** Make header static */
  unstick() {
    const { component, componentName } = this;
    const stickyClass = `${componentName}--stick`;
    const isSticky = component.classList.contains(stickyClass);

    if (isSticky) {
      component.classList.remove(`${componentName}--stick`);
    }
  }

  /**
   * Opens the live chat on the site
   */
  static openLiveChat() {
    window.LC_API.open_chat_window();
  }


  bindEvents() {
    const {
      stick,
      unstick,
      component,
      componentName,
    } = this;

    /**
     * Handle scroll event
     */
    const scrollHandler = () => {
      if (window.pageYOffset > 200) {
        stick();
      } else {
        unstick();
      }
    };

    window.addEventListener('scroll', scrollHandler);

    // Click tracking
    const eventLabels = {
      [`${componentName}_findBranch`]: 'Find a branch',
      [`${componentName}_newBranch`]: 'New branch',
      [`${componentName}_savedBranch`]: 'Saved branch',
      [`${componentName}_requestACall`]: 'Request a call',
      [`${componentName}_existingCustomers`]: 'Existing customers',
      [`${componentName}_visitingCare`]: 'Visiting care',
      [`${componentName}_requestBrochure`]: 'Request a brochure',
      [`${componentName}_liveChat`]: 'Live chat',
      [`${componentName}_homeVisit`]: 'Home visit',
    };

    /**
     * Get the event label from an element ID
     * @param {string} id
     * @returns {string}
     */
    const getEventLabel = id => eventLabels[id];

    // Bind click events
    const trackedLinks = component.querySelectorAll('[data-tracked="true"]');
    [].forEach.call(trackedLinks, (link) => {
      const { id } = link;
      const eventLabel = getEventLabel(id);
      if (eventLabel) {
        link.addEventListener('click', () => {
          events.send(ID, eventLabel, 'Click');
        });
      }
    });

    // If live chat link is in menu, open live chat on click
    const liveChatMenuItem = component.querySelector('.live-chat.menu-item');
    if (liveChatMenuItem) {
      const liveChatExists = !!document.querySelector('#chat-widget-container');
      if (liveChatExists) {
        const liveChatLink = liveChatMenuItem.querySelector('a');
        liveChatLink.addEventListener('click', (e) => {
          e.preventDefault();
          Header.openLiveChat();
        });
      } else {
        const container = liveChatMenuItem.parentElement.parentElement;
        liveChatMenuItem.parentElement.removeChild(liveChatMenuItem);

        /**
         * Increase or decrate
         * @param {HTMLElement} element Element with col classes to change
         * @param {boolean} increase Set true to increase or false to decrease count
         * @param {number} changeCount Number to increase or decrease the columns by
         */
        const changeColCount = (element, increase, changeCount) => {
          const changeValue = changeCount || 1;

          return element.className.replace(/col-(md|lg)-\d+/g, (className) => {
            const colsCount = className.match(/\d+/);
            const newColsCount = increase
              ? Number(colsCount) + changeValue
              : Number(colsCount) - changeValue;

            return newColsCount > 0 ? className.replace(colsCount, newColsCount) : className;
          });
        };


        // Take 1 col away from each cols class to account for gap in menu
        // Otherwise a blank space will be left behind
        container.className = changeColCount(container, false, 1);

        // Do the same again for the logo container but this time increase the cols count
        // To ensure the menu is pushed all the way to the right
        const logoContainer = component.querySelector('.logo-block');
        logoContainer.className = changeColCount(logoContainer, true, 1);
      }
    }
  }

  render() {
    const { component } = this;
    document.body.insertAdjacentElement('afterbegin', component);
  }
}
