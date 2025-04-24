import { fireEvent } from "./services";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class BookingPopup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-lightboxModal`);

      element.innerHTML = `
        <div class="${ID}-modalInner">
        <div class="${ID}-close"></div>
            <div class="${ID}-titleBox">
               <h3>Book an appointment with one of our experts</h3>
               <p>Book a free appointment at your local store or an online virtual appointment with one of our friendly experts.</p>
            </div>
            <div class="${ID}-innerContent">
               <div class="${ID}-bookBlock ${ID}-store">
                    <span></span>
                    <div class="${ID}-text">
                        <h3>In-Store Appointment</h3>
                        <p>Beat the queues and book an in-store appointment with one of our friendly experts.</p>
                        <div class="${ID}-bookStore">Book an in-store appointment</div>
                    </div>
               </div>
               <div class="${ID}-bookBlock ${ID}-virtual">
                    <span></span>
                    <div class="${ID}-text">
                        <h3>Virtual Appointment</h3>
                        <p>Speak to one of our expert advisors for any help or information you need from the comfort of your own home.</p>
                        <div class="${ID}-bookStore">Book a virtual appointment</div>
                    </div>
                </div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
        const { component } = this;

        const closedBox = () => {
            // class to hide it
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-bookoverlay`).classList.remove(`${ID}-show`);
            document.body.classList.remove(`${ID}-noScroll`);
        }

        const openBox = () => {
            component.classList.add(`${ID}-modalShow`);
            document.querySelector(`.${ID}-bookoverlay`).classList.add(`${ID}-show`);
            document.body.classList.add(`${ID}-noScroll`);
        }
              

        const bookCTA = document.querySelector(`.${ID}-bookingCTA`);

        bookCTA.addEventListener('click', () => {
            openBox();
        });
        
        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            closedBox();
        });
        document.querySelector(`.${ID}-bookoverlay`).addEventListener('click', () => {
            closedBox();
        });


        // booking buttons
        const storeAppt = document.querySelector('.book-appointments-section .product-book-appointment__link');
        const virtualAppt = document.querySelector('.book-appointments-section .product-virtual-appointment__link');

        component.querySelector(`.${ID}-store .${ID}-bookStore`).addEventListener('click', () => {
            storeAppt.click();
            fireEvent('Clicked book store appointment');
        });

        component.querySelector(`.${ID}-virtual .${ID}-bookStore`).addEventListener('click', () => {
            virtualAppt.click();
            fireEvent('Clicked book virtual appointment');
        });
    }
  
    render() {
        const { component } = this;
        document.body.appendChild(component);
    }
  }
