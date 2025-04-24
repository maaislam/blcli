import settings from '../../lib/settings';

const { ID } = settings;

export default class FiltersMarkup {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_filterWrapper`);

    element.innerHTML = `
    <div class="${ID}-filterCategories"></div>`;
    this.component = element;
  }

  render() {
    const { component } = this;
    const filterBlock = document.querySelector('#filter-modal');
    filterBlock.appendChild(component);
  }
}
