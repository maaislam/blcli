import shared from "../shared";
import { events } from "../../../../../../lib/utils";

const { ID, VARIATION } = shared;

export default class PageContent {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }


    create() {
 
        const linkageKeyMarkup = 
        `<div class="${ID}-buttonBlock">
            <div class="${ID}-button ${ID}-linkageButton">Order prescription using linkage key</div>
            <p>Recommended for patients in England. You'll need a linkage key from your GP surgery. It's quicker to get medicines using this method. You can read more about it 
                <a target="_blank" href="https://www.boots.com/floating-editorial/editorial-legal/editorial-health/frps-faqs">here</a>
            </p>
        </div>`;
    
        const prescriptionMarkup = 
        `<div class="${ID}-buttonBlock">
            <div class="${ID}-button ${ID}-prescriptionButton">Order prescription</div>
            <p>For patients who have not collected their linkage key or if your GP is based in Scotland, Wales or NI.</p>
        </div>`;

      const element = document.createElement('div');
      element.classList.add(`${ID}_pageContent`);
      element.innerHTML = `
        <h1>How would you like to proceed?</h1>
        <div class="${ID}-innerContent">
            ${shared.VARIATION === '1' ? `${linkageKeyMarkup} <div class="${ID}-line"></div> ${prescriptionMarkup}` : `${prescriptionMarkup} <div class="${ID}-line"></div> ${linkageKeyMarkup}`}
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const nextPageChange = () => {
        const hiddenContent = document.querySelector('.styles-module__appContainer--3oIOu');
        hiddenContent.style.display = 'block';
        component.style.display = 'none';
      }

      const linkageButton = component.querySelector(`.${ID}-linkageButton`);
      linkageButton.addEventListener('click', () => {
          document.querySelector('#blueButtonYes').click();
          nextPageChange();

          events.send(`${ID} v${VARIATION}`, 'click', 'Order prescription using linkage key');
      });

      const prescriptionButton = component.querySelector(`.${ID}-prescriptionButton`);
      prescriptionButton.addEventListener('click', () => {
          document.querySelector('#landing-page-blue-start-btn .styles-module__transparentButton--1QECb').click();
          nextPageChange();

          events.send(`${ID} v${VARIATION}`, 'click', 'Order prescription');
      });
    }
  
    render() {
      const { component } = this;
      document.querySelector('.styles-module__pageContent--qMz8A').insertAdjacentElement('afterbegin', component);
    }
  }
  