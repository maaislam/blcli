
export default () => {
    const productCategory = window.dataLayer.filter(f => f.event == 'EEproductDetail')?.[0]?.ecommerce?.detail?.products?.[0]?.category;
    return productCategory;
};