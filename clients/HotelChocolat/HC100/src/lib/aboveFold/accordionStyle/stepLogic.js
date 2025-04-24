import { bundlePrices, updatePrice, extrasPrices, dataLayerPush } from "../../helpers";
import shared from "../../../../../../../core-files/shared";
import {
    fireEvent
} from "../../../../../../../core-files/services";


export default () => {

    const { ID } = shared;


    /**
     * Make first one active by default
     */
    const makeIncludedActive = () => {
        const mainMachine = document.querySelector(`.${ID}-product.${ID}-included`);
        mainMachine.classList.add(`${ID}-selected`);
    }


    /*
     * Choose bundles
     */
    const chooseBundle = () => {
        const bundleChoice = document.querySelectorAll(`.${ID}-product.${ID}-bundle`);

        const makeActive = (e) => {
            const price = parseFloat(e.currentTarget.querySelector(`.${ID}-price`).textContent.replace('£', ''));
            e.preventDefault();

            // enable add button, including mobile
            const addButton = document.querySelectorAll(`.${ID}-add`);
            for (let index = 0; index < addButton.length; index++) {
                const element = addButton[index];
                element.classList.add(`${ID}-buttonShow`);
            }
            const klarnaBox = document.querySelector(`.${ID}-priceBox klarna-placement`);
            if (klarnaBox) {
                klarnaBox.classList.add(`${ID}-klarnaShow`);
                window.KlarnaOnsiteService.push({
                    eventName: 'refresh-placements'
                });
            }

            // remove if deselected
            if (e.currentTarget.classList.contains(`${ID}-selected`)) {
                e.currentTarget.classList.remove(`${ID}-selected`);
                bundlePrices.pop();
                updatePrice();

                // add active, remove any other actives
            } else if (!e.currentTarget.classList.contains(`${ID}-selected`)) {

                for (let index = 0; index < bundleChoice.length; index += 1) {
                    const element = bundleChoice[index];
                    element.classList.remove(`${ID}-selected`);
                    bundlePrices.pop();
                    updatePrice();
                }

                e.currentTarget.classList.add(`${ID}-selected`);
                fireEvent('Clicked pod bundle');
                bundlePrices.push(price);
                updatePrice();
            }

        }

        for (let x = 0; x < bundleChoice.length; x += 1) {
            const el = bundleChoice[x];
            el.addEventListener('click', makeActive);
        }
    }

    /*
     * Choose extras
     */
    const chooseFlakes = () => {

        const product = document.querySelectorAll(`.${ID}-accordionStep.${ID}-extras .${ID}-product`);

        for (let index = 0; index < product.length; index += 1) {
            const element = product[index];
            element.addEventListener('click', () => {
                const price = parseFloat(element.querySelector(`.${ID}-price`).textContent.replace('£', ''));

                if (element.classList.contains(`${ID}-selected`)) {
                    element.classList.remove(`${ID}-selected`);
                    extrasPrices.pop();

                    updatePrice();
                } else {
                    element.classList.add(`${ID}-selected`);
                    extrasPrices.push(price);

                    updatePrice();
                    fireEvent('Clicked extra product');
                }
            });
        }
    }

    makeIncludedActive();
    chooseBundle();
    chooseFlakes();

    /**
     * Add all to bag - loops through each product selected and does the ajax request to add them
     */
    const addProductToBag = () => {
        const addButton = document.querySelector(`.${ID}-add`);

        const ajaxAdd = () => {
            // get all added
            const allSelected = document.querySelectorAll(`.${ID}-product.${ID}-selected`);
            let names = [];
            if (allSelected) {
                let storedProducts = [];
                for (let index = 0; index < allSelected.length; index += 1) {
                    const element = allSelected[index];
                    const productSku = element.getAttribute('prod-id');
                    const elName = element.textContent.trim();

                    const storedName = element.getAttribute('prod-name');
                    const price = element.querySelector(`.${ID}-price`).textContent;
                    //const elQty = element.getAttribute('qty');
                    const elQty = document.querySelector('.input-group-qty').value;

                    if (productSku) {

                        // push all the added products to object
                        var product = {};

                        product['productName'] = storedName;
                        product['price'] = price.replace('£', '');
                        product['productSKU'] = productSku;
                        product['productID'] = productSku;
                        product['productBrand'] = 'Hotel Chocolat',
                            product['productHierarchy'] = 'Product List',
                            product['product_quantity'] = elQty,

                            storedProducts.push(product);

                        dataLayerPush(product);

                        let addurl = false;

                        window.jQuery.ajax({
                            url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
                            type: 'post',
                            data: `Quantity=${elQty}&cartAction=add&pid=${productSku}`,
                            success: function () {
                                window.scrollTo(0, 0);
                                document.querySelector(`.${ID}-add`).classList.remove(`${ID}-addingToBag`);
                                sessionStorage.setItem(`${ID}-productsAdded`, JSON.stringify(storedProducts));
                                if (addurl === false) {
                                    window.location.href = `${window.location.pathname}?addtobasket=true`;
                                    addurl = true;
                                }
                            }
                        });

                        names.push(elName);
                    }
                    fireEvent(`Clicked add to bag with options: ${names}`);
                }
            }
        }

        addButton.addEventListener('click', () => {
            addButton.classList.add(`${ID}-addingToBag`);
            addButton.textContent = 'Adding...';
            ajaxAdd();
        });
    }

    addProductToBag();
}