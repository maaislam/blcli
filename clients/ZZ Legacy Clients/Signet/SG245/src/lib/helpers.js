import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const checkMiniBasketProducts = (allSkus) => {
  let matched = false;

  if(document.querySelectorAll('.mini-cart-item').length > 0) {
    const allProducts = document.querySelectorAll('.mini-cart-item');
    
    for (let index = 0; index < allProducts.length; index++) {
      const element = allProducts[index];
      const elSku = element.querySelector('input[name="productCode"]').value;

      if(allSkus.indexOf(elSku) > -1) {
        matched = true;
        break;
      }
    }

    return matched;
  }
}

export const checkMainBasketProducts = (allSkus) => {
  let matched = false;

  if(document.querySelectorAll('.cart-list').length > 0) {
    const allProducts = document.querySelectorAll('.cart-list .product-item');
    
    for (let index = 0; index < allProducts.length; index++) {
      const element = allProducts[index];
      const elSku = element.querySelector('input[name="productCode"]').value;

      if(allSkus.indexOf(elSku) > -1) {
        matched = true;
        break;
      }
    }

    return matched;
  }
}

export const addProduct = (content, type) => {
  // Add product with cta form
  const product = `
  <div class="${ID}-bonus-product ${ID}-${type} row">
    <div class="col-sm-12 col-xs-12">
      <h4>We think you might like...</h4>
      <div class="col-sm-3 col-xs-4 product-image">
        <a href="${content.url}">
          <img src="${content.image}" alt="${content.name}">
        </a>
      </div>
      <div class="col-xs-9 product-details">
        <div class="product-title">
          <h5 class="title-header">
            <a class="title-link" href="${content.url} title="Bremont Solo-34 Ladies' Stainless Steel Bracelet Watch">${content.name}</a>
          </h5>
        </div>
        <div class="product-price">
					<h5 class="${content.wasPrice ? 'on-sale' : ''} price">${content.currentPrice}</h5>
          ${content.wasPrice ? `<h5 class="was-price">${content.wasPrice}</h5>` : ''}			
			  </div>
        <div class="prd-sku">
          <span class="body-four">Product Number: ${content.sku}</span>
        </div>
        <div class="add-cta">Add to Basket</div>
      </div>
      
    </div>
  </div>`;

  return product;
}


export const addRequest = (sku, prodToken) => {
 
    return new Promise((resolve, reject) => {
      window.jQuery.ajax({
        url: "https://uat8.ernestjones.co.uk/cart/add",
        type: "post",
        data: `qty=1&productCodePost=${sku}&plan_pcode=&plandesc=&planprice=&CSRFToken=${prodToken}`,
        success: function () {
          resolve();
        },
      });
    });

}