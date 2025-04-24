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
            <a href="https://www.hsamuel.co.uk/webstore/l/watches-by-rotary/ ">
                <div class="${ID}-image">
                  <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/a85c32ee-4c72-11ec-b967-427a4cce4e54"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-small">
            <a href="https://www.hsamuel.co.uk/webstore/l/mens-rotary-watches/">
                <div class="${ID}-image">
                 <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/a9defaca-4c72-11ec-8bc7-5eaa69aacbf7"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-small ${ID}-last">
            <a href="https://www.hsamuel.co.uk/webstore/l/ladies-rotary-watches/">
                <div class="${ID}-image">
                <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/aa8fd746-4c72-11ec-9027-62831a7d5758"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-full">
            <a href="https://www.hsamuel.co.uk/webstore/l/watches-by-rotary/">
                <div class="${ID}-image">
                </div>
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