import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const getSpecs = () => {
  const productDesc = document.querySelector('.item_desc p.prod_summary.line-clamp');
  productDesc.classList.add('hide');
  // productDesc.querySelector('p.prod_summary.line-clamp').classList.add('hide');
  const features = document.querySelector('#specification_tab .full_prdt_specifications .featureClass').children;
  let listItems = '';
  for (let i = 0; i < features.length; i += 2) {
    const textEl = features[i];
    const subtextEl = features[i + 1];
    const text = textEl.querySelector('label').innerText;
    const subtext = subtextEl.querySelector('p').innerText;

    listItems += `<div class="${shared.ID}-feature__wrapper">
      <li class="${shared.ID}-feature">
        <label>${text}</label>
        <p>${subtext}</p>
      </li>
    </div>`;
  }

  if (listItems !== '') {
    const featureListContainer = `<div class="${shared.ID}-features__wrapper">
      <ul class="${shared.ID}-features">${listItems}</ul>
    </div>`;
    
    if (window.innerWidth >= 1024) {
      document.querySelector('.item_desc').insertAdjacentHTML('afterbegin', featureListContainer);
    } else {
      document.querySelector('.bx-wrapper').insertAdjacentHTML('afterend', featureListContainer);
    }
    
  }
};
