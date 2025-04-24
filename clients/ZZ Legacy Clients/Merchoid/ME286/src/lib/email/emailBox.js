import {
  getCookie
} from "../../../../../../lib/utils";
import shared from "../shared";

const {
  ID,
  VARIATION
} = shared;

export default class EmailPopup {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    let voucherAmount;
    let spendAmount;
    let code;

    if (window.location.href.indexOf('/uk') > -1) {
      if(VARIATION === 'control') {
        voucherAmount = '£5 off';
        spendAmount = '£50';
      } else if(VARIATION === '2') {
        voucherAmount = '£5 off';
        spendAmount = '£45';
        code = 'LAPZQ';
      }
    } else {
      if(VARIATION === 'control') {
        voucherAmount = '$5 off';
        spendAmount = '$50';
      } else if(VARIATION === '2') {
        voucherAmount = '$5 off';
        spendAmount = '$45';
        code = 'LAPZQ';
      }
    }

    let content;

    if (VARIATION === 'control') {
      content = `
        <div class="${ID}-blockHeading">
        <h3>Don’t forget to use your voucher</h3>
        </div>
        <div class="${ID}-voucherBlock">
            <p>Enter your unique code at checkout for <span>${voucherAmount}</span> when you spend ${spendAmount}</p>
            <div class="${ID}-voucher">
                <input type="text" readonly value="MNTLA"/>
                <div class="${ID}-copyButton"></div>
            </div>
        </div>`;
    } else if (VARIATION === '1') {
      content = `
        <div class="${ID}-blockHeading">
        <h3></h3>
        </div>
        <div class="${ID}-voucherBlock">
            <p></p>
            <div class="${ID}-voucher">
                <input type="text" readonly value=""/>
                <div class="${ID}-copyButton"></div>
            </div>
        </div>`
    } else if (VARIATION === '2') {
      content = `
      <div class="${ID}-blockHeading">
      <h3>Get <span>${voucherAmount}</span> when you spend <span>${spendAmount}</span></h3>
      </div>
      <div class="${ID}-voucherBlock">
          <p>Enter your unique code at checkout for <span>${voucherAmount}</span> when you spend <span>${spendAmount}</span></p>
          <div class="${ID}-voucher">
              <input type="text" readonly value="${code}"/>
              <div class="${ID}-copyButton"></div>
          </div>
      </div>`;
    } 


    const element = document.createElement('div');
    element.classList.add(`${ID}-emailModal`);

    let emailTitle;
    if(VARIATION === '1') {
      emailTitle = `Sign up now to get your <span>mystery discount</span>`;
    } else {
      emailTitle = `Sign up now for an <span>exclusive discount</span>`;
    }

    element.innerHTML = `
        <div class="${ID}-modalInner">
            <div class="${ID}-logoBox">
               <div class="${ID}-logo"></div>
                <div class="${ID}-close"></div>
            </div>
            <div class="${ID}-content">
                <h3>${emailTitle}</h3>
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
                ${content}
                <div class="${ID}-button ${ID}-continueShopping" href="/">Continue Shopping</div>
            </div>
        </div>
        <div class="${ID}-rightSide"></div>
      `;
    this.component = element;
  }

  bindEvents() {
    const {
      component
    } = this;

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

      // hide mail icon until the first box is closed
      if(VARIATION !== 'control') {
        let mailIcon;
        if (window.innerWidth < 1024) {
          mailIcon = document.querySelector(`.header-right-links__cart-links .${ID}-mail`);
        }

        if (window.innerWidth >= 1024) {
          mailIcon = document.querySelector(`.${ID}_icon.${ID}_mail`);
        }

        if (!getCookie(`${ID}-emailSignUp`)) {
          mailIcon.style.display = 'none';
          if (localStorage.getItem(`${ID}-emailShow`)) {
            mailIcon.style.display = 'flex';
          }
        }
      }
    }

    component.querySelector(`.${ID}-close`).addEventListener('click', () => {
      closedBox();
    });
    component.querySelector(`.${ID}-continueShopping`).addEventListener('click', () => {
      closedBox();
    });
    if (document.querySelector(`.${ID}-overlay`)) {
      document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
        closedBox();
      });
    }
  }

  render() {
    const {
      component
    } = this;

    document.body.appendChild(component);


    const openBox = () => {
      component.classList.add(`${ID}-modalShow`);
      document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
      document.body.classList.add(`${ID}-noScroll`);
    }

    // open box by default if it hasn't been seen before

    if (!getCookie(`${ID}-emailSignUp`)) {
      if (!localStorage.getItem(`${ID}-emailShow`)) {
        openBox();
      }
    }

    if (VARIATION !== 'control') {
      let mailIcon;
      if (window.innerWidth < 1024) {
        mailIcon = document.querySelector(`.header-right-links__cart-links .${ID}-mail`);
      }

      if (window.innerWidth >= 1024) {
        mailIcon = document.querySelector(`.${ID}_icon.${ID}_mail`);
      }

      mailIcon.addEventListener('click', () => {
        openBox();
      });
    }

  }
}
