import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared"
import {
    allProducts, filterList
} from "./productData";

const {
    ID
} = shared;



export const smoothScroll = (element) => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 100,
    });
    
  }

/**
 * Check value to see if qulaified or could qualify
 */
export const qualification = (value) => {
    const bands = [300, 2500, 5000, 10000, 15000];
    const bandsMap = ['0%', '5%', '7.5%', '10%', '12.5%', '15%'];

    let matchingBandIndex = 5;
    for (let i = 0; i < bands.length; i++) {
        if (value < bands[i]) {
            matchingBandIndex = i;
            break;
        }
    }

    return {
        bandPercent: bandsMap[matchingBandIndex],
        difference: bands[matchingBandIndex] - value,
        nextBandPercent: bandsMap[matchingBandIndex + 1]
    }
}


/**
 * Shows/hides/disables the submit button
 */
export const submitButton = (inputsFilled, visible) => {
    const button = document.querySelector(`.${ID}-values .${ID}-button`);
    if (visible === true) {

        button.classList.add(`${ID}-btnShow`);

        if (inputsFilled == true) {
            button.classList.remove(`${ID}-disabled`);
        } else {
            button.classList.add(`${ID}-disabled`);
        }
    } else {
        button.classList.remove(`${ID}-btnShow`);
    }
}


/**
 * Updates all input values
 */
export const updateAllvalues = (type) => {

    let totalBudget;

    // inputs
    const noOfPeopleInput = document.querySelector(`.${ID}-people.${ID}-field input`);
    const maxOverallInput = document.querySelector(`.${ID}-maxBudget.${ID}-field input`);
    const maxBudgetPPInput = document.querySelector(`.${ID}-perPerson.${ID}-field input`);

    // summary amounts
    const noPeopleSummary = document.querySelector(`.${ID}-row.${ID}-noPpl span`);
    const budgetPPSummary = document.querySelector(`.${ID}-row.${ID}-budgetPerson span`);
    const MaxTotalSummary = document.querySelector(`.${ID}-row.${ID}-maxSpend span`);


    // update people - same for both
    if (noOfPeopleInput.value !== '') {
        // update no of people
        noPeopleSummary.innerHTML = `${noOfPeopleInput.value}`;
    } else {
        // update no of people
        noPeopleSummary.innerHTML = `-`;
    }


    if (type === 'totalbudget') {

        // if total budget is entered
        if (maxOverallInput.value !== '') {
            MaxTotalSummary.innerHTML = `£${maxOverallInput.value}*`;
        } else {
            MaxTotalSummary.innerHTML = '-';
        }

        // if no of people is entered and max overall
        if (noOfPeopleInput.value !== '' && maxOverallInput.value !== '') {

            // calculate overall / no of people
            totalBudget = (parseFloat(maxOverallInput.value) / parseFloat(noOfPeopleInput.value));
            budgetPPSummary.innerHTML = `£${totalBudget.toFixed(2)}`;

            submitButton(true, true);
        } else {
            budgetPPSummary.innerHTML = '-';
            submitButton(false, true);
        }


    } else if (type === 'budgetPP') {

        if (maxBudgetPPInput.value !== '') {
            budgetPPSummary.innerHTML = `£${maxBudgetPPInput.value}`;
        } else {
            budgetPPSummary.innerHTML = '-'
        }

        if (maxBudgetPPInput.value !== '' && noOfPeopleInput.value !== '') {
            totalBudget = (parseFloat(maxBudgetPPInput.value) * parseFloat(noOfPeopleInput.value));
            MaxTotalSummary.innerHTML = `£${totalBudget}*`;

            submitButton(true, true);
        } else {
            MaxTotalSummary.innerHTML = '-';
            submitButton(false, true);
        }

    }
}

/**
 * Clears all input values
 */
export const clearAllValues = () => {
    const allInputs = document.querySelectorAll(`.${ID}-field input`);
    const allValues = document.querySelectorAll(`.${ID}-amounts span`);

    // hide all discounts
    const spendMoreMsg = document.querySelector(`.${ID}-spendMore`);
    const qualified = document.querySelector(`.${ID}-qualified`);

    qualified.classList.remove(`${ID}-visible`);
    spendMoreMsg.classList.remove(`${ID}-visible`);

    for (let index = 0; index < allInputs.length; index += 1) {
        const element = allInputs[index];
        element.value = '';
    }

    for (let index = 0; index < allValues.length; index += 1) {
        const element = allValues[index];
        element.innerHTML = '-';
    }
}


/**
 * Resets calculator
 */
export const resetCalculator = () => {
    const addressBox = document.querySelector(`.${ID}-addressStep`);
    const calculator = document.querySelector(`.${ID}-calculatorStep`);

    addressBox.classList.remove(`${ID}-active`);
    calculator.classList.remove(`${ID}-hidden`);

    clearAllValues();
    submitButton(false, false);
}


/**
 * Main form changes, hide input fields
 */
const formChanges = () => {
     // change form fields and values
     const inputsToHide = ['lastName', 'giftType', 'addressOptions', 'budget', 'dietaryType'];
      
     for (let index = 0; index < inputsToHide.length; index += 1) {
       const inputEl = inputsToHide[index];
  
       const matchingEl = document.querySelector(`.form-row #${inputEl}`);
       if(matchingEl) {
         matchingEl.parentNode.parentNode.classList.add(`${ID}-hidden`);
         matchingEl.value = ID;
       }
     }

     document.querySelector('#firstName').setAttribute('placeholder', "Full Name*")
     document.querySelector('#phoneNumber').setAttribute('placeholder', "Phone Number*")
     document.querySelector('#email').setAttribute('placeholder', "Email Address*");

     document.querySelector('#dateOrder').setAttribute('placeholder', "When do you need this by?*");
}

/**
 * Bottom Form changes
 */

const bottomFormChanges = () => {

    const removeChanges = () => {
        if(document.querySelector(`.${ID}-radios`)) {
            document.querySelector(`.${ID}-radios`).remove();
        }
        if(document.querySelector(`.${ID}-submit`)) {
            document.querySelector(`.${ID}-submit`).remove();
        }
        
    }

    removeChanges();

    // add new submit button
    const submit = document.querySelector('#sendBtn');
    submit.insertAdjacentHTML('beforebegin', `<div class="${ID}-submit">Submit</div>`);

    // hide any not needed
    const inputsToHide = ['lastName', 'budget', 'dietaryType', 'addressOptions'];
      
    for (let index = 0; index < inputsToHide.length; index += 1) {
      const inputEl = inputsToHide[index];
 
      const matchEl = document.querySelector(`.form-row #${inputEl}`);
      if(matchEl) {
        matchEl.parentNode.parentNode.classList.add(`${ID}-hidden`);
        matchEl.value = ID;
      }
    }

    // show the bottom two
    const inputsToShow = ['giftType'];
      
    for (let index = 0; index < inputsToShow.length; index += 1) {
      const inputEl = inputsToShow[index];
 
      const matchingEl = document.querySelector(`.form-row #${inputEl}`);
      if(matchingEl) {
        matchingEl.parentNode.parentNode.classList.remove(`${ID}-hidden`);
        matchingEl.value = '';
      }
    }

    document.querySelector('#giftType').setAttribute('placeholder', "Number of recipients*");


    // add radio buttons to bottom of the form, when selected change value of #addressOptions
    const radioInput = `
    
    <div class="${ID}-radios">
        <p class="${ID}-addressQuestion">Is this for a single address or multiple addresses?</p>
        <div class="${ID}-input">
            <div class="${ID}-row">
                <input type="radio" id="single" name="address" value="singleAddress">
                <span class="checkmark"></span>
                <label for="single">Single</label>
            </div>
            <div class="${ID}-row">
                <input type="radio" id="multiple" name="address" value="multipleAddress">
                <span class="checkmark"></span>
                <label for="multiple">Multiple</label><br>
            </div>
        </div>
    </div>
    <span class="radioError error">Please choose an option</span>`;

    document.querySelector('#dateOrder').parentNode.parentNode.insertAdjacentHTML('afterend', radioInput);

    document.querySelectorAll(`.${ID}-radios .${ID}-input input`).forEach((input) => {
        input.addEventListener('change', (e) => {
            document.querySelector(`.radioError.error`).classList.remove('show');
            document.querySelector('#addressOptions').value = e.currentTarget.value;
        });
    });


    // on submit click 
    const submitBtn = document.querySelector(`.${ID}-submit`);
    submitBtn.addEventListener('click', () => {
        if(!document.querySelector('#multiple').checked && !document.querySelector('#single').checked) {
            document.querySelector(`.radioError.error`).classList.add('show');
        } else {
            document.querySelector(`.radioError.error`).classList.remove('show');


            const recipientNo = document.querySelector('#giftType');
            const bottomForm = document.querySelector(`.${ID}-bottomForm`);
            const formLightbox = document.querySelector(`.${ID}-modal.${ID}-form`);

            // check number of recipients
            if(recipientNo.value !== '') {

                const noOfRecip = parseFloat(recipientNo.value);

                if(noOfRecip <= 20) {
                    closeLightbox(formLightbox);
                    openLightbox(bottomForm);
                   
                }                
                // if over 20 and one address
                 else if(noOfRecip > 20 &&  document.querySelector('#single').checked) {
                    closeLightbox(formLightbox);
                    openLightbox(bottomForm);
                    
                } else {
                    closeLightbox(formLightbox);
                    // just submit
                    document.querySelector(`#sendBtn`).click();
                }

            } else {
                // if fields are blank, submit for validation
                document.querySelector(`#sendBtn`).click();
            }

        }
    });


}

/**
 * Opens lightbox
 */
export const openLightbox = (el, type) => {
    const overlay = document.querySelector(`.${ID}-overlay`);
    el.classList.add(`${ID}-modalShow`);

    el.setAttribute('type', type);

    if(type === 'bottom') {
        bottomFormChanges();
    } else if (type == 'mainForm'){
        formChanges();

        if(document.querySelector(`.${ID}-submit`)){
            document.querySelector(`.${ID}-submit`).remove();
        }
    }

    overlay.classList.add(`${ID}-overlayShow`);
    document.documentElement.classList.add(`${ID}-noScroll`);
    document.querySelector('#dateOrder').setAttribute('placeholder', "When do you need this by?*");
}


/**
 * Closes lightbox
 */
export const closeLightbox = (el) => {
    const overlay = document.querySelector(`.${ID}-overlay`);
    el.classList.remove(`${ID}-modalShow`);
    overlay.classList.remove(`${ID}-overlayShow`);
    document.documentElement.classList.remove(`${ID}-noScroll`);
}


/**
 * Add in relevant products, update title
 */

export const addProducts = (value) => {

    
    const bestSelling = window.HCallProducts.bestSellers;
    const all = window.HCallProducts.all;
    // const bestSelling = allProducts.bestSellers;
    // const all = allProducts.all;

    const productsBox = document.querySelector(`.${ID}-productsWrapper`);
    const products = productsBox.querySelector(`.${ID}-products`);

    products.classList.remove(`${ID}-moreThan20`);
    products.classList.remove(`${ID}-showAll`);
    products.classList.remove(`${ID}-filtered`);
    products.innerHTML = '';


    // Create product markup
    const createProduct = (el, skuCode) => {
        const product = document.createElement('div');
        product.classList.add(`${ID}-product`);
        product.setAttribute('sku', skuCode);
        product.setAttribute('filter-attr', el.category);
        product.innerHTML = `
            <div class="${ID}-image" style="background-image:url(${el.img})"><span><b><svg class="icon search"><use xlink:href="https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Images-Show#search"></use></svg></b>uick buy</span></div>
            <div class="${ID}-info">
                <span class="${ID}-ref">Ref: ${skuCode}</span>
                <p>${el.description}</p>
                <span>${el.price}</span>
            </div>`;

        products.appendChild(product);
    }


    const filters = document.querySelector(`.${ID}-filters`);
    // if no value (best sellers)
    if (!value) {
        productsBox.querySelector('h3').textContent = 'Browse products available for corporate gifting';
        filters.classList.add(`${ID}-hidden`);

        for (var key in bestSelling) {
            var obj = bestSelling[key];
            createProduct(obj, obj.sku);
            // ...
        }

        // Object.keys(bestSelling).forEach((i) => {
        //     const data = bestSelling[i];
        //     createProduct(data, data.sku);
        // });

        // add products based on value
    } else {
        // open products
        productsBox.classList.add(`${ID}-visible`);
        smoothScroll(productsBox);


        let amount = 0;
        let results = false;

        
        filters.classList.remove(`${ID}-hidden`);


        for (var elkey in all) {
            var dataobj = all[elkey];

            const objPrice = parseFloat(dataobj.price.replace('£', ''));

            if (objPrice <= value) {
                amount++;

                productsBox.classList.remove(`${ID}-noResults`);
                results = true;

                if (amount > 20) {
                    products.classList.add(`${ID}-moreThan20`);
                }

                createProduct(dataobj, dataobj.sku);
                productsBox.querySelector('h3').textContent = `View ${amount} corporate gifts to suit your requirements`;

            } 
            // ...
        }
        
        // Object.keys(all).forEach((i) => {
        //     const allData = all[i];

            
        //     if (allData.price <= value) {
        //         amount++;

        //         productsBox.classList.remove(`${ID}-noResults`);
        //         results = true;

        //         if (amount > 20) {
        //             products.classList.add(`${ID}-moreThan20`);
        //         }

                
        //         createProduct(allData, allData.sku);
        //         productsBox.querySelector('h3').textContent = `View ${amount} corporate gifts to suit your requirements`;

        //     } 
        // });

        // if no results, show all
        if(results === false) {
            productsBox.querySelector('h3').textContent = 'Browse products available for corporate gifting';
            filters.classList.add(`${ID}-hidden`);
            for (var bestkey in bestSelling) {
                var bestobj = bestSelling[bestkey];
                createProduct(bestobj, bestobj.sku);
                // ...
            }
        }

        removeFilters();
        addFilters();
        clickFilters();
        
    }


}


/**
 * Add to bag for quick view
 */
const addProductsToBag = (sku,qty) => {
    fireEvent('Clicked add to bag on quick view');

    const quickViewBox = document.querySelector(`.${ID}-quickView`);

    window.jQuery.ajax({
        url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
        type: 'post',
        data: `Quantity=${qty}&cartAction=add&pid=${sku}`,
        success: function () {
            window.scrollTo(0, 0);
            closeLightbox(quickViewBox);

            // show box
            const added = document.querySelector(`.${ID}-addedBox`);
            added.classList.add(`visible`);

            setTimeout(() => {
                added.classList.remove(`visible`);
            }, 10000);
        }
    });
}

/**
 * Load in product details for quick view
 */
export const loadProduct = (sku, name, price, image) => {

    return new Promise((resolve, reject) => {

        const quickViewBox = document.querySelector(`.${ID}-quickView .${ID}-modalInner`);

        quickViewBox.innerHTML = '';

        let productURL;
        if(sku === '472802') {
            productURL = `https://www.hotelchocolat.com/uk/stellar-white-velvetiser.html`;
        } else {
            productURL = `https://www.hotelchocolat.com/uk/${sku}.html`;
        }

        const request = new XMLHttpRequest();
        request.open('GET', productURL, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                const temp = document.createElement('html');
                temp.innerHTML = request.responseText;

                const reviews = temp.querySelector('.product-review-links.product-review-links-top');
                const subheading = temp.querySelector('#page_heading h3');
                const stockLevel = temp.querySelector('.availability-msg');
                const description = temp.querySelector('#tabDesc');
                const ingredients = temp.querySelector('#tabIngredients');

                let stock;
                let col;

                if(!stockLevel || stockLevel.querySelector('.not-available-msg')) {
                    stock = 'Out of stock';
                    col = 'color: #bc0031;';
                } else {
                    stock = 'In Stock';
                    col = 'color: black;';
                }

                quickViewBox.innerHTML =
                    `<h2>${name}</h2>
                    <h4>${subheading.textContent}</h4>
                    <div class="${ID}-productMain">
                        <div class="${ID}-top">
                        <div class="${ID}-image" style="${image}""></div>
                            <div class="${ID}-info">
                                <div class="${ID}-row">
                                    <div class="${ID}-price">${price}</div>
                                    <span class="ref">Ref: ${sku}</span>
                                </div>
                                <div class="${ID}-reviews">${reviews ? reviews.innerHTML : ''}</div>
                                
                                <div class="${ID}-stockLvl" style="${col}">${stock}</div>
                                <div class="${ID}-row ${ID}-cta">
                                    <div class="${ID}-qty">
                                        <div class="${ID}-qtyButton ${ID}-minus">-</div>
                                            <input type="number" class="${ID}-quantity-input" value="1" step="1" min="1" max="" name="quantity">
                                        <div class="${ID}-qtyButton ${ID}-plus">+</div>
                                    </div>
                                    ${stock === 'Out of stock' ? ` <div class="${ID}-addBtn ${ID}-disabled" data-id="${sku}">Out of stock</div>` : 
                                    `<div class="${ID}-addBtn" data-id="${sku}">Add to bag</div>`}
                                </div>
                            </div>
                        </div>
                        <div class="${ID}-details">
                            <div class="${ID}-quickTab">
                                <h3>Description</h3>
                                <div class="${ID}-content">${description.innerHTML}</div>
                            </div>
                            <div class="${ID}-quickTab">
                                <h3>Ingredients</h3>
                                <div class="${ID}-content">${ingredients.innerHTML}</div>
                            </div>
                        </div>
                    </div>`;

                resolve();
            }
        };
        request.send();
    });
}

/**
 * To run each time new products added
 */

const plus = () => {
    if (document.querySelector(`.${ID}-quantity-input`)) {
        var value = parseInt(document.querySelector(`.${ID}-quantity-input`).value, 10);
        value = isNaN(value) ? 1 : value;
        value++;
        document.querySelector(`.${ID}-quantity-input`).value = value;
    }
}
const minus = () => {
    if (document.querySelector(`.${ID}-quantity-input`)) {
        var value = parseInt(document.querySelector(`.${ID}-quantity-input`).value, 10);
        value = isNaN(value) ? 1 : value;
        value--;
        value < 1 ? value = 1 : '';
        document.querySelector(`.${ID}-quantity-input`).value = value;
    }
}
export const triggerQuickView = () => {
    // loop through all products
    const quickView = document.querySelector(`.${ID}-quickView`);
    const allProducts = document.querySelectorAll(`.${ID}-product`);

    for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        element.addEventListener('click', () => {

            window._uxa = window._uxa || [];
            window._uxa.push(['trackPageview', window.location.pathname+window.location.hash.replace('#', '?__')+'?cs-popin-product_quick_view_HC090']);
            const elName = element.querySelector(`.${ID}-info p`).textContent;
            const elSku = element.getAttribute('sku');
            const elPrice = element.querySelector(`.${ID}-info span:not(.${ID}-ref)`).textContent;
            const elImage = element.querySelector(`.${ID}-image`).getAttribute('style');


            loadProduct(elSku, elName, elPrice, elImage).then(() => {
                openLightbox(quickView);

                fireEvent('Clicked product');

                // on description and ingredients click
                const tabs = document.querySelectorAll(`.${ID}-quickTab`);
                for (let index = 0; index < tabs.length; index++) {
                    const tab = tabs[index];
                    tab.querySelector('h3').addEventListener('click', () => {
                        if (tab.classList.contains(`${ID}-tabActive`)) {
                            tab.classList.remove(`${ID}-tabActive`)
                        } else {
                            tab.classList.add(`${ID}-tabActive`)
                        }
                    });
                }

                /** Increase qty in quick view */

                const increaseValueBtn = document.querySelector(`.${ID}-qtyButton.${ID}-plus`);
                const decreaseValueBtn = document.querySelector(`.${ID}-qtyButton.${ID}-minus`);

                if (increaseValueBtn) {
                    increaseValueBtn.addEventListener('click', () => {
                        plus();
                    });
                    decreaseValueBtn.addEventListener('click', () => {
                        minus();
                    });
                }


                // add to bag
                document.querySelector(`.${ID}-addBtn`).addEventListener('click', () => {
                    const qtyAmount = document.querySelector(`.${ID}-quantity-input`).value;
                    addProductsToBag(elSku, qtyAmount);
                })
            });
        });

    }
}


/**
 * Add filters
 */
export const addFilters = () => {
    const filterArr = window.HCfilterList;

    //const filterArr = ['hampers', 'lovely little things', 'easter gifts', 'boxed selections', 'sleeksters', 'luxes', 'statement selections', 'h-boxes', 'selectors', 'alcohol', 'batons', 'iconic chocolate', 'macarons', 'velvetiser']
    for (let index = 0; index < filterArr.length; index++) {
        const element = filterArr[index];
        const newFilter = document.createElement('div');
        newFilter.classList.add(`${ID}-filter`);

        const filterName = element.split(' ').join('-').toLowerCase();
        newFilter.setAttribute('data-target', filterName);
        newFilter.innerHTML = element;
        
        document.querySelector(`.${ID}-filterList`).appendChild(newFilter);
    }

    // const filters = 
    // `<div class="${ID}-filter" data-target="hampers">Hampers</div>
    // <div class="${ID}-filter" data-target="lovely-little-things">Lovely little things</div>
    // <div class="${ID}-filter" data-target="easter-gifts">Easter Gifts</div>
    // <div class="${ID}-filter" data-target="boxed-selections">Boxed Selections</div>
    // <div class="${ID}-filter" data-target="sleeksters">Sleeksters</div>
    // <div class="${ID}-filter" data-target="luxes">Luxes</div>
    // <div class="${ID}-filter" data-target="statement-selections">Statement selections</div>
    // <div class="${ID}-filter" data-target="h-boxes">H-Boxes</div>
    // <div class="${ID}-filter" data-target="selectors">Selectors</div>
    // <div class="${ID}-filter" data-target="advent-calendars">Advent Calendars</div>
    // <div class="${ID}-filter" data-target="alcohol">Alcohol</div>
    // <div class="${ID}-filter" data-target="iconic-chocolate">Iconic Chocolate</div>
    // <div class="${ID}-filter" data-target="batons">Batons</div>
    // <div class="${ID}-filter" data-target="macarons">Macarons</div>
    // <div class="${ID}-filter" data-target="velvetiser">Velvetiser</div>`;

   // document.querySelector(`.${ID}-filterList`).insertAdjacentHTML('afterbegin', filters);
}

/**
 * Remove filters, needed for submit to refresh products
 */
export const removeFilters = () => {
    document.querySelector(`.${ID}-filterList`).innerHTML = '';
}
/**
 * Filter events, only on submit
 */
export const clickFilters = () => {
    // filter clicks 
    const allFilters = document.querySelectorAll(`.${ID}-filter`);
    const products = document.querySelector(`.${ID}-products`);
    const allProducts =  document.querySelectorAll(`.${ID}-product`);

    for (let index = 0; index < allFilters.length; index += 1) {

        const element = allFilters[index];

        const allAttributes = element.getAttribute('data-target');
        element.classList.add(`${ID}-disabled`);

        // disable filters with 0 products
         // loop through products
         for (let index = 0; index < allProducts.length; index++) {
            const product = allProducts[index];
            

            if(product.getAttribute('filter-attr').indexOf(allAttributes) > -1) {
                element.classList.remove(`${ID}-disabled`);
                
                break; 
            } 
            
        }

        element.addEventListener('click', (e) => {

            fireEvent('Clicked filter');

            // remove any others that are active
            const alreadyActive = document.querySelector(`.${ID}-filter.${ID}-filterActive`);
            if(alreadyActive && alreadyActive !== e.currentTarget) {
                const filterTargetActive = document.querySelector(`.${ID}-filter.${ID}-filterActive`).getAttribute('data-target');
                alreadyActive.classList.remove(`${ID}-filterActive`);

                filteredProducts('remove', filterTargetActive);
            }

            const filterClicked = e.currentTarget.getAttribute('data-target');

            // add active state
            if (e.currentTarget.classList.contains(`${ID}-filterActive`)) {

                e.currentTarget.classList.remove(`${ID}-filterActive`);
                // remove filtered
                filteredProducts('remove', filterClicked);

            } else {
                e.currentTarget.classList.add(`${ID}-filterActive`);

                // show filtered
                filteredProducts('show', filterClicked);
            }

            // if filters chosen, add class to parent
            if (!document.querySelector(`.${ID}-filterActive`)) {
                products.classList.remove(`${ID}-filtered`);
            } else {
                products.classList.add(`${ID}-filtered`);
            }
        });

    }
}

/**
 * Show matching filter products
 */
export const filteredProducts = (action, filterName) => {
    const allProducts = document.querySelectorAll(`.${ID}-product`);

    allProducts.forEach(product => {
        if (product.getAttribute('filter-attr').indexOf(filterName) > -1) {
            if (action === 'remove') {
                product.classList.remove(`${ID}-show`);
            } else if (action === 'show') {
                product.classList.add(`${ID}-show`);
            }

        }
    });
}
