import shared from "../../../../../core-files/shared";


const { ID, VARIATION } = shared;

export default class CompetitionPopup {
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
        <div class="${ID}-modalInner">
          <div class="${ID}-image"></div>
          <div class="${ID}-content">
            <div class="${ID}-titleBox">
                <span>Win a</span>
                <h2>£160 H.Samuel Gift Card</h2>
            </div>
            <p>You're one to step closer to winning a £160 H.Samuel gift card. Sign up now to enter our prize draw.</p>
            <a href="https://www.hsamuel.co.uk/webstore/secure/competitions/hsamuel-160-years-competition.cdo" class="${ID}-button">Sign up</a> 
          </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

        const closedBox = () => {
            component.classList.remove(`${ID}-modalShow`);
            component.remove();
            document.querySelector(`.${ID}-overlay`).remove();
            document.body.classList.remove(`${ID}-noScroll`);
            sessionStorage.setItem('comp-closed', true);
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

        if(!sessionStorage.getItem('comp-closed')) {
          component.classList.add(`${ID}-modalShow`);
          document.body.classList.add(`${ID}-noScroll`);
          document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);  
        }          
    }
  }
