import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { socialData } from "./data";
import { bestSellers, carouselContent, openCarousel } from "./helpers";

const { ID } = shared;

export default class SocialCircles {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}-socialCircles`);
        element.innerHTML = `<h4>BOMBSHELL BRANDS WE KNOW YOU’LL LOVE</h4><div class="${ID}-container"></div>`;
        this.component = element;

       let data;
       const url = window.location.href;

       if(url === 'https://www.boots.com/love-island' || url.indexOf('https://www.boots.com/love-island?') > -1) {
         data = socialData;
       }
       else if(url === 'https://www.boots.com/love-island/in-the-villa' || url.indexOf('https://www.boots.com/love-island/in-the-villa?') > -1) {
        data = socialData;
      }

        // add data
        Object.keys(data).forEach((i) => {
            const elData = data[i];
            const socialCircle = document.createElement('div');
            socialCircle.classList.add(`${ID}-circle`);
            socialCircle.setAttribute('data-target', [i][0]);
            socialCircle.innerHTML = `
            <div class="${ID}-icon" style="background-image:url(${elData.icon})"></div>
            <p>${[i][0]}</p>`;

            element.querySelector(`.${ID}-container`).appendChild(socialCircle);
        });
    }
  
    bindEvents() {
      const { component } = this;

      // on click, create carousel
      const allCircles = component.querySelectorAll(`.${ID}-circle`);
      for (let index = 0; index < allCircles.length; index += 1) {
          const element = allCircles[index];

          const elTarget = element.getAttribute('data-target');

          element.addEventListener('mouseover', () => {
            
          });

          element.addEventListener('click', () => {
            carouselContent(elTarget);
            bestSellers(elTarget);
          

            // open carousel  
            openCarousel(elTarget);
            element.querySelector('.BO211-icon').style.border = "solid 3px grey";
            fireEvent('Clicked social circle ' + elTarget);
          });
      }
    }
  
    render() {
      const { component } = this;
      const page = window.location.href;

      if(page === 'https://www.boots.com/love-island' || page.indexOf('https://www.boots.com/love-island?') > -1) {
        const entryElement = document.querySelectorAll('.oct-grid__row.oct-grid__row--full-width')[1];
        entryElement.insertAdjacentElement('afterend', component);
      } 
      else if(page === 'https://www.boots.com/love-island/in-the-villa' || page.indexOf('https://www.boots.com/love-island/in-the-villa?') > -1) {
        const entryElement = document.querySelector('#estore_category_heading');
        entryElement.insertAdjacentElement('beforebegin', component);
      } 
    }
  }