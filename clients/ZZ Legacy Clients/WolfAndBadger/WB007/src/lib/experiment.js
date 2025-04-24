/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import { pollerLite } from "../../../../../lib/uc-lib";
import shared from "./shared";
import Siema from 'siema';
import { events } from '../../../../../lib/utils';

const runVariationChanges = () => {

  const newInBanner = document.querySelector(".new-in-banner-home");
  const markup = `
    <div id="${shared.ID}-carousel" class="UC-split-slide">
      <div class="UC-slide-content-split-f">
        <span class="${shared.ID}__shop-split">Shop</span>
        <span class="${shared.ID}__title-split">WOMEN</span>
        <a href="/category/women/" class="${shared.ID}__btn-split ${shared.ID}__button-w">SHOP NOW</a>
      </div>
      <div class="UC-slide-content-split-m">
        <span class="${shared.ID}__shop-split">Shop</span>
        <span class="${shared.ID}__title-split">MEN</span>
        <a href="/category/men/" class="${shared.ID}__btn-split ${shared.ID}__button-m">SHOP NOW</a>
      </div>
    </div>
  `;

  if (newInBanner) {
    newInBanner.insertAdjacentHTML("beforebegin", markup);
  }

  const womensButton = document.querySelector(`.${shared.ID}__button-w`);
  if (womensButton) {
    womensButton.addEventListener('click', () => {
      events.send(`${shared.ID}--${shared.VARIATION}`, 'clicked-womens-shop-now')
    })
  };

  const mensButton = document.querySelector(`.${shared.ID}__button-m`);
  if (mensButton) {
    mensButton.addEventListener('click', () => {
      events.send(`${shared.ID}--${shared.VARIATION}`, 'clicked-mens-shop-now')
    })
  }

}


const runChanges = () => {

  const newInBanner = document.querySelector(".new-in-banner-home");

  const markup = `
  <div id="${shared.ID}-carousel" class="my-container">
  <div class="my-slider">
     <div class="mySlider">
        <div class="slide-item">
          <div class="UC-slide-content">
            <span class="${shared.ID}__shop">Shop</span>
            <span class="${shared.ID}__title">WOMEN</span>
            <a href="https://www.wolfandbadger.com/category/women/" class="${shared.ID}__btn ${shared.ID}__btn-w ${shared.ID}__button-w">SHOP NOW</a>
          </div>
        </div>
        <div class="slide-item">
          <div class="UC-slide-content-m">
            <span class="${shared.ID}__shop">Shop</span>
            <span class="${shared.ID}__title">MEN</span>
            <a href="/category/men/" class="${shared.ID}__btn ${shared.ID}__btn-w ${shared.ID}__mens">SHOP NOW</a>
          </div>
        </div>
     </div>
  </div>
</div>
  `;

  if (newInBanner) {
    const existing = document.querySelector(`#${shared.ID}-carousel`);
    if(existing) {
      existing.parentNode.removeChild(existing);
    }

    newInBanner.insertAdjacentHTML("beforebegin", markup);
    
    const wbSlider = new Siema({
      selector: '.mySlider',
      duration: 200,
      easing: 'ease-out',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      multipleDrag: false,
      threshold: 20,
      loop: true,
      rtl: false,
      onInit: () => {},
      onChange: () => {
        // wbSlider.drag.preventClick = false;
        // clearInterval(sliderInterval);
        var cs = wbSlider.currentSlide
        const btns = wbSlider.selector.parentNode.querySelectorAll('.siema-dot');

        if(!btns[cs]) {
          wbSlider.addPagination();
        }
         
        [].forEach.call(btns, btn => btn.classList.remove('siema-dot--active'));
        btns[cs].classList.add('siema-dot--active')
      },
    });
   
    const sliderInterval = setInterval(() => wbSlider.next(), 5000)
   
    Siema.prototype.addPagination = function() {
      const btnsContainer = document.createElement('div');
      btnsContainer.classList.add('siema-dots');
      
      this.selector.parentNode.appendChild(btnsContainer);
      
      for (let i = 0; i < this.innerElements.length; i++) {
        const btn = document.createElement('button');
        btn.classList.add('siema-dot');
        btn.textContent = i;
        var that = this;
        
        if(i == 0) {
          btn.classList.add('siema-dot--active');
        }
        
        btn.addEventListener('click', () => {
          const btns = that.selector.parentNode.querySelectorAll('.siema-dot');
          [].forEach.call(btns, btn => btn.classList.remove('siema-dot--active'));
          
          btn.classList.add('siema-dot--active');
          
          this.goTo(i)
          
          // Remove any intervals here
          if(typeof sliderInterval != 'undefined') {
            clearInterval(sliderInterval);
          }
        });
    
        btnsContainer.appendChild(btn);
      }
    }
    
    // Trigger pagination creator
    wbSlider.addPagination();


    const womensButton = document.querySelector(`.${shared.ID}__button-w`);
    if (womensButton) {
      womensButton.addEventListener('click', () => {
        events.send(`${shared.ID}--${shared.VARIATION}`, 'clicked-womens-shop-now')
      })
    };
  
    const mensButton = document.querySelector(`.${shared.ID}__mens`);
    if (mensButton) {
      mensButton.addEventListener('click', () => {
        events.send(`${shared.ID}--${shared.VARIATION}`, 'clicked-mens-shop-now')
      })
    }

  }
   

//   const wbSlider = new Siema({
//    selector: '.mySlider',
//    duration: 200,
//    easing: 'ease-out',
//    perPage: 1,
//    startIndex: 0,
//    draggable: true,
//    multipleDrag: true,
//    threshold: 20,
//    loop: true,
//    rtl: false,
//    onInit: () => {},
//    onChange: () => {
//      var cs = wbSlider.currentSlide
//      const btns = wbSlider.selector.querySelectorAll('.siema-dot');
//       [].forEach.call(btns, btn => btn.classList.remove('siema-dot--active'));
//       btns[cs].classList.add('siema-dot--active')
//    },
//  });

// //  setInterval(() => wbSlider.next(), 5000)

//  Siema.prototype.addPagination = function() {
//    const btnsContainer = document.createElement('div');
//    btnsContainer.classList.add('siema-dots');
   
//    this.selector.appendChild(btnsContainer);
   
//    for (let i = 0; i < this.innerElements.length; i++) {
//      const btn = document.createElement('button');
//      btn.classList.add('siema-dot');
//      btn.textContent = i;
//      var that = this;
     
//      if(i == 0) {
//        btn.classList.add('siema-dot--active');
//      }
     
//      btn.addEventListener('click', () => {
//        const btns = that.selector.querySelectorAll('.siema-dot');
//        [].forEach.call(btns, btn => btn.classList.remove('siema-dot--active'));
       
//        btn.classList.add('siema-dot--active');
       
//        this.goTo(i)
       
//        // Remove any intervals here
//        if(mySiemaInterval) {
//          clearInterval(mySiemaInterval);
//        }
//      });
 
//      btnsContainer.appendChild(btn);
//    }
//  }
 
//  // Trigger pagination creator
//  wbSlider.addPagination();

//// JS 

// const container = document.querySelector('.my-slider');
// const container_width = container.clientWidth;
// const imgs_wrapper = document.querySelector('.my-slider__wrapper');
// const imgs = document.querySelectorAll('.slide-item');
// const total_imgs = imgs.length;
// let current_index = 0;
// let pointer_is_down = false;
// let [start_x, end_x] = [0, 0];
// let move_distance = 0;

// function init() {
//    imgs_wrapper.style.width = `${container_width * total_imgs}px`;
// }

// // Mousemove and Touchmove Event
// function createDraggingEffects() {
//    const max_distance = 2;
//    const scrolled_distance = (current_index * container_width) + (start_x - end_x) / max_distance;

//    switchImages(-scrolled_distance);
// }

// // Mouseup and Touchend Event
// function calculateFinalMoveDistance() {
//    const scrolled_distance = Math.abs(start_x - end_x);
//    const minimum_distance = 30;

//    if (scrolled_distance < minimum_distance) {
//       move_distance = -(current_index * container_width);
//       switchImages();
//       return false;
//    }

//    if (start_x > end_x & current_index < total_imgs - 1) { // scroll next
//       current_index++;
//    } else if (start_x < end_x && current_index > 0) { // scroll prev
//       current_index--;
//    }

//    move_distance = -(current_index * container_width);
//    switchImages(move_distance);
// }

// // Switch Images
// function switchImages(scrolled_number) {
//    const distance = scrolled_number || move_distance;

//    imgs_wrapper.style.transform = `translateX(${distance}px)`;
// }

// // Mouseleave event
// function handleMouseLeave(e) {
//    if (!pointer_is_down) return false;

//    pointer_is_down = false;
//    [start_x, end_x] = [0, 0];
//    switchImages();
// }

// init();

// container.addEventListener('mousedown', (e) => {
//    e.preventDefault();
//    pointer_is_down = true;
//    start_x = e.pageX;
// });

// container.addEventListener('mousemove', (e) => {
//    e.preventDefault();
//    if (!pointer_is_down) return false;
//    end_x = e.pageX;
//    createDraggingEffects();
// });

// container.addEventListener('mouseup', (e) => {
//    e.preventDefault();
//    pointer_is_down = false;
//    calculateFinalMoveDistance();
// });

// container.addEventListener('mouseleave', handleMouseLeave);

// container.addEventListener('touchstart', (e) => {
//    pointer_is_down = true;
//    start_x = e.touches[0].pageX;
// });

// container.addEventListener('touchmove', (e) => {
//    if (!pointer_is_down) return false;
//    end_x = e.touches[0].pageX;
//    createDraggingEffects();
// });

// container.addEventListener('touchend', (e) => {
//    pointer_is_down = false;
//    calculateFinalMoveDistance();
// });

};

const init = () => {
  setup();
  if(shared.VARIATION == 1) {
    runChanges();
  }
  if (shared.VARIATION == 2) {
    runVariationChanges();
  }
};

export default () => {
  init();
};
