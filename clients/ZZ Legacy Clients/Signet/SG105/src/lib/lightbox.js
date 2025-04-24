import { events } from "../../../../../lib/utils";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class OfferPopup {
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
            <div class="${ID}-titleBox">
                <span></span>
                <h3>Limited Offer</h3>
            </div>
            <div class="${ID}-close"></div>
            <div class="${ID}-innerContent">
                <p><span></span> On This Watch</p>
                <span class="${ID}-smallText">Ends Monday 30th November</span>
                    <div class="${ID}-codeBox">
                        <p>Use Code</p>
                        <div class="${ID}-voucher">
                        <input type="text" readonly value="TIME20"/>
                        <div class="${ID}-copyButton"><span></span><p>Copy</p></div>
                        <div class="${ID}-codeCopied">Code copied!</div>
                    </div>
                    <span class="${ID}-smallTextBottom">T&Cs Apply*</span>
                </div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
              
        const storeName = 'HS105-mainclosed';

        const closedBox = () => {
            // class to hide it
            component.classList.remove(`${ID}-modalShow`);
            component.remove();
            localStorage.setItem(`${storeName}`, 1);
            document.querySelector(`.${ID}-overlay`).remove();
            document.body.classList.remove(`${ID}-noScroll`);
            events.send(`${ID} varation: ${VARIATION}`, 'click', 'Closed offer box');
        }

        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            events.send(`${ID} variation: ${VARIATION}`, 'click', 'lightbox closed');
            closedBox();
        });
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
            events.send(`${ID} variation: ${VARIATION}`, 'click', 'lightbox closed');
            closedBox();
        });

       
        const copyTextButton = component.querySelector(`.${ID}-copyButton`);
        const textToCopy = component.querySelector(`.${ID}-voucher input`);
        copyTextButton.addEventListener('click', () => {

            events.send(`${ID} varation: ${VARIATION}`, 'click', 'Copy voucher code');

            document.querySelector(`.${ID}-codeCopied`).classList.add(`${ID}-codeCopyShow`);
            textToCopy.select();
            textToCopy.setSelectionRange(0, 99999);
            document.execCommand("copy");

            setTimeout(() => {
                document.querySelector(`.${ID}-codeCopied`).classList.remove(`${ID}-codeCopyShow`);
            }, 1500);
        });
    }
  
    render() {
        const { component } = this;
        document.body.appendChild(component);

        const showBox = () => {
        
            if(document.querySelector(`.${ID}-lightboxModal`)) {
                component.classList.add(`${ID}-modalShow`);
                document.body.classList.add(`${ID}-noScroll`);
                document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
                events.send(`${ID} varation: ${VARIATION}`, 'show', 'Offer box');
            }
        }

        if(!localStorage.getItem(`HS105-mainclosed`)) {
            if(window.innerWidth < 1280) {
                setTimeout(() => {
                    showBox();
                }, 15000);
            } else {
                if(document.querySelector(`.${ID}-lightboxModal`)) {
                    document.addEventListener("mouseout", (event) => {
                        if (!event.toElement && !event.relatedTarget) {
                            showBox();     
                        }
                    });
                }
                
            }
        }
    }
  }
