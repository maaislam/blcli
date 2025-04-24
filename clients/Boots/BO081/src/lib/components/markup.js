import shared from "../shared";

const { ID, VARIATION} = shared;

export default class HeroMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}_mainBanner`);
      if(VARIATION !== '4') {
        element.innerHTML = `
            <div class="${ID}_container">
            <div class="${ID}_bannerOuter">
                <div class="${ID}_leftCategory ${ID}_maincategory" ${VARIATION === '3' ? `data-target="beautyskincare"`: ''}>
                    <div class="${ID}_bannerContent">
                        <div class="${ID}_textBlock">
                            <h2>Beauty & Skincare</h2>
                            <p>${VARIATION === '1' ? `Our beauty haul will let you put your best face forward whilst looking & feeling great.` : "We've got all the beauty products you need to keep you looking great from top to toe."}</p>
                            ${VARIATION !== '3' ? `<a class="${ID}__button ${ID}__primary" href="https://www.boots.com/beauty">Shop all beauty & skincare</a>` : `<a class="${ID}__button ${ID}__primary ${ID}-beautyskincare">Explore beauty & skincare</a>`}
                        </div>
                    </div>
                    <div class="${ID}_categoryBar ${ID}_carousel" catName="beautyskincare">
                    ${VARIATION !== '3' ? `  
                    <h3>Shop beauty & skincare categories</h3>
                    <div class="${ID}_categoriesInner">
                        <div class="${ID}_categories"></div>
                        ${VARIATION === '2' ? `<div class="${ID}_brands"></div>` : ''}
                    </div>` : ''}
                    </div>
                </div>
                <div class="${ID}_rightCategory ${ID}_maincategory" ${VARIATION === '3' ? `data-target="healthpharmacy"`: ''}>
                    <div class="${ID}_bannerContent">
                        <div class="${ID}_textBlock">
                            <h2>Health & Pharmacy</h2>
                            <p>${VARIATION === '1' ? `We've stayed true to our origins as a pharmacy to help with all your health & wellbeing needs.` : "At Boots, we've got all the products and services you need to help you keep on form."}</p>
                            ${VARIATION !== '3' ? `<a class="${ID}__button ${ID}__primary" href="https://www.boots.com/health-pharmacy">Shop all health & pharmacy</a>` : `<a class="${ID}__button ${ID}-healthpharmacy ${ID}__primary">Explore health & pharmacy</a>`}
                        </div>
                    </div>
                    <div class="${ID}_categoryBar ${ID}_carousel" catName="healthpharmacy">
                        ${VARIATION !== '3' ? `  
                        <h3>Shop health & pharmacy categories</h3>
                    <div class="${ID}_categoriesInner">
                            <div class="${ID}_categories"></div>
                            ${VARIATION === '2' ? `<div class="${ID}_brands"></div>` : ''}
                        </div>` : ''}
                    </div>
                </div>
            </div>
            </div>
        
        `;
      } else {
        element.innerHTML = `
        <div class="${ID}_container">
            <div class="${ID}_bannerOuter">
                <div class="${ID}_leftCategory ${ID}_maincategory ${ID}-offers" cat-name="beautyskincare">
                
                </div>
                <div class="${ID}_rightCategory ${ID}_maincategory ${ID}-offers" cat-name="healthpharmacy">
                    
                </div>
            </div>
        </div>
    `;
      }
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