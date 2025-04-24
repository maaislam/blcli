import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { socialData } from "./data";
import { carouselContent, openCarousel, setCarouselTitle } from "./helpers";

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
        element.innerHTML = `<div class="${ID}-container"></div>`;
        this.component = element;

       let data;
       const url = window.location.href;

       if(url === 'https://www.boots.com/' || url.indexOf('https://www.boots.com/?') > -1) {
         data = socialData['home'];
       } else if(url.indexOf('/beauty') > -1) {
          data = socialData['beauty'];
       } else if(url.indexOf('/health-pharmacy') > -1) {
        data = socialData['health'];
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
          const elIcon = element.querySelector(`.${ID}-icon`).getAttribute('style');

          element.addEventListener('click', () => {
            carouselContent(elTarget);

            if(document.querySelector(`.${ID}-socialTitle`)) {
              setCarouselTitle(elTarget, elIcon);
            }
            // open carousel  
            openCarousel();

            fireEvent('Clicked social circle ' + elTarget);
          });
      }
    }
  
    render() {
      const { component } = this;
      const page = window.location.href;

      if(page === 'https://www.boots.com/' || page.indexOf('https://www.boots.com/?') > -1) {
        if(document.querySelector('#cu_2021_pay_day')) {
          document.querySelector('#cu_2021_pay_day').parentNode.parentNode.insertAdjacentElement('beforebegin', component);
        }
        else if(document.querySelector('.oct-carousel-hero')) {
          document.querySelector('.oct-carousel-hero').parentNode.parentNode.insertAdjacentElement('beforebegin', component);
        }
      } else {
        if(document.querySelector('.oct-carousel-hero')) {
          document.querySelector('.oct-carousel-hero').parentNode.parentNode.insertAdjacentElement('beforebegin', component);
        } else if(document.querySelector('.oct-heading')) {
          document.querySelector('.oct-heading').parentNode.insertAdjacentElement('afterend', component);
        }
      }
    }
  }