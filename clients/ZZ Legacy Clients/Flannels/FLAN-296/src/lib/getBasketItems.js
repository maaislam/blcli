import convertToLowerCaseString from './convertToLowerCaseString';

const getBasketItems = () => {
    // Get item names
    const items = document.querySelectorAll('.liPrdLnk');
    const itemNames = Array.prototype.map.call(items, (item) => {
        const name = item.querySelector('.BaskName')?.innerText;
        const id = item.getAttribute('id');
        let idWithoutLi = id.replace('li','');
        // Remove spaces
        idWithoutLi = idWithoutLi.replace(/\s/g, '');
        // console.log
        return {
            name: convertToLowerCaseString(name),
            colourCode: idWithoutLi
        };
    });
    return itemNames;
};

export default getBasketItems;