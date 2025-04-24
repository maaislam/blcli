import shared from "../shared";

/**
 * Change the gift message styling
 */

const { ID } = shared;

export default class GiftOption {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const giftSelected = document.querySelector(`.${ID}-gift_option .product-summary__definition`);

      const element = document.createElement('div');
      element.classList.add(`${ID}_giftOption`);

      if(giftSelected.textContent === 'Gift packaging added.') {

        const messageAdded = document.querySelector('.product-summary__gift-message');
        // change the content depening on if gift wrapping is added
        element.classList.add(`${ID}_giftAdded`);
        element.innerHTML = `
        <div class="${ID}-giftAdded_content">
          <span class="${ID}-title">Gift Wrapping</span><span class="${ID}-giftPrice">£3.50</span>
          ${messageAdded ? `<p>Your message: <span>${messageAdded.textContent}</span></p>` : ''}
          <div class="${ID}-gift_links">
            <div class="${ID}-link ${ID}-editGift"><a href="/webstore/secure/showGiftOptions.sdo">Edit</a></div>
            <div class="${ID}-link ${ID}-removeGift">Remove</div>
          </div>
        </div>
        `;
       
      } else {
        element.innerHTML = `
        <a href="/webstore/secure/showGiftOptions.sdo">
            <span>Add Gift Wrapping</span>
        </a>
      `;
      }
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      // if gift wrapping selected, add events for the new edit/remove links

      const removeGiftLink = document.querySelector('#removeGiftOptions');
      
      if(removeGiftLink) {
        component.querySelector(`.${ID}-removeGift`).addEventListener('click', () => {
          removeGiftLink.querySelector('button').click();
        });
      }
    }
  
    render() {
      const { component } = this;
      document.querySelector('.basket-table').appendChild(component);

      // hide original gift product option
      const gift = document.querySelector('.product-summary:not([data-sku])');
      gift.style.display = 'none';

    }
  }
  