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
        <div class="${ID}-homeTile-large home-tile-grid__large-til">
        <a href="https://www.ernestjones.co.uk/webstore/l/casio-gshock-gsteel-watches/brand%7Ccasio/">
          <div class="${ID}-image"></div>
        </a>
                <div class="${ID}-textBanner">
                    <span>Casio Watches</b></span>
                    <a class="${ID}-button" href="https://www.ernestjones.co.uk/webstore/l/casio-gshock-gsteel-watches/brand%7Ccasio/">Shop now</a>
                </div>
      
        </div>
        <div class="${ID}-homeTile-small home-tile-grid__small-tile">
            <a href="https://www.ernestjones.co.uk/webstore/d/1587978/casio+g-steel+gst-b400+men's+black+resin+strap+watch/">
                <div class="${ID}-image"></div>
            </a>
            <div class="${ID}-textBanner">
                <div class="${ID}-textContainer">
                  <b>New</b>
                  <span>Casio G-Steel GST-B400</span>
                </div>
                <a class="${ID}-button" href="https://www.ernestjones.co.uk/webstore/d/1587978/casio+g-steel+gst-b400+men's+black+resin+strap+watch/">Shop</a>
            </div>
            
        </div>
        <div class="${ID}-homeTile-small home-tile-grid__small-tile ${ID}-last">
            <a href="https://www.ernestjones.co.uk/webstore/d/1587986/casio+g-steel+gst-b400d+men's+stainless+steel+bracelet+watch/">
                <div class="${ID}-image"></div>
            </a>
            <div class="${ID}-textBanner">
                <div class="${ID}-textContainer">
                  <b>New</b>
                  <span>Casio G-Steel GST-B400D</span>
                </div>
                
                <a class="${ID}-button" href="https://www.ernestjones.co.uk/webstore/d/1587986/casio+g-steel+gst-b400d+men's+stainless+steel+bracelet+watch/">Shop</a>
            </div>
    
        </div>
        <div class="${ID}-homeTile-full home-tile-grid__text-tile">
            <a href="https://www.ernestjones.co.uk/webstore/l/casio-gshock-gsteel-watches/brand%7Ccasio/">
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
          fireEvent('Clicked Casio Banner ' + elName);

        });

        if(element.querySelector(`.${ID}-button`)) {
          element.querySelector(`.${ID}-button`).addEventListener('click', () => {
            const elName = element.querySelector('span').textContent;
            fireEvent('Clicked Casio Banner ' + elName);
          });
        }
      }

    }
  
    render() {
      const { component } = this;
      document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', component);
      
    }
  }