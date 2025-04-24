import shared from '../../../../../core-files/shared';
import { pollerLite } from '.../../../../lib/uc-lib';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getItemMarkup = (item, index, type, price) => {
    const buttonText = item?.type == 'PDP' ? 'View' : 'View All';
    return `<div class="${ID}-grid__col ${ID}-grid__col-${index}">
        <a href="${item.url}" class="${ID}-grid__item ${ID}-product-link" data-type="${type}">
            <img src="${item.imageURL}" class="${ID}-grid__image" alt="${item.title}" loading=lazy />
            <p class="${ID}-title">${item.title}</p>
            ${price ? `<p class="${ID}-price">${price}</p>` : ''}
            <span class="btn btn-primary btn-block ${ID}-grid__button">${buttonText}</span>
        </a>
    </div>`;
};

const getNonPDPItemsMarkup = (items) => {
    let html = '';
    const nonPDPItems = items.filter((item) => {
        return item?.type !== 'PDP';
    });
    nonPDPItems.forEach((item, index) => {
        html = html + 
        getItemMarkup(item, index, item.type);
    });
    return html;
};

const insertPDPItemsMarkup = (items) =>  {
    let pdpMarkups = [];
    const pdpItems = items.filter((item) => {
        return item?.type == 'PDP';
    });
    pdpItems.forEach((item, index) => {
        fetch(item.url).then((response) => {
            return response.text();
        }).then((htmlString) => {
            // Convert the HTML string into a document object
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, "text/html");
            const priceElement = doc.querySelectorAll('.price-blk')[0];
            let price = priceElement?.innerText;
            let pdpHTML = getItemMarkup(item, index, item.type, price);
            pdpMarkups.push({
                index: index,
                markup: pdpHTML
            });
            // Sort the array by index
            pdpMarkups.sort((item, nextItem) => {
                return item.index - nextItem.index;
            });
        });
    });
    // Wait for the amount of finished requests for the item markup to equal the amount of PDPS in this item, then insert them all.
    pollerLite([
        () => {
            return pdpItems.length == pdpMarkups.length
        }
    ], () => {
        const grid = document.querySelector(`.${ID}-grid`);
        pdpMarkups.forEach(item => {
            grid.insertAdjacentHTML('beforeEnd', item.markup);
        });
    });
    
};
const getMarkup = (items) => {
    let nonPDPItemsHTML = getNonPDPItemsMarkup(items);
    insertPDPItemsMarkup(items);
    let html = `
    <div class="${ID}-section">
        <div class="container">
            <h3 class="${ID}-section__header">Did you know we also sell?</h3>
            <div class="${ID}-grid">
            ${nonPDPItemsHTML}
            </div>
        </div>
    </div>`;
    return html;
};

export default getMarkup;