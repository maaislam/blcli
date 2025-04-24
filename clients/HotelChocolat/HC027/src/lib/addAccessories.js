import shared from "./shared";

const accessoriesObj = {
    /*'Duo of Pod Cups': {
        id: '472731',
        wasPrice: '£20.00',
        price: '£14.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf4fc6838/images/472731.jpg?sw=500&sh=500&sm=fit',
    },*/

    'Everything Selection': {
      id: '503879',
      wasPrice: '£14.00',
      price: '£10.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7295c8e6/images/503769.jpg?sw=500&sh=500&sm=fit',
  },

    // 'Dark with Mint': {
    //   id: '503780',
    //   price: '£13.00',
    //   image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw34db36c4/images/503723.jpg?sw=500&sh=500&sm=fit',
    // },
    // 'Ginger': {
    //     id: '503779',
    //     price: '£13.00',
    //     image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwa25e995c/images/503779.jpg?sw=500&sh=500&sm=fit',
    // },
    // 'Orange Supermilk': {
    //     id: '503776',
    //     price: '£13.00',
    //     image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd4d6b1a4/images/503776.jpg?sw=500&sh=500&sm=fit',
    // },
    // 'Hazlenut Praline': {
    //     id: '503773',
    //     price: '£13.00',
    //     image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf0191beb/images/503773-1.jpg?sw=875&sh=875&sm=fit',
    // },

    // check these ones
    'Salted Caramel': {
        id: '503772',
        price: '£13.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw487d6cdb/images/503772-1.jpg?sw=875&sh=875&sm=fit',
    },
    'Raspberry-White': {
        id: '503765',
        price: '£13.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw73ac0433/images/503765.jpg?sw=500&sh=500&sm=fit',
    },
    'Milky 50%': {
        id: '503770',
        price: '£13.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw80b74e95/images/503770-1.jpg?sw=875&sh=875&sm=fit',
    },
    '85% Dark': {
        id: '503775',
        price: '£13.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc5480a3d/images/503775.jpg?sw=500&sh=500&sm=fit',
    },

    
    'Chilli-Dark': {
        id: '503777',
        price: '£13.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw41d9796a/images/503777.jpg?sw=500&sh=500&sm=fit',
    },
    '100% Dark Honduras': {
        id: '503706',
        price: '£13.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw80b74e95/images/503770-1.jpg?sw=875&sh=875&sm=fit',
    },
    'Salted Caramel Hot Chocolate': {
      id: '503574',
      wasPrice: '£9.00',
      price: '£8.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd3a100e0/images/503577.jpg?sw=500&sh=500&sm=fit',
      saving: '£1.00',
    },
    'Milky Hot Chocolate': {
      id: '503575',
      wasPrice: '£9.00',
      price: '£8.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd3a100e0/images/503577.jpg?sw=500&sh=500&sm=fit',
      saving: '£1.00',
    },
    'Classic Hot Chocolate 70%': {
        id: '503577',
        wasPrice: '£9.00',
        price: '£8.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd3a100e0/images/503577.jpg?sw=500&sh=500&sm=fit',
       
    },
}

const { ID } = shared;

export const addAccessoriesSlider = () => {
    // add accessories
    Object.keys(accessoriesObj).forEach((i) => {
        const accProduct = accessoriesObj[i];
        const accItem = document.createElement('div');
        accItem.classList.add(`${ID}-product`);
        accItem.setAttribute('prod-id', accProduct.id);
        accItem.setAttribute('prod-name', `${[i][0]}`);
        accItem.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${accProduct.image})"></div>
        <p>${[i][0]}${accProduct.wasPrice ? `<div class="${ID}-priceBlock"><span class="${ID}-wasPrice">${accProduct.wasPrice}</span> <span class="${ID}-price">${accProduct.price}</span></div>` : `<span class="${ID}-price">${accProduct.price}</span>`}`;

        document.querySelector(`.${ID}-accessories .${ID}-carousel`).appendChild(accItem);
    });

     // toggle accessories
     const accessories = document.querySelector(`.${ID}-accessories`);
     if(accessories.querySelector(`.${ID}-accTitle`)) {
      accessories.querySelector(`.${ID}-accTitle`).addEventListener('click', () => {
          if(accessories.querySelector(`.${ID}-accInner`).classList.contains(`${ID}-active`)) {
              accessories.querySelector(`.${ID}-accInner`).classList.remove(`${ID}-active`);
          } else {
              accessories.querySelector(`.${ID}-accInner`).classList.add(`${ID}-active`);
          }
      });
    }

    //slick the products
    const slickProducts = () => {
        window.jQuery(`.${ID}-accessories .${ID}-carousel`).slick({
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

