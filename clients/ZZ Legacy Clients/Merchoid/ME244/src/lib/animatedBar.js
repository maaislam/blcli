import shared from '../lib/shared';

const { ID } = shared;

export default class AnimatedScarcity {
  constructor() {
    this.create();
    this.render();
  }

  create() {

    const loadedMessage1 = 'Checking Stock';
    const loadedMessage2 = 'This Product is Selling Fast';

    const element = document.createElement('div');
    element.classList.add(`${ID}_scarcityBar`);
    element.classList.add(`${ID}-animatedLoader`);

    element.innerHTML = `
        <div class="${ID}-smallerLoader"></div>
        <p class="${ID}-pulseText"></p>`;
    
        this.component = element;

    // get the animated text from global
    const firstMessage = loadedMessage1;
    const lastMessage = loadedMessage2;

    element.querySelector('p').textContent = firstMessage;
    element.querySelector('p').classList.add(`${ID}-pulseText`);
 
    setTimeout(() => {
      element.querySelector('p').classList.remove(`${ID}-pulseText`);
      element.querySelector('p').textContent = lastMessage;
    }, 5000);
  }

  render() {
    const { component } = this;
    const productGallery = document.querySelector('.gallery-placeholder');
    productGallery.insertAdjacentElement('beforebegin', component);
  }
}
