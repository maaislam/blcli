import shared from "../../../../../core-files/shared"

const { ID } = shared;

export const testType = (type) => {

    let content;
    let url;
    let title;
    let v2BannerTitle;
    let v2BannerText;
    let v3Text;
    let carouselbg;
    let name;

    if(type === 'stargift') {
        content = {
            name: 'star',
            url: 'https://www.boots.com/christmas/christmas-weekly-offers',
            carouselbg: 'https://assets.boots.com/content/dam/boots/seasonal-campaigns/christmas/2021/star-gift/2a-scroller/Christmas%20Snow%20Section%20Background%20copy.jpg',
            title: 'Our Latest Star Gifts',
            //bannerBG: '',
            v2BannerTitle: 'https://assets.boots.com/content/dam/boots/seasonal-campaigns/christmas/2021/star-gift/StarGift-LandscapeLockup-White.dam.ts%3D1629974885148.png',
            v2BannerText: 'Shop our latest Star Gifts!',
            v3Text: 'Since you were last on site, we’ve sold out of some of our Star Gifts. Shop our most popular in stock 3 for 2 gifts now.',
        }
    } else if(type === '3for2') {
        content = {
            name: 'threeTwo',
            url: 'https://www.boots.com/christmas/christmas-3-for-2',
            carouselbg: 'https://boots.scene7.com/is/image/Boots/big_red_texture_bg?scl=1&fmt=png-alpha',
            //bannerBG: '',
            title: 'Our Latest 3 for 2 Products',
            v2BannerTitle: 'https://assets.boots.com/content/dam/boots/seasonal-campaigns/christmas/2021/star-gift/StarGift-LandscapeLockup-White.dam.ts%3D1629974885148.png',
            v2BannerText: 'Shop our latest 3 for 2 Christmas Gifts!',
            v3Text: 'Since you were last on site, we’ve sold out of some of our 3 for 2 Gifts. Shop our most popular in stock 3 for 2 gifts now.',
        }
    }

    return content;
} 

const createProduct = (image,link, name, offer, wasPrice, nowPrice) => {
    const product = document.createElement('div');
    product.classList.add(`${ID}-carouselProduct`);
    product.classList.add(`oct-carousel-teaser-swiper-slide`);
    product.innerHTML = 
    `
        
    <div class="${ID}-inner">
        <div class="${ID}-image" style="background-image:url(${image})"><a class="${ID}-mainLink" href="${link}"></a></div>
        <div class="${ID}-info">
            <h3>${name}</h3>
            <div class="${ID}-offer">
                <p>${offer}</p>
            </div>
            <div class="${ID}-priceBlock">
                <p class="${ID}-nowPrice">${wasPrice ? 'NOW ' : ''}${nowPrice}</p>
                ${wasPrice ? `<p class="${ID}-wasPrice">${wasPrice}</p>` : ''}
            </div>
            <a href="${link}" class="${ID}-shopCTA ${ID}-${testType('3for2').name}">SHOP NOW</a>
        </div>
    </div>
   
    `;

    return product;
}

export const carouselProducts = (url) => {

    const allProductsContainer = document.querySelector(`.${ID}-products`);

    window.jQuery.ajax({
        url: url,
        type: 'post',
        data: {
        orderBy: 7
        },
        success: function(data) {
        const pageData = data;
        const products = jQuery(pageData).find('.product_listing_container .plp_gridView_redesign li');
        const prodArr = Array.from(products);
        const firstEight = prodArr.slice(0,8);
        
            for (let index = 0; index < firstEight.length; index += 1) {
                const element = firstEight[index];

                const elImage = element.querySelector('.product_img').getAttribute('src');;
                const elLink = element.querySelector('.product_img_link').getAttribute('href');
                const productPrice = element.querySelector('.product_price').textContent.trim();
                const elName = element.querySelector('.product_name_link').textContent.trim();

                const elOffer = element.querySelector('.product_offer') ? element.querySelector('.product_offer').textContent.trim() : '';
                const oldPrice = element.querySelector('.product_savePrice .was') ? element.querySelector('.product_savePrice .was').textContent.trim() : '';
            
                allProductsContainer.appendChild(createProduct(elImage, elLink, elName, elOffer, oldPrice, productPrice));
            }             
        
        }
    });
}
