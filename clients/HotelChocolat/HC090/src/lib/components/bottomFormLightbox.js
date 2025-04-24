/**
 * Query Form lightbox
 */

 import { fireEvent } from "../../../../../../core-files/services";
 import shared from "../../../../../../core-files/shared";
 import { closeLightbox } from "./helpers";
 
 const { ID } = shared;
 
 export default class BottomFormLightbox {
     constructor() {
       this.create();
       this.bindEvents();
       this.render();
      
     }
   
     create() { 
       
       const element = document.createElement('div');
       element.classList.add(`${ID}-modal`);
       element.classList.add(`${ID}-bottomForm`);
       element.innerHTML = `
         <div class="${ID}-close"></div>
         <h3>Great news! <br> You can place an order online.</h3>
         <div class="${ID}-modalInner">
            <div class="${ID}-contactStep">
                <div class="${ID}-container">
                    <p>Click below to view our corporate gifts, add them to your bag and checkout.</p>
                    <a class="${ID}-shop" href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/business-chocolate/">Shop Now</a>
                </div>
                <div class="${ID}-contact">
                    <div class="${ID}-inner">
                        <h3>Still prefer to talk to us?</h3>
                        <h4>Call our gifting team: <br><a href="tel:03444932323">03444 93 23 23</a> or submit your enquiry</h4>
                        <div class="${ID}-submitForm">Submit</div>
                    </div>
                </div>
            </div>
         </div>`;
 
         this.component = element;
        }
   
     bindEvents() {
       const { component } = this;
 
 
       const overlay = document.querySelector(`.${ID}-overlay`);
       overlay.addEventListener('click', () => {
         closeLightbox(component);
       });
 
       const closeBox = component.querySelector(`.${ID}-close`);
       closeBox.addEventListener('click', () => {
         closeLightbox(component);
       });

       component.querySelector(`.${ID}-submitForm`).addEventListener('click', () => {
        document.querySelector(`#sendBtn`).click();
        closeLightbox(component);
        });
 
     }
   
     render() {
       const { component } = this;
       document.body.append(component);
     }
   }