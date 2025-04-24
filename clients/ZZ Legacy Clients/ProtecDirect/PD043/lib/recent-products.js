export default () => {
  /**
   * Recently viewed products
   * Poll for ;; '.prod.buynow > h3 > a', '.prod_image_main > a > img', '#variant-price-header', '.big-price .price_details',
   */
  let jsonArray;
  let alreadyInArray = false;

  if (localStorage.getItem('Recently-viewed-products')) {
    jsonArray = localStorage.getItem('Recently-viewed-products');
    jsonArray = JSON.parse(jsonArray);
  } else {
    jsonArray = [];
  }

  // Push product information to local storage

  const ProductBrand = document.querySelector('.prod.buynow > h3 > a').textContent;
  const ProductBrandLink = document.querySelector('.prod.buynow > h3 > a').getAttribute('href');
  const ProductName = document.querySelector('.prod.buynow > h3 > label').textContent;
  const ProductImageLink = document.querySelector('.prod_image_main > a > img').getAttribute('src');
  const ProductLink = window.location.pathname;
  const ExVATPrice = document.getElementById('variant-price-header').textContent + " " + document.querySelector('.big-price .price_details').textContent.trim();

  for (let i = 0; i < jsonArray.length; i += 1) {
    if (jsonArray[i].href === ProductLink) {
      alreadyInArray = true;
    }
  }
  if (alreadyInArray === false) {
    jsonArray.push({"title": ProductName, "name": ProductName, "img": ProductImageLink, "href": ProductLink, "ExVATPrice": ExVATPrice, "Brand": ProductBrand, "BrandLink": ProductBrandLink});

    if (jsonArray.length > 10) {
      jsonArray.shift();
    }

    jsonArray = JSON.stringify(jsonArray);
    localStorage.setItem('Recently-viewed-products', jsonArray);
  }
};
