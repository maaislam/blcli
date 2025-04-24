export const imgSourcs = [
  'https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Sample_Lipstick.png?v=1632476001',
  ' https://cdn.shopify.com/s/files/1/0327/1498/1421/files/PSCGD_030_SP_1186048JUL1315_2.png?v=1632915619',
  'https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Sample_Fragrance.png?v=1632476002',
  'https://cdn.shopify.com/s/files/1/0327/1498/1421/products/1204432_F1387105_Anew_20Ultimate_20Day_20Firming_20Cream_20SPF25__SP_2ed82660-6e4f-4122-b131-bb6736ca40b2_600x.jpg?v=1611758326',
];

export const sampleLogos = [
  {
    name: 'make-up',
    url: 'https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Lipstick.svg?v=1632895488',
  },
  {
    name: 'skincare',
    url: 'https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Skincare.svg?v=1632895501',
  },
  {
    name: 'fragrance',
    url: 'https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Fragrance.svg?v=1632895446',
  },
];

export const menuItems = ['make-up', 'skincare', 'fragrance'];

export const renderNewNavElm = (parentClass, imgSrc, id) => {
  const newNav = document.createElement('div');
  newNav.classList.add(`${id}-nav__element--${parentClass}`, 'new-nav__elem');
  newNav.setAttribute('data-item', parentClass);
  const htmlElm = `
     <div class ="new__nav--link" href="/collections/sample">
          <div class="round-img__wrapper" data-src="${imgSrc}">
              <img class="img-fluid lazyloaded" src="${imgSrc}" alt="3 for £1 Samples">
          </div>   
          <h2 class="hero-title"><span class="${id}__desktop"> Mix & Match</span><span class="${id}__mobile">3 for £1 Samples</span></h2>
          <p class="post-title">Not sure what to buy? <br>Start your Avon journey with</p>
          <span class="hero-price"><span class="${id}__desktop">3 for £1 Samples</span><span class="${id}__mobile"> Mix & Match</span></span>
          <button type="button" class="btn btn-hero-white">Shop Samples</button>
      </div>
    `;
  newNav.innerHTML = htmlElm;
  const newNavMob = newNav.cloneNode(true);

  newNav.classList.add(`${id}__desktop`);
  newNavMob.classList.add(`${id}__mobile`);

  document.querySelector(`.site-navigation-megamenu.${parentClass}`).append(newNav);
  document.querySelector(`.site-navigation-megamenu.${parentClass}`).firstElementChild.append(newNavMob);
};

export const renderSampleMsg = (id, location, imgSource, itemName) => {
  const sampleLogo = document.createElement('img');
  sampleLogo.setAttribute('src', `${imgSource}`);
  const wrapper = document.createElement('a');
  const textContainer = document.createElement('div');
  wrapper.setAttribute('href', '/collections/sample');
  wrapper.classList.add(`${id}-sample__msg--${location}`, `${id}-sample__msg`, 'new-nav__elem');
  wrapper.setAttribute('data-item', itemName);
  const title = document.createElement('h4');
  const paragraph = document.createElement('span');

  paragraph.innerHTML = 'Mix & Match 3 for £1';
  title.innerHTML = 'Shop Samples';
  textContainer.append(title, paragraph);
  wrapper.append(sampleLogo, textContainer);
  return wrapper;
};
