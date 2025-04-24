import shared from "../../../../../../core-files/shared";

/**
 * Search box
 */
const { ID, VARIATION } = shared

 export default class Search {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}-search`);
    element.innerHTML = `
      <div class="${ID}-searchContainer">
        <div class="${ID}-closeSearch"></div>
        <div class="${ID}-searchBox">
          ${VARIATION === '3' ? `
          <div class="${ID}-trending">
            <h2>Trending</h2>
              <div class="${ID}-trendBlocks">
                <div class="${ID}-trendBlock">
                  <a href="/brand/stranger-things/"></a>
                  <div class="${ID}-trendText">
                    <span>Shop</span>
                    <h3>Stranger Things</h3>
                  </div>
                  <div class="${ID}-trendImage" style="background-image: url(https://editor-assets.abtasty.com/49254/62de6c53bc3bb1658743891.png)"></div>
                </div>
                <div class="${ID}-trendBlock">
                  <a href="/brand/warhammer-40000/"></a>
                  <div class="${ID}-trendText">
                    <span>Shop</span>
                    <h3>Warhammer 40,000</h3>
                  </div>
                  <div class="${ID}-trendImage" style="background-image: url(https://editor-assets.abtasty.com/49254/62de6e294a1361658744361.png)"></div>
                </div>
                <div class="${ID}-trendBlock">
                  <a href="/brand/resident-evil/"></a>
                  <div class="${ID}-trendText">
                    <span>Shop</span>
                    <h3>Resident Evil</h3>
                  </div>
                  <div class="${ID}-trendImage" style="background-image: url(https://editor-assets.abtasty.com/49254/62de6f51412fd1658744657.png)"></div>
                </div>
                <div class="${ID}-trendBlock">
                  <a href="/t-shirts-and-tops/"></a>
                  <div class="${ID}-trendText">
                    <span>Shop</span>
                    <h3>T-Shirts</h3>
                  </div>
                  <div class="${ID}-trendImage" style="background-image: url(https://editor-assets.abtasty.com/49254/62de70dec3c261658745054.png)"></div>
                </div>
              </div>
          </div>`:''}
        </div>
      </div>
    `;
    this.component = element;

    const mobileSearch = document.querySelector('.page-footer .form.minisearch');
    mobileSearch.querySelector('input').setAttribute('placeholder', 'Search all things geek...');
    const navSearch = element.querySelector(`.${ID}-searchBox`);
    navSearch.insertAdjacentElement('afterbegin', mobileSearch);
  }

  bindEvents() {
    const { component } = this;

    // nav toggle
    const searchToggle = document.querySelector(`.${ID}-icon.search`);
    searchToggle.addEventListener('click', () => {
      if(component.classList.contains(`${ID}_searchActive`)) {
        document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-active`);
        component.classList.remove(`${ID}_searchActive`);
      } else {
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-active`);
        component.classList.add(`${ID}_searchActive`);  
      }
      
    });

    // hide search
    const searchClose = component.querySelector(`.${ID}-closeSearch`);
    searchClose.addEventListener('click', () => {
      document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-active`);
      component.classList.remove(`${ID}_searchActive`);
    });

    const overlay = document.querySelector(`.${ID}-overlay`);
    overlay.addEventListener('click', () => {
      document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-active`);
      component.classList.remove(`${ID}_searchActive`);
    });

    const navToggle = document.querySelector('.action.nav-toggle');
    navToggle.addEventListener('click', () => {
      setTimeout(() => {
        if(document.documentElement.classList.contains('nav-open')) {
          overlay.classList.remove(`${ID}-active`);
          component.classList.remove(`${ID}_searchActive`);
        }
      }, 100);
    });
    
  }

  render() {
    const { component } = this;
    if(VARIATION === '1' || VARIATION === '3') {
      document.querySelector(`.${ID}-header`).appendChild(component);
    }

    if(VARIATION === '2') {
      if(window.innerWidth < 1200) {
        document.querySelector('.section-item-content.nav-sections-item-content').insertAdjacentElement('afterbegin', component);
      } else {
        console.log('moved')
        document.querySelector(`.${ID}-header`).appendChild(component);
      }
    }
    
  }
}
