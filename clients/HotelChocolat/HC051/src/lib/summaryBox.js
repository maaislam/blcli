import { events } from "../../../../../lib/utils";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class Summary {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-summary`);
      element.innerHTML = `
      <div class="${ID}-fixedTab">
        <div class="${ID}-total">
            <h4>${window.innerWidth >= 1024 ? `Total:` : `Your Velvetiser Kit Total`}</h4>
            <span></span>
        </div>
        <div class="${ID}-add">Add to bag</div>
        ${window.innerWidth >= 1024 ? `<klarna-placement data-key="top-strip-promotion-standard" data-locale="en-GB"></klarna-placement>` : ''}
      </div>
      <div class="${ID}-priceBox">
          <div class="${ID}-title">
            <div class="${ID}-close"></div>
              <h2>Your Velvetiser kit</h2>
              <span class="${ID}-intro">Choose your Velvetiser to get started</span>
            </div>
            ${window.innerWidth < 1024 ? `<klarna-placement data-key="top-strip-promotion-standard" data-locale="en-GB"></klarna-placement>` : ''}
            <div class="${ID}-innerContent">
              ${window.location.href.indexOf('/uk/') ? `<div class="${ID}-deliveryText"><span>Free UK delivery</span></div>` : ''}
                <div class="${ID}-choices"></div>
            </div>
        </div>
        
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const summaryEl = component.querySelector(`.${ID}-priceBox`);
      const overlay = document.querySelector(`.${ID}-summaryOverlay`);
      const openChoices = () => {
        summaryEl.classList.add(`${ID}-show`);
        overlay.classList.add(`${ID}-overlayShow`);

        // add class to hide the need help when summary is open
       document.body.classList.add(`${ID}-summaryShowing`);
       document.body.classList.add(`${ID}-noScroll`);
       
       events.send(`${ID} variation:${VARIATION}`, 'click', 'Show summary');

      
      }

      const closeChoices = () => {
        summaryEl.classList.remove(`${ID}-show`);
        overlay.classList.remove(`${ID}-overlayShow`);

        // remove class to show the need help
        document.body.classList.remove(`${ID}-summaryShowing`);
        document.body.classList.remove(`${ID}-noScroll`);

        
      }
      // show the choices box on click
      component.querySelector(`.${ID}-fixedTab .${ID}-total`).addEventListener('click', () => {
        if(summaryEl.classList.contains(`${ID}-show`)) {
          closeChoices();
        } else {
          openChoices();
        }
      });

      component.querySelector(`.${ID}-close`).addEventListener('click', () => {
        closeChoices();
       });
       overlay.addEventListener('click', () => {
        closeChoices();
       });

  
    }
  
    render() {
      const { component } = this;
      if(window.innerWidth >= 1024) {
        document.querySelector(`.${ID}-rightSide`).appendChild(component);
      } else {
        document.body.appendChild(component);

      }    
    }
  }
