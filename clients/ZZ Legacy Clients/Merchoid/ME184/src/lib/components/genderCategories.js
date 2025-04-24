import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  let jumperText;
  let jumperName;
  /* eslint-disable */
  if (wc_aelia_currency_switcher_params.selected_currency !== 'GBP') {
    jumperText = 'Sweaters'
    jumperName = 'Sweater';
  } else {
    jumperText = 'Jumpers';
    jumperName = 'Jumper';
  }
  /* eslint-enable */

  const pageURL = window.location.href;

  const genderBannersWrapper = document.createElement('div');
  genderBannersWrapper.classList.add('ME178-genderBanners');
  genderBannersWrapper.innerHTML = `
  <h2>Officially Licensed Christmas ${jumperText}</h2>
  <div class="ME178-banner ME178-for_her"></div>
  <div class="ME178-banner ME178-for_him"></div>`;

  const uxBanner = document.querySelector('.ux_banner');
  uxBanner.insertAdjacentElement('beforebegin', genderBannersWrapper);

  const addQuery = () => {
    let query;
    const genderBanners = document.querySelectorAll('.ME178-banner');
    for (let index = 0; index < genderBanners.length; index += 1) {
      const element = genderBanners[index];
      /* eslint-disable */
      element.addEventListener('click', () => {
        if (element.classList.contains(`ME178-for_her`)) {
          query = `${window.location.pathname}?gender=womens`;
        }
        if (element.classList.contains(`ME178-for_him`)) {
          query = `https://www.merchoid.com/${window.location.pathname}?gender=mens`;
        }
        window.location.href = query;
      });
    }
    /* eslint-enable */
  };
  addQuery();


  const addTopProducts = () => {
    let gender;
    // if banners are clicked
    if (pageURL.indexOf('?gender=womens') > -1) {
      gender = 'For Her';
    } else if (pageURL.indexOf('?gender=mens') > -1) {
      gender = 'For Him';
    }
    document.querySelector('.ME178-genderBanners h2').textContent = `Officially Licensed Christmas ${jumperText} ${gender}`;

    const topProducts = document.createElement('div');
    topProducts.classList.add('ME178-top_products');
    topProducts.innerHTML = `<div class="ME178-top"><h2>${jumperText} ${gender}</h2></div>`;
    document.querySelector('.ME178-genderBanners').insertAdjacentElement('afterend', topProducts);


    /* Top gender jumpers */
    /* womens */
    const womansTop10 =
    [`Wonder Woman: Winter Wonder-land Knitted Christmas ${jumperName}`,
      `Harry Potter: Gryffindor Knitted Christmas ${jumperName}`,
      `Jurassic Park: Knitted Christmas ${jumperName} Preorder`,
      `Lion King: Hakuna Holidays Knitted Christmas ${jumperName} Preorder`,
      `Star Wars: The Season To Be Jolly It Is Christmas ${jumperName}`,
      `Star Wars: All I Want For Christmas Is R2 Knitted Christmas ${jumperName}`,
      `Aladdin: We WISH You A Merry Christmas Knitted Christmas ${jumperName} Preorder`,
      `Beauty and the Beast: Merry Beastmas Knitted Christmas ${jumperName} Preorder`,
      `Harry Potter: Hufflepuff Knitted Christmas ${jumperName} Preorder`,
      `Harry Potter: Ravenclaw Knitted Christmas ${jumperName} Preorder`,
    ];
    const mensTop10 =
      [`Jurassic Park: Knitted Christmas Sweater/${jumperName}Preorder`,
        `Spider-Man: ‘Tis The Season To Be Spidey Knitted Christmas ${jumperName} Preorder`,
        `Captain America: Red White And Blue Knitted Christmas ${jumperName}`,
        `Superman: Kryptonian Christmas Knitted ${jumperName}`,
        `Batman: Bat Santa Knitted Christmas ${jumperName} Preorder`,
        `Harry Potter: Gryffindor Knitted Christmas ${jumperName}`,
        `Star Wars: X-Wing v TIE Fighter Knitted Christmas ${jumperName} Preorder`,
        `Star Wars: Happy Hoth-idays Knitted Christmas ${jumperName}`,
        `Aladdin: We WISH You A Merry Christmas Knitted Christmas ${jumperName} Preorder`,
        `Marvel: Avengers Knitted Christmas ${jumperName} Preorder`,
      ];

    const allProducts = document.querySelectorAll('.product-small');

    let topGenderProducts;
    if (gender === 'For Her') {
      topGenderProducts = womansTop10;
    } else if (gender === 'For Him') {
      topGenderProducts = mensTop10;
    }

    pollerLite(['.ME178-top_products .ME178-top'], () => {
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const productName = element.querySelector('.name');
        if (productName) {
          [].forEach.call(topGenderProducts, (topProduct) => {
            if (productName.textContent.trim() === topProduct) {
              const topProductHtml = document.createElement('li');
              topProductHtml.classList.add('ME178-top_product');
              topProductHtml.innerHTML = element.innerHTML;
              document.querySelector('.ME178-top_products .ME178-top').appendChild(topProductHtml);
            }
          });
        }
      }
    });
  };
  // add the products if URL is gender based
  if (pageURL.indexOf('?gender') > -1) {
    addTopProducts();
  }
};
