import shared from "../../../../../core-files/shared";


const { ID,VARIATION } = shared;

export default class PageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
        const brandLogo = document.querySelector('.brand-logo-mobile');

        // get brand name
        const url = window.location.pathname
        const parts = url.split('/');
        let brandEl = '';

        if (parts.length > 1) {
          brandEl = parts[parts.length-2].replace(/-/g, ' ');
        }
    
      

      const element = document.createElement('div');
      element.classList.add(`${ID}-pageContent`);
      element.innerHTML = `
        <div class="${ID}-topRow">
            <div class="${ID}-brandTitle">
                <div class="${ID}-img ${ID}-merchLogo" style="background-image: url(https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/logo/default/logo.png)"></div>
                <div class="${ID}-img ${ID}-cross" style="background-image: url(https://editor-assets.abtasty.com/49254/60cca474ec4581624024180.png)"></div>
                <div class="${ID}-img ${ID}-brandLogo" style="background-image: url(${brandLogo.getAttribute('src')})"></div>
            </div>
            <div class="${ID}-officialText">Officially licensed <span>${brandEl }</span> merch</div>
            <div class="${ID}-categories">
                <div class="${ID}-container">
                </div>
            </div>
        </div>
        
        <div class="${ID}-productGrid">
            <div class="${ID}-container ${ID}-list">
                <div class="${ID}-categoryList ${ID}-clothingList" list-data="clothing">
                  <h3><span>Clothing</span></h3>
                  <div class="${ID}-list"></div>
                </div>
                <div class="${ID}-categoryList ${ID}-homeList" list-data="home">
                  <h3><span>Home & Office</span></h3>
                  <div class="${ID}-list"></div>
                </div>
                <div class="${ID}-categoryList ${ID}-toysList" list-data="toys">
                  <h3><span>Toys, Gadgets & Plushies</span></h3>
                  <div class="${ID}-list"></div>
                </div>
            </div>
        </div>
      `;
      
      this.component = element;

    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('#maincontent').insertAdjacentElement('beforebegin', component);

      const mobileLogo = document.querySelector('#brand-mobile-logo');
      if(mobileLogo) {
        component.querySelector(`.${ID}-brandTitle`).insertAdjacentElement('afterbegin', mobileLogo);
      }

      const officialText = document.querySelector('h1.main-title');
      if(officialText) {
        component.querySelector(`.${ID}-officialText`).insertAdjacentElement('afterbegin', officialText);
      }

      const productAmount = document.querySelector('.brand-byline-text');
      if(productAmount) {
         component.querySelector(`.${ID}-officialText`).insertAdjacentElement('beforeend', productAmount);
      }
    }
  }