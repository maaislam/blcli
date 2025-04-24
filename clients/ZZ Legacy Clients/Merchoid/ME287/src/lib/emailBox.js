import shared from "./shared";

const {
  ID, VARIATION
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

    if (window.location.href.indexOf('/uk') > -1) {
      voucherAmount = '£5 off';
      spendAmount = '£50';
      
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
           
            <div class="${ID}-intro">
              <div class="${ID}-title">
                <h3>Welcome to <span>Merchoid!</span></h3>
                <p>Before you get started are you:</p>
              </div>
               <div class="${ID}-options">
                <div class="${ID}-option" data-el="gift">Buying a gift</div>
                <div class="${ID}-option" data-el="self">Buying for Yourself</div>
               </div>
            </div>
            <div class="${ID}-content">
                <p class="${ID}-subtext ${ID}-gift">Sign up to our newsletter to get an exclusive discount code and hear all about our <span>latest gifts</span></h3>
                <p class="${ID}-subtext ${ID}-self">Sign up to our newsletter to get an exclusive discount code and be the first to hear about our <span>new releases!</span></h3>
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
                ${VARIATION === '2' ? `<p>Enter your unique code at checkout for <span>${voucherAmount}</span> when you spend ${spendAmount}</p>` : ''}
                </div>
                <div class="${ID}-voucherBlock">
                ${VARIATION === '1' ? `<p>Enter your unique code at checkout for <span>${voucherAmount}</span> when you spend ${spendAmount}</p>` : ''}
                    <div class="${ID}-voucher">
                        <input type="text" readonly value="MNTLA"/>
                        <div class="${ID}-copyButton"></div>
                    </div>
                </div>
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
      if(document.querySelector(`.${ID}-overlay`)) {
        document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
      }
      document.body.classList.remove(`${ID}-noScroll`);
      localStorage.setItem(`${ID}-87emailShow`, 1);
    }


    const showForm = () => {
      const intro = component.querySelector(`.${ID}-intro`);
      const formContent = component.querySelector(`.${ID}-content`);
      intro.classList.add(`${ID}-introHide`);
      formContent.classList.add(`${ID}-formShow`);

    }

    // show message on click
    const giftBox = component.querySelector(`.${ID}-option[data-el="gift"]`);
    const giftText = component.querySelector(`.${ID}-subtext.${ID}-gift`);
    const selfText = component.querySelector(`.${ID}-subtext.${ID}-self`)
    const selfBox = component.querySelector(`.${ID}-option[data-el="self"]`);

    giftBox.addEventListener('click', () => {
      giftText.classList.add(`${ID}-subtextShow`);
      selfText.classList.remove(`${ID}-subtextShow`);
      showForm();
    });

    selfBox.addEventListener('click', () => {
      selfText.classList.add(`${ID}-subtextShow`);
      giftText.classList.remove(`${ID}-subtextShow`);
      showForm();
    });

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

    if(VARIATION === '1') {
      document.body.appendChild(component);
    } else if(VARIATION === '2') {
      document.querySelector('.review-fans').insertAdjacentElement('beforebegin', component);
    }


    const openBox = () => {
      component.classList.add(`${ID}-modalShow`);
      if(document.querySelector(`.${ID}-overlay`)) {
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
      }
      document.body.classList.add(`${ID}-noScroll`);
    }

    // open box by default if it hasn't been seen before

   openBox();


  }
}
