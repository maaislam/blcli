import shared from "./shared";

const { ID } = shared;

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
     } else {
        voucherAmount = '$5 off';
        spendAmount = '$50';
     }

      const element = document.createElement('div');
      element.classList.add(`${ID}-emailModal`);

      element.innerHTML = `
        <div class="${ID}-modalInner">
            <div class="${ID}-titleBox">
                <h3>Feeling Lucky?</h3>
                <div class="${ID}-close"></div>
            </div>
            <div class="${ID}-step ${ID}-emailStep ${ID}-stepShow">
                <div class="${ID}-introText">
                    <div class="${ID}-boxIcon"></div>
                    <p>Sign up for a chance to win a mystery discount that can used on your next order</p>
                    <div class="${ID}-emailForm">
                        <p class="${ID}-error">Please enter a valid email</p>
                        <form class="${ID}-form" name="emailSignUp">
                            <input name="email" type="email" placeholder="Email" required>
                            <button class="${ID}-button" data-target="${ID}-gameStep" type="button">Play Now</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="${ID}-step ${ID}-gameStep">
                <div class="${ID}-successText">
                    <p>Thanks! You're all signed up.<p>
                    <p>Now choose a box to win an exclusive discount</p>
                </div>
                <div class="${ID}-gameBoxes">
                    <div class="${ID}-boxIcon" data-target="${ID}-finalStep"></div>
                    <div class="${ID}-boxIcon" data-target="${ID}-finalStep"></div>
                    <div class="${ID}-boxIcon" data-target="${ID}-finalStep"></div>
                </div>
            </div>
            <div class="${ID}-step ${ID}-finalStep">
                <div class="${ID}-blockHeading">
                    <div class="${ID}-trophy"></div>
                    <h3>${voucherAmount}</h3>
                    <p>when you spend ${spendAmount}</p>
                </div>
                <div class="${ID}-voucherBlock">
                    <p>Enter your unique code at checkout</p>
                    <div class="${ID}-voucher">
                        <input type="text" readonly value="MNTLA"/>
                        <div class="${ID}-copyButton"></div>
                    </div>

                </div>
                <div class="${ID}-button ${ID}-continueShopping" href="/">Continue Shopping</div>
            </div>
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

        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            localStorage.setItem(`ME258-closed`, 1);
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        });
        component.querySelector(`.${ID}-continueShopping`).addEventListener('click', () => {
            localStorage.setItem(`ME258-closed`, 1);
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        });
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);

      if(shared.VARIATION === '1') {
        document.querySelector(`.${ID}-gameTrigger`).addEventListener('click', (e) => {
            component.classList.add(`${ID}-modalShow`);
            e.currentTarget.classList.add(`${ID}-hidden`);
            document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
            document.body.classList.add(`${ID}-noScroll`);
        });
    } else {
            // to open
            document.querySelector(`.${ID}-gameTrigger .${ID}-message span`).addEventListener('click', (e) => {
                component.classList.add(`${ID}-modalShow`);
                e.currentTarget.classList.add(`${ID}-hidden`);
                document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
                document.body.classList.add(`${ID}-noScroll`);
            });
            // to close it
            document.querySelector(`.${ID}-gameTrigger .${ID}-message`).addEventListener('click', (e) => {
                localStorage.setItem(`ME258-closed`, 1);
                document.querySelector(`.${ID}-gameTrigger`).style.display = 'none';
                document.body.classList.remove(`${ID}-noScroll`);
            });
        }
    }
  }
