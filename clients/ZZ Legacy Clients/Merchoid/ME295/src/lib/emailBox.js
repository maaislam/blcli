import { pollerLite } from "../../../../../lib/utils";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class EmailPopup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

     let voucherAmount;
     let spendAmount;

     if(window.location.href.indexOf('/uk/') > -1) {
         voucherAmount = '£5 off';
         spendAmount = '£50';
     } else if(window.location.href.indexOf('/eu/') > -1) {
        voucherAmount = '€5 off';
        spendAmount = '€50';
     } else {
        voucherAmount = '$5 off';
        spendAmount = '$50';
     }

      const element = document.createElement('div');
      element.classList.add(`${ID}-emailModal`);

      element.innerHTML = `
        <div class="${ID}-modalInner">
            <div class="${ID}-logoBox">
               <div class="${ID}-logo"></div>
                <div class="${ID}-close"></div>
            </div>
            <div class="${ID}-content">
                <h3>Sign up now for an <span>exclusive discount</span></h3>
                <p>Sign up to our newsletter for exclusive offers and discounts and recieve a unique voucher to use on your next order.</p>
                <div class="${ID}-emailForm">
                    <p class="${ID}-error">Please enter a valid email</p>
                    <form class="${ID}-form" name="emailSignUp">
                        <input name="email" type="email" placeholder="Email" required>
                        <button class="${ID}-button" data-target="${ID}-gameStep" type="button">Join the club</button>
                    </form>
                </div>
                <div class="${ID}-smallPrint">By signing up you agree to our <a target="_blank" href="/terms-and-conditions">Privacy Policy</a></div>
            </div>
            <div class="${ID}-success">
                <div class="${ID}-blockHeading">
                    <h3>Don’t forget to use your voucher</h3>
                </div>
                <div class="${ID}-voucherBlock">
                    <p>Enter your unique code at checkout for <span>${voucherAmount}</span> when you spend ${spendAmount}</p>
                    <div class="${ID}-voucher">
                        <input type="text" readonly value="MNTLA"/>
                        <div class="${ID}-copyButton"></div>
                    </div>

                </div>
                <div class="${ID}-button ${ID}-continueShopping" href="/">Continue Shopping</div>
            </div>
        </div>
        <div class="${ID}-rightSide">
        ${VARIATION === '1' ? `<h3 class="${ID}-boxHeading">Sign Up & Get A <span>Discount</span></h3>` : ''}
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      // copy voucher code
        const copyTextButton = component.querySelector(`.${ID}-copyButton`);
        const textToCopy = component.querySelector(`.${ID}-voucher input`);
        copyTextButton.addEventListener('click', () => {
            textToCopy.select();
            textToCopy.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");
        });

        const openBox = () => {
            component.classList.add(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
            document.body.classList.add(`${ID}-noScroll`);
          }

        const closedBox = () => {
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
            localStorage.setItem(`${ID}-emailShow`, 1);

            if(VARIATION === '2') {
                const tab = document.querySelector(`.${ID}-tabTrigger`);
                tab.classList.add(`${ID}-sideTabShow`);
            }
          }

        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
           closedBox();
        });
        component.querySelector(`.${ID}-continueShopping`).addEventListener('click', () => {
            closedBox();
        });
        if(document.querySelector(`.${ID}-overlay`)) {
            document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
                closedBox();
            });
        }
    }
  
    render() {
      const { component } = this;

      document.body.appendChild(component);
      

      const openBox = () => {
        component.classList.add(`${ID}-modalShow`);
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
        document.body.classList.add(`${ID}-noScroll`);
      }

      openBox();
      
    }
  }
