import { events } from "../../../../../lib/utils";
import { getSiteFromHostname } from "./services";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class COVIDPopup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
        let link;

        if(getSiteFromHostname() === 'ernestjones') {
            link = 'https://customer.bookingbug.com/?client=ernest_jones&service=48321&company=37397#/availability';
        } else {
            link = 'https://customer.bookingbug.com/?client=h_samuel&service=49232&company=37398';
        }
      const element = document.createElement('div');
      element.classList.add(`${ID}-lightboxModal`);

      element.innerHTML = `
        <div class="${ID}-modalInner">
            <div class="${ID}-icon"></div>
            <div class="${ID}-titleBox">
                <h3>Book a virtual appointment.</h3>
                <div class="${ID}-close"></div>
            </div>
            <div class="${ID}-innerContent">
                <div class="${ID}-info">
                    <p>We know it may be hard for you to get into store due to Covid-19 at the moment, so why not book a virtual store appointment from the comfort of your own home.</p>
                    <a href="${link}" class="${ID}-button">Book an appointment</a>
                </div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
        let storeName;
         if(getSiteFromHostname() === 'ernestjones') {
            storeName = 'EJ094-closed';
        } else {
            storeName = 'HS094-closed';
        }

        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            localStorage.setItem(`${storeName}`, 1);
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        });
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
            localStorage.setItem(`${storeName}`, 1);
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        });

        const button = component.querySelector(`.${ID}-button`);
        button.addEventListener('click', () => {
            localStorage.setItem(`${storeName}`, 1);
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
            events.send(`${ID} v:${VARIATION}`, 'click', `book appointment`);
        });
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);

      setTimeout(() => {
        component.classList.add(`${ID}-modalShow`);
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
        events.send(`${ID} v:${VARIATION}`, 'seen', `pop up shown`);
      }, 5000);
       
    }
  }
