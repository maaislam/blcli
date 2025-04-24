import shared from "../shared";

const { ID, VARIATION } = shared;

export default class InfoModal {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-lightboxModal`);

      element.innerHTML = `
        <div class="${ID}-close"></div>
        <div class="${ID}-modalInner"></div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
              

        const closedBox = () => {
            component.classList.remove(`${ID}-modalShow`);
            document.documentElement.classList.remove(`${ID}-noScroll`);
            component.querySelector(`.${ID}-modalInner`).innerHTML = '';
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
        }

        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            closedBox();
        });
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
          closedBox();
        });

    }
  
    render() {
        const { component } = this;
        document.body.appendChild(component);
    }
  }
