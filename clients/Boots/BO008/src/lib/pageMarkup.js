/**
 * @desc main page markup
 */

import shared from './shared';

const { ID } = shared;

export default class PageContent {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
        const element = document.createElement('div');
      element.classList.add(`${ID}_pageContent`);
      element.innerHTML = 
      `<div class="${ID}__banner ${ID}__sale">
          <div class="container">
            <div class="${ID}__bannerText row">
              <div class="${ID}__textLeft ${ID}__h3 col-7-sm">Save 15% on fragrance & premium beauty all weekend</div>
                <div class="${ID}__textRight col-5-sm col-3">
                    <div class="${ID}__button ${ID}__banner__button"><a href="#">Shop Now</a></div>
                </div>
              </div>
          </div> 
        </div>

        <div class="${ID}__pageContent__inner">
            <div class="${ID}__heroCarousel"></div>

            <div class="${ID}__brandBar ${ID}__carouselBar">
              <div class="${ID}__carousel__inner"></div>
            </div>

            <div class="${ID}__section ${ID}__smallBoxes container">
              <h4 class="${ID}__h4">Section Heading</h4>
              <div class="row"></div>
            </div>

            <div class="${ID}__section ${ID}__largeBoxes container">
              <div class="row"></div>
            </div>

            <div class="${ID}__section ${ID}__smallBoxes ${ID}__carouselBar">
                <div class="row">
                  <div class="${ID}__carousel__inner"></div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__propositions">
              <div class="container">
                <div class="row">
                </div>
              </div>
            </div>

            <div class="${ID}__section ${ID}__newsletter">
              <div class="container">
                <div class="row">
                </div>
              </div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('#content').insertAdjacentElement('afterbegin', component);


      /* ---- Newsletter changes ---- */

      // move the newsletter 
      const newsletterSignup = document.querySelector(`#cu_newsletter_signup`);
      component.querySelector(`.${ID}__newsletter .row`).appendChild(newsletterSignup);
      const newsletterButton = newsletterSignup.querySelector('button');

      // add classes to button
      newsletterButton.classList.add(`${ID}__button`);
      newsletterButton.classList.add(`${ID}__primary`);
      newsletterButton.classList.add(`${ID}__primary__lightBlue`);
      newsletterButton.classList.add('col-sm-12');
      newsletterButton.classList.add('col-6');
      newsletterButton.classList.remove(`btn`);
      
      // add to input
      newsletterSignup.querySelector('input').classList.add(`${ID}__input`);
    }
  }
  
