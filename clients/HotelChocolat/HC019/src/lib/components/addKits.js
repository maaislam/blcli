import shared from "../shared";

/**
 * flake slider is now kit slider
 */

const kitObj = {
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

export const addKitSlider = () => {
    // add flake products
    Object.keys(kitObj).forEach((i) => {
        const kitProduct = kitObj[i];
        const kitItem = document.createElement('div');
        kitItem.classList.add(`${ID}-product`);
        kitItem.setAttribute('prod-id', kitProduct.id);
        kitItem.setAttribute('prod-name', `${[i][0]}`);
        kitItem.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${kitProduct.image})"></div>
        <p class="starterTitle">${kitProduct.name}</p><p>${[i][0]}${kitProduct.wasPrice ? `<div class="${ID}-priceBlock"><span class="${ID}-wasPrice">${kitProduct.wasPrice}</span> <span class="${ID}-price">${kitProduct.price}</span></div>` : `<span class="${ID}-price">${kitProduct.price}</span>`}`;

        document.querySelector(`.${ID}-flakesSlider .${ID}-carousel`).appendChild(kitItem);
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