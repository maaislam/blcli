import shared from "../../../../../core-files/shared";


const { ID } = shared;

export default class NewCarouselThumbs {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.className = `${ID}-gallery-thumbs`;
      element.innerHTML = `
        <div class="${ID}-container"></div>
      `;
      this.component = element;
        
      const allSlides = document.querySelectorAll('.product-gallery__main .swiper-slide');

      for (let index = 0; index < allSlides.length; index++) {
          const el = allSlides[index];

          let thumb;
          if(el.querySelector('video')) {
             thumb = el.querySelector('video').getAttribute('poster');
          } else if (el.querySelector('img.product-gallery__image')) {
             thumb = el.querySelector('img.product-gallery__image').src;
          } else if(el.querySelector('canvas')) {
             thumb = 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/0d5184fc-754e-11ec-8d1f-da4d756e4e09';
          }

            const thumbSlide = document.createElement('div');
            thumbSlide.classList.add(`${ID}-thumb`);

            if(index === 0) {
                thumbSlide.classList.add(`active`);
            }
 
            thumbSlide.setAttribute('slide-data', index);
            thumbSlide.innerHTML = `<img src="${thumb}"/>`;

            element.querySelector(`.${ID}-container`).appendChild(thumbSlide);
          
      }
      

    }
  
    bindEvents() {
      const { component } = this;

      const allThumbs = component.querySelectorAll(`.${ID}-thumb`);
      for (let index = 0; index < allThumbs.length; index += 1) {
          const element = allThumbs[index];
          element.addEventListener('click', (e) => {
              const thumbNo = element.getAttribute('slide-data');
              document.querySelectorAll('.swiper-pagination-bullet')[thumbNo].click();

              if(document.querySelector(`.${ID}-thumb.active`)) {
                document.querySelector(`.${ID}-thumb.active`).classList.remove('active');
                e.currentTarget.classList.add('active');
              } else {
                e.currentTarget.classList.add('active');
              }
          });
          
      }
    }
  
    render() {
      const { component } = this;
      document.querySelector('.product-gallery__main').insertAdjacentElement('afterbegin', component);
    }
  }