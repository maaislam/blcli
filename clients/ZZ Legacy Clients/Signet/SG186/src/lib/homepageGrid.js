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
            <a href="https://www.hsamuel.co.uk/webstore/l/?brand.lvl0=guess&instock_website=true">
                <div class="${ID}-image">
                  <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/bf77af34-7202-11ec-8c1b-baac651286fd"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-small">
            <a href="https://www.hsamuel.co.uk/webstore/l/ladies-guess-watches/">
                <div class="${ID}-image">
                 <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/c0a4e750-7202-11ec-ac58-baac651286fd"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-small ${ID}-last">
            <a href="https://www.hsamuel.co.uk/webstore/l/mens-guess-watches/">
                <div class="${ID}-image">
                <img src="https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/c131b928-7202-11ec-b190-4210d8e8eb1b"/>
                </div>
            </a>
        </div>
        <div class="${ID}-homeTile-full">
            <a href="https://www.hsamuel.co.uk/webstore/l/guess-jewellery/"> 
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
          fireEvent('Clicked Guess Banner');
        });
      }

    }
  
    render() {
      const { component } = this;
      document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', component);
      
    }
  }