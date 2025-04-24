/**
 * Navigation component for Ernest Jones
 *
 * @version 1.0.1
 * @author [Lewis Needham - User Conversion]
 */
import { pollerLite } from '../../../../../../lib/uc-lib';
import { events } from '../../../../../../lib/utils';
import { createLink } from '../../services';
import initMenuAim from '../../plugins/menuAim';
import data from './data';

export default {
  /**
   * @returns {HTMLElement} Returns component
   */
  create() {
    const component = document.createElement('div');
    component.classList.add('EJ001_Navigation');

    const ul = document.createElement('ul');
    ul.classList.add('EJ001_Navigation-l1');

    data.forEach((linkData) => {
      const { name, url, html } = linkData;
      const li = createLink(name, url);
      if (html) {
        const sub = document.createElement('div');
        sub.classList.add('EJ001_Navigation-submenuContainer');
        sub.innerHTML = `<div class="EJ001_Navigation-submenu">${html}</div>`;
        li.appendChild(sub);
      }
      if (name === 'Sale') li.classList.add('EJ001_linkRed');
      ul.appendChild(li);
    });

    component.appendChild(ul);

    return component;
  },

  /**
   * @param {HTMLElement} component Instance of the component
   * @returns {HTMLElement} Returns self
   */
  bindEvents(component) {
    const self = this;
    let overlay;
    // Standard navigation hover events
    /*
    const topLevelLinks = component.querySelectorAll('.EJ001_Navigation-l1 > li');
    let overlay;
    [].forEach.call(topLevelLinks, (link) => {
      link.addEventListener('mouseover', function linkMouseOver() {
        this.classList.add('EJ001_Navigation-l1--active');
        if (!overlay) overlay = self.createOverlay();
        overlay.style.display = 'block';
      });

      link.addEventListener('mouseout', function linkMouseOut() {
        this.classList.remove('EJ001_Navigation-l1--active');
        overlay.style.display = 'none';
      });
    });
    */

    // menuAim Plugin
    pollerLite([() => !!window.jQuery], () => {
      const $ = window.jQuery;
      initMenuAim();
      $(component).find('.EJ001_Navigation-l1').menuAim({
        submenuDirection: 'below',
        rowSelector: '> li',
        activate: (element) => {
          $(element).addClass('EJ001_Navigation-l1--active');
          if (!overlay) overlay = self.createOverlay();
          overlay.style.display = 'block';
        },
        deactivate: (element) => {
          $(element).removeClass('EJ001_Navigation-l1--active');
          overlay.style.display = 'none';
        },
        exitOnMouseOut: true,
      });
    });

    // Send event clicks on nav links
    component.addEventListener('click', (e) => {
      let node = e.target;
      let clickedLink = null;

      while (node !== this) {
        if (node && node.nodeName && node.nodeName === 'A') {
          clickedLink = node;
          break;
        }
        if (node.parentNode) {
          node = node.parentNode;
        } else {
          break;
        }
      }

      if (clickedLink) {
        events.send('EJ001', 'Clicked Navigation', `Clicked Navigation ${clickedLink.innerText}`);
      }
    });

    // Send event if hovered over level 1 link for 1s
    const primaryLinks = component.querySelectorAll('.EJ001_Navigation-l1 > li > a');
    [].forEach.call(primaryLinks, (link) => {
      let hoverIntent;
      link.addEventListener('mouseover', () => {
        hoverIntent = true;
        setTimeout(() => {
          if (hoverIntent) {
            events.send('EJ001', 'Navigation Hover', 'Hovered Over Main Nav');
          }
        }, 1000);
      });

      link.addEventListener('mouseout', () => {
        hoverIntent = false;
      });
    });

    return component;
  },

  /**
   * @desc Creates and renders an overlay for when the nav is hovered over
   * @returns {HTMLElement} Overlay element
   */
  createOverlay() {
    const element = document.createElement('div');
    element.classList.add('EJ001_pageOverlay');
    document.body.appendChild(element);

    return element;
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
