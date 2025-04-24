import { setup } from './services';
import { events } from '../../../../../lib/utils';

export default () => {
  const universalData = window.universal_variable?.product;

  const data = [
    'name: ' + universalData.name, 
    'sku: ' + universalData.sku_code, 
    'url: ' + universalData.url, 
    'price: ' + $('meta[itemprop=price]').attr('content') + ' ' + universalData.currency,
    'brand: ' + universalData.manufacturer,
    $('.discounted-price').length > 0 ? 'onsale: yes' : 'onsale: no',
    $('.size-variant').length > 0 || $('[name="variants"]').length > 0 ? 'sizeselector: yes' : 'sizeselector: no',
    $('.alt-colors').length > 0 ? 'colouroptions: yes' : 'colouroptions: no',
    'category: ' + $('.breadcrumbs a:last-of-type').text(),
    'sustainables: ' + $('.sustainability-accordion .sustainability-icon').map((i, img) => img.alt.replace('Icon for', '').trim().toLowerCase()).get().join('/'),
    'subcategory: ' + $('.breadcrumbs a:nth-last-child(3)').text(),
    document.referrer.match(/gifts/i) ? 'gift: yes' : 'gift: no',
  ];

  const output = data.join(' | ');

  events.send('PDP Tracking', output);
};
