import settings from '../../lib/settings';

const { ID } = settings;

export default class JumpTo {
  constructor(options) {
    const opts = options || {};
    this.lang = opts.lang;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_jumpToWrap`);
    if (this.lang === 'EN') {
      element.innerHTML = `
      <div class="${ID}_jumpTo">
        <span class="${ID}_jumpTo__label">Jump to:</span>
        <ul class="${ID}_jumpTo__list">
          <li class="${ID}_jumpTo__listItem active">
            <a href="#contact-form" class="${ID}_jumpTo__listItem__link" data-jump="contact-form">contact us</a>
          </li>
          <li class="${ID}_jumpTo__listItem">
            <a href="#store-locator" class="${ID}_jumpTo__listItem__link" data-jump="store-locator">our locations</a>
          </li>
          <li class="${ID}_jumpTo__listItem">
            <a href="#phone-numbers" class="${ID}_jumpTo__listItem__link" data-jump="phone-numbers">phone numbers</a>
          </li>
          <li class="${ID}_jumpTo__listItem">
            <a href="https://www.technogym.com/gb/where-buy-technogym/" target="_blank" class="${ID}_jumpTo__listItem__link">how to buy</a>
          </li>
        </ul>
      </div>
    `;
    } else {
      element.innerHTML = `
      <div class="${ID}_jumpTo">
        <span class="${ID}_jumpTo__label">Passa a:</span>
        <ul class="${ID}_jumpTo__list">
          <li class="${ID}_jumpTo__listItem active">
            <a href="#contact-form" class="${ID}_jumpTo__listItem__link" data-jump="contact-form">Contattaci</a>
          </li>
          <li class="${ID}_jumpTo__listItem">
            <a href="#store-locator" class="${ID}_jumpTo__listItem__link" data-jump="store-locator">Le nostre sedi</a>
          </li>
          <li class="${ID}_jumpTo__listItem">
            <a href="#phone-numbers" class="${ID}_jumpTo__listItem__link" data-jump="phone-numbers">Numeri di telefono</a>
          </li>
          <li class="${ID}_jumpTo__listItem">
            <a href="https://www.technogym.com/it/dove-acquistare-technogym/" target="_blank" class="${ID}_jumpTo__listItem__link">Dove acquistare</a>
          </li>
        </ul>
      </div>
    `;
    }
    this.component = element;
  }

  bindEvents() {
  }

  render() {
    document.querySelector('.forms').insertAdjacentElement('beforebegin', this.component);
    document.querySelector('.forms').id = 'contact-form';
  }
}
