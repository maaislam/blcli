const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};

const product = (data) => {
  const { actionURL, currentPrice, model, ppuVolume, pricePerUnit, regularPrice, referenceImageURL, offerName, variants } = data;
  const savings = regularPrice > currentPrice && (regularPrice - currentPrice).toFixed(2);
  const html = `
                  <div class="product--details-section">  
                      <div class="product--details-section-image">
                          <a href="${actionURL}">
                              <img src="${referenceImageURL}"/>
                          </a>
                          <span class="product--offer-tag">Offer</span>
                      </div>  
                      <div class="product--details-section-content"> 
                          <a href="${actionURL}">       
                              <h2>${offerName}</h2>  
                          </a>  
                          <p>${ppuVolume ? ppuVolume : ''}${pricePerUnit ? ` | ${pricePerUnit}` : ''}</p>  
                          <div class="priceWrapper">
                              <span class="sellPrice">${formatPrice(currentPrice)}</span>
                              ${savings ? `<span class="save">${formatPrice(savings)}</span>` : ''} 
                              
                          </div>  
                          ${
                            variants && variants.length > 1
                              ? `<a href="${actionURL}" class="new-cta"><button class="view-more">VIEW</button></a>`
                              : `<button class="add-button new-cta" data-sku="${model}">ADD</button>`
                          }
                           
                      </div>  
                      
                  </div> `;

  return html.trim();
};

export default product;
