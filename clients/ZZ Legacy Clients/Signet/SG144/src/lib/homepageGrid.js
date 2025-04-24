import { fireEvent } from "./services";
import shared from "./shared";

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
        <a href="https://www.hsamuel.co.uk/webstore/l/search/brand%7Csekonda/stock+position%7Cin+stock/"><div class="${ID}-image"></div></a>
                <div class="${ID}-textBanner">
                    <span>New Watch. <b>Sorted.</b></span>
                    <a class="${ID}-button" href="https://www.hsamuel.co.uk/webstore/l/search/brand%7Csekonda/stock+position%7Cin+stock/">Shop now</a>
                </div>
      
        </div>
        <div class="${ID}-homeTile-small home-tile-grid__small-tile">
            <a href="https://www.hsamuel.co.uk/webstore/l/mens-sekonda-watches/strap+material%7Cleather/">
                <div class="${ID}-image"></div>
            </a>
            <div class="${ID}-textBanner">
                <span>Leather Watches</span>
                <a class="${ID}-button" href="https://www.hsamuel.co.uk/webstore/l/mens-sekonda-watches/strap+material%7Cleather/">Shop now</a>
            </div>
            
        </div>
        <div class="${ID}-homeTile-small home-tile-grid__small-tile ${ID}-last">
            <a href="https://www.hsamuel.co.uk/webstore/l/mens-sekonda-watches/strap+material%7Cstainless+steel/">
                <div class="${ID}-image"></div>
            </a>
            <div class="${ID}-textBanner">
                <span>Metal Watches</span>
                <a class="${ID}-button" href="https://www.hsamuel.co.uk/webstore/l/mens-sekonda-watches/strap+material%7Cstainless+steel/">Shop now</a>
            </div>
    
        </div>
        <div class="${ID}-homeTile-full home-tile-grid__text-tile">
            <a href="https://www.hsamuel.co.uk/webstore/l/search/brand%7Csekonda/recipient%7Chim/stock+position%7Cin+stock/">
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
          const elName = element.querySelector('span').textContent;
          fireEvent('Clicked Sekonda Banner ' + elName);

        });

        if(element.querySelector(`.${ID}-button`)) {
          element.querySelector(`.${ID}-button`).addEventListener('click', () => {
            const elName = element.querySelector('span').textContent;
            fireEvent('Clicked Sekonda Banner ' + elName);
          });
        }
      }

    }
  
    render() {
      const { component } = this;
      document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', component);
      
    }
  }