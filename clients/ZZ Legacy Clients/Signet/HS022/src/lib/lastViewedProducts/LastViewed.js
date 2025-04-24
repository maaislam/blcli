import settings from '../settings';

const { ID } = settings;

export default class AllLastProducts {
  constructor() {
    const productDataStr = window.localStorage.HS022recommended_prods_1;
    if (productDataStr) {
      this.productData = JSON.parse(productDataStr);
      if (this.productData.length) {
        this.createAndRender();
      }
    }
  }

  createAndRender() {
    const lastViewedproducts = document.createElement('div');
    lastViewedproducts.classList.add(`${ID}-lastViewed_Desktop`);
    lastViewedproducts.innerHTML = `
    <div class="${ID}-LastViewedMobileTab"><span>Pick up where you left off</span></div>
    <div class="${ID}_LastViewedProducts-list_wrapper">
      <h3>Pick up where you left off</h3>
      <ul class="${ID}_LastViewedProducts-list">
        ${this.productData.map(data => `
          <li class="${ID}_LastViewedProducts-item">
            <a href="${data.link}">
              <div class="${ID}_LastViewedProducts-img" style="background-image:url(${data.image})"></div>
              <p class="${ID}_LastViewedProducts-name">${data.name}</p>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>`;
    if (window.innerWidth > 767) {
      document.querySelector('.hero-banner').insertAdjacentElement('beforebegin', lastViewedproducts);
    } else {
      document.body.appendChild(lastViewedproducts);

      // on click of last viewed mobile tab
      lastViewedproducts.querySelector(`.${ID}-LastViewedMobileTab`).addEventListener('click', () => {
        if (lastViewedproducts.classList.contains(`${ID}-LastViewedMobileTab_active`)) {
          lastViewedproducts.classList.remove(`${ID}-LastViewedMobileTab_active`);
        } else {
          lastViewedproducts.classList.add(`${ID}-LastViewedMobileTab_active`);
        }
      });
    }
  }
}
