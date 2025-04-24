import shared from "./shared";

const { ID } = shared;

export default class BelowFoldMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      
      const element = document.createElement('div');
      element.classList.add(`${ID}-bottomContent`);
      element.innerHTML = `
      <div class="${ID}-section ${ID}-banners">
        <div class="${ID}-container">
            <div class="${ID}-heroCategories">
                <div class="${ID}-category">
                    <div class="${ID}-textContent">
                        <h3>Beauty & skincare</h3>
                        <p>We've got all the beauty products you need to keep you looking great from top to toe.</p>
                        <a class="${ID}__button ${ID}__primary" href="https://www.boots.com/beauty">Shop now</a>
                    </div>
                </div>
                <div class="${ID}-category">
                    <div class="${ID}-textContent">
                        <h3>Health & pharmacy</h3>
                        <p>We've got all the products and services you need to help you keep on form.</p>
                        <a class="${ID}__button ${ID}__primary" href="https://www.boots.com/health-pharmacy">Shop now</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="${ID}-section ${ID}-departments">
        <h2>Our departments</h2>
        <div class="${ID}-container">
            <div class="${ID}-blocks"></div>
        </div>
      </div>
      <div class="${ID}-section ${ID}-services">
        <h2>Our services</h2>
        <div class="${ID}-services">
            <div class="${ID}-container">
                <div class="${ID}-links"></div>
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
      if(document.querySelector(`.${ID}-belowFold`)) {
        document.querySelector(`.${ID}-belowFold`).appendChild(component);  
      }
    }
  }
