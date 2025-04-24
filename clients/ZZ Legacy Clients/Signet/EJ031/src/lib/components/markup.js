/**
 * @desc add the wrapper that all content will sit in
 */

import shared from "../shared";

const { ID } = shared;

export default class NewContent {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const element = document.createElement('div');
    element.classList.add(`${ID}_newContent`);
    element.innerHTML = `
    <div class="${ID}-hotspot_wrapper"></div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const currentBanner = document.querySelector('.hero-banner');
    currentBanner.insertAdjacentElement('afterend', component);
  }
}

