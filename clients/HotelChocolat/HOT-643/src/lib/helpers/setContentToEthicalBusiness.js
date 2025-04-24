import { ethicalBusinessData } from "../data/data";

const setContentToEthicalBusiness = (id) => {
    const ethicalCarouselItems = document.querySelectorAll('.HCN-ethicalbusiness-product-carousel .HCN-item');
    ethicalCarouselItems.forEach((item) => {
        const titleElem = item.querySelector('.HCN-item--content h3');
        const title = titleElem.textContent.trim();
        const businessData = ethicalBusinessData[title];
        if (!businessData) return;

        const htmlStr = `<div class="${id}__details">
            <p> ${businessData.details} </p>
            <span class="${id}__readMoreDetail">Read More</span>
        </div>`;
        titleElem.insertAdjacentHTML('afterend', htmlStr);
    });
};
export default setContentToEthicalBusiness;
