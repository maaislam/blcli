import settings from '../settings';

const { ID } = settings;

export default class BagMessage {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const addedMessage = document.querySelector('.messages .message');

    const element = document.createElement('div');
    element.classList.add(`${ID}_addedToCart`);

    // message based on action in basket e.g added/removed
    if (addedMessage.textContent.indexOf('Undo') > -1) {
      element.innerHTML = `<span>Product removed</span><div class="${ID}-continue"><a href="${addedMessage.querySelector('a').getAttribute('href')}">Undo?</a></div>`;
    } else {
      element.innerHTML = `<span>Product added</span><div class="${ID}-continue"><a href="/">Continue Shopping</a></div>`;
    }
    this.component = element;
  }

  render() {
    const { component } = this;
    const mainPage = document.querySelector('#maincontent');
    mainPage.insertAdjacentElement('afterbegin', component);


    // remove it after a few seconds
    setTimeout(() => {
      component.remove();
    }, 4000);
  }
}
