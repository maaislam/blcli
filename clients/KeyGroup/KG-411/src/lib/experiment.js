import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

//update this data list
const campaigns = [
  {
    utm_content: 'sofa-blue',
    campaign_img:
      'https://cdn-3.convertexperiments.com/uf/10046273/10046720/key-er-paid-social-landing-page-c-e-2025-02_67c8266d76adb.jpg',
  },
  {
    utm_content: 'sofa-green',
    campaign_img:
      'https://cdn-3.convertexperiments.com/uf/10046273/10046720/key-er-paid-social-landing-pages-s-a-2025-02_67c8269604987.jpg',
  },
  {
    utm_content: 'sofa-leather',
    campaign_img:
      'https://cdn-3.convertexperiments.com/uf/10046273/10046720/key-er-paid-social-landing-pages-s-c-2025-02_67c826ac4c3b9.jpg',
  },
  {
    utm_content: 'sofa-purple',
    campaign_img:
      'https://cdn-3.convertexperiments.com/uf/10046273/10046720/key-er-paid-social-landing-pages-s-e-2025-02_67c826bb4f9d8.jpg',
  },
  {
    utm_content: 'sofa-white',
    campaign_img:
      'https://cdn-3.convertexperiments.com/uf/10046273/10046720/key-er-paid-social-landing-pages-s-i-2025-02_67c826d157980.jpg',
  },
];

const init = (campaign) => {
  const attachPoint = document.querySelector('.navigation__wrapper');
  const imgElem = `<div class='${ID}__smartLander'>
              <img class='${ID}__img' src="${campaign.campaign_img}" />
              <div class='${ID}__text'>Get started with our <span>Free Equity Release Calculator</span></div>
          </div>`;
  attachPoint.insertAdjacentHTML('afterend', imgElem);
  attachPoint.style.display = 'none';
};

export default () => {
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmContent = urlParams.get('utm_content');

  if (utmContent) {
    const campaign = campaigns.find((campaign) => {
      return campaign.utm_content === utmContent;
    });
    if (campaign) {
      setup();
      init(campaign);
    } else {
      console.error('Campaign not found for utm_content:', utmContent);
    }
  } else {
    console.error('No utm_content found in query string');
  }
};
