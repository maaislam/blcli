import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { addProductTobag, closeSavedBox, slickProducts, updateSavedItemsContent } from "../helpers";

const { ID } = shared;

export default class SavedProducts {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-savedProducts`);
      element.innerHTML = `
        <div class="${ID}-savedItems__wrapper ${ID}-tab">
            <div class="${ID}-savedItems__container">
                <div class="${ID}-savedItems__content">
                <div class="icon heart"></div>
                <div class="label-text">Saved Products</div>
                </div>
            </div>
        </div>
        <div class="${ID}-savedItemsList__wrapper">
            <div class="${ID}-savedItemsList__overlay"></div>
            <div class="${ID}-savedItemsList__container">
                <div class="${ID}-header__wrapper">
                    <div class="${ID}-closeIcon"></div>
                    <div class="${ID}-title">
                      <div class="icon heart"></div>
                      <div class="label-text">Your Saved Products</div>
                    </div>
                </div>
                <ul class="${ID}-savedItemsList"></ul>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
      const savedTab = component.querySelector(`.${ID}-tab`);
      const savedItemsList = component.querySelector(`.${ID}-savedItemsList__wrapper`);

      const openModal = () => {
        savedItemsList.classList.add('show');
        document.documentElement.classList.add(`${ID}-noScroll`);
        document.querySelector(`.${ID}-tab`).classList.remove('show');

         /**
         * @desc Saved Products List DOES NOT contain hidden
         * Shows the Saved list lightbox -------------------
         * and updates the content -------------------------
         */
        updateSavedItemsContent(savedItemsList);

         // Add to bag
      const savedItemsEvent = () => {
        const savedItems = document.querySelectorAll(`.${ID}-savedItemsList .${ID}-product__wrapper`);
        if(savedItems) {
          for (let index = 0; index < savedItems.length; index += 1) {
            const element = savedItems[index];
            element.querySelector(`.${ID}-btn__shop`).addEventListener('click', (e) => {
              const prodID = e.currentTarget.getAttribute('sku-data');
              fireEvent('Clicked add to bag on saved product');
              addProductTobag(prodID);
              
            });
          }
        }
      }
      savedItemsEvent();

      }


      savedTab.addEventListener('click', () => {
        openModal();

        if(window.innerWidth >= 1024) {
          slickProducts();
        }
      });


      window.addEventListener('resize', () => {
        if(window.innerWidth >= 1024) {
          slickProducts();
        } else {
          if(document.querySelector(`.${ID}-savedItemsList.slick-initialized`)) {
            window.jQuery(`.${ID}-savedItemsList`).slick('unslick');
          }
        }
      });

      component.querySelector(`.${ID}-savedItemsList__overlay`).addEventListener('click', () => {
        closeSavedBox();
      });

      component.querySelector(`.${ID}-closeIcon`).addEventListener('click', () => {
        closeSavedBox();
      });
      
    }
  
    render() {
      const { component } = this;

      if (!document.querySelector(`.${ID}-tab`)) {
        document.querySelector('body').appendChild(component);
      }
      
    }
  }
