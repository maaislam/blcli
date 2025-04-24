import shared from './shared';
import elements from './elements';
import buildIconTitle from './buildIconTitle';
import getCartridgesData from './getCartridgesData';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const methods = {
    getCartriges() {
        let html = '';
        getCartridgesData().forEach(cartidgeRow => {
            let thisRow = `
            <div class="${ID}-row">
                <span>${cartidgeRow.name}</span>
                <span>${cartidgeRow.unit}</span>
            </div>
            `;
            html = html + thisRow;
        });
        return html;
    },
    getPrices() {
        return `
        <div class="${ID}-row">
            <span class="${ID}-red"><strong>${elements.product.priceEx.innerText}</strong></span>
            <span><strong>${elements.product.priceInc.innerText}</strong></span>
        </div>
        <div class="${ID}-row">
            <span class="${ID}-red"><strong>ex VAT @ 20%</strong></span>
            <span><strong>inc VAT</strong></span>
        </div>
        `;
    },
};

const buildProduct = () => {
    const catridges = getCartridgesData();
    const catridgesText = catridges ? 'Cartridges included' : 'Starter catridges included only';
    const imageURL = elements.product.image.getAttribute('src');
    const catridgesHTML = catridges ? methods.getCartriges() : '';
    const html = `
    <div class="${ID}-product">
        <div class="${ID}-product__media">
            <img src="${imageURL}" class="${ID}-product__image" />
            <span class="${ID}-product__label">
            ${elements.product.stock.innerText}
            </span>
        </div>
        <div class="${ID}-product__content">
            <h2 class="${ID}-product__heading">
                ${elements.product.title.innerText}
            </h2>
            ${buildIconTitle(catridgesText, `${ID}-mb-1`)}
            <div class="${ID}-product__content-inner">
                <div>
                    ${catridgesHTML}
                </div>
                <div>
                    <div class="${ID}-mb-1">
                    Item price
                    </div>
                    <div class="${ID}-mb-2">
                        ${methods.getPrices()}
                    </div>
                    <a href="/ShoppingCart" class="btn btn--yellow ${ID}-product__button ${ID}-btn ${ID}-go-to-basket">Go to Basket</a>
                </div>
            </div>
        </div>
    </div>
    `;
    return html;
};

export default buildProduct;