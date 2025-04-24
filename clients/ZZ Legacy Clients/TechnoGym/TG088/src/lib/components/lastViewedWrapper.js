import settings from '../../lib/settings';
import { pollerLite, poller } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default () => {
  const featuresBlock = document.querySelector('#seo_cnt');
  const lastViewedWrapper = document.createElement('div');
  lastViewedWrapper.classList.add(`${ID}-lastViewedProduct`);
  lastViewedWrapper.innerHTML = `<p></p>`;

  featuresBlock.insertAdjacentElement(lastViewedWrapper);
}
