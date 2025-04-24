import shared from "./shared";

const colourObj = {
    'Copper': {
        id: '472726M',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw60e28e28/images/472786-1.jpg?sw=500&sh=500&sm=fit',
    },
    'Charcoal': {
        id: '472727M',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb83c3862/images/472787-1.jpg?sw=500&sh=500&sm=fit',
    },
    'White': {
        id: '472725M',
        image: 'https://editor-assets.abtasty.com/48343/5f3fbed6b81db1598013142.jpg',
    },
}

const flakesObj = {
    'Everything Selection – Single-Serves': {
      id: '503879',
      price: '£10.00',
      wasPrice: '£14.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7295c8e6/images/503769.jpg?sw=500&sh=500&sm=fit',
    },
    'Milky 50% Hot Chocolate – Resealable Pouch': {
        name: 'Milky 50% Hot Chocolate – Resealable Pouch',
        id: '503929',
        price: '£8.00',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw3bccf11a/images/503929.jpg?sw=500&sh=500&sm=fit',
    },
    'Classic 70% Hot Chocolate – Resealable Pouch': {
      name: 'Classic 70% Hot Chocolate – Resealable Pouch',
      id: '503928',
      price: '£8.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc350fda3/images/503928.jpg?sw=500&sh=500&sm=fit',
    },
    'Nutmilk 45% Hot Chocolate – Resealable Pouch': {
      name: 'Nutmilk 45% Hot Chocolate – Resealable Pouch',
      id: '503930',
      price: '£8.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw1c37e1b7/images/503930.jpg?sw=500&sh=500&sm=fit',
    },
    'Vanilla-White Hot Chocolate – Resealable Pouch': {
      name: 'Vanilla-White Hot Chocolate – Resealable Pouch',
      id: '503931',
      price: '£8.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw27af4b78/images/503931.jpg?sw=500&sh=500&sm=fit',
    },
    'Mint Hot Chocolate – Resealable Pouch': {
      name: 'Mint Hot Chocolate – Resealable Pouch',
      id: '504021',
      price: '£8.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw43b11a9f/images/504021.jpg?sw=500&sh=500&sm=fit',
    },
    'Salted Caramel Hot Chocolate – Single-Serves': {
      name: 'Salted Caramel Hot Chocolate – Single-Serves',
      id: '503772',
      price: '£10.00',
      wasPrice: '£13.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw487d6cdb/images/503772-1.jpg?sw=875&sh=875&sm=fit',
    },
    'Milky 50% Hot Chocolat - Single Serves': {
      name: 'Milky 50% Hot Chocolat - Single Serves',
      id: '503770',
      price: '£10.00',
      wasPrice: '£13.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd7b7df81/images/503770.jpg?sw=875&sh=875&sm=fit',
    },
    'Classic 70% Dark Hot Chocolate – Single Serves': {
      name: 'Classic 70% Dark Hot Chocolate – Single Serves',
      id: '503771',
      price: '£10.00',
      wasPrice: '£13.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5c80c21e/images/503771.jpg?sw=875&sh=875&sm=fit',
    },
    '85% Dark Hot Chocolate – Single-Serves': {
      name: '85% Dark Hot Chocolate – Single-Serves',
      id: '503775',
      price: '£10.00',
      wasPrice: '£13.00',
      image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc5480a3d/images/503775.jpg?sw=500&sh=500&sm=fit',
    },
    
}


const { ID } = shared;

export const addColours = () => {
    // add accessories
    Object.keys(colourObj).forEach((i) => {
        const colourData = colourObj[i];
        const colour = document.createElement('div');
        colour.classList.add(`${ID}-product`);
        colour.classList.add(`${ID}-colour`);
        colour.setAttribute('prod-id', colourData.id);
        colour.setAttribute('prod-name', [i][0]);
        colour.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${colourData.image})"></div>
        <p>${[i][0]}<span class="${ID}-price">£99.95</span></p>
        <div class="${ID}-qty">
            <input type="button" value="-" class="minus">
            <input type="text"value="1" class="count" readonly>
            <input type="button" value="+" class="plus">
        </div>`;

        document.querySelector(`.${ID}-accordionStep.${ID}-colours .${ID}-carousel`).appendChild(colour);
    });
}

export const addFlakes = () => {
    // add flake products
    Object.keys(flakesObj).forEach((i) => {
        const flakeProduct = flakesObj[i];
        const flakeItem = document.createElement('div');
        flakeItem.classList.add(`${ID}-product`);
        flakeItem.setAttribute('prod-id', flakeProduct.id);
        flakeItem.setAttribute('prod-name', `${[i][0]}`);
        flakeItem.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${flakeProduct.image})"></div>
        <p>${[i][0]}</p>
        <div class="${ID}-priceBlock">
            ${flakeProduct.wasPrice ? 
            `
            <span class="${ID}-price">${flakeProduct.price}</span>
            <span class="${ID}-wasPrice">${flakeProduct.wasPrice}</span>
            ` : 
            `<span class="${ID}-price">${flakeProduct.price}</span>`}
        </div>
        <div class="${ID}-qty">
            <input type="button" value="-" class="minus">
            <input type="text" value="1" class="count" readonly>
            <input type="button" value="+" class="plus">
        </div>`;

        document.querySelector(`.${ID}-flakes .${ID}-carousel`).appendChild(flakeItem);
    });

    //slick the products
    const slickProducts = () => {
        window.jQuery(`.${ID}-flakes .${ID}-carousel`).slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            infinite: true,
            mobileFirst: true, 
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                      }
                  },

  
                ]
        });
    }
    if(window.innerWidth > 767) {
      slickProducts();
    }
}

export const updateQTY = () => {
    
    const qtyEl = document.querySelectorAll(`.${ID}-carousel .${ID}-qty`);

    for (let index = 0; index < qtyEl.length; index += 1) {
      let count = 1;
        const element = qtyEl[index];
        const qtyCount = element.querySelector(`.count`);

        element.querySelector(`.plus`).addEventListener('click', () => {
            count++;
            qtyCount.value = count;
        });
        element.querySelector(`.minus`).addEventListener('click', () => {
            if (count > 1) {
                count--;
                qtyCount.value = count;
            } 
        });
    }  
}