import shared from "../shared";
import { appStyleCategories } from "./brandsAndCategories";

const bestSelling = {
    'Door Premium A5 Notebook Preorder': {
        brand: 'Friends:',
        price: '£11.95',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/s/r/sr72939_2.jpg',
        link: 'https://www.merchoid.com/uk/friends-door-premium-a5-notebook/',
    },
    'Raining Blood Pennywise Liquid Reactive Umbrella': {
        brand: 'IT:',
        price: '£18.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/l/a/large_1.jpg',
        link: 'https://www.merchoid.com/uk/it-raining-blood-pennywise-liquid-reactive-umbrella/',
    },
    'Magical Exposure Threat Level Measurer Clock Preorder': {
        brand: 'Harry Potter',
        price: '£13.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/g/p/gp85453_2.jpg',
        link: 'https://www.merchoid.com/uk/harry-potter-clock/',
    },
    'Amazing Amazonian Premium Hoodie': {
        brand: 'Wonder Woman:',
        price: '£44.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/w/o/wonderwoman_hoodie_2020_50_new.jpg',
        link: 'https://www.merchoid.com/uk/wonder-woman-premium-hoodie/',
    }

}

const bestSellingDesktop = {
    'Door Premium A5 Notebook Preorder': {
        brand: 'Friends',
        price: '£11.95',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/s/r/sr72939_2.jpg',
        link: 'https://www.merchoid.com/uk/friends-door-premium-a5-notebook/',
    },
    'Raining Blood Pennywise Liquid Reactive Umbrella': {
        brand: 'IT',
        price: '£18.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/l/a/large_1.jpg',
        link: 'https://www.merchoid.com/uk/it-raining-blood-pennywise-liquid-reactive-umbrella/',
    },
    'Magical Exposure Threat Level Measurer Clock Preorder': {
        brand: 'Harry Potter',
        price: '£13.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/g/p/gp85453_2.jpg',
        link: 'https://www.merchoid.com/uk/harry-potter-clock/',
    },
    'Amazing Amazonian Premium Hoodie': {
        brand: 'Wonder Woman',
        price: '£44.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/w/o/wonderwoman_hoodie_2020_50_new.jpg',
        link: 'https://www.merchoid.com/uk/wonder-woman-premium-hoodie/',
    },
    '8-Bit Spender NES Wallet': {
        brand: 'Nintendo',
        price: '£21.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/2310f3bd0c5d0697820c42a2c432f728/8/b/8bit_spender_wallet_23.jpg',
        link: 'https://www.merchoid.com/uk/nintendo-8-bit-spender-nes-wallet/',
    },
    'Gryffindor Wizarding Ladies Bathrobe': {
        brand: 'Harry Potter',
        price: '£34.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/2310f3bd0c5d0697820c42a2c432f728/h/p/hppirobe01.jpg',
        link: 'https://www.merchoid.com/uk/harry-potter-gryffindor-wizarding-ladies-bathrobe/',
    },
    'Loading Times Watch': {
        brand: 'PlayStation',
        price: '£22.99',
        wasPrice: '£24.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/2310f3bd0c5d0697820c42a2c432f728/p/l/playstation_one_watch_17.jpeg',
        link: 'https://www.merchoid.com/uk/birds-of-prey-harley-quinn-logo-embroidery-cap/',
    },
    '8 inch Cable Guy Phone and Controller Holder': {
        brand: 'Batman',
        price: '£28.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/2310f3bd0c5d0697820c42a2c432f728/6/1/61a4mfvwjvl._ac_sl1417_.jpg',
        link: 'https://www.merchoid.com/uk/batman-8-inch-cable-guy-phone-and-controller-holder/',
    },

}

export default () => {

    const { ID } = shared;

    const createGiftingWrapper = () => {
        const giftingEl = document.createElement('div');
        giftingEl.classList.add(`${ID}-contentWrapper`);
        giftingEl.classList.add(`${ID}-giftContent`);
        giftingEl.setAttribute(`name`, 'gifting');
        giftingEl.innerHTML = 
        `<div class="${ID}-contentInner">
            <div class="${ID}-title"><div class="${ID}-back"><span>Back</span></div>Gifting</div>
            <div class="${ID}-categories ${ID}-slider">
                <div class="${ID}-sliderInner">
                    <div class="${ID}-category ${ID}-forher">
                        <a href="/gifts/"></a>
                        <div class="${ID}-catTitle">
                            <div class="${ID}-giftImage" style="background-image:url('//cdn.optimizely.com/img/6087172626/752bd63e8ac14d68872f47842001e1cf.png')"></div>
                            <div class="${ID}-blockText">
                                <h3>Gifts for her</h3>
                                <a href="/gifts/" class="${ID}-button">Shop</a>
                            </div>
                         </div>
                         <div class="${ID}-catTitle ${ID}-desktop">
                            <span>Shop</span>
                            <h3>Gifts for her</h3>
                        </div>
                    </div>

                    <div class="${ID}-category ${ID}-forhim">
                        <a href="/gifts/"></a>
                        <div class="${ID}-catTitle">
                            <div class="${ID}-giftImage" style="background-image:url('//cdn.optimizely.com/img/6087172626/2501a9ed13414380b64463764dfa69d9.png')"></div>
                            
                            <div class="${ID}-blockText">
                                <h3>Gifts for him</h3>
                                <a href="/gifts/" class="${ID}-button">Shop</a>
                            </div>
                        </div>
                        <div class="${ID}-catTitle ${ID}-desktop">
                            <span>Shop</span>
                            <h3>Gifts for him</h3>
                        </div>
                    </div>

                    <div class="${ID}-category ${ID}-home">
                        <a href="/gifts/"></a>
                        <div class="${ID}-catTitle">
                            <div class="${ID}-giftImage" style="background-image:url('//cdn.optimizely.com/img/6087172626/ad1f7bd9f4bd4385a4026d59f1a9d3ca.png')"></div>
                            <div class="${ID}-blockText">
                                <h3>Home and office gifts</h3>
                                <a href="/gifts/" class="${ID}-button">Shop</a>
                            </div>
                        </div>
                        <div class="${ID}-catTitle ${ID}-desktop">
                            <span>Shop</span>
                            <h3>Home and office</h3>
                        </div>
                    </div>

                    <div class="${ID}-category ${ID}-toys">
                        <a href="/gifts/"></a>
                        <div class="${ID}-catTitle">
                            <div class="${ID}-giftImage" style="background-image:url('//cdn.optimizely.com/img/6087172626/30fbbd73d5dc4c9f88685ee194e9089d.png')"></div>
                            <div class="${ID}-blockText">
                                <h3>Toys, Figures & plushies</h3>
                                <a href="/gifts/" class="${ID}-button">Shop</a>
                            </div>
                        </div>
                        <div class="${ID}-catTitle ${ID}-desktop">
                            <span>Shop</span>
                            <h3>Toys, Figures & plushies</h3>
                        </div>
                     </div>
                    </div>
                </div>
            </div>
            <div class="${ID}-section ${ID}-bestSellers">
                <div class="${ID}-container">
                    <h3>Best Selling gifts</h3>
                    <div class="${ID}-products products wrapper grid products-grid">
                        <div class="${ID}-productsContent products list"></div>
                    </div>
                    <a href="https://www.merchoid.com/uk/gifts/" class="${ID}-button">View all gifts</a>
                </div>
            </div>
            <div class="${ID}-section ${ID}-brands">
                <div class="${ID}-container">
                    <h3>Shop Gifts By Brand</h3>
                    <div class="${ID}-carousel ${ID}-innerBlocks"></div>
                </div>
            </div>
        </div>`;

        document.body.appendChild(giftingEl);
    }

    
   

    const addBestSellers = () => {
        let bestSellerProducts;
        
        if(window.innerWidth >= 767) {
            bestSellerProducts = bestSellingDesktop;
        } else {
            bestSellerProducts = bestSelling;
        }

        Object.keys(bestSellerProducts).forEach((i) => {
            const data = bestSellerProducts[i];
      
            const productBlock = document.createElement('li');
            productBlock.className = `item product product-item ${ID}-product`;
            productBlock.innerHTML = `

            <div class="product-item-info">
                   <a href="${data.link}" class="product product-item-photo">
                        <span class="product-image-container" style="width:300px;">
                            <span class="product-image-wrapper" style="padding-bottom: 125%;">
                                <img class="product-image-photo" src="${data.image}" width="300" height="375">
                            </span>
                        </span>
                    </a>
                    <div class="product details product-item-details">
                        <strong class="product name product-item-name">
                            <a class="product-item-link" href="${data.link}">
                                <span class="${ID}-cat-name">${data.brand}</span>
                                ${[i][0]}
                            </a>
                        </strong>
                         <div class="price-box price-final_price">
                            <span class="normal-price">
                                <span class="price-container price-final_price">
                                    <span class="price-wrapper">
                                        <span class="price">${data.price}</span>
                                        ${data.wasPrice ? `<span class="${ID}-wasPrice">${data.wasPrice}</span>` : ``}
                                    </span>
                                </span>
                            </span>
                        </div> 
                    </div>
                </div>`;

                document.querySelector(`.${ID}-giftContent .${ID}-bestSellers .${ID}-productsContent`).appendChild(productBlock);
        });
    }

    const createBrandCarousel = () => {
        const topBrands = appStyleCategories.brands.blocks;

        Object.keys(topBrands).forEach((i) => {
            const data = topBrands[i];
            const giftBrand = document.createElement('div');
            giftBrand.classList.add(`${ID}-block`);
          
            giftBrand.innerHTML = 
            `<a href="${data.link}"><div class="${ID}-icon" style="background-image:url(${data.icon})"></div><p>${[i][0]}</p></a>`;

            document.querySelector(`.${ID}-giftContent .${ID}-section.${ID}-brands .${ID}-carousel`).appendChild(giftBrand);
        });
      
    }

    // slick brands
    const slickBrands = () => {
        jQuery(`.${ID}-giftContent .${ID}-carousel.${ID}-innerBlocks`).slick({
            dots: false,
            mobileFirst: true,
            slidesToShow: 2,
            arrows: true,
            responsive: [{

              breakpoint: 400,
              settings: {
                slidesToShow: 2,
              }
        
            }, {
        
              breakpoint: 599,
              settings: {
                slidesToShow: 4,
              }
        
            }, {
        
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
              }
        
            }],
          });      
      }
    createGiftingWrapper();
    addBestSellers();
    createBrandCarousel();
    slickBrands();

}