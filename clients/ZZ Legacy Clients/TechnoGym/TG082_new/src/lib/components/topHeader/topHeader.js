import settings from '../../settings';
import { __ } from '../../helpers';

const { ID } = settings;

export default class TopHeader {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_topHeader`);

    element.innerHTML = `
    <div class="${ID}-logo"></div>
    <div class="${ID}-header_text">
      <span>${__('MYRUN')}</span>
      <h1>${__('THE SMOOTHEST RUN YOU\'LL HAVE')}</h1>
      <p>${__('£3,250 including VAT, delivery & installation')}</p>
      <span>${__('0% interest, flexible payment plans from as little as £122 a month')}.</span>
    </div>`;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    document.body.insertAdjacentElement('afterbegin', component);
  }
}
