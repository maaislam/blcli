/**
 * HS020 - Will It Fit Improvements
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

const activate = () => {
  setup();

  function createTooltip() {
    // Elements
    const willItFit = document.querySelector('.tangiblee-button');

    /** Tooltip Component */
    class Tooltip {
      constructor() {
        const element = document.createElement('div');
        element.classList.add(`${settings.ID}_Tooltip`);
        element.innerHTML = '<span>Compare the size with other items</span>';
        this.element = element;
        this.bindEvents = this.bindEvents.bind(this);
        this.bindEvents();
        this.render = this.render.bind(this);
        this.render();
      }

      bindEvents() {
        willItFit.addEventListener('mouseover', () => {
          this.element.classList.add(`${settings.ID}_Tooltip--show`);
          events.send(settings.ID, `V${settings.VARIATION}`, 'User hovered and saw tooltip', { sendOnce: true });
        });

        willItFit.addEventListener('mouseout', () => {
          this.element.classList.remove(`${settings.ID}_Tooltip--show`);
        });

        // Generic tracking
        willItFit.addEventListener('click', (e) => {
          if (e.target && (e.target === this.element || e.target.parentElement === this.element)) return false;
          events.send(settings.ID, `V${settings.VARIATION}`, 'User clicked Tangiblee', { sendOnce: true });
        });
      }

      render() {
        willItFit.insertAdjacentElement('afterbegin', this.element);
      }
    }

    const tooltip = new Tooltip();
  }

  if (settings.VARIATION === '3') {
    pollerLite(['.tangiblee-button'], createTooltip);
  }
};

export default activate;
