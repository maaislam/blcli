import shared from "./shared";

/**
 * NB: flake slider is now kit slider
 */

const flakesObj = {
    '10-flavour Everything Selection x 2': {
        name: 'Taste The Range',
        id: '503950',
        wasPrice: '£28.00',
        price: '£20.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe5b81028/images/503950.jpg?sw=500&sh=500&sm=fit',
    },
    '10-flavour Everything Selection x 2 / Classic & Milky Tubs': {
        name: 'Family Pack',
        id: '503951',
        wasPrice: '£46.00',
        price: '£30.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw50822a6c/images/503951.jpg?sw=500&sh=500&sm=fit',
    },
    '10-flavour Everything Selection x 2 / Classic & Milky Tubs / Velvetised Cream Liqueur': {
        name: 'Luxury Pack',
        id: '503952',
        wasPrice: '£71.00',
        price: '£53.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb1ebbe82/images/503952.jpg?sw=500&sh=500&sm=fit',
    },
    
}

const { ID } = shared;

export const addFlakesSlider = () => {
    // add flake products
    Object.keys(flakesObj).forEach((i) => {
        const flakeProduct = flakesObj[i];
        const flakeItem = document.createElement('div');
        flakeItem.classList.add(`${ID}-product`);
        flakeItem.setAttribute('prod-id', flakeProduct.id);
        flakeItem.setAttribute('prod-name', `${[i][0]}`);
        flakeItem.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${flakeProduct.image})"></div>
        <p class="starterTitle">${flakeProduct.name}</p><p>${[i][0]}${flakeProduct.wasPrice ? `<div class="${ID}-priceBlock"><span class="${ID}-wasPrice">${flakeProduct.wasPrice}</span> <span class="${ID}-price">${flakeProduct.price}</span></div>` : `<span class="${ID}-price">${flakeProduct.price}</span>`}`;

        document.querySelector(`.${ID}-flakesSlider .${ID}-carousel`).appendChild(flakeItem);
    });

    //slick the products
    const slickProducts = () => {
        window.jQuery(`.${ID}-flakesSlider .${ID}-carousel`).slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: true,
            infinite: false,
            mobileFirst: true, 
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 1008,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                  }
                },
                {
                      breakpoint: 400,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                      }
                  },
                  {
                      breakpoint: 374,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                      }
                  },
                  {
                      breakpoint: 300,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                      }
                  },
  
                ]
        });
    }
    slickProducts();
  }