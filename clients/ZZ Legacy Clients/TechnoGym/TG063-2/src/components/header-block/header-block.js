import settings from '../../lib/settings';

const { ID } = settings;

export default class HeaderBlock {
  constructor(options) {
    const opts = options || {};
    this.lang = opts.lang;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_headerBlockWrap`);
    if (this.lang === 'EN') {
      element.innerHTML = `
      <div class="${ID}_headerBlock">
        <h2 class="${ID}_headerBlock__title">Welcome to the Technogym Contact Page</h2>
      </div>
    `;
    } else {
      element.innerHTML = `
      <div class="${ID}_headerBlock">
        <h2 class="${ID}_headerBlock__title">Benvenuti nella pagina contatti di Technogym</h2>
      </div>
    `;
    }
    this.component = element;
  }

  bindEvents() {
  }

  render() {
    document.querySelector('.post-content').insertAdjacentElement('afterbegin', this.component);
  }
}
