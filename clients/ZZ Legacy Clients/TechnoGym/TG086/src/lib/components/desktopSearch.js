import settings from '../settings';
const { ID } = settings;

export default class DesktopSearch {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_searchWrapper`);

    this.component = element;

    const searchBar = document.querySelector('#form-sidebar-search');
    searchBar.querySelector('.block-title').textContent = 'Search Products';
    element.appendChild(searchBar);
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const topbar = document.querySelector(`.${ID}-topBar`)
    topbar.insertAdjacentElement('afterend', component);
  }
}
