import shared from "../../../../../../core-files/shared";


const { ID } = shared;

export default class Header {
    constructor() {
      this.create();
      this.bindEvents();

      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-header`);
    
      element.innerHTML = `
        <div class="${ID}-topBar"></div>
        <div class="${ID}-container">
          <div class="${ID}-left">
            <div class="${ID}-icon Nav__close"></div>
            <div class="${ID}-icon ${ID}__navToggle"></div>
            <div class="${ID}-logo"></div>
          </div>

          <div class="${ID}-middle">
          </div>

          <div class="${ID}-right">
              <div class="${ID}-icons">
                <div class="${ID}-icon ${ID}-searchToggle"></div>
              </div>
          </div>
        </div>
      `;
      this.component = element;

      const existingIcons = document.querySelector('.header .header-actions');
      element.querySelector(`.${ID}-icons`).appendChild(existingIcons);


      const logo = document.querySelector('.header__logo');
      element.querySelector(`.${ID}-logo`).appendChild(logo);
      // existingIcons.querySelector('.header__syte.js-syte-functionality').addEventListener('click', () => {
      //   document.querySelector(`.site-search`).shadowRoot.querySelector('.--syte-start-camera-upload.c-syte.syte').click();
      // })
      // remove text from user icons
     //existingIcons.querySelector('.user-status__link').textContent = '';


    }
  
    bindEvents() {
      const { component } = this;
    }

  
    render() {
      const { component } = this;
      document.querySelector('.header').insertAdjacentElement('beforebegin', component);

  
      const basketIcon = document.querySelectorAll('.header-actions__link');
      for (let index = 0; index < basketIcon.length; index += 1) {
        const element = basketIcon[index];
        element.textContent = '';
      }

      const storesIcons = document.querySelector('.header-actions__item');
      if(storesIcons) {
        storesIcons.classList.add('stores');
      }

    //   // change existing icons
    //   const basket = document.querySelector('.header-actions__item--basket');
    //   basket.querySelector('img').setAttribute('src', 'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/61212196-b832-11ed-bd08-fe1dd4b2171a');
    // }
    }
  }