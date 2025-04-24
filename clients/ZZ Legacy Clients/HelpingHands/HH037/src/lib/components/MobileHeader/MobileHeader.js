import shared from '../../shared';
import getHeaderMarkup from '../../getHeaderMarkup';
import { wrap, getClosest, events } from '../../../../../../../lib/utils';

const { ID } = shared;

/**
 * For this component we're only going to re-create the element
 * #mobile-cta-block. No changes are required for the actual nav
 * bar so it'll be easier to leave that alone
 */
export default class Header {
  /**
   * @param {number} profileType
   */
  constructor(profileType) {
    this.componentName = `${ID}_MobileHeader`;
    this.profileType = profileType;

    this.create = this.create.bind(this);
    this.stick = this.stick.bind(this);
    this.unstick = this.unstick.bind(this);
    this.getHeaderHeight = this.getHeaderHeight.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.render = this.render.bind(this);

    this.header = document.querySelector('#main-nav');
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const { componentName, profileType } = this;

    // This is the wrapper for the nav and CTA blocks
    const component = document.createElement('div');
    component.classList.add(componentName);

    // This is the new CTA block
    const ctaBlock = document.createElement('div');
    ctaBlock.className = `${componentName}_ctaBlock container-fluid text-center`;
    ctaBlock.innerHTML = `
      <div>
        ${getHeaderMarkup(profileType, componentName)}
      </div>
    `;

    this.component = component;
    this.ctaBlock = ctaBlock;
  }

  getHeaderHeight() {
    const { component } = this;
    return component.getBoundingClientRect().height;
  }

  /** Make header sticky */
  stick() {
    const { component, componentName, getHeaderHeight } = this;
    const stickyClass = `${componentName}--stick`;
    const isSticky = component.classList.contains(stickyClass);
    const headerHeight = getHeaderHeight();

    if (!isSticky) {
      component.classList.add(`${componentName}--stick`);
      document.body.style.paddingTop = `${headerHeight}px`;
    }
  }

  /** Make header static */
  unstick() {
    const { component, componentName } = this;
    const stickyClass = `${componentName}--stick`;
    const isSticky = component.classList.contains(stickyClass);

    if (isSticky) {
      component.classList.remove(`${componentName}--stick`);
      document.body.style.paddingTop = '';
    }
  }

  bindEvents() {
    const {
      stick,
      unstick,
      ctaBlock,
      componentName,
    } = this;

    /**
     * Manage active / inactive states
     * @param {object} e event object
     */
    const stateHandler = (e) => {
      const { target } = e;
      const container = getClosest(target, `.${componentName}_menuItem`);

      if (container) {
        const activeClass = `${componentName}_menuItem--active`;
        const isActive = container.classList.contains(activeClass);
        if (!isActive) {
          const currentlyActive = ctaBlock.querySelector(`.${activeClass}`);
          if (currentlyActive) currentlyActive.classList.remove(activeClass);
          container.classList.add(activeClass);
        } else {
          container.classList.remove(activeClass);
        }
      }
    };

    const menuItems = ctaBlock.querySelectorAll(`.${componentName}_menuItemButton`);
    [].forEach.call(menuItems, (item) => {
      item.addEventListener('click', stateHandler);
    });

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
      [`${componentName}_callUs`]: 'Call us',
      [`${componentName}_requestACall`]: 'Request a call',
      [`${componentName}_findBranch`]: 'Find a branch',
      [`${componentName}_newBranch`]: 'New branch',
      [`${componentName}_savedBranch`]: 'Saved branch',
      [`${componentName}_visitingCare`]: 'Visiting care',
      [`${componentName}_findAJob`]: 'Find a job',
      [`${componentName}_homeVisit`]: 'Home visit',
    };

    /**
     * Get the event label from an element ID
     * @param {string} id
     * @returns {string}
     */
    const getEventLabel = id => eventLabels[id];

    // Bind click events
    const trackedLinks = ctaBlock.querySelectorAll('[data-tracked="true"]');
    [].forEach.call(trackedLinks, (link) => {
      const { id } = link;
      const eventLabel = getEventLabel(id);
      if (eventLabel) {
        link.addEventListener('click', () => {
          events.send(ID, eventLabel, 'Click');
        });
      }
    });
  }

  render() {
    const { header, component, ctaBlock } = this;

    /* Create a wrapper for the nav bar and new CTAs so we can stick
    them on scroll. Note, this will render the wrapper when  called */
    wrap(header, component);
    component.insertAdjacentElement('beforeend', ctaBlock);
  }
}
