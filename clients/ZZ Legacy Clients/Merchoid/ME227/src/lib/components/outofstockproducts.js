import { nextByClass } from "./helpers";
import shared from "../shared";

export default () => {

    const { ID } = shared;

    let jumperText;
    let price;

    if(window.location.href.indexOf('/uk/') > -1) {
        jumperText = 'jumper';
        price = '£36.99';
    } else {
        jumperText = 'sweater';
        price = '$54.99';
    }

    const products = {
        'star-wars-christmas-sweaters': {
            name: 'Star Wars',
            productName: `${jumperText}`,
            image: '//cdn.optimizely.com/img/6087172626/4898cab5946f40899c23183e0d2757cd.jpg',
        },
        'marvel-christmas-sweaters': {
            name: 'Marvel',
            productName: `${jumperText}`,
            image: '//cdn.optimizely.com/img/6087172626/a1c2a5b120cc418b87bc0fc9a4a06afa.jpg',
        },
        'dc-comics-christmas-sweaters': {
            name: 'DC Comics',
            productName: `${jumperText}`,
            image: '//cdn.optimizely.com/img/6087172626/7baf4e54f1164209923136d58ae10389.jpg',
        },
        'harry-potter-christmas-sweaters': {
            name: 'Harry Potter',
            productName: `${jumperText}`,
            image: '//cdn.optimizely.com/img/6087172626/70c49cd455b3429986fe5b95bbe352c8.jpg',
        },
        'disney-christmas-sweaters': {
            name: 'Disney',
            productName: `${jumperText}`,
            image: '//cdn.optimizely.com/img/6087172626/007f66703fad4c46a31374fcf3aa6924.jpg',
        }
    }

    let allProductHeadings;
    let noOfProduct;

    if(window.location.href.indexOf('geeks-guide-to-ugly-christmas-sweaterjumpers/') > -1) {
        allProductHeadings = document.querySelectorAll('.guide-list-wrapper .products.wrapper.grid.products-grid');
        noOfProduct = 2;
    } else {
        allProductHeadings = document.querySelectorAll('#maincontent .column.main h1');
        noOfProduct = 4;
    }
    
    for (let index = 0; index < allProductHeadings.length; index+= 1) {
        const element = allProductHeadings[index];

        let category;

        if(window.location.href.indexOf('geeks-guide-to-ugly-christmas-sweaterjumpers/') > -1) {
            category = element.getAttribute('id');
        } else {
            category = element.textContent.trim();
        }

        Object.keys(products).forEach((i) => {
            const data = products[i];
            if(category === [i][0] || category.indexOf(data.name) > -1) {
                const outOfStock = document.createElement('li');
                outOfStock.classList.add(`${ID}-out_of_stock`);
                outOfStock.classList.add('product-item');
                outOfStock.innerHTML = `
                <div class="${ID}-outOfStock_inner">
                    <span></span>
                    <p class="${ID}-topLink">You missed out!</p>
                    <p>Unfortunately we’ve completely sold out of this ${data.productName}</p>
                    <p>Buy now to make sure you don’t miss out on our other ${jumperText}s</p>
                </div>
                <div class="${ID}-product_info product-item-info">
                    <a class="product-item-photo">
                        <span class="product-image-container" style="width:240px;">
                            <span class="product-image-wrapper" style="padding-bottom: 125%;">
                                <img class="product-image-photo" src="${data.image}" width="240" height="300">
                            </span>
                        </span>
                    </a>
                    <div class="product details product-item-details">
                        <strong class="product-item-name product name">
                            <a class="product-item-link">${data.productName}</a>
                        </strong>
                        <div class="price-box price-final_price">
                            <span class="normal-price">
                                <span class="price-container price-final_price">
                                    <span class="price">${price}</span>
                                </span>
                            </span>
                        </div>
                    </div>
                 </div>`;

                 if(window.location.href.indexOf('geeks-guide-to-ugly-christmas-sweaterjumpers/') > -1) {
                    const items = element.querySelectorAll('.item');
                    if(items.length > 1) {
                        const thirdProduct = items[noOfProduct];
                        thirdProduct.insertAdjacentElement('afterend', outOfStock);
                    }
                } else {
                    const productsInCategory = nextByClass(element, "block-products-list");
 
                    // if more than one, insert after the third
                    const numberOfProductsInCat = productsInCategory.querySelectorAll('.product-item')
                    if(numberOfProductsInCat.length > 1) {
                        const thirdProduct = productsInCategory.querySelectorAll('.product-item')[noOfProduct];
                        thirdProduct.insertAdjacentElement('afterend', outOfStock);
                    }
                }
            }
        });   
    }
}