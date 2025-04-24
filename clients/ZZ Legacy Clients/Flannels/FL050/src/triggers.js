import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

function getPageData() {
  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
      dataObject = data;
      break;
    }
  }
  return dataObject;
}

pollerLite([() => {
  let run = false;
  if (window.dataLayer && window.dataLayer[1]) {
    run = true;
  }
  return run;
}], () => {
  const dataObject = getPageData();
  switch(dataObject.pageType){
    case 'Home':
      pollerLite([
        'body',
      ], activate);
    break;
    case 'BrowseSearch':
      pollerLite([
        'body',
      ], activate);
    break;
    case 'BrowsePL':
      pollerLite([
        '.flanProdList',
      ], activate);
    break;
    case 'ProductDetail':
      pollerLite([
        'body',
        '.SizeRequiredButton',
        '#lblProductBrand',
      ], activate);
    break;
    default:
    break;
  }
})
