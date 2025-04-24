import settings from '../settings';

const { ID } = settings;

export default () => {
  const uspSection = document.querySelector(`.${ID}-whyTG`);
  uspSection.innerHTML = `<h2>Why Buy From <span>Technogym</span></h2><div class="${ID}-runnerImage"></div><ul class="${ID}-usps_wrapper"></ul><div class="${ID}-readMore"><span>Read more</span></div>`;

  const usps = [
    ['Official supplier to the latest editions of the Olympics, from Sydney 2000 to PyeongChang 2018.'],
    ['Designed and made in Italy with the utmost care to fit your space and wellness needs.'],
    ['Eager to understand your expectations and consult with you on the right purchase.'],
    ['Offering a comprehensive interior design service to create the perfect wellness area.'],
    ['No hassle: equipment delivered to your door with high-quality installation by our experts (included in the price).'],
    ['Outstanding after-sales and customer support ensure your equipment is always perfectly operational over time.'],
  ];

  for (let index = 0; index < usps.length; index += 1) {
    const element = usps[index];
    const newUsp = document.createElement('li');
    newUsp.classList.add(`${ID}-usp`);
    newUsp.innerHTML = `${element}`;
    uspSection.querySelector(`.${ID}-usps_wrapper`).appendChild(newUsp);
  }

  const readMore = uspSection.querySelector(`.${ID}-readMore`);
  readMore.addEventListener('click', () => {
    if (uspSection.classList.contains(`${ID}-all_showing`)) {
      uspSection.classList.remove(`${ID}-all_showing`);
      readMore.querySelector('span').textContent = 'Read more';
    } else {
      uspSection.classList.add(`${ID}-all_showing`);
      readMore.querySelector('span').textContent = 'Read less';
    }
  });
};
