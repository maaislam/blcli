import shared from "./shared";

const { ID } = shared;

export default class QuickViewBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-quickView`);
      element.innerHTML = `
        <div class="${ID}-quickViewContent">
            <div class="${ID}-close"></div>
            <div class="${ID}-productInfo">
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
      
    }
  }
