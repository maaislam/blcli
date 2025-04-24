import shared from "../shared";
import { appStyleCategories } from "./brandsAndCategories";

let jumperText;
    if(window.location.href.indexOf('/uk/') > -1) {
        jumperText = 'Jumper';
    } else {
        jumperText = 'Sweater';
    }

const newIn = {
    'prod1': {
        name: `Chaos Reigns Khorne Christmas ${jumperText}`,
        brand: 'Warhammer 40,000',
        price: '£36.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/c/h/chaos_new.jpg',
        link: '/warhammer-40-000-chaos-reigns-khorne-christmas-sweater/',
    },
    'prod2': {
        name: `Imperial Tidings Christmas ${jumperText}`,
        brand: 'Warhammer 40,000',
        price: '£36.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/i/m/imperium_new.jpg',
        link: '/warhammer-40-000-imperial-tidings-christmas-sweater/',
    },
    'prod3': {
        name: `Dobby Interactive Figure Preorder`,
        brand: 'Harry Potter',
        price: '£30.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/d/o/dobbyinteractiveplush_nn7205_a_w.jpg',
        link: 'https://www.merchoid.com/uk/harry-potter-dobby-interactive-figure/',
    },
    'prod4': {
        name: `Operation: The Mandalorian Baby Yoda Edition Preorder`,
        brand: 'Star Wars ',
        price: '£35.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/x/_/x_hasf1256102.jpg',
        link: '/operation-star-wars-the-mandalorian-baby-yoda-edition/',
    }

}

const newInDesktop = {
    'prod1': {
        name: `Chaos Reigns Khorne Christmas ${jumperText}`,
        brand: 'Warhammer 40,000',
        price: '£36.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/c/h/chaos_new.jpg',
        link: '/warhammer-40-000-chaos-reigns-khorne-christmas-sweater/',
    },
    'prod2': {
        name: `Imperial Tidings Christmas ${jumperText}`,
        brand: 'Warhammer 40,000',
        price: '£36.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/i/m/imperium_new.jpg',
        link: '/warhammer-40-000-imperial-tidings-christmas-sweater/',
    },
    'prod3': {
        name: `Dobby Interactive Figure Preorder`,
        brand: 'Harry Potter',
        price: '£30.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/d/o/dobbyinteractiveplush_nn7205_a_w.jpg',
        link: 'https://www.merchoid.com/uk/harry-potter-dobby-interactive-figure/',
    },
    'prod4': {
        name: `Operation: The Mandalorian Baby Yoda Edition Preorder`,
        brand: 'Star Wars ',
        price: '£35.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/x/_/x_hasf1256102.jpg',
        link: '/operation-star-wars-the-mandalorian-baby-yoda-edition/',
    },
    'prod5': {
        name: `Let It Snow Knitted Christmas ${jumperText}`,
        brand: 'Frozen',
        price: '£36.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/f/r/frozen_cad_new.jpg',
        link: '/frozen-let-it-snow-knitted-christmas-sweater-jumper/',
    },
    'prod6': {
        name: `Limited Edition Playing Cards Collector's Set`,
        brand: 'Harry Potter',
        price: '£82.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/x/_/x_camu20038.jpg',
        link: '/harry-potter-limited-edition-playing-cards-collector-s-set/',
    },
    'prod7': {
        name: `Hidden Blade Tankard Preorder`,
        brand: "Assassin's Creed",
        price: '£42.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/b/5/b5347s0.jpg',
        link: '/assassin-s-creed-hidden-blade-tankard/',
    },
    'prod8': {
        name: `Baby Yoda Christmas ${jumperText}`,
        brand: 'Star Wars',
        price: '£36.99',
        image: 'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/catalog/product/cache/a80b1a432246cc8bcb1c3c49ba610179/y/o/yoda_jumper.jpg',
        link: '/star-wars-baby-yoda-christmas-sweater-jumper/',
    },

}

export default () => {

    const { ID } = shared;

    const createChristmasWrapper = () => {
        const christmasEl = document.createElement('div');
        christmasEl.classList.add(`${ID}-contentWrapper`);
        christmasEl.setAttribute(`name`, 'christmas');
        christmasEl.innerHTML = 
        `<div class="${ID}-contentInner ${ID}-christmasContent">
            <div class="${ID}-title"><div class="${ID}-back"><span>Back</span></div>Christmas</div>
            <div class="${ID}-categories ${ID}-slider">
                <div class="${ID}-sliderInner">
                    <div class="${ID}-category ${ID}-jumpers">
                        <a href="/geeks-guide-to-ugly-christmas-sweaterjumpers/"></a>
                        <div class="${ID}-catTitle">
                            <div class="${ID}-giftImage" style="background-image:url('//cdn.optimizely.com/img/6087172626/8bdbe20e696b40f69b418c6c0df6f420.png')"></div>
                            <div class="${ID}-blockText">
                                <h3>Christmas ${jumperText}s</h3>
                                <a href="/geeks-guide-to-ugly-christmas-sweaterjumpers/" class="${ID}-button">Shop</a>
                            </div>
                         </div>
                         <div class="${ID}-catTitle ${ID}-desktop">
                            <span>Shop</span>
                            <h3>Christmas ${jumperText}s</h3>
                        </div>
                    </div>

                    <div class="${ID}-category ${ID}-advent">
                        <a href="/home-and-office/christmas-decorations/"></a>
                        <div class="${ID}-catTitle">
                            <div class="${ID}-giftImage" style="background-image:url('//cdn.optimizely.com/img/6087172626/c8671452d4fb40efa0f48782ce99b7fc.png')"></div>
                            
                            <div class="${ID}-blockText">
                                <h3>Advent Calanders</h3>
                                <a href="/home-and-office/christmas-decorations/" class="${ID}-button">Shop</a>
                            </div>
                        </div>
                        <div class="${ID}-catTitle ${ID}-desktop">
                            <span>Shop</span>
                            <h3>Advent Calanders</h3>
                        </div>
                    </div>

                    <div class="${ID}-category ${ID}-christmasgifts">
                        <a href="/gifts/"></a>
                        <div class="${ID}-catTitle">
                            <div class="${ID}-giftImage" style="background-image:url('//cdn.optimizely.com/img/6087172626/120ad7f026734de685fe396396686a83.png')"></div>
                            <div class="${ID}-blockText">
                                <h3>Christmas Gifts</h3>
                                <a href="/gifts/" class="${ID}-button">Shop</a>
                            </div>
                        </div>
                        <div class="${ID}-catTitle ${ID}-desktop">
                            <span>Shop</span>
                            <h3>Christmas Gifts</h3>
                        </div>
                    </div>

                </div>
            </div>
            <div class="${ID}-section ${ID}-bestSellers">
                <div class="${ID}-container">
                    <h3>New in christmas</h3>
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

        document.body.appendChild(christmasEl);
    }


    const addBestSellers = () => {
        let newInProducts;
        
        if(window.innerWidth >= 767) {
            newInProducts = newInDesktop;
        } else {
            newInProducts = newIn;
        }

        Object.keys(newInProducts).forEach((i) => {
            const data = newInProducts[i];
      
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
                                ${data.name}
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

                document.querySelector(`.${ID}-christmasContent .${ID}-bestSellers .${ID}-productsContent`).appendChild(productBlock);
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

            document.querySelector(`.${ID}-christmasContent .${ID}-section.${ID}-brands .${ID}-carousel`).appendChild(giftBrand);
        });
      
    }

    // slick brands
    const slickBrands = () => {
        jQuery(`.${ID}-christmasContent .${ID}-carousel.${ID}-innerBlocks`).slick({
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
    createChristmasWrapper();
    addBestSellers();
    createBrandCarousel();
    slickBrands();

}