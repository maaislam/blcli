import shared from "./shared";

const { ID } = shared;

export default class EmailPopup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-emailModal`);

      element.innerHTML = `
        <div class="${ID}-modalInner">
            <div class="${ID}-titleBox">
                <h3>Join Our Newsletter!</h3>
                <div class="${ID}-close"></div>
            </div>
            <div class="${ID}-innerContent">
                <div class="${ID}-signUpText ${ID}-stepShow">
                    <p>Join our newsletter to receive the latest merchandise, coupons, offers and secret sales directly to your e-mail inbox!</p>
                    <div class="${ID}-emailForm">
                        <p class="${ID}-error">Please enter a valid email</p>
                        <form class="${ID}-form" name="emailSignUp">
                            <input name="email" type="email" placeholder="Email" required>
                            <button class="${ID}-button" type="button">Sign up</button>
                        </form>
                    </div>
                </div>
                <div class="${ID}-successContent">
                    <p>Thanks! You're all signed up.</p>
                </div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;


        component.querySelector(`.${ID}-close`).addEventListener('click', () => {
            localStorage.setItem(`ME265-closed`, 1);
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        });
        document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
            localStorage.setItem(`ME265-closed`, 1);
            component.classList.remove(`${ID}-modalShow`);
            document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
            document.body.classList.remove(`${ID}-noScroll`);
        });
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);

      setTimeout(() => {
        component.classList.add(`${ID}-modalShow`);
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
      }, 10000);
    }
  }
