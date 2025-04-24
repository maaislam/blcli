import { getUrlParameter } from '../../../../../lib/utils';

export default (pathname) => {
  let pageType = '';
  // const christmasPages = [
  //  '/en-gb/c/babys-first-christmas-17',
  //  '/en-gb/c/christmas-clothing',
  //  '/en-gb/c/personalised-gifts',
  //  '/en-gb/c/christmas-dinner',
  //  '/en-gb/c/stockings-and-sacks',
  //  '/en-gb/c/christmas-toys17',
  //  '/en-gb/c/christmas-keepsakes',
  //  '/en-gb/c/the-night-before-christmas',
  // ];
  
  const boysPages = [
   '/en-gb/c/new-season-boys',
   '/en-gb/c/boys-tops',
   '/en-gb/c/boys-bottoms',
   '/en-gb/c/outerwear-boys',
   '/en-gb/c/boys-outfit-sets',
   '/en-gb/c/boys-bodysuits-sleepsuits',
   '/en-gb/c/boys-rompers',
   '/en-gb/c/nightwear-boys',
   '/en-gb/c/boys-accessories',
   '/en-gb/c/boys-welcome-to-the-world',
  ];

  const girlsPages = [
    '/en-gb/c/new-season-girls',
    '/en-gb/c/girls-tops',
    '/en-gb/c/dresses-skirts',
    '/en-gb/c/girls-bottoms',
    '/en-gb/c/outerwear-girls',
    '/en-gb/c/girls-outfit-sets',
    '/en-gb/c/girls-bodysuits-sleepsuits',
    '/en-gb/c/girls-rompers',
    '/en-gb/c/nightwear-girls',
    '/en-gb/c/girls-accessories',
    '/en-gb/c/girls-welcome-to-the-world',
   ];

  const unisexPages = [
    '/en-gb/c/new-season-unisex',
    '/en-gb/c/unisex-tops',
    '/en-gb/c/outerwear-unisex',
    '/en-gb/c/unisex-outfits',
    '/en-gb/c/unisex-bodysuits-sleepsuits',
    '/en-gb/c/unisex-rompers',
    '/en-gb/c/nightwear-unisex',
    '/en-gb/c/unisex-accessories',
    '/en-gb/c/collections-unisex',
  ];

  const clearancePages = [
    '/en-gb/c/clearance-clothing',
  ];

  const nurseryFurniturePages = [
    '/en-gb/c/cots-cribs-cotbeds',
    '/en-gb/c/nursery-wardrobes',
    '/en-gb/c/dressers-changers',
    '/en-gb/c/storage-solutions',
  ];

  const accessoriesPages = [
    '/en-gb/c/baby-monitor-night-light',
    '/en-gb/c/wallpaper',
    '/en-gb/c/nursery-cot-mobiles',
    '/en-gb/c/curtains',
  ];

  const interiorsPages = [
    '/en-gb/c/coordinating-collections',
    '/en-gb/c/quilt-coverlet-bumpers',
    '/en-gb/c/blankets',
    '/en-gb/c/3-for-2-baby-bedding',
    '/en-gb/c/nursery-bundles',
    '/en-gb/c/moses-baskets-stands',
    '/en-gb/c/dreampods-swaddling',
  ];

  const feedingPages = [
    '/en-gb/c/highchairs',
    '/en-gb/c/booster-seats',
  ];

  const playtimePages = [
    '/en-gb/c/rockers-bouncers-swings',
    '/en-gb/c/rocking-horse-animals',
    '/en-gb/c/playmats-gyms-0months',
    '/en-gb/c/soft-toys',
    '/en-gb/c/travel-toys',
    '/en-gb/c/books-0months',
    '/en-gb/c/baby-floor-seating',
  ];

  // if (christmasPages.indexOf(pathname) > -1) {
  //   pageType = 'christmas_page';
  // } else 
  if (boysPages.indexOf(pathname) > -1) {
    pageType = 'boys_page';
  } else if (girlsPages.indexOf(pathname) > -1) {
    pageType = 'girls_page';
  } else if (unisexPages.indexOf(pathname) > -1) {
    pageType = 'unisex_page';
  } else if (clearancePages.indexOf(pathname) > -1) {
    const query = getUrlParameter('q');
    const sortedBy = getUrlParameter('sort');
    if (query === '%3AtopRated%3Agender%3AGirls%3Agender%3AUnisex%3Agender%3AMaternity' || (query === '%3AtopRated%3Agender%3ABoys%3Agender%3AUnisex' && sortedBy === 'topRated')) {
      pageType = 'clearance_page';
    }
  } else if (nurseryFurniturePages.indexOf(pathname) > -1) {
    pageType = 'nursery_page';
  } else if (accessoriesPages.indexOf(pathname) > -1) {
    pageType = 'accessories_page';
  } else if (interiorsPages.indexOf(pathname) > -1) {
    pageType = 'interiors_page';
  } else if (feedingPages.indexOf(pathname) > -1) {
    pageType = 'feeding_page';
  } else if (playtimePages.indexOf(pathname) > -1) {
    pageType = 'playtime_page';
  }

  return pageType;
};