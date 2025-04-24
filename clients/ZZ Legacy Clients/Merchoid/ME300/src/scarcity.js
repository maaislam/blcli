import shared from "./lib/shared";


const { ID, VARIATION } = shared;

export default class AnimatedScarcity {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    

    const loadedMessage1 = 'Less Than 10 Available';
    const loadedMessage2 = 'Checking Stock Levels';
    const loadedMessage3 = 'Hurry! This Product is Selling Fast!';
    const loadedMessage4 = 'Hurry! Last Few Available'

    const element = document.createElement('div');
    element.classList.add(`${ID}_scarcityBar`);
    
    element.innerHTML = `
        <div class="${ID}-smallerLoader"></div>
        <p class="${ID}-pulseText"></p>`;
    
        this.component = element;

    // get the animated text from global
    const firstMessage = loadedMessage1;
    const secondMessage = loadedMessage2;
    const lastMessageV2 = loadedMessage4;
    const lastMessage = loadedMessage3;

    element.querySelector('p').textContent = firstMessage;
    
    if(VARIATION === '1') {
        setTimeout(() => {
            element.classList.add(`${ID}-animatedLoader`);
            element.querySelector('p').classList.add(`${ID}-pulseText`);
            element.querySelector('p').textContent = secondMessage;
        }, 3000);
    
        setTimeout(() => {
            element.querySelector('p').classList.remove(`${ID}-pulseText`);
            element.querySelector('p').textContent = lastMessage;
        }, 8000);
    }

    if(VARIATION === '2') {
      setTimeout(() => {
          element.classList.add(`${ID}-animatedLoader`);
          element.querySelector('p').classList.add(`${ID}-pulseText`);
          element.querySelector('p').textContent = secondMessage;
      }, 3000);
  
      setTimeout(() => {
          element.querySelector('p').classList.remove(`${ID}-pulseText`);
          element.querySelector('p').textContent = lastMessageV2;
      }, 8000);
  }
  }

  render() {
    const { component } = this;
    const productGallery = document.querySelector('.gallery-placeholder');
    productGallery.insertAdjacentElement('beforebegin', component);
  }
}
