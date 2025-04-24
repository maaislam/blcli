import shared from "../../../../../../core-files/shared"
import data from "../data";

export default () => {
  const { ID } = shared;


 const heroData =  data().heroProduct;


 const heroProduct = `
 <div class="${ID}-heroProduct product-card">
  <a href="${heroData.link}" class="product-card__link"></a>
  <div class="${ID}-badge"><span>Best seller</span></div>
  <div class="product-card__image-container">
    <img src="${heroData.image}" alt="${heroData.name}" class="product-card__image"/>
  </div>
  <a href="${heroData.link}" class="product-card__product-name">
    <div class="name">
      <p class="name__product">9ct White Gold 0.37ct Total Diamond Flower Cluster Ring</p>
    </div>
  </a>
  <a href="${heroData.link}" class="product-card__product-price">
    <div class="product-price">
      ${heroData.wasPrice ? `
      <span class="product-price__current product-price__current--on-sale">${heroData.nowPrice}</span>
      <span class="product-price__history">${heroData.wasPrice}</span>
      `
    : `<span class="product-price__current">${heroData.price}</span>`}
    </div>
  </a>
  ${heroData.financePrice ? `<span class="product-price__finance"> From ${heroData.financePrice} p/m  0 % APR*</span>` : ''}
 </div>`;

 document.querySelectorAll('.product-card')[1].insertAdjacentHTML('afterend', heroProduct);

}