import {
    pollerLite,
    throttle
} from '../../../../../lib/uc-lib';
import {
    splitOffers,
    costCalculator,
    setFakeCompareButtons,
} from '../lib/services';
import settings from './settings';
const {
    ID
} = settings;
export default (name) => {
    const productsSection = document.querySelector('#ctl00_ctl00_compareProducts_pnlProducts');
    if (productsSection) {
        const productRows = productsSection.querySelectorAll('table.comparetable tbody tr');
        if (productRows) {
            let numOfRows = 0;
            [].forEach.call(productRows, (row) => {
                let flag = '';
                //Add single element classes based on the first element in each row
                const curRow = row.querySelector('td');
                const curText = curRow.querySelector('span').textContent.trim().toLowerCase();
                const newText = curText.replace(/\s|[()]/g, '');
                row.classList.add(`${ID}-${newText}`);
                //Old stuff
                const columns = row.querySelectorAll('td');
                const numOfColumns = columns.length;
                if (numOfColumns > 1) {
                    for (let col = 0; col < numOfColumns; col += 1) {
                        columns[col].classList.add(`product-${col}`);
                        if (col === 0 && columns[col].innerHTML === '<span>Item</span>') {
                            flag = 'title';
                        } else if (col === 0 && columns[col].innerHTML === '<span>Price</span>') {
                            flag = 'price';
                        } else if (columns[col].innerHTML === '<span>User Rating</span>' || columns[col].querySelector('img.compare_ratingimg')) {
                            flag = 'rating';
                        } else if (columns[col].querySelector('img.compareimagecell')) {
                            flag = 'img';
                        } else if (columns[col].getAttribute('colspan') === 4) {
                            columns[col].style.padding = '0px !important';
                        } else if (columns[col].querySelector('a.btn.btn-block.btn-outline-info')) {
                            flag = 'button';
                        } else if (col === 0 && numOfRows === 0 || columns[col].querySelector('a#ctl00_ctl00_compareProducts_lnkRemove0')) {
                            flag = 'remove';
                        }

                        if (flag !== '') {
                            columns[col].classList.add(`product-${flag}`);
                            if (flag === 'button') {
                                columns[col].parentElement.style.display = 'none !important';
                            }
                        }
                    }
                } else if (numOfColumns === 1) {
                    columns[0].classList.add('header');
                }
                numOfRows += 1;
                // --- Hide Control View Button in Compare Tool
                if (row.classList.contains(`${ID}-price`)) {
                  row.nextElementSibling.setAttribute('style', 'display: none;');
                }
            });
        }

        // Rearrange Elements
        const firstRow = document.querySelectorAll('table.comparetable tbody tr')[0];
        const tableColumns = firstRow.querySelectorAll('td');
        const numOfProducts = tableColumns.length;
        let stickyItems = '';
        for (let i = 1; i < numOfProducts; i += 1) {
            const productDetails = document.querySelectorAll(`table.comparetable td.product-${i}`);
            const productName = document.querySelector(`table.comparetable td.product-${i}.product-title a.compareProductname`).innerText.trim();
            if (window.location.href.indexOf('/product/') > -1 && name !== null && name.indexOf(productName) > -1) {
                let count = 0;
                let colour = '#EFEFEF';
                [].forEach.call(productDetails, (item) => {
                    item.classList.add(`${ID}-currentProduct`);
                    if (count > 0 && count !== 5) {
                        if (colour === '#EFEFEF') {
                            colour = '#E7E7E7';
                            item.style.backgroundColor = colour;
                        } else if (colour === '#E7E7E7') {
                            colour = '#EFEFEF';
                            item.style.backgroundColor = colour;
                        }
                    }
                    count += 1;
                });
            }
            const productUrl = document.querySelector(`table.comparetable td.product-${i}.product-img a.compareProductname`);
            const newSection = `<a href='${productUrl}' class='${ID}-productName'>${productName}</a>
            <div class='${ID}-ctaBtns'>
                <div class="${ID}_ctaButtonWrap">
                    <a class="${ID}-btn__remove btn btn-block btn-outline-info remove" data-prod="product-${i}">Remove</a>
                </div>
                <div class="${ID}_ctaButtonWrap">
                    <a class="${ID}-btn__view btn btn-block btn-outline-info" href='${productUrl}'>View</a>
                </div>
            </div>`;
            if(!productUrl.querySelector(`.${ID}-ctaBtns`)){
                productUrl.insertAdjacentHTML('afterend', newSection);
            }

            // Change Price Text
            let newPriceText = '';
            const priceSection = document.querySelector(`table.comparetable td.product-${i}.product-price span.compareprice`);
            if (priceSection) {
                let priceHTML = priceSection.innerHTML.replace(' ex VAT / ', '');
                priceSection.innerHTML = priceHTML;
                const priceRed = priceSection.querySelector('.red');
                priceRed.style.display = 'block';
                let priceRedText = priceRed.innerText.trim();
                priceRedText = `${priceRedText} ex VAT`;
                priceRed.innerText = priceRedText;
                newPriceText = priceSection.innerHTML;
            }
            // Sticky Table Item
            stickyItems += `<td class="${ID}-cell compareitemcell product-1">
            <span class='${ID}-title'><a href='${productUrl}'>${productName}</a></span>
            <span class="${ID}-price hidden">
                ${newPriceText}
            </span>
            </td>`;

            // "Remove" CTA Button
            const removeCtaBtn = document.querySelector(`td.product-${i} .${ID}-btn__remove`);
            if (removeCtaBtn) {
                removeCtaBtn.addEventListener('click', () => {
                    const hiddenRemove = document.querySelector(`td.product-${i}.product-remove a`);
                    hiddenRemove.click();
                });
            }
        }

        const stickyTitlesContainer = `<div class="${ID}-sticky_titles hidden">
            <table class="${ID}-sticky">
            <tbody>
                <tr>
                <td class="${ID}-cell comparetitlewhite product-0">
                    <span>&nbsp;</span>
                </td>
                ${stickyItems}
                </tr>
            </tbody>
            </table>
        </div>`;
        const stickyHeaderContainer = document.querySelector('section.compare-table header.py-1.h6 .grid');
        if (stickyHeaderContainer) {
            stickyHeaderContainer.insertAdjacentHTML('afterend', stickyTitlesContainer);
        }
        document.querySelector('section.compare-table').addEventListener("scroll", throttle(function () {
            const titleRow = document.querySelector(`tr.${ID}-productImage`).getBoundingClientRect();
            if (titleRow.top < 100) {
                document.querySelector(`.${ID}-sticky_titles`).classList.remove('hidden');
            } else {
                document.querySelector(`.${ID}-sticky_titles`).classList.add('hidden');
            }
            const priceRow = document.querySelector('td.product-price').getBoundingClientRect();
            const prices = document.querySelectorAll(`.${ID}-price`);
            if (priceRow.top < 220) {
                document.querySelector(`.${ID}-price`).classList.remove('hidden');
                [].forEach.call(prices, (price) => {
                    price.classList.remove('hidden');
                });
            } else {
                [].forEach.call(prices, (price) => {
                    // price.classList.add('hidden');
                });
            }
        }, 200));

        // Remove "View" Button
        const viewCta = document.querySelector('.product-button');
        if (viewCta) {
            const viewCtaRow = viewCta.parentNode;
            if (viewCtaRow) {
                viewCtaRow.parentNode.removeChild(viewCtaRow);
            }
        }

        // Image Row
        const imageRow = document.querySelector('.product-img').parentNode;
        if (imageRow) {
            imageRow.style.backgroundColor = '#FFF !important';
            imageRow.classList.add(`${ID}-productImage`);
        }

        //Split offers
        splitOffers(productsSection);
        //Move part numbers
        const partNum = productsSection.querySelector(`.${ID}-partnumber`);
        const partNumContent = partNum.innerHTML;
        const partNumClass = partNum.getAttribute('class');
        const newRow = document.createElement('tr');
        newRow.classList.add(partNumClass);
        newRow.innerHTML = partNumContent;
        partNum.parentNode.removeChild(partNum);
        productsSection.querySelector(`.${ID}-print`).insertAdjacentElement('beforebegin', newRow);
        //Init calculators and apply green to the cheapests
        costCalculator();

        // --- Check for Safari
        const ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
          if (ua.indexOf('chrome') > -1) {
          // Chrome
          } else {
            // Safari
            document.querySelector('section.compare-table header div.grid').setAttribute('style', 'padding-top: 24px;');
          }
        }
    }
};