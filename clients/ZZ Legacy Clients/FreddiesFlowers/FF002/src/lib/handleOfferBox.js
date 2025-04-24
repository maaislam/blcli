import data from './data';
import replaceClasses from './replaceClasses';
import { setup, fireEvent } from './services';

export default (offerBox) => {
    const link = offerBox.querySelector('.iconBoxShop__link');
    const image = offerBox.querySelector('.iconBoxShop__image');
    const offerCurrentBox = data.offerBox;
    const options = {
        currentBox: offerCurrentBox,
        parent: offerBox.closest('[class*="w-"')
    };
    if (offerCurrentBox?.classes) {
        replaceClasses(options);
    }
    offerBox.querySelector('a').addEventListener('click', (e) => {
        fireEvent(`Link clicked - Freddies shop`);
    });
    
    // Add text
    link.insertAdjacentHTML('beforeend', `
        <h3 class="font-title mb-1 mt-0 leading-none font-light">Freddie\'s shop!</h3>
        <p class="m-0 text-xs leading-snug">Find the perfect vases and more for your flowers</p>
    `);
}