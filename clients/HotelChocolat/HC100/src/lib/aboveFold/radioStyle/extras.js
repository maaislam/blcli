import shared from "../../../../../../../core-files/shared";
import { slickProducts } from "../../helpers";

const { ID } = shared;

export default class ExtrasBox {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const element = document.createElement('div');
      element.classList.add(`${ID}-extrasContent`);
      element.innerHTML = `
        <h2>What you get in the pack:</h2>
        <div class="${ID}-extraBox">
            <div class="${ID}-includedList">
                <ul>
                    <li><p>Podster coffee system</p></li>
                    <span class="${ID}-plusDesktop">+</span>
                    <li><p><span class="${ID}-plus">+</span>Podcycler</p></li>
                    <span class="${ID}-plusDesktop">+</span>
                    <li><p><span class="${ID}-plus">+</span>Manual</p></li>
                    <span class="${ID}-plusDesktop">+</span>
                    <li><p><span class="${ID}-plus">+</span>12-month warranty*</p> <span>*Subject to registration</span></li>
                </ul>
                <div class="${ID}-addExtraBtn"><span class="${ID}-plus">+</span>Add extras</div>
            </div>
            <div class="${ID}-extras">
              <div class="${ID}-cups ${ID}-addOn">
                  <div class="${ID}-content">
                      <h3>Just the cup</h3>
                      <p>Start your new coffee ritual with the latest in our set of tactile ceramics.</p>
                      <span>Buy 2 Coffee Cups for £20 (Discount applied at basket)</span>
                  </div>
                  <div class="${ID}-products"></div>
                  <div class="${ID}-addExtra">Add selection to bag</div>
              </div>
              <div class="${ID}-pods ${ID}-addOn">
                  <div class="${ID}-content">
                      <h3>Add pods of your chosen coffee</h3>
                      <p>Choose from our five unique blends. Mellow and comforting Cashmere; fruity and lively Oh, Hello; rich and rounded The One (and The One Decaf) or deep and intense Rocket.</p>
                  </div>
                  <div class="${ID}-products"></div>
                  <div class="${ID}-addExtra">Add selection to bag</div>
              </div>
            </div>
        </div>
      `;
      this.component = element;
      
    }
  
    bindEvents() {
      const { component } = this;

      const extraButton = component.querySelector(`.${ID}-addExtraBtn`);
      extraButton.addEventListener('click', (e) => {
        if(component.querySelector(`.${ID}-extras`).classList.contains(`${ID}-show`)) {
          component.querySelector(`.${ID}-extras`).classList.remove(`${ID}-show`);
          e.currentTarget.querySelector(`.${ID}-plus`).textContent = '+';
        } else {
          component.querySelector(`.${ID}-extras`).classList.add(`${ID}-show`);
          e.currentTarget.querySelector(`.${ID}-plus`).textContent = '-';

          if(!document.querySelector(`.${ID}-cups.${ID}-addOn .${ID}-products.slick-slider`)) {
            slickProducts(`.${ID}-cups.${ID}-addOn .${ID}-products`, 0);
            slickProducts(`.${ID}-pods.${ID}-addOn .${ID}-products`, 0);
          } else {
            window.jQuery(`.${ID}-cups.${ID}-addOn .${ID}-products`).slick('resize');
            window.jQuery(`.${ID}-pods.${ID}-addOn .${ID}-products`).slick('resize');
          }
        }
      })
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.${ID}-topContent`).insertAdjacentElement('afterend', component)
    }
  }
