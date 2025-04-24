import { events } from '../../../../../../lib/utils';

export default () => {
  /* Increase size and clarity of the images */
  const halfAndHalfContainer = document.querySelector('#ctl00_cphBody_rptProductLists_ctl00__objMenuProductListMobile_pnlHH > a >img');
  const createYourOwnContainer = document.querySelector('#ctl00_cphBody_rptProductLists_ctl00__objMenuProductListMobile_pnlCYO > a >img');
  if (halfAndHalfContainer) {
    halfAndHalfContainer.src = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5c0e3e53e79051544437331.png';

    if(halfAndHalfContainer.parentNode) {
      halfAndHalfContainer.parentNode.addEventListener(
        'click', 
        () => events.send('PJ046', 'clicked-half-half-pizza-page')
      );
    }
  }

  if (createYourOwnContainer) {
    createYourOwnContainer.src = 'https://dp8v87cz8a7qa.cloudfront.net/43831/5c0e3e921ad801544437394.png';
    console.log(createYourOwnContainer.parentNode);
    if(createYourOwnContainer.parentNode) {
      const CYOlink = createYourOwnContainer.parentNode;
      console.log(CYOlink);
      const href = CYOlink.href;
      console.log(href);
      CYOlink.href = href + `?pj=cyo`;
      console.log(CYOlink.href);
      createYourOwnContainer.parentNode.addEventListener(
        'click', 
        () => events.send('PJ046', 'clicked-create-your-own-pizza-page')
      );
    }
  }
};
