import shared from './shared';
import { setup, fireEvent } from './services';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const updateLinks = (parent, url) => {
    const links = parent.querySelectorAll('a');
    links.forEach(link => {
        link.href = url;
    });
};

const updateProductPrice = (url, priceElement) => {
    fetch(url)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
            return response.text();
        }
    ).then((html) => {
        const parser = new DOMParser();
	    const doc = parser.parseFromString(html, 'text/html');
        const price = doc.querySelectorAll('.price-blk')[0]?.querySelector('p')?.innerText;
        const priceHTML = priceElement.innerHTML;
        const span = priceHTML.substring(priceHTML.indexOf("<span>"));
        priceElement.innerHTML = `${price}${span}`;
        return price;
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
};

const addProductEvents = () => {
    const products = document.querySelectorAll(`.${ID}-product`);
    const selects = document.querySelectorAll(`.${ID}-select`);
    const buttons = document.querySelectorAll(`.${ID}-button`);
    selects.forEach(select => {
        select.addEventListener('change', () => {
            const parent = select.closest('.prod_list');
            const priceElement = parent.querySelector('.price');
            const selectedOption = select[select.selectedIndex];
            const url = selectedOption.getAttribute('data-url');
            updateProductPrice(url, priceElement);
            updateLinks(parent, url);
        });
        select.addEventListener('focus', () => {
            fireEvent('Dropdown focus');
        });
        select.addEventListener('change', () => {
            fireEvent('Dropdown - option selected');
        });
    });
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            fireEvent('Button clicked');
        });
    });
    products.forEach(product => {
        const productNameLink = product.querySelector('span.productMainLink a');
        const productImageLink = product.querySelector('a.productMainLink');
        productNameLink.addEventListener('click', (e) => {
            fireEvent('Product name clicked');
        });
        productImageLink.addEventListener('click', (e) => {
            fireEvent('Product image clicked');
        });
    });
};

export default addProductEvents;