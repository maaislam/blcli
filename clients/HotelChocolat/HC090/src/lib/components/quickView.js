
/**
 * Address question lightbox
 */

 import shared from "../../../../../../core-files/shared";
 import { closeLightbox } from "./helpers";
 
 const { ID } = shared;
 
 export default class QuickViewLightbox {
     constructor() {
       this.create();
       this.bindEvents();
       this.render();
     }
   
     create() { 
       
       const element = document.createElement('div');
       element.classList.add(`${ID}-modal`);
       element.classList.add(`${ID}-quickView`);
       element.innerHTML = `
         <div class="${ID}-close"></div>
         <div class="${ID}-modalInner">
          
         </div>`;
 
         this.component = element;
     }
   
     bindEvents() {
       const { component } = this;
 
       const overlay = document.querySelector(`.${ID}-overlay`);
       overlay.addEventListener('click', () => {
         closeLightbox(component);
          window._uxa = window._uxa || [];
          window._uxa.push(['trackPageview', window.location.pathname+window.location.hash.replace('#', '?__')]);
       });
 
       const closeBox = component.querySelector(`.${ID}-close`);
       closeBox.addEventListener('click', () => {
         closeLightbox(component);
         window._uxa = window._uxa || [];
          window._uxa.push(['trackPageview', window.location.pathname+window.location.hash.replace('#', '?__')]);
       });

      
     }
   
     render() {
       const { component } = this;
       document.body.append(component);
     }
   }