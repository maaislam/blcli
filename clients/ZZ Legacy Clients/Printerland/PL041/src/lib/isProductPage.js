import elements from './elements';

const productCategory = window.dataLayer.filter(f => f.event == 'EEproductDetail')?.[0]?.ecommerce?.detail?.products?.[0]?.category;
const isConsumables = productCategory == 'Consumables';

const isProductPage = () => {
    return elements.tabContentWrapper !== null && isConsumables;
};

export default isProductPage;