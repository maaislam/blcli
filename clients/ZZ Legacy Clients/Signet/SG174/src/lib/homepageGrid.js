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
            <a href="https://www.hsamuel.co.uk/webstore/d/2456230/Bulova+Lunar+Pilot+Limited+Edition+Grey+Leather+Strap+Watch/">
                <div class="${ID}-image">
                 <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/1b575c5c-4d44-11ec-b426-3669124b1b26"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-small">
            <a href="https://www.hsamuel.co.uk/webstore/l/mens-bulova-watches/">
                <div class="${ID}-image">
                 <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/04442400-4c59-11ec-b460-0e4720ce2f33"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-small ${ID}-last">
            <a href="https://www.hsamuel.co.uk/webstore/l/ladies-bulova-watches/">
                <div class="${ID}-image">
                <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/04d54534-4c59-11ec-8411-469be1b2634f"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-full">
            <a href="https://www.hsamuel.co.uk/webstore/l/bulova-watches/">
                <div class="${ID}-image">
                <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/055c4f52-4c59-11ec-9367-469be1b2634f"/>
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