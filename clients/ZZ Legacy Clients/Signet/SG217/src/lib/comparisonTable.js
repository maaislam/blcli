import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { comparisons } from "./data";

const { ID } = shared;

export default class CompareProducts {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }
  create() {

    const pageType = window.digitalData.page.pageInfo.pageType;
    
    const element = document.createElement('div');
    element.classList.add(`${ID}-comparison-table`);
    element.innerHTML = `
      <div class="${ID}-container">
        <div class="${ID}-title">
          <h3>${pageType === 'PDP' ? `Find the ring that's right for you` : `Our top picks`}</h3>
          <div class="${ID}-compareBtn">Compare products</div>
        </div>
        <div class="${ID}-products">
          <div class="${ID}-current"></div>
          <div class="${ID}-similarProducts"></div>
        </div>
      </div>
    `;

    this.component = element;

    // Add existing product - if PDP
    if(pageType === 'PDP') {

      document.documentElement.classList.add(`${ID}-pdp`);

      const currentSKU = window.digitalData.product[0].productInfo.masterSku;
      
      const currentProd = comparisons[currentSKU];
      const currentProdEl = document.createElement('div');
      currentProdEl.className =`${ID}-currentProduct ${ID}-product`;
      currentProdEl.innerHTML = `
      <a href="${currentProd.link}" class="${ID}-productLink"></a>
      <div class="${ID}-label">Current Product</div>
      <div class="${ID}-image" style="background-image: url(${currentProd.image})"></div>
      <div class="${ID}-info">
        <h4>${currentProd.name}</h4>
        <div class="${ID}-pricing">
          <div class="${ID}-price">${currentProd.nowPrice}</div>
          <div class="${ID}-wasprice">${currentProd.wasPrice}</div>
        </div>
        <div class="${ID}-specs ${pageType === 'PDP' ? 'specs-show' : ''}">
        ${currentProd.specs.map(
          (item) =>
          `<span>${item}</span>`
          ).join('')}
        </div>
      </div>`;

      element.querySelector(`.${ID}-current`).appendChild(currentProdEl);
    } else {
      document.documentElement.classList.add(`${ID}-plp`);
    }
      
    // add similar products
    Object.keys(comparisons).forEach((i) => {
      const data = comparisons[i];
      // if PDP
      if(pageType === 'PDP') {
        const currentSKU = window.digitalData.product[0].productInfo.masterSku;
        if([i][0] === currentSKU){
          return;
        }
      }

      const similarProdEl = document.createElement('div');
      similarProdEl.className =`${ID}-similarProduct ${ID}-product`;
      similarProdEl.innerHTML = `
      <a href="${data.link}" class="${ID}-productLink"></a>
      <div class="${ID}-image" style="background-image: url(${data.image})"></div>
      <div class="${ID}-info">
        <h4>${data.name}</h4>
        <div class="${ID}-pricing">
          <div class="${ID}-price">${data.nowPrice}</div>
          <div class="${ID}-wasprice">${data.wasPrice}</div>
        </div>
        <div class="${ID}-specs ${pageType === 'PDP' ? 'specs-show' : ''}">
        ${data.specs.map(
          (item) =>
          `<span>${item}</span>`
          ).join('')}
        </div>
      </div>`;

      element.querySelector(`.${ID}-similarProducts`).appendChild(similarProdEl);
    });
  }
  bindEvents() {
    const { component } = this;

    const allProducts = component.querySelectorAll(`.${ID}-product`);
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      element.querySelector('a').addEventListener('click', () => {
        fireEvent('Clicked comparison product');
      });
    }

    const compareBtn = component.querySelector(`.${ID}-compareBtn`);
    compareBtn.addEventListener('click', () => {
      if(component.querySelector(`.${ID}-similarProducts`).classList.contains('specs-show')) {
        compareBtn.textContent = 'Compare products';
        component.querySelector(`.${ID}-similarProducts`).classList.remove('specs-show');
      } else {
        fireEvent('Clicked compare products PLP');
        compareBtn.textContent = 'Hide comparison';
        component.querySelector(`.${ID}-similarProducts`).classList.add('specs-show');
      }
    });
  }
  render() {
    const { component } = this;

    const pageType = window.digitalData.page.pageInfo.pageType;

    if(pageType === 'PDP') {
      document.querySelector('.detail-page__upper-row').insertAdjacentElement('afterend', component);
    } else if(pageType === 'PLP') {
      document.querySelector('.top-section').insertAdjacentElement('beforebegin', component);
    }
  }
}