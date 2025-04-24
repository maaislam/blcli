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

        let content;
        let tandcLink;
        if(getSiteFromHostname() === 'ernestjones') {
            link = 'https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo';
            content = '15% Off';
            tandcLink = 'https://www.ernestjones.co.uk/terms/';
          } else {
            content = '15% off';
            link = 'https://customer.bookingbug.com/?client=h_samuel&service=49232&company=37398';
            tandcLink = 'https://www.hsamuel.co.uk/terms/';
        }
      const element = document.createElement('div');
      element.classList.add(`${ID}-lightboxModal`);

      

      element.innerHTML = `
        <div class="${ID}-modalInner">
            <div class="${ID}-icon"></div>
            <div class="${ID}-titleBox">
                <h3>${content}</h3>
                <div class="${ID}-close"></div>
            </div>
            <div class="${ID}-innerContent">
                <div class="${ID}-info">
                    <p>Book an appointment in store Monday - Wednesday and enjoy 15% off full price jewellery</p>
                    <a href="${link}" class="${ID}-button">Book an appointment</a>
                    <span class="${ID}-small"><a target="_blank" href="${tandcLink}">*See full terms and conditions</a></span>
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
            storeName = 'EJ094c-closed';
        } else {
            storeName = 'HS094c-closed';
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
