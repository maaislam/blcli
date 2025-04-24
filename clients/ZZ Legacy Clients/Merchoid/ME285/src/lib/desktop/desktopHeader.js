import shared from "../shared";

const { ID } = shared;

export default class DesktopHeader {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {  
      const element = document.createElement('div');
      element.classList.add(`${ID}_headerWrapper`);
      element.innerHTML = `
       <div class="${ID}_topbar">
        <div class="${ID}_container">
            <div class="${ID}_leftSide">
                <span>FREE shipping on all products* <a>More Info</a></span>
            </div>
            <div class="${ID}_rightSideTop">
                <div class="${ID}_icon ${ID}_wishlist">
                  <a href="/customer/account/">
                  <span></span>
                  <p class="${ID}-iconLabel">Wishlist</p>
                  </a>
                </div>
                <div class="${ID}_icon ${ID}_basket">
                </div>
            </div>
        </div>
       </div>
       <div class="${ID}_headerContent">
        <div class="${ID}_logo">
            <div class="${ID}_logoImage"><a href="/"></a></div>
            <span>Buy Awesome, Official Geek Merchandise</span>
        </div>
        <div class="${ID}_navigation"></div>
        <div class="${ID}_rightSide">
            <div class="${ID}_search"></div>
       </div>
      `;
      this.component = element;

      const search = document.querySelector('.form.minisearch');
      if(search) {
          element.querySelector(`.${ID}_search`).appendChild(search);
      }

      const miniBasket = document.querySelector('.minicart-container');
      if(miniBasket) {
          element.querySelector(`.${ID}_basket`).appendChild(miniBasket);

          element.querySelector(`.${ID}_basket`).insertAdjacentHTML('beforeend', `<p class="${ID}-iconLabel">Bag<p>`);
      }
    }
  
    bindEvents() {
      const { component } = this;

      const topBarDelivery = component.querySelector(`.${ID}_leftSide a`);
      topBarDelivery.addEventListener('click', () => {
        document.querySelector('.free-shipping-info .readmore').click();
      });

    }
  
    render() {
      const { component } = this;
      document.querySelector('.page-header').insertAdjacentElement('beforebegin', component);
    }
  }