import {
    fireEvent
} from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";


const upsellProducts = {

    'Mint Chocolate Royale Selector': {
        id: '630025',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw84a55a6d/images/630025b.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/630025.html',
    },
    'Florentine Isabelle Selector': {
        id: '190322',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw88843421/images/chocolate-florentines-selector.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/190322.html',
    },

    'Cherry Deluxe Selector': {
        id: '140464',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb867b438/images/140464.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/140464.html',
    },
    'Salted Caramel Brownie Selector': {
        id: '640043',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw8fe8ecfc/images/640043.jpg?sw=875&sh=875&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/640043.html',
    },
    'Trillionaire Shortbread Selector': {
        id: '640020',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw20a0ac29/images/640020b.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/640020.html',
    },

    'Raspberry and Clotted Cream Selector': {
        id: '640066',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw702a3c56/images/640066.jpg?sw=875&sh=875&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/640066.html',
    },
    'Raspberry Nutmilk Ganache Selector': {
        id: '150911',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw720c05e1/images/150911.jpg?sw=875&sh=875&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/150911.html',
    },
    'Raspberry Smoothie Chocolates Selector': {
        id: '150481',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw4338b6e6/images/150481.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/150481.html',
    },
    'Dizzy Dark Chocolate Pralines Selector': {
        id: '190294',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw2fc40a94/images/190294.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/190294.html',
    },
    'Chocolate Fudge Sundae Selector': {
        id: '640012',
        price: '£3.95',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw8ff43723/images/chocolate-fudge-sundae-selector.jpg?sw=500&sh=500&sm=fit',
        link: 'https://www.hotelchocolat.com/uk/640012.html',
    },
}

const {
    ID,
    VARIATION
} = shared;


export default class UpsellBox {
    constructor() {
        this.create();
        this.bindEvents();
        this.render();
    }

    create() {

        const element = document.createElement('div');
        element.classList.add(`${ID}-addonsBox`);

        if (VARIATION === '2') {
            element.classList.add(`${ID}-modalHide`);
        }

        element.innerHTML = `
      ${VARIATION === '2' ? `<div class="${ID}-close"></div>`: ''}
       <div class="${ID}-container">
        <h3>
            ${VARIATION === '1' ? `Why Not Try Our Selectors? <b>3 for £10</b>` 
            : 'Choose your selectors  <b>Any 3 for £10</b>'}
            ${VARIATION === '2' ? `<a class="${ID}-allLink" href="https://www.hotelchocolat.com/uk/shop/collections/products/selectors/">View all selectors</a>` : ''}
        </h3>
        <div class="${ID}-carousel">
          <div class="${ID}-products"></div>
          <div class="${ID}-add">Add to bag</div>
        </div>
        <a class="${ID}-allLink" href="https://www.hotelchocolat.com/uk/shop/collections/products/selectors/">View all selectors</a>
       </div>`;


        Object.keys(upsellProducts).forEach((i) => {
            const product = upsellProducts[i];
            const item = document.createElement('div');
            item.classList.add(`${ID}-product`);
            item.setAttribute('prod-id', product.id);
            item.setAttribute('prod-name', `${[i][0]}`);
            item.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${product.image})"></div>
        <p>${[i][0]}${product.wasPrice ? `<div class="${ID}-priceBlock"><span class="${ID}-wasPrice">${product.wasPrice}</span> <span class="${ID}-price">${product.price}</span></div>` : `<span class="${ID}-price">${product.price}</span>`}`;

            element.querySelector(`.${ID}-carousel .${ID}-products`).appendChild(item);
        });

        if (VARIATION === '2') {
            // add overlay
            document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay ${ID}-overlayHide"></div>`);
        }

        this.component = element;
    }

    bindEvents() {
        const {
            component
        } = this;


        const products = component.querySelectorAll(`.${ID}-carousel .${ID}-product`);
        const addButton = component.querySelector(`.${ID}-add`);

        /** -----------
         * Click product logic
         * ------------  */

        const chooseSelector = () => {
            for (let index = 0; index < products.length; index += 1) {
                const element = products[index];
                element.addEventListener('click', () => {

                    if (element.classList.contains(`${ID}-selected`)) {
                        element.classList.remove(`${ID}-selected`);
                    } else {
                        element.classList.add(`${ID}-selected`);
                    }

                    // add button
                    if (element.classList.contains(`${ID}-selected`) && !document.querySelector(`.${ID}-product.${ID}-selected`)) {
                        addButton.classList.remove(`${ID}-show`);
                    } else if (document.querySelector(`.${ID}-product.${ID}-selected`)) {
                        addButton.classList.add(`${ID}-show`);
                    } else {
                        addButton.classList.remove(`${ID}-show`);
                    }
                });
            }
        }

        chooseSelector();
        if (VARIATION === '2') {
            // lightbox events for V2
            const closeLightbox = () => {
                const overlay = document.querySelector(`.${ID}-overlay`);
                component.classList.add(`${ID}-modalHide`);
                overlay.classList.add(`${ID}-overlayHide`);
            }

            const showBox = () => {
                const overlay = document.querySelector(`.${ID}-overlay`);
                component.classList.remove(`${ID}-modalHide`);
                overlay.classList.remove(`${ID}-overlayHide`);

                window.jQuery(`.${ID}-carousel .${ID}-products`).slick('resize');
            }

            const overlay = document.querySelector(`.${ID}-overlay`);
            overlay.addEventListener('click', () => {
                closeLightbox();
            });

            const closeBox = component.querySelector(`.${ID}-close`);
            closeBox.addEventListener('click', () => {
                closeLightbox();
            });


            const viewSelectorLink = document.querySelector(`.${ID}-delivery .${ID}-link`);
            viewSelectorLink.addEventListener('click', () => {
                showBox();
                fireEvent('Clicked Learn More');
            });

            const deliveryMessage = document.querySelector(`.${ID}-delivery`);

            deliveryMessage.addEventListener('click', () => {
                showBox();
                fireEvent('Clicked Learn More');
            });
        }



        /** -----------
         * Add to basket logic
         * ------------  */

        const doRequest = (sku) => {
            return new Promise((resolve,reject) => {
                window.jQuery.ajax({
                    url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
                    type: 'post',
                    data: `Quantity=1&cartAction=add&pid=${sku}`,
                    success: function () {
                        sessionStorage.setItem(`${ID}-selectorAdded`, 1);
                        fireEvent(`Selector added to bag`);
                        resolve();
                    }
                });
            });
            
        }

        const ajaxAdd = () => {

            // get all added
            const allSelected = document.querySelectorAll(`.${ID}-product.${ID}-selected`);

            if (allSelected) {
                
                const requests = [];

                for (let index = 0; index < allSelected.length; index += 1) {
                    const element = allSelected[index];
                    const productSku = element.getAttribute('prod-id');
                    if (productSku) {
                        const prom = doRequest(productSku);
                        requests.push(prom);
                    }
                }

                Promise.all(requests).then(() => {
                    window.location.href = 'https://www.hotelchocolat.com/uk/basket';
                });
            }
        }

        addButton.addEventListener('click', () => {
            addButton.textContent = 'Adding...';
            ajaxAdd();
        });


    }

    render() {
        const {
            component
        } = this;
        if (VARIATION === '1') {
            document.querySelector('#page_heading').insertAdjacentElement('afterend', component);
        } else if (VARIATION === '2') {
            document.body.appendChild(component);
        }
    }
}