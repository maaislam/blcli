import settings from '../../lib/settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class ProductMessages {
  constructor(options) {
    this.messageData = options.messages;
    this.create();
    this.bindEvents();
    this.render();
    this.showMessages();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_productMessages`);
    element.innerHTML = `
    <div class="${ID}_messages">
    ${Array.prototype.map.call(this.messageData, (messageData, i) => `
      <div class="${ID}_Message-slide"${i > 0 ? '' : ''}>
      <p>${messageData.text}</p>
      </div>
  `).join('')}
    </div>`;

    this.component = element;

    element.querySelector(`.${ID}_Message-slide`).classList.add(`${ID}_message-active`);
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const newSlider = document.querySelector(`.${ID}_productSlider`);
    newSlider.insertAdjacentElement('afterbegin', component);
  }

  /** Run slider plugin */
  showMessages() {
    const { component } = this;
    const lis = Array.prototype.slice.call(document.querySelectorAll('.ME190_Message-slide'));
    const lisCount = lis.length;
    let activeLiIndex = 0;
   
   setInterval(function(){
      const active_li = document.querySelector(`.${ID}_message-active`);
      
      if(lis.indexOf(active_li) == lisCount - 1) {
        activeLiIndex  = 0;
      } else {
        activeLiIndex++;
      }
      active_li.classList.remove(`${ID}_message-active`);
      document.querySelectorAll('.ME190_Message-slide')[activeLiIndex].classList.add(`${ID}_message-active`);
   }, 3000);
  }
}
