import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class PDPReview {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_star-review--pdp`);
    element.innerHTML = `
      <label class="${ID}_star-review--pdp__trigger" for="panelTrigger">Star Review!</label>
    `;
    this.component = element;
  }

  bindEvents() {
    this.component.addEventListener('click', () => {
      events.send(ID, 'Clicked', 'Star Review PDP');
    });
  }

  render() {
    document.querySelector('.price-block').insertAdjacentElement('afterend', this.component);
  }
}
