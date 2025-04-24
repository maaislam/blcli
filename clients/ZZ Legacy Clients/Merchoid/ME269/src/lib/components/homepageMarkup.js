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
      if(window.innerWidth > 767) {
        element.innerHTML = 
      `<div class="${ID}-container">
          <div class="${ID}-categories ${ID}-slider ${ID}-mainBanners">
              <div class="${ID}-sliderInner">
                <div class="${ID}-category ${ID}-brands" cat-target="brands"> 
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Brands</h3>
                  </div>
                </div>

                <div class="${ID}-category ${ID}-clearance">
                  <a href="/clearance/"></a>
                  <div class="${ID}-catTitle">
                        <span>Shop</span>
                        <h3>Clearance</h3>
                  </div>
                </div>

                <div class="${ID}-category ${ID}-vday">
                  <a href="/gifts/"></a>
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Valentines Day</h3>
                  </div>
                </div>

                <div class="${ID}-category ${ID}-categories" cat-target="categories">
                    <div class="${ID}-catTitle">
                        <span>Shop</span>
                        <h3>Categories</h3>
                    </div>
                </div>
              </div>
          </div>
          <div class="${ID}-products ${ID}-shadowBox"></div>
      </div>`;
      } else {
      element.innerHTML = 
      `<div class="${ID}-container">
        <div class="${ID}-categories ${ID}-slider ${ID}-mainBanners">
          <div class="${ID}-sliderInner">

              <div class="${ID}-category ${ID}-brands" cat-target="brands"> 
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Brands</h3>
                  </div>
              </div>

              <div class="${ID}-category ${ID}-vday">
                  <a href="/gifts/"></a>
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Valentines Day</h3>
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

              <div class="${ID}-category ${ID}-categories" cat-target="categories">
                  <div class="${ID}-catTitle">
                      <span>Shop</span>
                      <h3>Categories</h3>
                  </div>
              </div>
          </div>
          <div class="${ID}-products ${ID}-shadowBox"></div>
      </div>`;
      }
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;      
    }
  
    render() {
      const { component } = this;
      document.querySelector('.review-fans').insertAdjacentElement('afterend', component);
    }
  }