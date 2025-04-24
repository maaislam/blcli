import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';


const changeLinks = () => {
  const allLinks = document.querySelectorAll('.content a');
  for (let index = 0; index < allLinks.length; index += 1) {
    const element = allLinks[index];
    if (element.getAttribute('href')) {
      if (element.getAttribute('href').indexOf('www.redcrossfirstaidtraining.co.uk') > -1) {
        const elementHref = element.getAttribute('href');
        element.setAttribute('href', `${elementHref}?utm_source=redcross.org.uk&utm_medium=referral&utm_campaign=BR001-Ctrl`);
      }
    }
  }
};

pollerLite([
  'body',
  '.content a',
], () => {
  events.send('Google Optimize', 'BR001-control View', 'BR001 activated - Control');

  changeLinks();
});
