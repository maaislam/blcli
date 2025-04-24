import shared from '../../../../core-files/shared';
import { copyData } from './lib/data';

const { ID } = shared;
const country = location.pathname.includes('/de/') ? 'de' : 'fr';
const imgStorage = 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR003';
const imgSource = (contentType) => {
  const config = {
    sepa: `${imgStorage}/${country}-phone.png`,
    generic: `${imgStorage}/${country}-payment.png`,
  };
  return config[contentType];
};

const elpGen = copyData.pageIndependetData['elpGen'][country];
const elp = copyData.pageIndependetData['elp'][country];
const str = copyData.pageIndependetData['str'][country];
const trust = copyData.pageIndependetData['trust'][country];
const rc = copyData.pageIndependetData['rc'][country];
const rc1 = copyData.pageIndependetData['rc1'][country];
const heroParaSepa = copyData.pageIndependetData['heroParaSepa'][country];
const heroParaGeneric = copyData.pageIndependetData['heroParaGeneric'][country];

const getPopupTitle = (pageType) => {
  if (pageType === 'generic') {
    return `<h3>${copyData.getPopupTitle[pageType][country]}</h3>`;
  }
  if (pageType === 'sepa') {
    return `<h3>${copyData.getPopupTitle[pageType][country]}</h3>`;
  } else return '';
};
const popups = (btnContainer) => {
  return {
    sepa: `
    <div class="${ID}_image sepa" style="background-image:url(${imgSource('sepa')})"></div>
      <div class="${ID}_text">
        ${getPopupTitle('sepa')}
        ${heroParaSepa}
        ${elp}${str}${rc}
        <p class="${ID}_hidden">${trust}, including DocuSign, Tripadvisor, and The Guardian.</p>
        ${btnContainer}
      </div>
`,
    generic: `
    <div class="${ID}_image sepa" style="background-image:url(${imgSource('generic')})"></div>
      <div class="${ID}_text">
      ${getPopupTitle('generic')}
      ${heroParaGeneric}
      ${elpGen}${str}${rc1}
      <p class="${ID}_hidden">${trust}, including DocuSign, Tripadvisor, and The Guardian.</p>
        ${btnContainer}
      </div>
`,
  };
};

export default (pageType, link = null, btnContainer) => {
  return popups(btnContainer)[pageType];
};
