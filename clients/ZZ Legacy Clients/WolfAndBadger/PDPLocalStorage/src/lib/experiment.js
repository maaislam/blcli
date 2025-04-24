export default () => {

  const KEY_NAME = 'WBUC_Products';

  const universalData = window.universal_variable?.product;

  const data = {
    name: universalData.name, 
    sku: universalData.sku_code, 
    url: universalData.url, 
    price: $('meta[itemprop=price]').attr('content') + ' ' + universalData.currency,
    brand: universalData.manufacturer,
    onsale: $('.discounted-price').length > 0 ? 'yes' : 'no',
    sizeselector: $('.size-variant').length > 0 || $('[name="variants"]').length > 0 ? 'yes' : 'no',
    colouroptions: $('.alt-colors').length > 0 ? 'yes' : 'no',
    category: $('.breadcrumbs a:last-of-type').text(),
    sustainables: $('.sustainability-accordion .sustainability-icon').map((i, img) => img.alt.replace('Icon for', '').trim().toLowerCase()).get().join('/'),
    subcategory: $('.breadcrumbs a:nth-last-child(3)').text(),
    gift: document.referrer.match(/gifts/i) ? 'yes' : 'no',
  };

  const existingStore = (localStorage.getItem(KEY_NAME) || '[]');

  try {
    const arr = JSON.parse(existingStore);
    if(arr[arr.length - 1]?.sku != data.sku) {
      arr.push(data);
    }

    localStorage.setItem(KEY_NAME, JSON.stringify(arr));
  } catch(e) {}
};
