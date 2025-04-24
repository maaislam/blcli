/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const getBasketDetails = () => {

	let dataObject;
	for (let i = 0; i < window.dataLayer.length; i += 1) {
	  const data = window.dataLayer[i];
	  if (typeof data === 'object' && data.event && data.event === 'basketView') {
	    dataObject = data;
	    break;
	  }
	}
	return dataObject.basketProducts;

}

export default () => {
    setup();

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // -----------------------------
    // ...
    const checkOutButtons = document.querySelectorAll('.ContinueOn')
    checkOutButtons.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            fireEvent(`Customer clicks Continue Securely in Variation-${VARIATION}`);
        })
    });

    var status = false
    const cartInfo = [];
    document.querySelectorAll('#gvBasketDetails table tbody tr').forEach((item, index) => {
        let productTitle, productID, quantity, price, total, productIdIndex, mainPrice, maintotal, url;
        productTitle = item.querySelector('#dhypProductLink').innerText;
        productID = item.querySelector('#dhypProductLink').getAttribute('href');
        productIdIndex = productID.lastIndexOf('=');
        productID = Number(productID.slice(productIdIndex + 1));
        quantity = Number(item.querySelector('.prdQuantity .qtybox').value);
        mainPrice = item.querySelector('.itemprice .money').textContent;
        price = Number(mainPrice.replace('£', '')).toFixed(2);
        maintotal = item.querySelector('.itemtotalprice .money').innerText;
        total = Number(maintotal.slice(1)).toFixed(2);
        item.querySelector('.productdesc').parentElement.setAttribute('id', productID);
        url = item.querySelector('.prodDescContainer .productTitle');
        url = url ? url.href : '';
        cartInfo.push({
            id: productID,
            productTitle: productTitle,
            price: price,
            total: total,
            quantity: quantity,
            url: url
        });
    });

    let recentlyViewdProducts =
        Boolean(window.localStorage.recentlyViewedProducts) == true ? JSON.parse(window.localStorage.recentlyViewedProducts) : '';
    recentlyViewdProducts &&
        recentlyViewdProducts.forEach((item) => {

            cartInfo.forEach((item1) => {
                if (item.id == item1.id) {
                    item1.orginalPrice = Number(item.product.ProdVarPrices.RefPriceRaw);
                    item1.orginalPriceTotal = Number((item1.orginalPrice * item1.quantity).toFixed(2));
                }
                if (item1.orginalPrice && item1.price != item1.orginalPrice && item1.orginalPrice != 0) {
                    status = true
                }
            });
        });
    cartInfo.forEach((item) => {
        if (!item.orginalPrice && item.url !== '') {
            var request = new XMLHttpRequest();
            request.open('GET', item.url, false); // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                const html = request.responseText
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                const originalPriceElm = doc.querySelector('.originalprice span')
                if (originalPriceElm) {
                    let value = (originalPriceElm.innerText).trim()
                    item.orginalPrice = Number(value.replace('£', ''))
                    item.orginalPriceTotal = Number((item.orginalPrice * item.quantity).toFixed(2));
                    if (item.orginalPrice && item.price != item.orginalPrice && item.orginalPrice != 0) {
                        status = true
                    }
                }
            }
        }
    });

    if (status) {
        fireEvent(`Customer has a discounted item in their basket & views their basket in Variation-${VARIATION}`);
    }


    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (shared.VARIATION == 'control') {
        return;
    }

    // Write experiment code here
    // ...

    const initMain = () => {
        document.documentElement.classList.add(`${ID}-savings`);
        fireEvent('Experiment seen');
        let subTotalRow = document.querySelector('#SubtotalRow');
        subTotalRow &&
            subTotalRow.querySelectorAll('.col-xs-6').forEach((item) => {
                item.classList.remove('col-xs-6');
                item.classList.add('col-xs-4');
            });
        subTotalRow &&
            subTotalRow.insertAdjacentHTML(
                'beforeend',
                `<div class="text-right col-xs-4 sumOriginalTotal">
            subtotal </div>`
            );
        subTotalRow &&
            subTotalRow.insertAdjacentHTML('afterend',
                `<div id="SavingsRow" class="col-xs-12 SubSumm" data-price="73.00" data-itemcount="1">
                    <div class="col-xs-4"></div>
                    <div class="text-right col-xs-4">
                        Saving :
                    </div>
                    <div class="text-right col-xs-4 savingAmount">£185 </div>
                </div>`
            );
        subTotalRow && cartCalculation(cartInfo);
    };

    const cartCalculation = (cartInfo) => {
        let orginalPriceTotalSum = 0;
        let finalSaving = 0;
        let totalValue = 0;
        cartInfo.filter((info) => {
            if (info.orginalPrice > 0) {
                orginalPriceTotalSum = orginalPriceTotalSum + info.orginalPriceTotal;
                finalSaving += Number(info.orginalPriceTotal) - Number(info.total);
            } else if (info.orginalPrice == 0) {
                orginalPriceTotalSum = orginalPriceTotalSum + Number(info.total);
            }
            updateProductItemDom(info);
        });

        summaryUpdate(orginalPriceTotalSum, finalSaving, totalValue);
    };

    const summaryUpdate = (orginalPriceTotalSum, finalSaving, totalValue) => {
        document.querySelector('.sumOriginalTotal').textContent = ' £' + orginalPriceTotalSum.toFixed(2);
        document.querySelector('#SubtotalRow').children[1].textContent = 'Subtotal';
        totalValue = Number(document.querySelector('#TotalValue').textContent.replace('£', ''));
        document.querySelector('.savingAmount').textContent = '-£' + finalSaving.toFixed(2);
    };

    const updateProductItemDom = (info) => {
        let tr = document.querySelectorAll('#gvBasketDetails table tbody tr');
        tr.forEach((item) => {
            let trID = item.getAttribute('id');
            if (trID == info.id) {
                let itemprice = item.querySelector('.itemprice .money');
                let itemtoTalprice = item.querySelector('.itemtotalprice .money');
                if (info.price != info.orginalPrice && info.orginalPrice != 0) {
                    if (info.orginalPrice) {
                        itemprice.insertAdjacentHTML('beforebegin', `<span class="originalPrice"> £${parseFloat(info.orginalPrice).toFixed(2)}</span>`);
                    }
                    if (info.orginalPriceTotal) {
                        itemtoTalprice.insertAdjacentHTML('beforebegin', `<span class="originalTotalPrice"> £${parseFloat(info.orginalPriceTotal).toFixed(2)}</span>`);
                    }

                }
            }
        });
    };
    
    let startExp = false;

    let productsInBasket = getBasketDetails();
    [].slice.call(productsInBasket).forEach((product) => {
        if(product.isFullPrice == false) {
            startExp = true;
        }
    })
    

    if(startExp == true) {
        initMain();
    }
    
    
};