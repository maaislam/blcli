import shared from "./shared";

const { ID, VARIATION } = shared;

let kitObj;



if(VARIATION == 'control') {
    kitObj = {
      '2 x Everything': {
        name: 'The Starter Pack',
        id: '503950',
        wasPrice: '£28.00',
        price: '£20.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe5b81028/images/503950.jpg?sw=500&sh=500&sm=fit',
      },
      '2 x Everything + Milky Pouch + Classic Pouch': {
        name: 'Everything Pack',
        id: '504167',
        wasPrice: '£44.00',
        price: '£30.00',
        image: 'https://editor-assets.abtasty.com/48343/6143700731d781631809543.jpg',
      },
      '2 x Everything + Milky Pouch + Classic Pouch + 500ml Chocolate Cream Liqueur': {
        name: 'Luxury Pack',
        id: '504168',
        wasPrice: '£66.00',
        price: '£50.00',
        image: 'https://editor-assets.abtasty.com/48343/61437021465fe1631809569.jpg',
      },
  }
}

if(VARIATION == '1') {
    kitObj = {
      '2 x Everything': {
        name: 'The Starter Pack',
        id: '503950',
        wasPrice: '£28.00',
        price: '£20.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe5b81028/images/503950.jpg?sw=500&sh=500&sm=fit',
    },
    '2 x Everything + Milky Tub + Classic Tub': {
        name: 'Family Pack',
        id: '503951',
        wasPrice: '£46.00',
        price: '£30.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw50822a6c/images/503951.jpg?sw=500&sh=500&sm=fit',
    },
      'Hot Chocolate with Biscuits & Batons Starter Pack': {
        name: 'Family Pack',
        id: '504133',
        wasPrice: '£68.00',
        price: '£50.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwdf93880a/images/504133.jpg?sw=500&sh=500&sm=fit',
    },
    '2 x Everything + Milky Tub + Classic Tub + 500ML Chocolate Cream Liqueur': {
        name: 'Luxury Pack',
        id: '503952',
        wasPrice: '£68.00',
        price: '£50.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb1ebbe82/images/503952.jpg?sw=500&sh=500&sm=fit',
    },
  }
}
if(VARIATION === '2') {
  kitObj = {
    '2 x Everything': {
      name: 'The Starter Pack',
      id: '503950',
      wasPrice: '£28.00',
      price: '£20.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe5b81028/images/503950.jpg?sw=500&sh=500&sm=fit',
  },
  '2 x Everything + Milky Tub + Classic Tub': {
      name: 'Family Pack',
      id: '503951',
      wasPrice: '£46.00',
      price: '£30.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw50822a6c/images/503951.jpg?sw=500&sh=500&sm=fit',
  },
  'Hot Chocolate with Biscuits & Best Selling Batons': {
      name: 'Family Pack',
      id: '504134',
      wasPrice: '£68.00',
      price: '£50.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw77b8c6d3/images/504134.jpg?sw=500&sh=500&sm=fit',
  },
  '2 x Everything + Milky Tub + Classic Tub + 500ML Chocolate Cream Liqueur': {
      name: 'Luxury Pack',
      id: '503952',
      wasPrice: '£68.00',
      price: '£50.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb1ebbe82/images/503952.jpg?sw=500&sh=500&sm=fit',
  },
}

}





export const addKitsSlider = () => {
    // add accessories
    Object.keys(kitObj).forEach((i) => {
        const accProduct = kitObj[i];
        const accItem = document.createElement('div');
        accItem.classList.add(`${ID}-product`);
        accItem.setAttribute('prod-id', accProduct.id);
        accItem.setAttribute('prod-name', `${[i][0]}`);
        accItem.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${accProduct.image})"></div>
        <p>${[i][0]}${accProduct.wasPrice ? `<div class="${ID}-priceBlock"><span class="${ID}-wasPrice">${accProduct.wasPrice}</span> <span class="${ID}-price">${accProduct.price}</span></div>` : `<span class="${ID}-price">${accProduct.price}</span>`}`;

        document.querySelector(`.${ID}-kitSlider .${ID}-carousel`).appendChild(accItem);
    });

     // toggle accessories
     const kits = document.querySelector(`.${ID}-kitSlider`);
     if(kits.querySelector(`.${ID}-accTitle`)) {
      kits.querySelector(`.${ID}-accTitle`).addEventListener('click', () => {
          if(kits.querySelector(`.${ID}-accInner`).classList.contains(`${ID}-active`)) {
            kits.querySelector(`.${ID}-accInner`).classList.remove(`${ID}-active`);
          } else {
            kits.querySelector(`.${ID}-accInner`).classList.add(`${ID}-active`);
          }
      });
    }

    //slick the products
    const slickProducts = () => {
        window.jQuery(`.${ID}-kitSlider .${ID}-carousel`).slick({
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

    if(VARIATION === '1' || VARIATION === '2'){
      slickProducts();
    }
  }   

