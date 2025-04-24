import setCollection from "../components/setCollection";
import spinner from "../components/spinner";
import getStrategyData from "./getProducts";
import getSearchParam from "./getSearchParam";

const setBestSellingProducts = (id) => {
    const getDystrategies = getSearchParam('dystrategies');
    const getDycategory = getSearchParam('dycategory');

    if (getDystrategies && getDycategory !== 'gifts') {
        const mainElem = document.querySelector('main')
        mainElem.insertAdjacentHTML('beforebegin', spinner(id));
        getStrategyData(getDystrategies).then((data) => {
            const filteredData = data?.filter((item) => {
                return (
                    item?.Categories?.some(
                        (cat) => cat?.PDept?.Slug === getDycategory
                    )
                );
            });
            console.log('🚀 ~ file: setBestSellingProducts.js ~ line 64 ~ getStrategyData ~ filteredData', filteredData);
            document.querySelector(`.${id}__loader`).remove();
            mainElem.insertAdjacentHTML('beforebegin', setCollection(id, filteredData, getDycategory));
        });
        mainElem.classList.add(`${id}__hide`);
    }
};
export default setBestSellingProducts;
