import shared from "../shared";

const { ID } = shared;

export default class BannerMarkup{
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}_mainBanner`);
      element.innerHTML = `
        <div class="${ID}_container">
          <div class="${ID}_bannerOuter">
                <div class="${ID}_leftCategory ${ID}_maincategory">
                </div>
                <div class="${ID}_rightCategory ${ID}_categoryOffers">
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
      document.querySelector('.heroCarousel').insertAdjacentElement('beforebegin', component);
    }
  }