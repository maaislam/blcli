import shared from "../../shared";
import BODesktopNav from "./desktopNav";
import BOMobileSlidingNav from "./mobileNav";
import { h, render } from 'preact';
import { getData } from "./104Data";
import { get104DesktopData } from "./104DesktopData";

export default () => {

    const { ID } = shared;

    
    /*  ----------------
      Experiment code 
      ------------------ */
      const navContainer = document.createElement('div');
      navContainer.classList.add(`${ID}-navigation`);
  
      if(window.innerWidth >= 1024) {
        document.querySelector('#header').insertAdjacentElement('afterend',navContainer);
      } else {
        // add new nav toggle
        document.querySelector('#header_link_container').insertAdjacentHTML('afterbegin', `<li class="${ID}-navToggle" data-icon='a'></li>` );
        document.body.appendChild(navContainer);
      }
  
      const navigation = document.querySelector(`.${ID}-navigation`);
      if(navigation) {
        navigation.innerHTML = '';
  
        const openMobile = () => {
          const burger = document.querySelector(`.${ID}-navToggle`);
          if(burger) {
            navContainer.classList.add(`${ID}-open`);
            document.documentElement.classList.add(`${ID}-noScroll`);
          }
        };
    
  
        const mobile = window.innerWidth <= 767;
  
        if(mobile) {
          render(( 
            <BOMobileSlidingNav data={getData(window.userObj.isLoggedIn)}></BOMobileSlidingNav>
          ), navigation);
  
          document.querySelector(`.${ID}-navToggle`).addEventListener('click', () => {
            openMobile();
          });
        
        } else {
          render(( 
            <BODesktopNav data={get104DesktopData()}></BODesktopNav>
          ), navigation);      
        }
    }
}