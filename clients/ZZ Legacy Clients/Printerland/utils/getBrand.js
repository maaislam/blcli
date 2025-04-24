export default () => {
    return window.dataLayer.filter(f => f.event == 'EEproductDetail')?.[0]?.ecommerce?.detail?.products?.[0]?.brand;
}