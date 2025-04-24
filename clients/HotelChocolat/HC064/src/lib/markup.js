import { fireEvent } from "./services";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class ValueMessages {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-valueMessaging`);
      element.innerHTML = `
        <div class="${ID}-container">
            <div class="${ID}-value ${ID}-happiness">
                <div class="${ID}-col-left"></div>
                <div class="${ID}-col-right">
                    <div class="${ID}-value-text">
                        <h3>100% Happiness Guarantee</h3>
                        <p>All purchases are covered by our No Excuses Guarantee so if you're not 100% happy with our products we guarantee that we'll immediately put it right for you</p>
                        <a href="https://www.hotelchocolat.com/uk/help/our-guarantee.html">Learn More</a>
                    </div>
                </div>
            </div>
            <div class="${ID}-value ${ID}-ingredients">
                <div class="${ID}-col-left"></div>
                <div class="${ID}-col-right">
                    <div class="${ID}-value-text">
                        <h3>Natural Ingredients</h3>
                        <p>We’re committed to using only real, natural ingredients – nothing artificial, ever</p>
                        <a href="https://www.hotelchocolat.com/uk/engaged-ethics/our-people/Our-Story.html">Learn More</a>
                    </div>
                </div>
            </div>
            <div class="${ID}-value ${ID}-ethics">
                <div class="${ID}-col-left"></div>
                <div class="${ID}-col-right">
                    <div class="${ID}-value-text">
                        <h3>100% Ethical Cocoa</h3>
                        <p>Our cacao is 100% ethical: we work with farmers around the world in a way that adheres to the principles of our Engaged Ethics programme, and to our Cacao Sustainability Charter.</p>
                        <a href="https://www.hotelchocolat.com/uk/engaged-ethics.html">Learn More</a>
                    </div>
                </div>
            </div>
            <div class="${ID}-value ${ID}-made">
                <div class="${ID}-col-left"></div>
                <div class="${ID}-col-right">
                    <div class="${ID}-value-text">
                        <h3>Made With Love</h3>
                        <p>Our chocolatiers work hard to make sure all our chocolates are original, authentic and ethical to bring you new ways to experience cocoa</p>
                        <a href="https://www.hotelchocolat.com/uk/engaged-ethics/our-people/Our-Story.html">Learn More</a>
                    </div>
                </div>
            </div>
       </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
      const allLinks = component.querySelectorAll(`.${ID}-value a`);
      for (let index = 0; index < allLinks.length; index += 1) {
          const element = allLinks[index];
          element.addEventListener('click', () => {
            fireEvent('Clicked Value Message');
          });
      }
      
    }
  
    render() {
        const { component } = this;

        if(VARIATION === '1') {
            if(window.innerWidth > 767) {
                document.querySelector('.product-detail').insertAdjacentElement('afterbegin', component);
            } else {
                document.querySelector('#product-content').insertAdjacentElement('afterend', component);
            }
        } else if(VARIATION === '2') {
            if(window.innerWidth > 767) {
                document.querySelector('.tab-target-desktop').insertAdjacentElement('afterend', component);
            } else {
                document.querySelector('.product-col-2.product-detail').insertAdjacentElement('afterend', component);
            }
         
        }
      
    }
  }