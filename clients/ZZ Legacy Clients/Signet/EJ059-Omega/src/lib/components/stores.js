/**
 * Other watches
 */
import shared from "../shared";
import { getData } from "../productData";

const { ID } = shared;

export default () => {
    
    const productSKU = window.digitalData.product[0].productInfo.masterSku;
    const productObj = getData(productSKU);

    const storeList = productObj.stores;
    if(storeList) {
        Object.keys(storeList).forEach((i) => {
            const data =  storeList[i];

            const storeName = [i][0];

            const storeDetail = document.createElement('div');
            storeDetail.classList.add(`${ID}__store`);
            storeDetail.innerHTML = `
                <div class="${ID}__storeaddress">
                <span>${storeName}</span>
                ${data.address}
                </div>
                <a class="${ID}__textLink" href="${data.link}">Store Details</a>`;   

                document.querySelector(`.${ID}__stores .${ID}__storeList`).appendChild(storeDetail);
        });


        const storeCount = productObj.storeAmount;
        const storeContainer = document.querySelector(`.${ID}__stores .${ID}__sectionContainer`);

        const addMoreStoreButton = () => {
            const moreStoresbutton = document.createElement('div');
            moreStoresbutton.classList.add(`${ID}__button`)
            moreStoresbutton.classList.add(`${ID}__light`);
            moreStoresbutton.innerHTML = 'Show all stores';
            
            document.querySelector(`.${ID}__stores .${ID}__sectionContainer`).appendChild(moreStoresbutton);

            moreStoresbutton.addEventListener('click', () => {  
                storeContainer.classList.remove(`${ID}-moreThanTwo`);
                moreStoresbutton.style.display = 'none';
            });
        }
        if(storeCount && storeCount > 3) {
            storeContainer.classList.add(`${ID}-moreThanTwo`);
            addMoreStoreButton();
        }
    }
}
  
