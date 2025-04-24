import shared from "../shared";

const { ID } = shared;

export default class BannerV1 {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
    const element = document.createElement('div');
      element.classList.add(`${ID}_header_banner`);
      element.innerHTML = `
      <div class="${ID}__headerContainer">
        <div class="${ID}__titleBlock">
            <h1 class="${ID}__h1">Repeat NHS prescriptions, delivered free</h1>
            <p>Order online for yourself or someone else</p>
            <div class="${ID}__button"></div>
        </div>
        <div class="${ID}__uspBox">
            <div class="${ID}__logo"></div>
            <div class="${ID}__usp-inner">
                <div class="${ID}__uspRow">
                    <div class="${ID}__usp ${ID}__collection">
                        <span></span>
                        <p class="${ID}__p">Free <br>collection</p>
                    </div>
                    <div class="${ID}__usp ${ID}__delivery">
                        <span></span>
                        <p class="${ID}__p">Free <br>delivery</p>
                    </div>
                </div>
                <div class="${ID}__uspRow">
                    <div class="${ID}__usp ${ID}__safe">
                        <span></span>
                        <p class="${ID}__p">Safe, discreet <br>& fast</p>
                    </div>
                    <div class="${ID}__usp ${ID}__reminder">
                        <span></span>
                        <p class="${ID}__p">Reminders to <br>reorder</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      `;
      this.component = element;

      const getStartedButton = document.querySelector('.getStarted__getStarted--2m57Y .common__primary--3SdgS');
      getStartedButton.textContent = 'Order now';
      element.querySelector(`.${ID}__button`).appendChild(getStartedButton);
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.index__landingPage--1YuZv`).insertAdjacentElement('afterbegin', component);
    }
  }
  
