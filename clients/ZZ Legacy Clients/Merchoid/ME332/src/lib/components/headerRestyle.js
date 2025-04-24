/**
 * Complete restyle for V3
 */
 import shared from "../../../../../../core-files/shared";
 import { rightIcons } from "../helpers";
 
 /**
  * Redesign of header for V1 & 2
  */
 const { ID } = shared
 
  export default class HeaderRestyle {
   constructor() {
     this.create();
     this.bindEvents();
     this.render();
   }
 
   create() {
     const element = document.createElement('div');
     element.classList.add(`${ID}-header`);
     element.innerHTML = `
       <div class="${ID}-headerContent">
         <div class="${ID}-headerContainer">
           <div class="${ID}-left">
             <div class="${ID}-navToggle"></div>
             <div class="${ID}-logo"><a href="/"></a></div>
           </div>
           <div class="${ID}-middle">
             <div class="${ID}-logo"><a href="/"></a></div>
             <div class="${ID}-desktopNavigation"></div>
           </div>
           ${rightIcons()}
         </div>
       </div>
     `;
     this.component = element;
 
     const navToggle = document.querySelector('.action.nav-toggle');
     element.querySelector(`.${ID}-navToggle`).appendChild(navToggle);
 
     if(window.innerWidth >= 1200) {
      const desktopNav = document.querySelector('.sections.nav-sections');
      element.querySelector(`.${ID}-desktopNavigation`).appendChild(desktopNav);

      if(desktopNav.querySelector('#vesitem-11658492561655231648 span')) {
        desktopNav.querySelector('#vesitem-11658492561655231648 span').textContent = 'Categories';
      }
      if( desktopNav.querySelector('#vesitem-23516584925611940030462 span')) {
        desktopNav.querySelector('#vesitem-23516584925611940030462 span').textContent = 'Brands';
      }
     }
   }
 
   bindEvents() {
     const { component } = this;
 
   }
 
   render() {
     const { component } = this;
     document.querySelector('.page-header').insertAdjacentElement('afterend', component);
 
   }
 }
 