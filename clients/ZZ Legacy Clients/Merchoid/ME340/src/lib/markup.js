import shared from "../../../../../core-files/shared";
import productData from "./data";

const { ID, VARIATION } = shared;

export default class Markup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const PDPurl = window.location.pathname.replace(/\/+$/, '').replace('/uk/', '').replace('/eu/', '').replace('/row/', '').replace('/', '');
      let data;
      if(productData[PDPurl]) {
        data = productData[PDPurl];
      }

      let jumperText = 'Jumper';

      if (window.location.href.indexOf(/uk/) < 0){
        jumperText = 'Sweater';
      }

      const element = document.createElement('div');
      element.classList.add(`${ID}-xmasPage`);
      element.innerHTML = `
       <section class="${ID}-above-fold">
        <div class="${ID}-container">
          <div class="${ID}-carousel"></div>
          <div class="${ID}-addSection"></div>
        </div>
       </section>
       ${VARIATION === '2' ? `
       <section class="${ID}-usp ${ID}-licensed">
         <div class="${ID}-container">
           <div class="${ID}-textBlock">
               <h2>100% Money Back Guarantee</h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
           </div>
           <div class="${ID}-image">
             <img src="${data.licensed.image}" alt="Officially Licensed">
           </div>
         </div>
        </section>
       ` : ''}
       

       ${VARIATION === '1' ? 
       `<section class="${ID}-usp ${ID}-knitted">
        <div class="${ID}-container">
          <div class="${ID}-textBlock">
            <h2>2022 Prices</h2>
            <p>Last chance to secure our Christmas ${jumperText}s at 2022 prices. Don't hesitate and end up missing out.</p>
          </div>
          <div class="${ID}-image">
            <img src="${data.knitted.image}" alt="100% Knitted">
          </div>
        </div>
      </section>
      <section class="${ID}-usp ${ID}-standOut">
       <div class="${ID}-container">
         <div class="${ID}-textBlock">
             <h2>Stand out from the crowd</h2>
             <p>Don't settle for a boring mass market Christmas ${jumperText} this year. Treat for you or the perfect gift? Either way this fully knitted ${jumperText}'s guaranteed to keep you or someone special toasty this winter.</p>
         </div>
         <div class="${ID}-image">
           <img src="${data.standOut.image}" alt="Stand out from the crowd">
         </div>
       </div>
      </section>`
       : ``
      }
      
      ${VARIATION === '2' ? 
       `<section class="${ID}-usp ${ID}-standOut">
       <div class="${ID}-container">
         <div class="${ID}-textBlock">
             <h2>Stand out from the crowd</h2>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
         </div>
         <div class="${ID}-image">
           <img src="${data.standOut.image}" alt="Stand out from the crowd">
         </div>
       </div>
      </section>
      <section class="${ID}-usp ${ID}-knitted">
       <div class="${ID}-container">
         <div class="${ID}-textBlock">
           <h2>100% Knitted</h2>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
         </div>
         <div class="${ID}-image">
           <img src="${data.knitted.image}" alt="100% Knitted">
         </div>
       </div>
     </section>`
       : ''
      }
      ${VARIATION === '1' ? `
      <section class="${ID}-usp ${ID}-licensed">
        <div class="${ID}-container">
          <div class="${ID}-textBlock">
          <h2>100% Money Back Guarantee</h2>
          <p>We offer a 100-day returns policy on all our Christmas ${jumperText}s. You can return an item you have bought from us within 100 days from when it shipped for a full refund or exchange. <a href="https://help.merchoid.com/" target="_blank">Learn More</a></p>
          </div>
          <div class="${ID}-image">
            <img src="${data.licensed.image}" alt="Officially Licensed">
          </div>
        </div>
       </section>` : ''}
       <section class="${ID}-details"></section>
      `;
      this.component = element;

      const gallery = document.querySelector('.product.media');
      element.querySelector(`.${ID}-carousel`).appendChild(gallery);

      const mainDetails = document.querySelector('.product-info-main');
      element.querySelector(`.${ID}-addSection`).appendChild(mainDetails);

      const genuineLabel = document.querySelector('.official-licensed');
      element.querySelector(`.${ID}-addSection`).insertAdjacentElement('afterbegin', genuineLabel);

      const details = document.querySelector('.product-secondary-tabs-wrapper');
      element.querySelector(`.${ID}-details`).appendChild(details);

      element.querySelector('.product-title-bottom-text').innerHTML = `<b>Last chance</b> to secure an officially licensed Christmas Sweater at 2022 prices! Don't settle for less... Be unique and stand out from the crowd!`;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('#maincontent').insertAdjacentElement('beforebegin', component);
      
    }
  }
  