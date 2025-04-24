/**
 * Add the main product info box
 */
import shared from "../shared";
import { __ } from '../helpers';

const { ID, VARIATION } = shared;

export default class BuySectionMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
    const element = document.createElement('div');
      element.classList.add(`${ID}_buySection`);
      element.innerHTML = `
        <div class="${ID}_sectionTitle">
          <h2>${__('Get your bike')}</h2>
          <p>${__('Buy now, choose the monthly subscription to your favourite classes for streaming and on demand. You can add accessories to maximize your training experience. You may modify or cancel your subscription anytime.')}</p>
        </div>
        <div class="${ID}__productInfo">
            <div class="${ID}__image"></div>
            <div class="${ID}__boxContainer">
              <div class="${ID}__ctaBox">
                  <div class="${ID}_sectionContent">
                      <h2>${__('Technogym Bike')}</h2>
                      <p class="${ID}-productdesc">${__('Designed down to every detail from our research centre, Technogym Bike is the result of more than 30 years of biomechanical research and a constant dialogue with Olympic athletes.')}</p>
                      <span class="${ID}-price">${__('£2,450.00')}</span>
              
                      <div class="${ID}-includes">
                        <p>${__('Includes')}:</p>
                        <ul>
                          <li>${__('A pair of 1.5 kg cast iron weights')}</li>
                          <li>${__('Delivery and setup')}</li>
                        </ul>
                      </div>

                      <div class="${ID}-financeBox">
                        <p>${__('0% APR finance available')}</p>
                        <p>${__('Finance from <strong>£71 p/m</strong> over 36 months')}</p>
                      </div>
                      <div class="${ID}_button ${ID}_cta">Add to cart</div>
                  </div>
              </div>
            </div>
        </div>
      `;
      
      this.component = element;

      if(shared.VARIATION === '1') {
        element.querySelector(`.${ID}_sectionContent`).insertAdjacentHTML(`afterend`, `<div class="${ID}_selectedWrapper"> <p>Selected:</p><div class="${ID}-selectedOptions"></div></div><div class="${ID}_selectionBoxes"></div>`);
      }

    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;

      const buySection = document.querySelector('#buy');
      buySection.parentNode.classList.add(`${ID}-buyWrapper`);
      buySection.querySelector('.wrapper_gearwear form').insertAdjacentElement('afterbegin', component);
    }
  }
  
