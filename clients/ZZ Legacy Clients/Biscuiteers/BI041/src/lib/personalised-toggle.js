import settings from './settings';
import { addEventListener } from './winstack';

/**
 * Personalised Toggle
 */
export default class PersonalisedToggle {
  constructor(active = false, onToggle) {
    this.active = active;

    this.onToggle = onToggle;

    this.create();
    this.bindEvents();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${settings.ID}-toggle-wrap`);

    element.innerHTML = `
      <label class="${settings.ID}-toggle-wrap__title">Show only personalised</label>
      <div class="${settings.ID}-toggler ${this.active ? `${settings.ID}-toggler--active` : ''}">
        <span class="${settings.ID}-toggler__select"></span>
      </div>
    `;

    this.component = element;
  }

  bindEvents() {
    const toggler = this.component.querySelector(`.${settings.ID}-toggler`);
    toggler.addEventListener('click', () => { 
      this.onToggle(!this.active);
    });
  }
};
