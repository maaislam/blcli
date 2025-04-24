import settings from '../../lib/settings';
import { __ } from '../helpers';

const { ID } = settings;

export default class HeroBanner {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_topHeader`);

    element.innerHTML = `
    <div class="${ID}-headerText">
      <h1>${__('Fit for your business')}</h1>
      <p>${__('People are growingly in need of movement. How does your facility respond? Whatever your users are looking for, be it body fitness, performance or health, our solutions can answer their needs of today and tomorrow.')}</p>
    </div>`;
    this.component = element;
  }
  render() {
    const { component } = this;
    const headerWrap = document.querySelector('.header-container');
    headerWrap.insertAdjacentElement('afterend', component);
  }
}

