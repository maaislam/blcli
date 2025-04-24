import shared from "../shared";

const { ID } = shared;

export default class HomepageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-homepageWrapper`);
      element.innerHTML = 
      `<div class="${ID}-container">
        <div class="${ID}-categories ${ID}-slider">
          <div class="${ID}-sliderInner">
              <div class="${ID}-category ${ID}-brands" cat-target="brands"> 
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Brands</h3>
                  </div>
              </div>
              <div class="${ID}-category ${ID}-gifting" cat-target="gifting">
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Gifting</h3>
                  </div>
              </div>
              <div class="${ID}-category ${ID}-categories" cat-target="categories">
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Categories</h3>
                  </div>
              </div>
              <div class="${ID}-category ${ID}-clearance">
                <a href="/clearance/"></a>
                <div class="${ID}-catTitle">
                        <span>Shop</span>
                        <h3>Clearance</h3>
                    </div>
                </div>
              </div>
          </div>
          <div class="${ID}-products ${ID}-shadowBox"></div>
      </div>`;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;      
    }
  
    render() {
      const { component } = this;
      document.querySelector('.review-fans').insertAdjacentElement('afterend', component);

      // rearrange tiles on desktop
      if(window.innerWidth >= 767) {
        document.querySelector(`.${ID}-category.${ID}-clearance`).insertAdjacentElement('afterend', document.querySelector(`.${ID}-category.${ID}-gifting`));
      }
    }
  }