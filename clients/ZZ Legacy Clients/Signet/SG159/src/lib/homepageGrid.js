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
        <div class="${ID}-homeTile-large home-tile-grid__large-tile">
                <a href="https://www.hsamuel.co.uk/webstore/l/?query=fossil%20gen%206">
                    <div class="${ID}-image"></div>
                </a>
            
        </div>
        <div class="${ID}-homeTile-small home-tile-grid__small-tile">
            <a href="https://www.hsamuel.co.uk/webstore/l/?query=fossil%20gen%206">
                <div class="${ID}-image"></div>
            </a>
        </div>
        <div class="${ID}-homeTile-small home-tile-grid__small-tile ${ID}-last">
            <a href="https://www.hsamuel.co.uk/webstore/l/?query=fossil%20gen%206">
                <div class="${ID}-image"></div>
            </a>
        </div>
        <div class="${ID}-homeTile-full home-tile-grid__text-tile">
            <a href="https://www.hsamuel.co.uk/webstore/l/?query=fossil%20gen%206">
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
          fireEvent('Clicked Fossil Banner');
        });
      }

    }
  
    render() {
      const { component } = this;
      document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', component);
      
    }
  }