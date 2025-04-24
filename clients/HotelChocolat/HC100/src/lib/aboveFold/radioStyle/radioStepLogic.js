import shared from "../../../../../../../core-files/shared";
import { dataLayerPush, radioBundlePrices, radioOptionPrice, reviewSmoothScroll, updateRadioPrice } from "../../helpers";
import { fireEvent } from "../../../../../../../core-files/services";

const { ID } = shared;

export default () => {

    /*
    For main options*/
    const chooseRadio = () => {
        const radioChoice = document.querySelectorAll(`.radioLabel`);

        const subButton = document.querySelector(`.${ID}-subAdd`);
        const addToBag = document.querySelector(`.${ID}-add`);
    
        const makeActive = (e) => {
            const price = parseFloat(e.currentTarget.querySelector(`.${ID}-price`).textContent.replace('£', ''));

            for (let index = 0; index < radioChoice.length; index += 1) {
                const element = radioChoice[index];
                element.parentNode.classList.remove(`${ID}-selected`);
            }

            e.currentTarget.parentNode.classList.add(`${ID}-selected`);



            const qty = document.querySelector('.inventory');
            const klarnaBox = document.querySelector(`klarna-placement`);

            if(e.currentTarget.parentNode.getAttribute('data-attr') == 'subscription') {
                subButton.classList.add(`${ID}-show`);
                addToBag.classList.add(`${ID}-hide`);
                qty.style.display = 'none';
                klarnaBox.style.display = 'none';
            } else {
                subButton.classList.remove(`${ID}-show`);
                addToBag.classList.remove(`${ID}-hide`);
                qty.style.display = 'block';
                klarnaBox.style.display = 'block';
            }
        

            // if bundle selected, don't update price until bundle chosen
            if(e.currentTarget.parentNode.getAttribute('data-attr') !== 'bundle') {
                radioBundlePrices.pop();
                radioOptionPrice.pop();
                radioOptionPrice.push(price);
                updateRadioPrice();
            } else {
                // if bundle is chosen after other options clicked, reset price
                if(!document.querySelector(`.${ID}-product.${ID}-bundle.${ID}-selected`)) {
                    document.querySelector(`.${ID}-product[prod-name="The Tasting Selection - 60 pods"]`).classList.add(`${ID}-selected`);
                    document.querySelector(`.${ID}-radioOption.${ID}-selected .${ID}-radioPrice`).innerHTML =  `<span class="${ID}-price">£159.95</span>`;
                }

                radioOptionPrice.pop();
                radioOptionPrice.push(149.95);
                updateRadioPrice();
            }

           

            
            if (klarnaBox) {
                klarnaBox.classList.add(`${ID}-klarnaShow`);
                window.KlarnaOnsiteService.push({
                    eventName: 'refresh-placements'
                });
            }

            reviewSmoothScroll(e.currentTarget.parentNode);
        }
    
        for (let x = 0; x < radioChoice.length; x += 1) {
            const el = radioChoice[x];
            el.addEventListener('click', makeActive);
        }
    }

    const chooseBundle = () => {
        const bundleChoice = document.querySelectorAll(`.${ID}-product.${ID}-bundle`);
    
        const makeActive = (e) => {
            const price = parseFloat(e.currentTarget.querySelector(`.${ID}-price`).textContent.replace('£', ''));
            e.preventDefault();
    
            
    
            // remove if deselected
            if (e.currentTarget.classList.contains(`${ID}-selected`)) {
                e.currentTarget.classList.remove(`${ID}-selected`);
                radioBundlePrices.pop();
                updateRadioPrice();
                document.querySelector(`.${ID}-radioOption.${ID}-selected .${ID}-radioPrice`).innerHTML =  `From <span class="${ID}-price">£159.95</span>`;
    
                // add active, remove any other actives
            } else if (!e.currentTarget.classList.contains(`${ID}-selected`)) {
    
                for (let index = 0; index < bundleChoice.length; index += 1) {
                    const element = bundleChoice[index];
                    element.classList.remove(`${ID}-selected`);
                    radioBundlePrices.pop();
                    updateRadioPrice();
                }
    
                e.currentTarget.classList.add(`${ID}-selected`);

                document.querySelector(`.${ID}-radioOption[data-attr="bundle"]`).setAttribute('data-id', e.currentTarget.getAttribute('prod-id'));
                
                document.querySelector(`.${ID}-radioOption[data-attr="bundle"]`).setAttribute('prod-name', e.currentTarget.getAttribute('prod-name'));;

                //fireEvent('Clicked pod bundle')
                radioBundlePrices.push(price);
                updateRadioPrice();

                if(e.currentTarget.getAttribute('prod-name') === 'The Tasting Selection - 60 pods') {
                    document.querySelector(`.${ID}-save`).textContent = 'Save £9.95';
                    document.querySelector(`.${ID}-radioOption.${ID}-selected .${ID}-radioPrice`).innerHTML =  `<span class="${ID}-price">£159.95</span>`;
                } else {
                    document.querySelector(`.${ID}-save`).textContent = 'Save £19.90'; 
                    document.querySelector(`.${ID}-radioOption.${ID}-selected .${ID}-radioPrice`).innerHTML = `<span class="${ID}-price">£169.95</span>`;
                }

                
            }

            
    
        }
    
        for (let x = 0; x < bundleChoice.length; x += 1) {
            const el = bundleChoice[x];
            el.addEventListener('click', makeActive);
        }
    }

    const chooseCups = () => {
        const product = document.querySelectorAll(`.${ID}-cups.${ID}-addOn .${ID}-products .${ID}-product`);
    
        for (let index = 0; index < product.length; index += 1) {
            const element = product[index];
            element.addEventListener('click', () => {
                if (element.classList.contains(`${ID}-selected`)) {
                    element.classList.remove(`${ID}-selected`);
                } else {
                    element.classList.add(`${ID}-selected`);
                    fireEvent('Clicked cup product');
                }
            });
        } 
    }

    const choosePodPacks = () => {
        const product = document.querySelectorAll(`.${ID}-pods.${ID}-addOn .${ID}-products .${ID}-product`);
    
        for (let index = 0; index < product.length; index += 1) {
            const element = product[index];
            element.addEventListener('click', () => {
                if (element.classList.contains(`${ID}-selected`)) {
                    element.classList.remove(`${ID}-selected`);
                } else {
                    element.classList.add(`${ID}-selected`);
                    fireEvent('Clicked pod product');
                }
            });
        } 
    }


    const addPodsterToBag = () => {
        const elQty = document.querySelector('.input-group-qty').value;
        
        const podsterProd = 
            {
                "productName": 'The Podster Coffee System',
                "price": 149.95,
                "productSKU": "472791",
                "productID": "472791",
                "productBrand": "Hotel Chocolat",
                "productHierarchy": "Product List",
                "product_quantity": "1"
            }
        dataLayerPush(podsterProd);


        window.jQuery.ajax({
            url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
            type: 'post',
            data: `Quantity=${elQty}&cartAction=add&pid=472791`,
            success: function () {
            }
        });
    }

    /**
     * Add main options to bag
     */
    const addProductToBag = () => {
        const addButton = document.querySelector(`.${ID}-add`);

          
        const ajaxAdd = () => {
            // get all added
            const selectedOption = document.querySelector(`.${ID}-radioOption.${ID}-selected`);

            let names = [];
            let storedProducts = [];

            if (selectedOption) {
                const productSku = selectedOption.getAttribute('data-id');
                const elName = selectedOption.querySelector('.radioLabel > p').textContent.trim();


               let storedName;
                if(selectedOption.getAttribute('prod-name')) {
                    storedName = selectedOption.getAttribute('prod-name');
                }
                const price = selectedOption.querySelector(`.${ID}-price`).textContent;

                //const elQty = selectedOption.getAttribute('data-qty');

                const elQty = document.querySelector('.input-group-qty').value;

                if (productSku) {

                     // if bundle selected, do another request for podster
                     if(productSku === '504045' || productSku === '504215') {
                        addPodsterToBag();
                    }

                    var product = {};

                        product['productName'] = storedName;
                        product['price'] = price.replace('£','');
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
                    fireEvent('Added to bag ' + names)
                    
                    
                }
            }
        }

        addButton.addEventListener('click', () => {
            addButton.classList.add(`${ID}-addingToBag`);
            addButton.textContent = 'Adding...';
            ajaxAdd();
        });
    }

    chooseRadio();
    chooseBundle();

    addProductToBag();


    /*
    For extras */
    chooseCups();
    choosePodPacks();

    /**
     * Add extra options to bag
     */
    const addExtrasToBag = (buttn, parentEl) => {
        const addProductsButton = buttn;
    
            const ajaxExtrasAdd = () => {
                // get all added
                const allSelected = parentEl.querySelectorAll(`.${ID}-product.${ID}-selected`);
                let names = [];
                if (allSelected) {
                    let storedProducts = [];
                    for (let index = 0; index < allSelected.length; index += 1) {
                        const element = allSelected[index];
                        const productSku = element.getAttribute('prod-id');
                        const elName = element.textContent.trim();
    
                        const storedName = element.innerHTML;
                        const price = element.querySelector(`.${ID}-price`).textContent;
                        const elQty = element.getAttribute('qty');
    
                        if (productSku) {
    
                            // push all the added products to object
                            var obj = {};
    
                            obj['name'] = elName;
                            storedProducts.push(obj);
    
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
                        fireEvent(`Clicked add to bag with option: ${names}`);
                    }
                }
            }
    
            addProductsButton.addEventListener('click', () => {
                addProductsButton.classList.add(`${ID}-addingToBag`);
                addProductsButton.textContent = 'Adding...';
                ajaxExtrasAdd();
            });
    }

    const cups = document.querySelector(`.${ID}-cups.${ID}-addOn`);
    const cupAddBtn = cups.querySelector(`.${ID}-addExtra`);
    const singlePods = document.querySelector(`.${ID}-pods.${ID}-addOn`);
    const singlePodsBtn = singlePods.querySelector(`.${ID}-addExtra`);

    addExtrasToBag(cupAddBtn, cups);
    addExtrasToBag(singlePodsBtn, singlePods);

}