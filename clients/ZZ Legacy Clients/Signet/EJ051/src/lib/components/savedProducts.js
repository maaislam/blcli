import shared from '../shared';

const { ID } = shared;

export default class SavedProducts {
  constructor() {
    const productDataStr = window.localStorage.EJ051saved_1;
    if (productDataStr) {
      this.productData = JSON.parse(productDataStr);
      if (this.productData.length) {
        this.createAndRender();
        this.hideIfTooMany();
      }
    }
  }

  createAndRender() {
    const savedProducts = document.createElement('div');
    savedProducts.classList.add(`${ID}-savedProducts`);
    savedProducts.innerHTML = `
    <div class="${ID}_savedProducts_wrapper">
      <h3>Saved Products</h3>
      <div class="${ID}_savedProducts-list">
        ${this.productData.map(data => `
          <div class="${ID}_saved-item product-summary">
            <a href="${data.link}">
                <div class="product-summary__left">
                    <img class="${ID}_saved-image" src="${data.image}"/>
                </div>
                <div class="product-summary__center">
                  <p class="${ID}-product_name product-summary__description">${data.name}</p>
                  ${data.size !== ''? `<span class="product-summary__ring-size">${data.size}</span>` : ''}
                </div>
                <div class="${ID}-bottomContent">
                  <div class="product-summary__right">
		                  <strong>${data.price}</strong>
			                ${data.wasPrice !== ''? `<span class="product-summary__was-price">${data.wasPrice}</span>` : ''}
                      ${data.savePrice !== ''? `<span class="product-summary__save-price">${data.savePrice}</span>` : ''}
                   </div>
                  <span class="product-summary__sku">${data.productNum}</span>
                </div>
            </a>
            <div class="${ID}-savedremove">Remove</div>
          </div>
        `).join('')}
      </div>
    </div>`;

    if(document.querySelector('.product-summary')) {
      document.querySelector('.help-centre-list').insertAdjacentElement('beforebegin', savedProducts);
    } else {
      document.querySelector('.content-area').insertAdjacentElement('afterend', savedProducts);
    }
  }

  hideIfTooMany() {
    if(this.productData.length > 4) {
      const showMoreButton = document.createElement('div');
      showMoreButton.classList.add(`${ID}-showAllSaved`);
      showMoreButton.innerHTML = 'Show more saved products';

      document.querySelector(`.${ID}_savedProducts_wrapper`).appendChild(showMoreButton);

      const allSaved = document.querySelectorAll(`.${ID}_saved-item`);
      showMoreButton.addEventListener('click', () => {
        for (let index = 0; index < allSaved.length; index += 1) {
          const element = allSaved[index];
          element.classList.add(`${ID}-saved_active`);
          showMoreButton.style.display = 'none';
        }
      });
    }
  }
}
