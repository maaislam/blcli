import shared from "./shared";

const { ID,VARIATION } = shared;

export default class PageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-pageContent`);
      element.innerHTML = `
        <div class="${ID}-topRow">
            <div class="${ID}-brandTitle"></div>
            <div class="${ID}-officialText"></div>
        </div>
        <div class="${ID}-categories">
        <h3>Select a category to refine products</h3>
          <div class="${ID}-container">
          </div>
        </div>
        <div class="${ID}-productGrid">
            <div class="${ID}-container ${VARIATION === '2' ? `` : `${ID}-list`}">
            ${VARIATION === '2' ? 
            `
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
            ` : ''}
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
      component.querySelector(`.${ID}-brandTitle`).insertAdjacentElement('afterbegin', mobileLogo);

      const officialText = document.querySelector('h1.main-title');
      component.querySelector(`.${ID}-officialText`).insertAdjacentElement('afterbegin', officialText);

      const productAmount = document.querySelector('.brand-byline-text');
      component.querySelector(`.${ID}-officialText`).insertAdjacentElement('beforeend', productAmount);
    }
  }