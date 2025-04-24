import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import DealBuilder from "./markup";

const { ID, VARIATION } = shared;

export const is3For2 = () => {
  const promotions = document.querySelectorAll('.pdp-promotion-redesign-container .pdp-promotion-redesign');
  for (let index = 0; index < promotions.length; index += 1) {
    const element = promotions[index];
    if(element.innerText.includes('3 for 2')) {
      return true;
    }
  }
}

export const lastProductAdded = () => {

  return new Promise((resolve, reject) => {
    const cache = window.localStorage.dealProducts;

    let cachedProductData = cache ? JSON.parse(cache) : [];
    let newProduct = true;

    const productName = document.querySelector('#estore_product_title h1');
    const productImage = document.querySelector('[itemprop=image]');
    const productPrice = document.querySelector('#PDP_productPrice');
  
    // get data from product page
    if(productName && productImage && productPrice) {
        const data = {
            name: productName.innerText.trim(),
            image: productImage.src.replace('wid=100', 'wid=300').replace('hei=100', 'hei=300'),
            price: productPrice.innerText.trim(),
            link: window.location.href,
        }
    
        // for (let i = 0; i < cachedProductData.length; i += 1) {
        //     const cachedData = cachedProductData[i];
        //     if (data.name === cachedData.name) {
        //         // Product already exists, move it to the end of the array
        //         const productToMove = cachedProductData.splice(i, 1);
        //         cachedProductData = cachedProductData.concat(productToMove);
        //         newProduct = false;
        //         break;
        //     }
        // }
    
        // Push product data if new product
        if (newProduct) cachedProductData.push(data);
    
        // Keep cachedProductData limited to 10 products
        if (typeof cachedProductData.length === 'number') {
            while (cachedProductData.length > 3) cachedProductData.shift();
        }
    
        // Store product data in localStorage
        window.localStorage.dealProducts = JSON.stringify(cachedProductData);
        resolve(cachedProductData);
      }
  });
};

export const productMarkup = (data, productEl) => {
  const product = `
  <a href="${data.link}">
  <span class="addedMsg">ADDED</span>
  <div class="${ID}-image">
    <img src="${data.image}"">
  </div>
    <div class="${ID}-productDetails">
      <h4>${data.name}</h4>
      <p>${data.price}</p>
    </div>
  </div>`

  productEl.classList.remove('no-product');
  productEl.innerHTML = product;
}

const updateTitle = (products) => {

  let amountText;

  const amountAdded = products.length;
  const amountLeft = 3 - amountAdded;

  if(VARIATION === '1') {
    amountText = `You've already added <span class="added">${amountAdded}</span>, add another <span class="amountLeft">${amountLeft}</span> to complete the deal.`

  } else if(VARIATION === '2') {
    amountText = `Add <span class="amountLeft">${amountLeft}</span> more ${amountLeft == 1 ? `product` : `products`} to qualify.`
  }

  return document.querySelector(`.${ID}-amountAdded`).innerHTML = amountText;
}

export const openDealBuilder = () => {

  const storedProducts = JSON.parse(window.localStorage.dealProducts);

  if(document.querySelector(`.${ID}-dealBuilder`)) {
    document.querySelector(`.${ID}-dealBuilder`).remove(); 
  }

  document.documentElement.classList.add(`${ID}-noScroll`);
  document.querySelector(`.${ID}-overlay`).classList.add('show');

  new DealBuilder();
  updateTitle(storedProducts);


  if(storedProducts[0]) {
    productMarkup(storedProducts[0], document.querySelector(`.${ID}-product.first`));
  }

  if(storedProducts[1]) {
    productMarkup(storedProducts[1], document.querySelector(`.${ID}-product.second`));
  }

}

export const showBasketNotication = () => {
  const storedProducts = JSON.parse(window.localStorage.dealProducts);

  if(document.querySelector(`.${ID}-basketMSG`)) {
    document.querySelector(`.${ID}-basketMSG`).remove(); 
  }

  const basketMSG = `
  <div class="${ID}-basketMSG">
    <a class="fullLink" href="https://www.boots.com/no7-shop-all#facet:-1050494951535058513210211111432503211111032115101108101991161011003278111553265103101326810110212110511010332831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&"></a>
    <h3>Complete your No7 3 for 2 deal</h3>
    <p class="${ID}-amountAdded"></p>
    <a class="${ID}-textcta" href="https://www.boots.com/no7-shop-all#facet:-1050494951535058513210211111432503211111032115101108101991161011003278111553265103101326810110212110511010332831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&">Shop all 3 for 2</a>
  </div>`;

  document.querySelector('.oct-notification__ctas').insertAdjacentHTML('beforeBegin', basketMSG);
  updateTitle(storedProducts);

  document.querySelector('.oct-notification').style = "display: block;"
  
  setTimeout(() => {
    document.querySelector('.oct-notification').removeAttribute('style');
  }, 8000);

  document.querySelector(`.${ID}-basketMSG`).addEventListener('click', () => {
    fireEvent('Clicked basket notification 3 for 2');
  });



}




