import data from './data';
import { setup, fireEvent } from './services';

import handleAccount from './handleAccount';
import replaceTitles from './replaceTitles';
import replaceClasses from './replaceClasses';

export default (box) => {
    const elements = {
        icon: box.querySelector('.iconBox__icon'),
        label: box.querySelector('.iconBox__label'),
        image: box.querySelector('.iconBox__image'),
        container: box.querySelector('.iconBox__container'),
    };
    // Matches current box by the image SRC
    const currentBox = data.boxes.filter((boxLayer) => {
        return elements.image.getAttribute('src') == boxLayer.imageSRC;
    })[0];
    const options = {
        elements,
        currentBox,
        parent: box.closest('[class*="w-"')
    };
    if (currentBox && currentBox?.accountAfter) {
        handleAccount(options);
    }
    if (currentBox) {
        const eventLabel = currentBox?.eventLabel ? currentBox.eventLabel : currentBox?.text;
        if (currentBox?.replaceIcon) {
            elements.image.src = currentBox.newImageSRC;
            elements.image.classList.add('iconBox__image--svg');
        }
        if (currentBox?.text) {
            replaceTitles(options);
        }
        if (currentBox?.classes) {
            replaceClasses(options);
        }
        if (currentBox?.mobileText && window.innerWidth <= 600) {
            elements.label.innerText = currentBox.mobileText;
        }
        if (eventLabel) {
            box.querySelector('a').addEventListener('click', (e) => {
                fireEvent(`Link clicked - ${eventLabel}`);
            });
        }
    }
}