import shared from "./shared";

const { ID } = shared;

export default class CarouselMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

       
        const element = document.createElement('div');
        element.classList.add(`${ID}-carouselTabs`);
        element.innerHTML = `
            <div class="${ID}-sectionContainer">
                <div class="${ID}-innerCarouselWrap">
                    <div class="${ID}-tabContainer">
                        <div class="${ID}-tab ${ID}-tabActive" data-target="bestsellers"><span>Best sellers</span></div>
                        <div class="${ID}-tab" data-target="new"><span>New in</span></div>
                        <div class="${ID}-tab" data-target="seasonal"><span>Seasonal favourites</span></div>
                        <div class="${ID}-sliderBar"></div>
                    </div>
                    <div class="${ID}-tabCarousel ${ID}-bestSelling ${ID}-tabContentActive" tab-data="bestsellers">
                        <div class="${ID}-innerCarousel">
                            <div class="${ID}-productsWrap"></div>
                        </div>
                    </div>
                    <div class="${ID}-tabCarousel ${ID}-new" tab-data="new">
                        <div class="${ID}-innerCarousel">
                            <div class="${ID}-productsWrap"></div>
                        </div>
                    </div>
                    <div class="${ID}-tabCarousel ${ID}-seasonal" tab-data="seasonal">
                        <div class="${ID}-innerCarousel">
                            <div class="${ID}-productsWrap"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        this.component = element;

    }
  
    bindEvents() {
      const { component } = this;

       /* Tab logic */
        const allTabs = component.querySelectorAll(`.${ID}-tab`);
        const makeActive = (e) => {
            // remove if deselected
              if(!e.currentTarget.classList.contains(`${ID}-tabActive`)) {
                for (let index = 0; index < allTabs.length; index += 1) {
                  const element = allTabs[index];
                  element.classList.remove(`${ID}-tabActive`);
                }
                
                // remove active from current tab
                e.currentTarget.classList.add(`${ID}-tabActive`);
                
              }

              const tabTarget = e.currentTarget.getAttribute('data-target');
              if(component.querySelector(`.${ID}-tabContentActive`)) {
                component.querySelector(`.${ID}-tabCarousel.${ID}-tabContentActive`).classList.remove(`${ID}-tabContentActive`);
            }
            component.querySelector(`.${ID}-tabCarousel[tab-data="${tabTarget}"]`).classList.add(`${ID}-tabContentActive`);
            jQuery(`.${ID}-tabCarousel .${ID}-productsWrap`).slick("refresh");
          }
          
          for (let x = 0; x < allTabs.length; x += 1) {
            const el = allTabs[x];
            el.addEventListener('click', makeActive);
          }
    }
  
    render() {
      const { component } = this;
      document.querySelector(`.heroCarousel`).insertAdjacentElement('afterend', component);
      
    }
  }