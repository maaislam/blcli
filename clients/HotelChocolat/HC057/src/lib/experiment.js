/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events, poller, pollerLite } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  const moveMenu = () => {
    const newMenu = document.createElement('div');
    newMenu.classList.add(`${ID}-menu`);
    newMenu.innerHTML = `<h3>Explore what's inside...</h3>
    <div class="${ID}-menuEl"></div>`
    document.querySelector('#product-content').insertAdjacentElement('afterend', newMenu);

    const menu = document.querySelector('.descSection3.additional.menu');
    document.querySelector(`.${ID}-menuEl`).appendChild(menu);

}

const createQuickViewBox = () => {
    const overlay = document.createElement('div');
    overlay.classList.add(`${ID}-overlay`);

    const quickViewDetails = document.createElement('div');
    quickViewDetails.classList.add(`${ID}-quickViewBox`);
    quickViewDetails.innerHTML = `
        <div class="${ID}-close"></div>
        <div class="${ID}-content"></div>`

    document.body.appendChild(quickViewDetails);
    document.body.appendChild(overlay);
}

const tabEvents = () => {
    const accItem = document.querySelectorAll(`.${ID}-quickViewBox .tabs-menu > li`);

    for (let index = 0; index < accItem.length; index++) {
        const element = accItem[index];
        element.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            } else {
                element.classList.add('active');
            }
        });
    }
}

const showQuickView = () => {
    const overlay = document.querySelector(`.${ID}-overlay`);
    const quickBox = document.querySelector(`.${ID}-quickViewBox`);
    document.body.classList.add(`${ID}-noScroll`);

    overlay.classList.add(`${ID}-overlayShow`);
    quickBox.classList.add(`${ID}-boxShow`);

    tabEvents();
}

const closeQuickView = () => {
    const overlay = document.querySelector(`.${ID}-overlay`);
    const quickBox = document.querySelector(`.${ID}-quickViewBox`);
    document.body.classList.remove(`${ID}-noScroll`);

    overlay.classList.remove(`${ID}-overlayShow`);
    quickBox.classList.remove(`${ID}-boxShow`);
    quickBox.querySelector(`.${ID}-content`).scrollTop = 0;
}

// on click of quick view, pull in the details
const quickView = () => {
    const allQuickViewItems = document.querySelectorAll(`.${ID}-menu li`);
    for (let index = 0; index < allQuickViewItems.length; index += 1) {
        const element = allQuickViewItems[index];

        element.addEventListener('click', (e) => {
            e.preventDefault();
            const quickLink = element.querySelector('a').getAttribute('href');
            const request = new XMLHttpRequest();
            request.open('GET', quickLink, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    const temp = document.createElement('html');
                    temp.innerHTML = request.responseText;

                    document.querySelector(`.${ID}-quickViewBox .${ID}-content`).innerHTML = temp.innerHTML;
                    showQuickView();
                    fireEvent('Clicked quick view');
                }
            };
            request.send();

        });
    }

    const closeBox = document.querySelector(`.${ID}-quickViewBox .${ID}-close`);
    const overlay = document.querySelector(`.${ID}-overlay`);

    closeBox.addEventListener('click', () => {
        closeQuickView();
    });
    overlay.addEventListener('click', () => {
        closeQuickView();
    });
}


// move quick view
const moveButtons = () => {
    const allProducts = document.querySelectorAll('.descSection3.additional.menu .active');
    for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const quickView = element.querySelector('.quickview');
        quickView.innerHTML = `<span>Quick View</span>`;
        element.appendChild(quickView);
    }
}


if(!document.querySelector(`.${ID}-menuEl .component-content`)) {
    moveMenu();
    createQuickViewBox();
    tabEvents();
    showQuickView();
    closeQuickView();
    quickView();
    moveButtons();
}  

pollerLite(['.descSection3.additional.menu .component-content ul'], () => {
  addMenu();
});

}
