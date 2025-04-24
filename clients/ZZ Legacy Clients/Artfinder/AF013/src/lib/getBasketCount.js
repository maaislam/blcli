import elements from './elements';

const getBasketCount = () => {
    const basketCount = parseInt(elements?.basketCount?.innerHTML);
    return basketCount;
};

export default getBasketCount;