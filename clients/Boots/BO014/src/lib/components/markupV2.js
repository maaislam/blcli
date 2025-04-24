import shared from "../shared";

const { ID } = shared;

export default class PageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
    const element = document.createElement('div');
      element.classList.add(`${ID}_pageContainer`);
      element.innerHTML = `
      <div class="${ID}_header_sticky">
        <div class="${ID}_header-container">
            <div class="${ID}_logo">
                <img src="https://service.maxymiser.net/cm/images-eu/1/1/1/D04B988AE3954B0F6383DCE97F6BC9E3F6764F898CF8DB3D97EA56D6B8FF0C3A/new-boots-com/BO014---Pharmacy-Homepage/logo.png"/>
            </div>
            <div class="${ID}_buttons">
                <div class="${ID}__button ${ID}-prescription">Order repeat prescription</div>
                <div class="${ID}__button ${ID}-login">Login</div>
            </div>
        </div>
      </div>
      <div class="${ID}__headerContainer">
            <div class="${ID}__inner">
                <div class="${ID}__logo"></div>
                <div class="${ID}__titleBlock">
                    <h1 class="${ID}__h1">NHS repeat prescriptions, delivered free</h1>
                    <p class="${ID}__p">Order online for yourself or someone else</p>
                </div>
            </div>
        </div>
        <div class="${ID}__uspBox">
            <div class="${ID}__usp-inner">
                <div class="${ID}__usp ${ID}__collection">
                    <span>Free</span>
                    <p class="${ID}__p">delivery or collection</p>
                </div>
                <div class="${ID}__usp ${ID}__delivery">
                    <span>Safe</span>
                    <p class="${ID}__p">fast & discreet</p>
                </div>
                    <div class="${ID}__usp ${ID}__safe">
                    <span>Reminders</span>
                    <p class="${ID}__p">so you never run out</p>
                </div>
            </div>
        </div>
      </div>
      <div class="${ID}_infoSection">
        <div class="${ID}-innerContainer">
            <h2>Ordering repeat prescriptions is simple</h2>
            <div class="${ID}__boxes_wrapper">
                <div class="${ID}__infoBox">
                    <h3>What you'll need to provide</h3>
                    <ul>
                        <li><b>Patient details</b>Including patient’s surgery, prescription items, allergy and health conditions</li>
                        <li><b>Shipping preference</b>Choose from free delivery or collection</li>
                    </ul>
                </div>
                <div class="${ID}__infoBox">
                    <h3>What we'll do</h3>
                    <ul>
                        <li><b>Contact your GP</b> We’ll get in touch with your GP to approve your request
                        <li><b>Prepare your items</b>We'll let you know when it's ready for collection or being delivered via Royal Mail
                    </ul>
                </div>
            </div>
        </div>
      `;
      this.component = element;

    
    }
  
    bindEvents() {
      const { component } = this;
      const getStartedButton = document.querySelector('.getStarted__getStarted--2m57Y .common__primary--3SdgS');
      const loginLink = document.querySelector('#sidebar-login-link');
    
      component.querySelector(`.${ID}__button.${ID}-prescription`).addEventListener('click', () => {
        getStartedButton.click();
      });
      component.querySelector(`.${ID}__button.${ID}-login`).addEventListener('click', () => {
        loginLink.click();
      });

      /**
       * Fixed header on scroll
       */
      
       // Get the header
       const header = component.querySelector(`.${ID}_header_sticky`);
       
       // Get the offset position of the navbar
       const sticky = header.offsetTop;
       
       // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function stickyOnScroll() {
            if (window.pageYOffset > sticky) {
                header.classList.add(`${ID}_fixed`);
            } else {
                header.classList.remove(`${ID}_fixed`);
            }
        }

        window.onscroll = function() {
            stickyOnScroll()
          };
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.styles-module__containerVisible--2dDav`).insertAdjacentElement('afterend', component);
    }
  }
  
