import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { content } from "../data";
import { addInnerContent, changeOfferColours, createCarousel } from "../helpers";

const { ID, VARIATION } = shared;

export default class Accordion {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-aboveFold`);
      element.innerHTML = `
        <div class="${ID}-aboveFoldContainer"></div>
      `;

      this.component = element;

        // Add content
        let sectionType;

        if(VARIATION === '1') {
          sectionType = content['horizontal'];
        } else if(VARIATION === '2') {
          sectionType = content['vertical'];
        }
        

        addInnerContent(sectionType, element.querySelector(`.${ID}-aboveFoldContainer`));
    }
  
    bindEvents() {
      const { component } = this;

     
      const sectionContent = component.getElementsByClassName(`${ID}-aboveFold-inner`);
      const sectionHeading = component.getElementsByClassName(`${ID}-sectionHeading`);
  

      for (let index = 0; index < sectionHeading.length; index += 1) {
          const el = sectionHeading[index];
          el.addEventListener('click', toggleItem, false);
      }

      function toggleItem() {
            if(this.parentNode.querySelector('.swiper-wrapper').swiper) {
              this.parentNode.querySelector('.swiper-wrapper').swiper.update();
            }

          const itemClass = this.parentNode.className;
          for (let i = 0; i < sectionContent.length; i += 1) {
              const accEl = sectionContent[i];
              accEl.className = `${ID}-aboveFold-inner close`;
          }

          if (itemClass == `${ID}-aboveFold-inner close`) {
              this.parentNode.className = `${ID}-aboveFold-inner open`;

              const title = this.textContent;

              fireEvent('Clicked accordion heading ' + title);
          }
      }
       
    }
  
    render() {
      const { component } = this;

      if(document.querySelector('#cu_2021_pay_day')) {
        document.querySelector('#cu_2021_pay_day').parentNode.parentNode.insertAdjacentElement('beforebegin', component);
      }
      else if(document.querySelector('.oct-carousel-hero')) {
        document.querySelector('.oct-carousel-hero').parentNode.parentNode.insertAdjacentElement('beforebegin', component);
      }

      if(VARIATION === '1') {
        //createCarousel(`[type="department"]`, 4, 6, false);
        createCarousel(`[type="offers"]`, 3.5, 3.5, true);
        createCarousel(`[type="brands"]`, 3.5, 5.5, true);
        changeOfferColours();

      } else if(VARIATION === '2') {
        createCarousel(`[type="blog"]`, 2, 3, false);
        createCarousel(`[type="offers"]`, 3, 4, false);
        createCarousel(`[type="newin"]`, 3, 4, false);
        changeOfferColours();

        // open offers by default
        document.querySelector(`.${ID}-aboveFold-inner[type="offers"]`).classList.remove('close');
        document.querySelector(`.${ID}-aboveFold-inner[type="offers"]`).classList.add('open');
      }
      
    }
  }
