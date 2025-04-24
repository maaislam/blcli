import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { offers } from "../data";
import { createCarousel } from "../helpers";


const { ID } = shared;

export default class OffersCarousel {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-offersWrap`);
      element.innerHTML = `
        <div class="${ID}-offerContainer">
            <h3>Shop the latest offers</h3>
            <div class="${ID}-offers ${ID}-carousel">
                <div class="swiper-wrapper"></div>
            </div>
            <div class="${ID}-swiperNext swiper-button-next"></div>
            <div class="${ID}-swiperPrev swiper-button-prev"></div> 
        </div>
      `;

      this.component = element;

        const offerData = offers.inner;

        for (let index = 0; index < offerData.length; index += 1) {
            const el = offerData[index];

            const offerEl = document.createElement('div');
            offerEl.classList.add(`${ID}-offer`);
            offerEl.classList.add('swiper-slide');

            offerEl.innerHTML = `
            <a href="${el.link}">
                <div class="${ID}-offerInfo">
                    <h4>${el.title}</h4>
                    <p>${el.text}</p>
                    <a class="${ID}-cta" href="${el.link}">Shop now</a>
                </div>
            </a>`;

            element.querySelector(`.${ID}-offers .swiper-wrapper`).appendChild(offerEl);
        }

    }
  
    bindEvents() {
      const { component } = this;

      const allOffers = component.querySelectorAll(`.${ID}-offers .${ID}-offer`);
        if(allOffers) {
        for (let i = 0; i < allOffers.length; i += 1) {
            const offer = allOffers[i];
            offer.addEventListener('click', () => {
                fireEvent('Clicked Offer');
            });
        }
        }
    
    }
  
    render() {
      const { component } = this;

        document.querySelector(`.${ID}-aboveFold`).insertAdjacentElement('afterbegin', component); 
        createCarousel(`.${ID}-offersWrap`, 3, 4, false);
    }
  }
