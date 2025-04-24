import shared from '../shared';

const { ID } = shared;

export default () => {

    // remove the storage based on product name
    function removeStorage (event) {
        const target = event.querySelector(`.${ID}-product_name`).textContent;
        const saved = localStorage.getItem(`${ID}saved_1`);
        const parsedSaved = JSON.parse(saved);
        for (let i = 0; i < parsedSaved.length; i += 1) {
            if (parsedSaved[i].name == target) {
                parsedSaved.splice(i, 1);
                localStorage.setItem('EJ051saved_1', JSON.stringify(parsedSaved));
            }
        }
    }

    const allSavedProducts = document.querySelectorAll(`.${ID}-savedProducts .${ID}_saved-item`);

    if(allSavedProducts) {
        for (let index = 0; index < allSavedProducts.length; index += 1) {
            const element = allSavedProducts[index];
            element.querySelector(`.${ID}-savedremove`).addEventListener('click', () => {
                removeStorage(element);
                window.scrollTo(0, 0);
                window.location.reload();
            });
        }
    }
}