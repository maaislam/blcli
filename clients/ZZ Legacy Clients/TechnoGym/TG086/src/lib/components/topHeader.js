import settings from '../settings';

const { ID } = settings;

export default class TopHeader {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const pageTitle = document.querySelector('.category-title h1');

    const element = document.createElement('div');
    element.classList.add(`${ID}_header`);
    element.innerHTML = `
      <div class="${ID}-header_text">
        <h1>${pageTitle.textContent}</h1>
        <p>Our selection of high-end, premium and professional treadmills feature state-of-the-art technology, design & entertainment.</p>
      </div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const mainHeader = document.querySelector('.header-container');
    mainHeader.insertAdjacentElement('afterend',component);
  }
}
