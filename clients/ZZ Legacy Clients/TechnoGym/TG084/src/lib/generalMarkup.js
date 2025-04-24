import settings from '../lib/settings';

const { ID } = settings;

export default class PageMarkup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_pageWrapper`);
    element.innerHTML = `
    <section class="${ID}-topContent"></section>
    <section class="${ID}-allTreadmills"></section>
    <section class="${ID}-contactForm"></section>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const headerWrap = document.querySelector('.personal-header');
    headerWrap.insertAdjacentElement('afterend', component);
  }
}
