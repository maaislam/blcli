import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { content } from "../data";
import { addInnerContent, addTabs, changeOfferColours, createCarousel } from "../helpers";

const { ID, VARIATION } = shared;

export default class Tabs {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-aboveFold`);
      element.innerHTML = `
        <div class="${ID}-aboveFoldContainer">
            <div class="${ID}-tabsContainer">
              <div class="${ID}-tabList">
                <span class="tabs-active-marker"></span>
              </div>
            </div>
            <div class="${ID}-tabContentContainer"></div>
        </div>
      `;

      this.component = element;

        // Add content
        let sectionType;

        if(VARIATION === '3') {
          sectionType = content['2tabs'];
        } else if(VARIATION === '4') {
          sectionType = content['3tabs'];
        } else if(VARIATION === '5') {
          sectionType = content['4tabs'];
        } else if(VARIATION === '6' || VARIATION === '7') {
          sectionType = content['arrowTabs'];
        } 
      

        addTabs(sectionType, element.querySelector(`.tabs-active-marker`))
        addInnerContent(sectionType, element.querySelector(`.${ID}-tabContentContainer`));
    }
  
    bindEvents() {
      const { component } = this;

      /* Make first one active */
      const firstTabContent = component.querySelector(`.${ID}-aboveFold-inner`);
      firstTabContent.classList.add('open');
      firstTabContent.classList.remove('close');

      component.querySelector(`.${ID}-tab`).classList.add('active');


      if(VARIATION === '3' || VARIATION === '4' || VARIATION === '5') {
        if(firstTabContent.getAttribute('bgCol')) {
          const backgroundCol = firstTabContent.getAttribute('bgCol');
          component.setAttribute('style', `background-color: ${backgroundCol}`);
        }
      }

      /* Animated tab slider */
      const tabList = component.querySelector(`.${ID}-tabList`);
      const tabs = tabList.querySelectorAll(`.${ID}-tab`);
      const allTabContent = component.querySelectorAll(`.${ID}-aboveFold-inner`);


  
      const resizeTabMarker = () => {
        const activeTabEl = tabList.querySelector(`.${ID}-tab.active`);
        const activeMarker = tabList.querySelector(`.tabs-active-marker`);

        activeMarker.style.width = `${activeTabEl.getBoundingClientRect().width}px`;
        activeMarker.style.transform = `translateX(${
          activeTabEl.getBoundingClientRect().left -
          tabList.getBoundingClientRect().left
        }px)`;

        if(window.innerWidth <= 767) {
          activeTabEl.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: "center" });
        }

      };

     
      resizeTabMarker();
     

      const setActiveClass = (evt) => {
        Array.prototype.forEach.call(tabs, function(tab) {
          tab.classList.remove('active');
        });

        Array.prototype.forEach.call(allTabContent, function(content) {
          content.classList.remove('open');
          content.classList.add('close');
        });
        
        evt.currentTarget.classList.add('active');

        fireEvent('Clicked tab heading');

        const matchingAttr = evt.currentTarget.getAttribute('type');
        const matchingContent = document.querySelector(`.${ID}-aboveFold-inner[type="${matchingAttr}"]`);

        const matchingCol = matchingContent.getAttribute('bgCol');

        matchingContent.classList.remove('closed');
        matchingContent.classList.add('open');

        if(VARIATION === '3' || VARIATION === '4' || VARIATION === '5') {
          if(matchingCol) {
            component.setAttribute('style', `background-color: ${matchingCol} !important`);
          } else {
            component.removeAttribute('style');
          }
        }

        resizeTabMarker();

      }

      Array.prototype.forEach.call(tabs, function(tab) {
        tab.addEventListener('click', setActiveClass);
        
      });

   

      new ResizeObserver(() => resizeTabMarker()).observe(tabList);

    }
  
    render() {
      const { component } = this;

      if(document.querySelector('#cu_2021_pay_day')) {
        document.querySelector('#cu_2021_pay_day').parentNode.parentNode.insertAdjacentElement('beforebegin', component);
      }
      else if(document.querySelector('.oct-carousel-hero')) {
        document.querySelector('.oct-carousel-hero').parentNode.parentNode.insertAdjacentElement('beforebegin', component);
      }

  
      

      if(VARIATION === '3') {
        //createCarousel(`[type="department"]`, 5, 6, false);
        createCarousel(`[type="offers"]`, 3, 4, false);

        changeOfferColours();
      } 

      if(VARIATION === '4') {
        //createCarousel(`[type="department"]`, 5, 6, false);
        createCarousel(`[type="newin"]`, 3, 4, false);
        createCarousel(`[type="services"]`, 3, 4, false);
      } 
      if(VARIATION === '5') {
        createCarousel(`[type="newin"]`, 3, 4, false);
        createCarousel(`[type="brands"]`, 3.5, 5.5, true);
        createCarousel(`[type="offers"]`, 3, 4, false);

        changeOfferColours();
       
      } 
      if(VARIATION === '6' || VARIATION === '7') {
        //createCarousel(`[type="department"]`, 5, 6, false);
        createCarousel(`[type="offers"]`, 3, 4, false);
        createCarousel(`[type="newin"]`, 3, 4, false);

        changeOfferColours();
       
      } 
    }
  }
