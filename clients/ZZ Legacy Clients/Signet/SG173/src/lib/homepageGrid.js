import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";


const { ID } = shared;


export default class HomePageGrid {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-gridWrapper`);
      element.innerHTML = `
        <div class="${ID}-homeTile-large">
            <a href="https://www.hsamuel.co.uk/webstore/l/g-shock-watches/">
                <div class="${ID}-image"></div>
            </a>
        </div>
        <div class="${ID}-homeTile-small">
            <a href="https://www.hsamuel.co.uk/webstore/d/1782851/Casio+G-Shock%C2%A0Men%27s+Black+Resin+Strap+Watch%C2%A0/ ">
                <div class="${ID}-image"></div>
            </a>
        </div>
        <div class="${ID}-homeTile-small ${ID}-last">
            <a href="https://www.hsamuel.co.uk/webstore/l/?query=casio%20vintage ">
                <div class="${ID}-image"></div>
            </a>
        </div>
        <div class="${ID}-homeTile-full">
            <a href="https://www.hsamuel.co.uk/webstore/l/casio-edifice-watches/?instock_website=true">
                <div class="${ID}-image"></div>
            </a>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const allBanners = component.querySelectorAll(`[class^="${ID}-homeTile"]`);
      for (let index = 0; index < allBanners.length; index += 1) {
        const element = allBanners[index];
        element.querySelector('a').addEventListener('click', () => {
          fireEvent('Clicked Citizen Banner');
        });
      }

    }
  
    render() {
      const { component } = this;
      document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', component);
      
    }
  }